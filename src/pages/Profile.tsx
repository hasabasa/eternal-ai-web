import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Users, LogOut } from "lucide-react";
import { supabase, getCurrentUser, getUserProfile } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ManagerProfile {
  id: string;
  username: string;
  base_salary: number;
  sales_percentage: number;
  kpi_target: number;
  role: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<ManagerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Статические данные для демонстрации (в реальном приложении это будет из базы данных)
  const [currentSales] = useState(340000); // Текущие продажи за месяц

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
    } catch (err) {
      setError('Ошибка загрузки профиля');
    } finally {
      setLoading(false);
    }
  };

  const calculateIncome = () => {
    if (!profile) return 0;
    const percentValue = (currentSales * profile.sales_percentage) / 100;
    return profile.base_salary + percentValue;
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin-login');
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ru-RU').format(num);
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-brand-orange/20 to-brand-purple/20 px-4 py-10 animate-fade-in">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-brand-darkBlue rounded-full flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">Мой профиль</CardTitle>
          <CardDescription>
            Добро пожаловать, {profile.username}!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Роль пользователя */}
          <div className="text-center">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              profile.role === 'admin' 
                ? 'bg-brand-orange text-white' 
                : 'bg-brand-purple/20 text-brand-purple'
            }`}>
              {profile.role === 'admin' ? 'Администратор' : 'Менеджер'}
            </span>
          </div>

          {/* Показываем данные только для менеджеров */}
          {profile.role === 'manager' && (
            <>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">KPI за месяц:</span>
                  <span className="font-semibold">{formatNumber(currentSales)} ₸</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Базовый оклад:</span>
                  <span className="font-semibold">{formatNumber(profile.base_salary)} ₸</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Процент от продаж:</span>
                  <span className="font-semibold">{profile.sales_percentage}%</span>
                </div>
                {profile.kpi_target > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Цель KPI:</span>
                    <span className="font-semibold">{formatNumber(profile.kpi_target)} ₸</span>
                  </div>
                )}
                <hr className="my-4" />
                <div className="flex justify-between items-center text-lg">
                  <span className="font-semibold text-brand-darkBlue">Заработанная сумма:</span>
                  <span className="font-bold text-brand-orange">{formatNumber(calculateIncome())} ₸</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 text-center">
                  Общий расчёт ЗП: Оклад + процент от продаж
                </p>
              </div>
            </>
          )}

          {/* Кнопки действий */}
          <div className="space-y-3 pt-4">
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
  );
};

export default Profile;