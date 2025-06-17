import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Users, LogOut, TrendingUp, DollarSign, Target, AlertTriangle, Gift } from "lucide-react";
import { supabase, getCurrentUser, getUserProfile } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface ManagerProfile {
  id: string;
  username: string;
  base_salary: number;
  sales_percentage: number;
  kpi_target: number;
  role: string;
}

interface Penalty {
  id: string;
  amount: number;
  reason: string;
  created_at: string;
}

interface Bonus {
  id: string;
  amount: number;
  reason: string;
  created_at: string;
}

interface SalesPlan {
  target_amount: number;
  month_year: string;
}

interface SalesAchievement {
  amount: number;
  month_year: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<ManagerProfile | null>(null);
  const [penalties, setPenalties] = useState<Penalty[]>([]);
  const [bonuses, setBonuses] = useState<Bonus[]>([]);
  const [salesPlan, setSalesPlan] = useState<SalesPlan | null>(null);
  const [salesAchievements, setSalesAchievements] = useState<SalesAchievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const user = await getCurrentUser();
      if (!user) {
        navigate('/admin-login');
        return;
      }

      const userProfile = await getUserProfile(user.id);
      if (!userProfile) {
        setError('Профиль не найден');
        return;
      }

      setProfile(userProfile);
      
      if (userProfile.role === 'manager') {
        await loadManagerData(userProfile.id);
      }
    } catch (err) {
      setError('Ошибка загрузки профиля');
    } finally {
      setLoading(false);
    }
  };

  const loadManagerData = async (managerId: string) => {
    try {
      // Calculate the first day of next month for the date range
      const currentDate = new Date(currentMonth + '-01');
      const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
      const nextMonthString = nextMonth.toISOString().slice(0, 10); // YYYY-MM-DD

      // Load penalties for current month
      const { data: penaltiesData } = await supabase
        .from('penalties')
        .select('*')
        .eq('manager_id', managerId)
        .gte('created_at', `${currentMonth}-01`)
        .lt('created_at', nextMonthString);

      // Load bonuses for current month
      const { data: bonusesData } = await supabase
        .from('bonuses')
        .select('*')
        .eq('manager_id', managerId)
        .gte('created_at', `${currentMonth}-01`)
        .lt('created_at', nextMonthString);

      // Load sales plan for current month (remove .single() to handle no results)
      const { data: salesPlanData } = await supabase
        .from('sales_plans')
        .select('*')
        .eq('manager_id', managerId)
        .eq('month_year', currentMonth);

      // Load sales achievements for current month
      const { data: achievementsData } = await supabase
        .from('sales_achievements')
        .select('*')
        .eq('manager_id', managerId)
        .eq('month_year', currentMonth);

      setPenalties(penaltiesData || []);
      setBonuses(bonusesData || []);
      setSalesPlan(salesPlanData && salesPlanData.length > 0 ? salesPlanData[0] : null);
      setSalesAchievements(achievementsData || []);
    } catch (err) {
      console.error('Error loading manager data:', err);
    }
  };

  const calculateSalary = () => {
    if (!profile) return { base: 0, commission: 0, bonuses: 0, penalties: 0, total: 0 };

    const totalSales = salesAchievements.reduce((sum, achievement) => sum + achievement.amount, 0);
    const commission = (totalSales * profile.sales_percentage) / 100;
    const totalBonuses = bonuses.reduce((sum, bonus) => sum + bonus.amount, 0);
    const totalPenalties = penalties.reduce((sum, penalty) => sum + penalty.amount, 0);
    const total = profile.base_salary + commission + totalBonuses - totalPenalties;

    return {
      base: profile.base_salary,
      commission,
      bonuses: totalBonuses,
      penalties: totalPenalties,
      total
    };
  };

  const getSalesProgress = () => {
    if (!salesPlan || salesPlan.target_amount === 0) {
      return { 
        progress: 0, 
        achieved: salesAchievements.reduce((sum, achievement) => sum + achievement.amount, 0), 
        target: 0 
      };
    }
    
    const totalAchieved = salesAchievements.reduce((sum, achievement) => sum + achievement.amount, 0);
    // Исправляем логику: не ограничиваем прогресс 100%
    const progress = (totalAchieved / salesPlan.target_amount) * 100;
    
    return {
      progress,
      achieved: totalAchieved,
      target: salesPlan.target_amount
    };
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin-login');
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ru-RU').format(num);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange mx-auto mb-4"></div>
          <p>Загрузка профиля...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-brand-orange/20 to-brand-purple/20 px-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <Alert variant="destructive">
              <AlertDescription>{error || 'Профиль не найден'}</AlertDescription>
            </Alert>
            <div className="mt-4 text-center">
              <Link to="/admin-login">
                <Button>Войти в систему</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const salary = calculateSalary();
  const salesProgress = getSalesProgress();

  return (
    <div className="min-h-screen bg-gradient-to-r from-brand-orange/20 to-brand-purple/20 px-4 py-10">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Card */}
        <Card className="animate-fade-in">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-brand-darkBlue rounded-full flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Мой профиль</CardTitle>
            <CardDescription>
              Добро пожаловать, {profile.username}!
            </CardDescription>
            <div className="mt-2">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                profile.role === 'admin' 
                  ? 'bg-brand-orange text-white' 
                  : 'bg-brand-purple/20 text-brand-purple'
              }`}>
                {profile.role === 'admin' ? 'Администратор' : 'Менеджер'}
              </span>
            </div>
          </CardHeader>
        </Card>

        {/* Manager Dashboard */}
        {profile.role === 'manager' && (
          <>
            {/* Sales Progress Card */}
            {salesPlan && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-brand-purple" />
                    Прогресс выполнения плана продаж
                  </CardTitle>
                  <CardDescription>
                    Ваш прогресс за {new Date().toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">План:</span>
                      <span className="font-semibold">{formatNumber(salesProgress.target)} ₸</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Выполнено:</span>
                      <span className="font-semibold text-brand-orange">{formatNumber(salesProgress.achieved)} ₸</span>
                    </div>
                    
                    <div className="space-y-2">
                      {/* Ограничиваем прогресс-бар максимумом 100% для визуального отображения */}
                      <Progress 
                        value={Math.min(salesProgress.progress, 100)} 
                        className="h-4"
                      />
                      <div className="text-center">
                        <Badge 
                          variant={salesProgress.progress >= 100 ? "default" : "secondary"} 
                          className={`text-lg px-3 py-1 ${
                            salesProgress.progress > 100 ? 'bg-green-600 text-white' : ''
                          }`}
                        >
                          {salesProgress.progress.toFixed(1)}% выполнено
                        </Badge>
                      </div>
                    </div>
                    
                    {salesProgress.progress >= 100 && (
                      <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="text-green-700 font-semibold">
                          {salesProgress.progress > 100 
                            ? `🎉 Превышение плана на ${(salesProgress.progress - 100).toFixed(1)}%!` 
                            : '🎉 Поздравляем! План выполнен!'
                          }
                        </div>
                        {salesProgress.progress > 100 && (
                          <div className="text-sm text-green-600 mt-1">
                            Перевыполнение: {formatNumber(salesProgress.achieved - salesProgress.target)} ₸
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Salary Breakdown Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-brand-orange" />
                  Расчет заработной платы
                </CardTitle>
                <CardDescription>
                  Детализация зарплаты за {new Date().toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Base Salary */}
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium">Базовый оклад:</span>
                    <span className="font-semibold">{formatNumber(salary.base)} ₸</span>
                  </div>

                  {/* Commission */}
                  {salary.commission > 0 && (
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium">Комиссия от продаж ({profile.sales_percentage}%):</span>
                      <span className="font-semibold text-green-600">+{formatNumber(salary.commission)} ₸</span>
                    </div>
                  )}

                  {/* Bonuses */}
                  {salary.bonuses > 0 && (
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium">Бонусы:</span>
                      <span className="font-semibold text-blue-600">+{formatNumber(salary.bonuses)} ₸</span>
                    </div>
                  )}

                  {/* Penalties */}
                  {salary.penalties > 0 && (
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="text-sm font-medium">Штрафы:</span>
                      <span className="font-semibold text-red-600">-{formatNumber(salary.penalties)} ₸</span>
                    </div>
                  )}

                  {/* Total */}
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-brand-orange/10 to-brand-purple/10 rounded-lg border-2 border-brand-orange/30">
                    <span className="text-lg font-bold text-brand-darkBlue">Итого к выплате:</span>
                    <span className="text-xl font-bold text-brand-orange">{formatNumber(salary.total)} ₸</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Penalties and Bonuses Details */}
            {(penalties.length > 0 || bonuses.length > 0) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Penalties */}
                {penalties.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-red-600">
                        <AlertTriangle className="w-5 h-5" />
                        Штрафы за месяц
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {penalties.map((penalty) => (
                          <div key={penalty.id} className="p-3 bg-red-50 rounded-lg border border-red-200">
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-semibold text-red-600">-{formatNumber(penalty.amount)} ₸</span>
                              <span className="text-xs text-gray-500">{formatDate(penalty.created_at)}</span>
                            </div>
                            <p className="text-sm text-gray-700">{penalty.reason}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Bonuses */}
                {bonuses.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-600">
                        <Gift className="w-5 h-5" />
                        Бонусы за месяц
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {bonuses.map((bonus) => (
                          <div key={bonus.id} className="p-3 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-semibold text-green-600">+{formatNumber(bonus.amount)} ₸</span>
                              <span className="text-xs text-gray-500">{formatDate(bonus.created_at)}</span>
                            </div>
                            <p className="text-sm text-gray-700">{bonus.reason}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </>
        )}

        {/* Action Buttons */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {profile.role === 'admin' && (
                <Link to="/admin-panel" className="block">
                  <Button className="w-full bg-brand-orange hover:bg-brand-orange/90">
                    Административная панель
                  </Button>
                </Link>
              )}
              
              <Link to="/" className="block">
                <Button variant="outline" className="w-full">
                  На главную
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                className="w-full text-red-600 border-red-200 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Выйти
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;