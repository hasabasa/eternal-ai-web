import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, getCurrentUser, isAdmin, createUserWithUsername } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  UserPlus, 
  Users, 
  Edit, 
  Trash2, 
  LogOut, 
  Eye, 
  EyeOff,
  Save,
  X,
  User,
  Lock,
  DollarSign,
  Target,
  Percent,
  AlertTriangle,
  Gift,
  TrendingUp,
  Calendar,
  Plus,
  Minus
} from 'lucide-react';

interface ManagerProfile {
  id: string;
  user_id: string;
  username: string;
  base_salary: number;
  sales_percentage: number;
  kpi_target: number;
  role: string;
  total_sales_plan: number;
  created_at: string;
}

interface Penalty {
  id: string;
  manager_id: string;
  amount: number;
  reason: string;
  created_at: string;
}

interface Bonus {
  id: string;
  manager_id: string;
  amount: number;
  reason: string;
  created_at: string;
}

interface SalesPlan {
  id: string;
  manager_id: string;
  target_amount: number;
  month_year: string;
}

interface SalesAchievement {
  id: string;
  manager_id: string;
  amount: number;
  month_year: string;
}

interface SalaryCalculation {
  base_salary: number;
  total_penalties: number;
  total_bonuses: number;
  sales_commission: number;
  final_salary: number;
}

interface SalesProgress {
  target_amount: number;
  achieved_amount: number;
  progress_percentage: number;
}

const AdminPanel = () => {
  const [managers, setManagers] = useState<ManagerProfile[]>([]);
  const [penalties, setPenalties] = useState<Penalty[]>([]);
  const [bonuses, setBonuses] = useState<Bonus[]>([]);
  const [salesPlans, setSalesPlans] = useState<SalesPlan[]>([]);
  const [salesAchievements, setSalesAchievements] = useState<SalesAchievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('managers');
  
  // Dialog states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isPenaltyDialogOpen, setIsPenaltyDialogOpen] = useState(false);
  const [isBonusDialogOpen, setIsBonusDialogOpen] = useState(false);
  const [isSalesPlanDialogOpen, setIsSalesPlanDialogOpen] = useState(false);
  const [isSalesAchievementDialogOpen, setIsSalesAchievementDialogOpen] = useState(false);
  const [isTotalPlanDialogOpen, setIsTotalPlanDialogOpen] = useState(false);
  
  const [editingManager, setEditingManager] = useState<ManagerProfile | null>(null);
  const [selectedManagerId, setSelectedManagerId] = useState<string>('');
  const navigate = useNavigate();

  // Form states for adding new manager
  const [newManager, setNewManager] = useState({
    username: '',
    password: '',
    base_salary: '',
    sales_percentage: '',
    kpi_target: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  // Form states for penalties and bonuses
  const [penaltyForm, setPenaltyForm] = useState({
    manager_id: '',
    amount: '',
    reason: ''
  });

  const [bonusForm, setBonusForm] = useState({
    manager_id: '',
    amount: '',
    reason: ''
  });

  // Form states for sales plans and achievements
  const [salesPlanForm, setSalesPlanForm] = useState({
    manager_id: '',
    target_amount: '',
    month_year: new Date().toISOString().slice(0, 7) // YYYY-MM
  });

  const [salesAchievementForm, setSalesAchievementForm] = useState({
    manager_id: '',
    amount: '',
    month_year: new Date().toISOString().slice(0, 7) // YYYY-MM
  });

  const [totalPlanForm, setTotalPlanForm] = useState({
    total_sales_plan: ''
  });

  // Check admin access on component mount
  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const user = await getCurrentUser();
      if (!user) {
        navigate('/admin-login');
        return;
      }

      const adminCheck = await isAdmin(user.id);
      if (!adminCheck) {
        navigate('/profile');
        return;
      }

      loadAllData();
    } catch (err) {
      console.error('Error checking admin access:', err);
      navigate('/admin-login');
    }
  };

  const loadAllData = async () => {
    try {
      await Promise.all([
        loadManagers(),
        loadPenalties(),
        loadBonuses(),
        loadSalesPlans(),
        loadSalesAchievements()
      ]);
    } catch (err) {
      setError('Произошла ошибка при загрузке данных');
    } finally {
      setLoading(false);
    }
  };

  const loadManagers = async () => {
    const { data, error } = await supabase
      .from('manager_profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      setError('Ошибка загрузки списка менеджеров');
      return;
    }

    setManagers(data || []);
  };

  const loadPenalties = async () => {
    const { data, error } = await supabase
      .from('penalties')
      .select(`
        *,
        manager_profiles!penalties_manager_id_fkey(username)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading penalties:', error);
      return;
    }

    setPenalties(data || []);
  };

  const loadBonuses = async () => {
    const { data, error } = await supabase
      .from('bonuses')
      .select(`
        *,
        manager_profiles!bonuses_manager_id_fkey(username)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading bonuses:', error);
      return;
    }

    setBonuses(data || []);
  };

  const loadSalesPlans = async () => {
    const { data, error } = await supabase
      .from('sales_plans')
      .select(`
        *,
        manager_profiles!sales_plans_manager_id_fkey(username)
      `)
      .order('month_year', { ascending: false });

    if (error) {
      console.error('Error loading sales plans:', error);
      return;
    }

    setSalesPlans(data || []);
  };

  const loadSalesAchievements = async () => {
    const { data, error } = await supabase
      .from('sales_achievements')
      .select(`
        *,
        manager_profiles!sales_achievements_manager_id_fkey(username)
      `)
      .order('month_year', { ascending: false });

    if (error) {
      console.error('Error loading sales achievements:', error);
      return;
    }

    setSalesAchievements(data || []);
  };

  const handleAddManager = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validate username (no special characters, no spaces)
      if (!/^[a-zA-Z0-9_]+$/.test(newManager.username)) {
        setError('Логин может содержать только буквы, цифры и символ подчеркивания');
        return;
      }

      // Check if username already exists
      const { data: existingUser } = await supabase
        .from('manager_profiles')
        .select('username')
        .eq('username', newManager.username)
        .single();

      if (existingUser) {
        setError('Пользователь с таким логином уже существует');
        return;
      }

      // Create user with profile
      const { data, error } = await createUserWithUsername(
        newManager.username,
        newManager.password,
        {
          base_salary: parseFloat(newManager.base_salary) || 0,
          sales_percentage: parseFloat(newManager.sales_percentage) || 0,
          kpi_target: parseFloat(newManager.kpi_target) || 0,
          role: 'manager'
        }
      );

      if (error) {
        setError('Ошибка создания пользователя: ' + error.message);
        return;
      }

      setSuccess(`Менеджер "${newManager.username}" успешно создан`);
      setNewManager({
        username: '',
        password: '',
        base_salary: '',
        sales_percentage: '',
        kpi_target: ''
      });
      setIsAddDialogOpen(false);
      loadManagers();
    } catch (err) {
      setError('Произошла ошибка при добавлении менеджера');
    } finally {
      setLoading(false);
    }
  };

  const handleAddPenalty = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const currentUser = await getCurrentUser();
      const adminProfile = await supabase
        .from('manager_profiles')
        .select('id')
        .eq('user_id', currentUser?.id)
        .single();

      const { error } = await supabase
        .from('penalties')
        .insert({
          manager_id: penaltyForm.manager_id,
          amount: parseFloat(penaltyForm.amount),
          reason: penaltyForm.reason,
          created_by: adminProfile.data?.id
        });

      if (error) {
        setError('Ошибка добавления штрафа');
        return;
      }

      setSuccess('Штраф успешно добавлен');
      setPenaltyForm({ manager_id: '', amount: '', reason: '' });
      setIsPenaltyDialogOpen(false);
      loadPenalties();
    } catch (err) {
      setError('Произошла ошибка при добавлении штрафа');
    } finally {
      setLoading(false);
    }
  };

  const handleAddBonus = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const currentUser = await getCurrentUser();
      const adminProfile = await supabase
        .from('manager_profiles')
        .select('id')
        .eq('user_id', currentUser?.id)
        .single();

      const { error } = await supabase
        .from('bonuses')
        .insert({
          manager_id: bonusForm.manager_id,
          amount: parseFloat(bonusForm.amount),
          reason: bonusForm.reason,
          created_by: adminProfile.data?.id
        });

      if (error) {
        setError('Ошибка добавления бонуса');
        return;
      }

      setSuccess('Бонус успешно добавлен');
      setBonusForm({ manager_id: '', amount: '', reason: '' });
      setIsBonusDialogOpen(false);
      loadBonuses();
    } catch (err) {
      setError('Произошла ошибка при добавлении бонуса');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSalesPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const currentUser = await getCurrentUser();
      const adminProfile = await supabase
        .from('manager_profiles')
        .select('id')
        .eq('user_id', currentUser?.id)
        .single();

      const { error } = await supabase
        .from('sales_plans')
        .insert({
          manager_id: salesPlanForm.manager_id,
          target_amount: parseFloat(salesPlanForm.target_amount),
          month_year: salesPlanForm.month_year,
          created_by: adminProfile.data?.id
        });

      if (error) {
        setError('Ошибка добавления плана продаж');
        return;
      }

      setSuccess('План продаж успешно добавлен');
      setSalesPlanForm({ manager_id: '', target_amount: '', month_year: new Date().toISOString().slice(0, 7) });
      setIsSalesPlanDialogOpen(false);
      loadSalesPlans();
    } catch (err) {
      setError('Произошла ошибка при добавлении плана продаж');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSalesAchievement = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const currentUser = await getCurrentUser();
      const adminProfile = await supabase
        .from('manager_profiles')
        .select('id')
        .eq('user_id', currentUser?.id)
        .single();

      const { error } = await supabase
        .from('sales_achievements')
        .insert({
          manager_id: salesAchievementForm.manager_id,
          amount: parseFloat(salesAchievementForm.amount),
          month_year: salesAchievementForm.month_year,
          created_by: adminProfile.data?.id
        });

      if (error) {
        setError('Ошибка добавления достижения продаж');
        return;
      }

      setSuccess('Достижение продаж успешно добавлено');
      setSalesAchievementForm({ manager_id: '', amount: '', month_year: new Date().toISOString().slice(0, 7) });
      setIsSalesAchievementDialogOpen(false);
      loadSalesAchievements();
    } catch (err) {
      setError('Произошла ошибка при добавлении достижения продаж');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTotalPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const currentUser = await getCurrentUser();
      
      const { error } = await supabase
        .from('manager_profiles')
        .update({
          total_sales_plan: parseFloat(totalPlanForm.total_sales_plan)
        })
        .eq('user_id', currentUser?.id);

      if (error) {
        setError('Ошибка обновления общего плана продаж');
        return;
      }

      setSuccess('Общий план продаж успешно обновлен');
      setTotalPlanForm({ total_sales_plan: '' });
      setIsTotalPlanDialogOpen(false);
      loadManagers();
    } catch (err) {
      setError('Произошла ошибка при обновлении общего плана продаж');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateManager = async (manager: ManagerProfile) => {
    try {
      const { error } = await supabase
        .from('manager_profiles')
        .update({
          base_salary: manager.base_salary,
          sales_percentage: manager.sales_percentage,
          kpi_target: manager.kpi_target
        })
        .eq('id', manager.id);

      if (error) {
        setError('Ошибка обновления данных менеджера');
        return;
      }

      setSuccess('Данные менеджера обновлены');
      setEditingManager(null);
      loadManagers();
    } catch (err) {
      setError('Произошла ошибка при обновлении данных');
    }
  };

  const handleDeleteManager = async (managerId: string, username: string) => {
    if (!confirm(`Вы уверены, что хотите удалить менеджера "${username}"?`)) {
      return;
    }

    try {
      // Delete from manager_profiles (this will also trigger cascade delete in auth if configured)
      const { error: profileError } = await supabase
        .from('manager_profiles')
        .delete()
        .eq('id', managerId);

      if (profileError) {
        setError('Ошибка удаления профиля менеджера');
        return;
      }

      setSuccess(`Менеджер "${username}" удален`);
      loadManagers();
    } catch (err) {
      setError('Произошла ошибка при удалении менеджера');
    }
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

  const getManagerName = (managerId: string) => {
    const manager = managers.find(m => m.id === managerId);
    return manager?.username || 'Неизвестно';
  };

  const getSalesProgress = (managerId: string, monthYear: string) => {
    const plan = salesPlans.find(p => p.manager_id === managerId && p.month_year === monthYear);
    const achievements = salesAchievements.filter(a => a.manager_id === managerId && a.month_year === monthYear);
    const totalAchieved = achievements.reduce((sum, a) => sum + a.amount, 0);
    
    if (!plan || plan.target_amount === 0) return { progress: 0, achieved: 0, target: 0 };
    
    const progress = Math.min((totalAchieved / plan.target_amount) * 100, 100);
    return { progress, achieved: totalAchieved, target: plan.target_amount };
  };

  const getCurrentMonthSalaryData = (managerId: string) => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    const monthPenalties = penalties.filter(p => 
      p.manager_id === managerId && 
      p.created_at.slice(0, 7) === currentMonth
    );
    const monthBonuses = bonuses.filter(b => 
      b.manager_id === managerId && 
      b.created_at.slice(0, 7) === currentMonth
    );
    const monthAchievements = salesAchievements.filter(a => 
      a.manager_id === managerId && 
      a.month_year === currentMonth
    );
    
    const manager = managers.find(m => m.id === managerId);
    if (!manager) return { baseSalary: 0, penalties: 0, bonuses: 0, commission: 0, total: 0 };
    
    const totalPenalties = monthPenalties.reduce((sum, p) => sum + p.amount, 0);
    const totalBonuses = monthBonuses.reduce((sum, b) => sum + b.amount, 0);
    const totalSales = monthAchievements.reduce((sum, a) => sum + a.amount, 0);
    const commission = (totalSales * manager.sales_percentage) / 100;
    const total = manager.base_salary + commission + totalBonuses - totalPenalties;
    
    return {
      baseSalary: manager.base_salary,
      penalties: totalPenalties,
      bonuses: totalBonuses,
      commission,
      total
    };
  };

  const adminProfile = managers.find(m => m.role === 'admin');
  const currentMonth = new Date().toISOString().slice(0, 7);

  if (loading && managers.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange mx-auto mb-4"></div>
          <p>Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-orange rounded-full flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-brand-darkBlue">
                  Административная панель
                </h1>
                <p className="text-gray-600">Управление менеджерами и настройками</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {adminProfile && (
                <Dialog open={isTotalPlanDialogOpen} onOpenChange={setIsTotalPlanDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="text-brand-purple border-brand-purple/30">
                      <Target className="w-4 h-4 mr-2" />
                      Общий план: {formatNumber(adminProfile.total_sales_plan || 0)} ₸
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Установить общий план продаж</DialogTitle>
                      <DialogDescription>
                        Установите общий план продаж на месяц для всей команды
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleUpdateTotalPlan} className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Общий план продаж (₸)</label>
                        <Input
                          type="number"
                          value={totalPlanForm.total_sales_plan}
                          onChange={(e) => setTotalPlanForm({total_sales_plan: e.target.value})}
                          placeholder="4000000"
                          required
                          min="0"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button type="submit" className="flex-1 bg-brand-orange hover:bg-brand-orange/90" disabled={loading}>
                          {loading ? 'Сохранение...' : 'Сохранить'}
                        </Button>
                        <Button type="button" variant="outline" onClick={() => setIsTotalPlanDialogOpen(false)}>
                          Отмена
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              )}
              <Button
                onClick={handleLogout}
                variant="outline"
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Выйти
              </Button>
            </div>
          </div>
        </div>

        {/* Alerts */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <AlertDescription className="text-green-700">{success}</AlertDescription>
          </Alert>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="managers">Менеджеры</TabsTrigger>
            <TabsTrigger value="penalties">Штрафы</TabsTrigger>
            <TabsTrigger value="bonuses">Бонусы</TabsTrigger>
            <TabsTrigger value="sales-plans">Планы продаж</TabsTrigger>
            <TabsTrigger value="progress">Прогресс</TabsTrigger>
          </TabsList>

          {/* Managers Tab */}
          <TabsContent value="managers">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Список менеджеров
                    </CardTitle>
                    <CardDescription>
                      Управление профилями и настройками менеджеров
                    </CardDescription>
                  </div>
                  
                  {/* Add Manager Dialog */}
                  <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-brand-orange hover:bg-brand-orange/90">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Добавить менеджера
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl">
                      {/* Glassmorphism overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/60 to-white/40 backdrop-blur-xl rounded-lg -z-10"></div>
                      
                      <DialogHeader className="relative z-10">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-gradient-to-br from-brand-orange to-brand-orange/80 rounded-full flex items-center justify-center shadow-lg">
                            <UserPlus className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <DialogTitle className="text-xl font-bold text-brand-darkBlue">
                              Добавить нового менеджера
                            </DialogTitle>
                            <DialogDescription className="text-gray-600">
                              Создайте учетную запись для нового сотрудника
                            </DialogDescription>
                          </div>
                        </div>
                      </DialogHeader>
                      
                      <form onSubmit={handleAddManager} className="space-y-6 relative z-10">
                        {/* Username Field */}
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-sm font-semibold text-brand-darkBlue">
                            <User className="w-4 h-4 text-brand-orange" />
                            Логин пользователя
                          </label>
                          <Input
                            value={newManager.username}
                            onChange={(e) => setNewManager({...newManager, username: e.target.value})}
                            placeholder="manager1, sales_user, admin_user"
                            required
                            pattern="[a-zA-Z0-9_]+"
                            title="Только буквы, цифры и символ подчеркивания"
                            className="h-12 bg-white/80 border-white/30 backdrop-blur-sm focus:bg-white/90 focus:border-brand-orange/50 transition-all"
                          />
                          <p className="text-xs text-gray-500 bg-gray-50/80 p-2 rounded-md">
                            💡 Используйте только латинские буквы, цифры и символ подчеркивания
                          </p>
                        </div>
                        
                        {/* Password Field */}
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-sm font-semibold text-brand-darkBlue">
                            <Lock className="w-4 h-4 text-brand-orange" />
                            Пароль
                          </label>
                          <div className="relative">
                            <Input
                              type={showPassword ? 'text' : 'password'}
                              value={newManager.password}
                              onChange={(e) => setNewManager({...newManager, password: e.target.value})}
                              placeholder="Минимум 6 символов"
                              required
                              minLength={6}
                              className="h-12 bg-white/80 border-white/30 backdrop-blur-sm focus:bg-white/90 focus:border-brand-orange/50 transition-all pr-12"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-brand-orange transition-colors"
                            >
                              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                        </div>
                        
                        {/* Salary Fields Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Base Salary */}
                          <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-brand-darkBlue">
                              <DollarSign className="w-4 h-4 text-brand-orange" />
                              Базовая зарплата
                            </label>
                            <Input
                              type="number"
                              value={newManager.base_salary}
                              onChange={(e) => setNewManager({...newManager, base_salary: e.target.value})}
                              placeholder="250000"
                              min="0"
                              className="h-12 bg-white/80 border-white/30 backdrop-blur-sm focus:bg-white/90 focus:border-brand-orange/50 transition-all"
                            />
                            <p className="text-xs text-gray-500">₸ в месяц</p>
                          </div>
                          
                          {/* Sales Percentage */}
                          <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-brand-darkBlue">
                              <Percent className="w-4 h-4 text-brand-orange" />
                              Процент от продаж
                            </label>
                            <Input
                              type="number"
                              value={newManager.sales_percentage}
                              onChange={(e) => setNewManager({...newManager, sales_percentage: e.target.value})}
                              placeholder="5"
                              min="0"
                              max="100"
                              step="0.1"
                              className="h-12 bg-white/80 border-white/30 backdrop-blur-sm focus:bg-white/90 focus:border-brand-orange/50 transition-all"
                            />
                            <p className="text-xs text-gray-500">% от продаж</p>
                          </div>
                        </div>
                        
                        {/* KPI Target */}
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-sm font-semibold text-brand-darkBlue">
                            <Target className="w-4 h-4 text-brand-orange" />
                            KPI цель
                          </label>
                          <Input
                            type="number"
                            value={newManager.kpi_target}
                            onChange={(e) => setNewManager({...newManager, kpi_target: e.target.value})}
                            placeholder="500000"
                            min="0"
                            className="h-12 bg-white/80 border-white/30 backdrop-blur-sm focus:bg-white/90 focus:border-brand-orange/50 transition-all"
                          />
                          <p className="text-xs text-gray-500">₸ цель продаж в месяц</p>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-4 border-t border-white/30">
                          <Button 
                            type="submit" 
                            className="flex-1 h-12 bg-gradient-to-r from-brand-orange to-brand-orange/90 hover:from-brand-orange/90 hover:to-brand-orange text-white font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02]" 
                            disabled={loading}
                          >
                            {loading ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Создание...
                              </>
                            ) : (
                              <>
                                <UserPlus className="w-4 h-4 mr-2" />
                                Создать менеджера
                              </>
                            )}
                          </Button>
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setIsAddDialogOpen(false)}
                            className="h-12 bg-white/80 border-white/30 hover:bg-white/90 backdrop-blur-sm transition-all"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Отмена
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                {managers.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>Менеджеры не найдены</p>
                    <p className="text-sm">Добавьте первого менеджера</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Логин</TableHead>
                          <TableHead>Роль</TableHead>
                          <TableHead>Зарплата за месяц</TableHead>
                          <TableHead>Процент</TableHead>
                          <TableHead>KPI цель</TableHead>
                          <TableHead>Дата создания</TableHead>
                          <TableHead>Действия</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {managers.map((manager) => {
                          const salaryData = getCurrentMonthSalaryData(manager.id);
                          return (
                            <TableRow key={manager.id}>
                              <TableCell className="font-medium">{manager.username}</TableCell>
                              <TableCell>
                                <Badge variant={manager.role === 'admin' ? 'default' : 'secondary'}>
                                  {manager.role === 'admin' ? 'Администратор' : 'Менеджер'}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {manager.role === 'manager' ? (
                                  <div className="space-y-1">
                                    <div className="text-sm">
                                      <span className="text-gray-600">Оклад:</span> {formatNumber(salaryData.baseSalary)} ₸
                                    </div>
                                    {salaryData.commission > 0 && (
                                      <div className="text-sm text-green-600">
                                        <span>Комиссия:</span> +{formatNumber(salaryData.commission)} ₸
                                      </div>
                                    )}
                                    {salaryData.bonuses > 0 && (
                                      <div className="text-sm text-blue-600">
                                        <span>Бонусы:</span> +{formatNumber(salaryData.bonuses)} ₸
                                      </div>
                                    )}
                                    {salaryData.penalties > 0 && (
                                      <div className="text-sm text-red-600">
                                        <span>Штрафы:</span> -{formatNumber(salaryData.penalties)} ₸
                                      </div>
                                    )}
                                    <div className="text-sm font-semibold border-t pt-1">
                                      <span>Итого:</span> {formatNumber(salaryData.total)} ₸
                                    </div>
                                  </div>
                                ) : (
                                  <span className="text-gray-500">—</span>
                                )}
                              </TableCell>
                              <TableCell>
                                {editingManager?.id === manager.id ? (
                                  <Input
                                    type="number"
                                    value={editingManager.sales_percentage}
                                    onChange={(e) => setEditingManager({
                                      ...editingManager,
                                      sales_percentage: parseFloat(e.target.value) || 0
                                    })}
                                    className="w-20"
                                    step="0.1"
                                  />
                                ) : (
                                  `${manager.sales_percentage}%`
                                )}
                              </TableCell>
                              <TableCell>
                                {editingManager?.id === manager.id ? (
                                  <Input
                                    type="number"
                                    value={editingManager.kpi_target}
                                    onChange={(e) => setEditingManager({
                                      ...editingManager,
                                      kpi_target: parseFloat(e.target.value) || 0
                                    })}
                                    className="w-28"
                                  />
                                ) : (
                                  `${formatNumber(manager.kpi_target || 0)} ₸`
                                )}
                              </TableCell>
                              <TableCell>
                                {new Date(manager.created_at).toLocaleDateString('ru-RU')}
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  {editingManager?.id === manager.id ? (
                                    <>
                                      <Button
                                        size="sm"
                                        onClick={() => handleUpdateManager(editingManager)}
                                        className="bg-green-600 hover:bg-green-700"
                                      >
                                        <Save className="w-4 h-4" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => setEditingManager(null)}
                                      >
                                        <X className="w-4 h-4" />
                                      </Button>
                                    </>
                                  ) : (
                                    <>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => setEditingManager(manager)}
                                        disabled={manager.role === 'admin'}
                                      >
                                        <Edit className="w-4 h-4" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleDeleteManager(manager.id, manager.username)}
                                        disabled={manager.role === 'admin'}
                                        className="text-red-600 hover:text-red-700"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    </>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Penalties Tab */}
          <TabsContent value="penalties">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      Штрафы
                    </CardTitle>
                    <CardDescription>
                      Управление штрафными санкциями для менеджеров
                    </CardDescription>
                  </div>
                  
                  <Dialog open={isPenaltyDialogOpen} onOpenChange={setIsPenaltyDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-red-600 hover:bg-red-700 text-white">
                        <Minus className="w-4 h-4 mr-2" />
                        Добавить штраф
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Добавить штраф</DialogTitle>
                        <DialogDescription>
                          Наложите штрафную санкцию на менеджера
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleAddPenalty} className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700">Менеджер</label>
                          <select
                            value={penaltyForm.manager_id}
                            onChange={(e) => setPenaltyForm({...penaltyForm, manager_id: e.target.value})}
                            className="w-full p-2 border rounded-md"
                            required
                          >
                            <option value="">Выберите менеджера</option>
                            {managers.filter(m => m.role === 'manager').map(manager => (
                              <option key={manager.id} value={manager.id}>
                                {manager.username}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">Сумма штрафа (₸)</label>
                          <Input
                            type="number"
                            value={penaltyForm.amount}
                            onChange={(e) => setPenaltyForm({...penaltyForm, amount: e.target.value})}
                            placeholder="5000"
                            required
                            min="0"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">Причина штрафа</label>
                          <Textarea
                            value={penaltyForm.reason}
                            onChange={(e) => setPenaltyForm({...penaltyForm, reason: e.target.value})}
                            placeholder="Опоздание на работу"
                            required
                            rows={3}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button type="submit" className="flex-1 bg-red-600 hover:bg-red-700" disabled={loading}>
                            {loading ? 'Добавление...' : 'Добавить штраф'}
                          </Button>
                          <Button type="button" variant="outline" onClick={() => setIsPenaltyDialogOpen(false)}>
                            Отмена
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Менеджер</TableHead>
                        <TableHead>Сумма</TableHead>
                        <TableHead>Причина</TableHead>
                        <TableHead>Дата</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {penalties.map((penalty) => (
                        <TableRow key={penalty.id}>
                          <TableCell>{getManagerName(penalty.manager_id)}</TableCell>
                          <TableCell className="text-red-600 font-semibold">
                            -{formatNumber(penalty.amount)} ₸
                          </TableCell>
                          <TableCell>{penalty.reason}</TableCell>
                          <TableCell>{formatDate(penalty.created_at)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bonuses Tab */}
          <TabsContent value="bonuses">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Gift className="w-5 h-5 text-green-600" />
                      Бонусы
                    </CardTitle>
                    <CardDescription>
                      Управление бонусными выплатами для менеджеров
                    </CardDescription>
                  </div>
                  
                  <Dialog open={isBonusDialogOpen} onOpenChange={setIsBonusDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-green-600 hover:bg-green-700 text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Добавить бонус
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Добавить бонус</DialogTitle>
                        <DialogDescription>
                          Начислите бонусную выплату менеджеру
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleAddBonus} className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700">Менеджер</label>
                          <select
                            value={bonusForm.manager_id}
                            onChange={(e) => setBonusForm({...bonusForm, manager_id: e.target.value})}
                            className="w-full p-2 border rounded-md"
                            required
                          >
                            <option value="">Выберите менеджера</option>
                            {managers.filter(m => m.role === 'manager').map(manager => (
                              <option key={manager.id} value={manager.id}>
                                {manager.username}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">Сумма бонуса (₸)</label>
                          <Input
                            type="number"
                            value={bonusForm.amount}
                            onChange={(e) => setBonusForm({...bonusForm, amount: e.target.value})}
                            placeholder="10000"
                            required
                            min="0"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">Причина бонуса</label>
                          <Textarea
                            value={bonusForm.reason}
                            onChange={(e) => setBonusForm({...bonusForm, reason: e.target.value})}
                            placeholder="Превышение плана продаж"
                            required
                            rows={3}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700" disabled={loading}>
                            {loading ? 'Добавление...' : 'Добавить бонус'}
                          </Button>
                          <Button type="button" variant="outline" onClick={() => setIsBonusDialogOpen(false)}>
                            Отмена
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Менеджер</TableHead>
                        <TableHead>Сумма</TableHead>
                        <TableHead>Причина</TableHead>
                        <TableHead>Дата</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bonuses.map((bonus) => (
                        <TableRow key={bonus.id}>
                          <TableCell>{getManagerName(bonus.manager_id)}</TableCell>
                          <TableCell className="text-green-600 font-semibold">
                            +{formatNumber(bonus.amount)} ₸
                          </TableCell>
                          <TableCell>{bonus.reason}</TableCell>
                          <TableCell>{formatDate(bonus.created_at)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sales Plans Tab */}
          <TabsContent value="sales-plans">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-brand-purple" />
                      Планы продаж
                    </CardTitle>
                    <CardDescription>
                      Установка планов продаж для менеджеров
                    </CardDescription>
                  </div>
                  
                  <div className="flex gap-2">
                    <Dialog open={isSalesPlanDialogOpen} onOpenChange={setIsSalesPlanDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-brand-purple hover:bg-brand-purple/90 text-white">
                          <Target className="w-4 h-4 mr-2" />
                          Установить план
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Установить план продаж</DialogTitle>
                          <DialogDescription>
                            Установите план продаж для менеджера на месяц
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleAddSalesPlan} className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-gray-700">Менеджер</label>
                            <select
                              value={salesPlanForm.manager_id}
                              onChange={(e) => setSalesPlanForm({...salesPlanForm, manager_id: e.target.value})}
                              className="w-full p-2 border rounded-md"
                              required
                            >
                              <option value="">Выберите менеджера</option>
                              {managers.filter(m => m.role === 'manager').map(manager => (
                                <option key={manager.id} value={manager.id}>
                                  {manager.username}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">План продаж (₸)</label>
                            <Input
                              type="number"
                              value={salesPlanForm.target_amount}
                              onChange={(e) => setSalesPlanForm({...salesPlanForm, target_amount: e.target.value})}
                              placeholder="500000"
                              required
                              min="0"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">Месяц</label>
                            <Input
                              type="month"
                              value={salesPlanForm.month_year}
                              onChange={(e) => setSalesPlanForm({...salesPlanForm, month_year: e.target.value})}
                              required
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button type="submit" className="flex-1 bg-brand-purple hover:bg-brand-purple/90" disabled={loading}>
                              {loading ? 'Установка...' : 'Установить план'}
                            </Button>
                            <Button type="button" variant="outline" onClick={() => setIsSalesPlanDialogOpen(false)}>
                              Отмена
                            </Button>
                          </div>
                        </form>
                      </DialogContent>
                    </Dialog>

                    <Dialog open={isSalesAchievementDialogOpen} onOpenChange={setIsSalesAchievementDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white">
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Добавить продажу
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Добавить продажу</DialogTitle>
                          <DialogDescription>
                            Зафиксируйте продажу менеджера для расчета прогресса
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleAddSalesAchievement} className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-gray-700">Менеджер</label>
                            <select
                              value={salesAchievementForm.manager_id}
                              onChange={(e) => setSalesAchievementForm({...salesAchievementForm, manager_id: e.target.value})}
                              className="w-full p-2 border rounded-md"
                              required
                            >
                              <option value="">Выберите менеджера</option>
                              {managers.filter(m => m.role === 'manager').map(manager => (
                                <option key={manager.id} value={manager.id}>
                                  {manager.username}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">Сумма продажи (₸)</label>
                            <Input
                              type="number"
                              value={salesAchievementForm.amount}
                              onChange={(e) => setSalesAchievementForm({...salesAchievementForm, amount: e.target.value})}
                              placeholder="50000"
                              required
                              min="0"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">Месяц</label>
                            <Input
                              type="month"
                              value={salesAchievementForm.month_year}
                              onChange={(e) => setSalesAchievementForm({...salesAchievementForm, month_year: e.target.value})}
                              required
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button type="submit" className="flex-1 bg-brand-orange hover:bg-brand-orange/90" disabled={loading}>
                              {loading ? 'Добавление...' : 'Добавить продажу'}
                            </Button>
                            <Button type="button" variant="outline" onClick={() => setIsSalesAchievementDialogOpen(false)}>
                              Отмена
                            </Button>
                          </div>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Sales Plans */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Планы продаж</h3>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Менеджер</TableHead>
                            <TableHead>План</TableHead>
                            <TableHead>Месяц</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {salesPlans.map((plan) => (
                            <TableRow key={plan.id}>
                              <TableCell>{getManagerName(plan.manager_id)}</TableCell>
                              <TableCell className="font-semibold text-brand-purple">
                                {formatNumber(plan.target_amount)} ₸
                              </TableCell>
                              <TableCell>{plan.month_year}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>

                  {/* Sales Achievements */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Достижения продаж</h3>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Менеджер</TableHead>
                            <TableHead>Продажа</TableHead>
                            <TableHead>Месяц</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {salesAchievements.map((achievement) => (
                            <TableRow key={achievement.id}>
                              <TableCell>{getManagerName(achievement.manager_id)}</TableCell>
                              <TableCell className="font-semibold text-brand-orange">
                                {formatNumber(achievement.amount)} ₸
                              </TableCell>
                              <TableCell>{achievement.month_year}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-brand-orange" />
                  Прогресс выполнения планов
                </CardTitle>
                <CardDescription>
                  Отслеживание прогресса выполнения планов продаж
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Overall Progress */}
                  {adminProfile && adminProfile.total_sales_plan > 0 && (
                    <div className="p-6 bg-gradient-to-r from-brand-orange/10 to-brand-purple/10 rounded-lg border">
                      <h3 className="text-lg font-semibold mb-4">Общий прогресс команды</h3>
                      <div className="space-y-2">
                        {(() => {
                          const totalPlan = adminProfile.total_sales_plan;
                          const totalAchieved = salesAchievements
                            .filter(a => a.month_year === currentMonth)
                            .reduce((sum, a) => sum + a.amount, 0);
                          const overallProgress = totalPlan > 0 ? (totalAchieved / totalPlan) * 100 : 0;
                          
                          return (
                            <>
                              <div className="flex justify-between text-sm">
                                <span>Общий план: {formatNumber(totalPlan)} ₸</span>
                                <span>Выполнено: {formatNumber(totalAchieved)} ₸</span>
                              </div>
                              <Progress 
                                value={Math.min(overallProgress, 100)} 
                                className="h-3"
                                style={{
                                  background: 'linear-gradient(to right, #FE9C2D, #A678FF)'
                                }}
                              />
                              <div className="text-center text-sm font-semibold">
                                {overallProgress.toFixed(1)}% выполнено
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  )}

                  {/* Individual Progress */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {managers
                      .filter(m => m.role === 'manager')
                      .map(manager => {
                        const progress = getSalesProgress(manager.id, currentMonth);
                        return (
                          <div key={manager.id} className="p-4 border rounded-lg bg-white shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold">{manager.username}</h4>
                              <Badge variant="outline">
                                {progress.progress.toFixed(1)}%
                              </Badge>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm text-gray-600">
                                <span>План:</span>
                                <span>{formatNumber(progress.target)} ₸</span>
                              </div>
                              <div className="flex justify-between text-sm text-gray-600">
                                <span>Выполнено:</span>
                                <span className="text-brand-orange font-semibold">
                                  {formatNumber(progress.achieved)} ₸
                                </span>
                              </div>
                              
                              <Progress 
                                value={Math.min(progress.progress, 100)} 
                                className="h-2"
                              />
                              
                              {progress.progress >= 100 && (
                                <div className="text-center text-sm text-green-600 font-semibold">
                                  🎉 План выполнен!
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;