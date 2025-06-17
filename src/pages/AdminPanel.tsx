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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  DollarSign,
  AlertTriangle,
  Gift,
  Target,
  TrendingUp,
  Plus
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

const AdminPanel = () => {
  const [managers, setManagers] = useState<ManagerProfile[]>([]);
  const [penalties, setPenalties] = useState<Penalty[]>([]);
  const [bonuses, setBonuses] = useState<Bonus[]>([]);
  const [salesPlans, setSalesPlans] = useState<SalesPlan[]>([]);
  const [salesAchievements, setSalesAchievements] = useState<SalesAchievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [adminProfileId, setAdminProfileId] = useState<string>('');
  
  // Dialog states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isPenaltyDialogOpen, setIsPenaltyDialogOpen] = useState(false);
  const [isBonusDialogOpen, setIsBonusDialogOpen] = useState(false);
  const [isSalesPlanDialogOpen, setIsSalesPlanDialogOpen] = useState(false);
  const [isSalesAchievementDialogOpen, setIsSalesAchievementDialogOpen] = useState(false);
  const [editingManager, setEditingManager] = useState<ManagerProfile | null>(null);

  const navigate = useNavigate();
  const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM

  // Form states for adding new manager
  const [newManager, setNewManager] = useState({
    username: '',
    password: '',
    base_salary: '',
    sales_percentage: '',
    kpi_target: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  // Form states for penalties
  const [newPenalty, setNewPenalty] = useState({
    manager_id: '',
    amount: '',
    reason: ''
  });

  // Form states for bonuses
  const [newBonus, setNewBonus] = useState({
    manager_id: '',
    amount: '',
    reason: ''
  });

  // Form states for sales plans
  const [newSalesPlan, setNewSalesPlan] = useState({
    manager_id: '',
    target_amount: '',
    month_year: currentMonth
  });

  // Form states for sales achievements
  const [newSalesAchievement, setNewSalesAchievement] = useState({
    manager_id: '',
    amount: '',
    month_year: currentMonth
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

      // Get admin profile ID
      const { data: adminProfile } = await supabase
        .from('manager_profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (adminProfile) {
        setAdminProfileId(adminProfile.id);
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
    // Calculate the first day of next month for the date range
    const currentDate = new Date(currentMonth + '-01');
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    const nextMonthString = nextMonth.toISOString().slice(0, 10); // YYYY-MM-DD

    const { data } = await supabase
      .from('penalties')
      .select('*')
      .gte('created_at', `${currentMonth}-01`)
      .lt('created_at', nextMonthString)
      .order('created_at', { ascending: false });

    setPenalties(data || []);
  };

  const loadBonuses = async () => {
    // Calculate the first day of next month for the date range
    const currentDate = new Date(currentMonth + '-01');
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    const nextMonthString = nextMonth.toISOString().slice(0, 10); // YYYY-MM-DD

    const { data } = await supabase
      .from('bonuses')
      .select('*')
      .gte('created_at', `${currentMonth}-01`)
      .lt('created_at', nextMonthString)
      .order('created_at', { ascending: false });

    setBonuses(data || []);
  };

  const loadSalesPlans = async () => {
    const { data } = await supabase
      .from('sales_plans')
      .select('*')
      .eq('month_year', currentMonth)
      .order('created_at', { ascending: false });

    setSalesPlans(data || []);
  };

  const loadSalesAchievements = async () => {
    const { data } = await supabase
      .from('sales_achievements')
      .select('*')
      .eq('month_year', currentMonth)
      .order('created_at', { ascending: false });

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
      const { error } = await supabase
        .from('penalties')
        .insert({
          manager_id: newPenalty.manager_id,
          amount: parseFloat(newPenalty.amount),
          reason: newPenalty.reason,
          created_by: adminProfileId
        });

      if (error) {
        setError('Ошибка добавления штрафа');
        return;
      }

      setSuccess('Штраф успешно добавлен');
      setNewPenalty({ manager_id: '', amount: '', reason: '' });
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
      const { error } = await supabase
        .from('bonuses')
        .insert({
          manager_id: newBonus.manager_id,
          amount: parseFloat(newBonus.amount),
          reason: newBonus.reason,
          created_by: adminProfileId
        });

      if (error) {
        setError('Ошибка добавления бонуса');
        return;
      }

      setSuccess('Бонус успешно добавлен');
      setNewBonus({ manager_id: '', amount: '', reason: '' });
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
      // Check if plan already exists for this manager and month
      const { data: existingPlan } = await supabase
        .from('sales_plans')
        .select('id')
        .eq('manager_id', newSalesPlan.manager_id)
        .eq('month_year', newSalesPlan.month_year);

      if (existingPlan && existingPlan.length > 0) {
        setError('План продаж для этого менеджера на указанный месяц уже существует');
        return;
      }

      const { error } = await supabase
        .from('sales_plans')
        .insert({
          manager_id: newSalesPlan.manager_id,
          target_amount: parseFloat(newSalesPlan.target_amount),
          month_year: newSalesPlan.month_year,
          created_by: adminProfileId
        });

      if (error) {
        setError('Ошибка добавления плана продаж');
        return;
      }

      setSuccess('План продаж успешно добавлен');
      setNewSalesPlan({ manager_id: '', target_amount: '', month_year: currentMonth });
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
      const { error } = await supabase
        .from('sales_achievements')
        .insert({
          manager_id: newSalesAchievement.manager_id,
          amount: parseFloat(newSalesAchievement.amount),
          month_year: newSalesAchievement.month_year,
          created_by: adminProfileId
        });

      if (error) {
        setError('Ошибка добавления достижения продаж');
        return;
      }

      setSuccess('Достижение продаж успешно добавлено');
      setNewSalesAchievement({ manager_id: '', amount: '', month_year: currentMonth });
      setIsSalesAchievementDialogOpen(false);
      loadSalesAchievements();
    } catch (err) {
      setError('Произошла ошибка при добавлении достижения продаж');
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
          kpi_target: manager.kpi_target,
          total_sales_plan: manager.total_sales_plan
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
    return manager ? manager.username : 'Неизвестно';
  };

  const getSalesProgress = (managerId: string) => {
    const plan = salesPlans.find(p => p.manager_id === managerId);
    const achievements = salesAchievements.filter(a => a.manager_id === managerId);
    const totalAchieved = achievements.reduce((sum, a) => sum + a.amount, 0);
    
    if (!plan || plan.target_amount === 0) {
      return { progress: 0, achieved: totalAchieved, target: 0 };
    }
    
    const progress = Math.min((totalAchieved / plan.target_amount) * 100, 100);
    return { progress, achieved: totalAchieved, target: plan.target_amount };
  };

  const calculateSalary = (managerId: string) => {
    const manager = managers.find(m => m.id === managerId);
    if (!manager) return { base: 0, commission: 0, bonuses: 0, penalties: 0, total: 0 };

    const managerPenalties = penalties.filter(p => p.manager_id === managerId);
    const managerBonuses = bonuses.filter(b => b.manager_id === managerId);
    const achievements = salesAchievements.filter(a => a.manager_id === managerId);
    
    const totalSales = achievements.reduce((sum, a) => sum + a.amount, 0);
    const commission = (totalSales * manager.sales_percentage) / 100;
    const totalBonuses = managerBonuses.reduce((sum, b) => sum + b.amount, 0);
    const totalPenalties = managerPenalties.reduce((sum, p) => sum + p.amount, 0);
    const total = manager.base_salary + commission + totalBonuses - totalPenalties;

    return {
      base: manager.base_salary,
      commission,
      bonuses: totalBonuses,
      penalties: totalPenalties,
      total
    };
  };

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
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
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

        {/* Alerts */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {success && (
          <Alert className="border-green-200 bg-green-50">
            <AlertDescription className="text-green-700">{success}</AlertDescription>
          </Alert>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-brand-orange hover:bg-brand-orange/90">
                <UserPlus className="w-4 h-4 mr-2" />
                Добавить менеджера
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Добавить нового менеджера</DialogTitle>
                <DialogDescription>
                  Создайте логин и пароль для нового менеджера
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddManager} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Логин</label>
                  <Input
                    value={newManager.username}
                    onChange={(e) => setNewManager({...newManager, username: e.target.value})}
                    placeholder="Только буквы, цифры и _"
                    required
                    pattern="[a-zA-Z0-9_]+"
                    title="Только буквы, цифры и символ подчеркивания"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Пароль</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={newManager.password}
                      onChange={(e) => setNewManager({...newManager, password: e.target.value})}
                      placeholder="Минимум 6 символов"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Базовая зарплата (₸)</label>
                  <Input
                    type="number"
                    value={newManager.base_salary}
                    onChange={(e) => setNewManager({...newManager, base_salary: e.target.value})}
                    placeholder="250000"
                    min="0"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Процент от продаж (%)</label>
                  <Input
                    type="number"
                    value={newManager.sales_percentage}
                    onChange={(e) => setNewManager({...newManager, sales_percentage: e.target.value})}
                    placeholder="5"
                    min="0"
                    max="100"
                    step="0.1"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">KPI цель (₸)</label>
                  <Input
                    type="number"
                    value={newManager.kpi_target}
                    onChange={(e) => setNewManager({...newManager, kpi_target: e.target.value})}
                    placeholder="500000"
                    min="0"
                  />
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1 bg-brand-orange hover:bg-brand-orange/90" disabled={loading}>
                    {loading ? 'Создание...' : 'Создать'}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Отмена
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={isPenaltyDialogOpen} onOpenChange={setIsPenaltyDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Добавить штраф
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Добавить штраф</DialogTitle>
                <DialogDescription>
                  Назначьте штраф менеджеру
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddPenalty} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Менеджер</label>
                  <Select value={newPenalty.manager_id} onValueChange={(value) => setNewPenalty({...newPenalty, manager_id: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите менеджера" />
                    </SelectTrigger>
                    <SelectContent>
                      {managers.filter(m => m.role === 'manager').map((manager) => (
                        <SelectItem key={manager.id} value={manager.id}>
                          {manager.username}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Сумма штрафа (₸)</label>
                  <Input
                    type="number"
                    value={newPenalty.amount}
                    onChange={(e) => setNewPenalty({...newPenalty, amount: e.target.value})}
                    placeholder="5000"
                    min="0"
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Причина</label>
                  <Textarea
                    value={newPenalty.reason}
                    onChange={(e) => setNewPenalty({...newPenalty, reason: e.target.value})}
                    placeholder="Опишите причину штрафа"
                    required
                  />
                </div>
                
                <div className="flex gap-2 pt-4">
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

          <Dialog open={isBonusDialogOpen} onOpenChange={setIsBonusDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="text-green-600 border-green-200 hover:bg-green-50">
                <Gift className="w-4 h-4 mr-2" />
                Добавить бонус
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Добавить бонус</DialogTitle>
                <DialogDescription>
                  Назначьте бонус менеджеру
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddBonus} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Менеджер</label>
                  <Select value={newBonus.manager_id} onValueChange={(value) => setNewBonus({...newBonus, manager_id: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите менеджера" />
                    </SelectTrigger>
                    <SelectContent>
                      {managers.filter(m => m.role === 'manager').map((manager) => (
                        <SelectItem key={manager.id} value={manager.id}>
                          {manager.username}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Сумма бонуса (₸)</label>
                  <Input
                    type="number"
                    value={newBonus.amount}
                    onChange={(e) => setNewBonus({...newBonus, amount: e.target.value})}
                    placeholder="10000"
                    min="0"
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Причина</label>
                  <Textarea
                    value={newBonus.reason}
                    onChange={(e) => setNewBonus({...newBonus, reason: e.target.value})}
                    placeholder="Опишите причину бонуса"
                    required
                  />
                </div>
                
                <div className="flex gap-2 pt-4">
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

          <Dialog open={isSalesPlanDialogOpen} onOpenChange={setIsSalesPlanDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                <Target className="w-4 h-4 mr-2" />
                План продаж
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Установить план продаж</DialogTitle>
                <DialogDescription>
                  Установите цель продаж для менеджера
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddSalesPlan} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Менеджер</label>
                  <Select value={newSalesPlan.manager_id} onValueChange={(value) => setNewSalesPlan({...newSalesPlan, manager_id: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите менеджера" />
                    </SelectTrigger>
                    <SelectContent>
                      {managers.filter(m => m.role === 'manager').map((manager) => (
                        <SelectItem key={manager.id} value={manager.id}>
                          {manager.username}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Целевая сумма (₸)</label>
                  <Input
                    type="number"
                    value={newSalesPlan.target_amount}
                    onChange={(e) => setNewSalesPlan({...newSalesPlan, target_amount: e.target.value})}
                    placeholder="500000"
                    min="0"
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Месяц</label>
                  <Input
                    type="month"
                    value={newSalesPlan.month_year}
                    onChange={(e) => setNewSalesPlan({...newSalesPlan, month_year: e.target.value})}
                    required
                  />
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700" disabled={loading}>
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
              <Button variant="outline" className="text-purple-600 border-purple-200 hover:bg-purple-50">
                <TrendingUp className="w-4 h-4 mr-2" />
                Добавить продажу
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Добавить достижение продаж</DialogTitle>
                <DialogDescription>
                  Зафиксируйте продажу менеджера
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddSalesAchievement} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Менеджер</label>
                  <Select value={newSalesAchievement.manager_id} onValueChange={(value) => setNewSalesAchievement({...newSalesAchievement, manager_id: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите менеджера" />
                    </SelectTrigger>
                    <SelectContent>
                      {managers.filter(m => m.role === 'manager').map((manager) => (
                        <SelectItem key={manager.id} value={manager.id}>
                          {manager.username}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Сумма продажи (₸)</label>
                  <Input
                    type="number"
                    value={newSalesAchievement.amount}
                    onChange={(e) => setNewSalesAchievement({...newSalesAchievement, amount: e.target.value})}
                    placeholder="50000"
                    min="0"
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Месяц</label>
                  <Input
                    type="month"
                    value={newSalesAchievement.month_year}
                    onChange={(e) => setNewSalesAchievement({...newSalesAchievement, month_year: e.target.value})}
                    required
                  />
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700" disabled={loading}>
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

        {/* Managers Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Список менеджеров
            </CardTitle>
            <CardDescription>
              Управление профилями и настройками менеджеров
            </CardDescription>
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
                      <TableHead>Базовая зарплата</TableHead>
                      <TableHead>Процент</TableHead>
                      <TableHead>План продаж</TableHead>
                      <TableHead>Прогресс</TableHead>
                      <TableHead>Итоговая ЗП</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {managers.map((manager) => {
                      const salesProgress = getSalesProgress(manager.id);
                      const salary = calculateSalary(manager.id);
                      
                      return (
                        <TableRow key={manager.id}>
                          <TableCell className="font-medium">{manager.username}</TableCell>
                          <TableCell>
                            <Badge variant={manager.role === 'admin' ? 'default' : 'secondary'}>
                              {manager.role === 'admin' ? 'Администратор' : 'Менеджер'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {editingManager?.id === manager.id ? (
                              <Input
                                type="number"
                                value={editingManager.base_salary}
                                onChange={(e) => setEditingManager({
                                  ...editingManager,
                                  base_salary: parseFloat(e.target.value) || 0
                                })}
                                className="w-24"
                              />
                            ) : (
                              `${formatNumber(manager.base_salary)} ₸`
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
                            {manager.role === 'manager' ? (
                              salesProgress.target > 0 ? `${formatNumber(salesProgress.target)} ₸` : 'Не установлен'
                            ) : (
                              editingManager?.id === manager.id ? (
                                <Input
                                  type="number"
                                  value={editingManager.total_sales_plan}
                                  onChange={(e) => setEditingManager({
                                    ...editingManager,
                                    total_sales_plan: parseFloat(e.target.value) || 0
                                  })}
                                  className="w-28"
                                  placeholder="Общий план"
                                />
                              ) : (
                                manager.total_sales_plan > 0 ? `${formatNumber(manager.total_sales_plan)} ₸` : 'Не установлен'
                              )
                            )}
                          </TableCell>
                          <TableCell>
                            {manager.role === 'manager' && salesProgress.target > 0 ? (
                              <div className="space-y-1">
                                <Progress value={salesProgress.progress} className="w-20 h-2" />
                                <div className="text-xs text-center">
                                  {salesProgress.progress.toFixed(0)}%
                                </div>
                              </div>
                            ) : (
                              '-'
                            )}
                          </TableCell>
                          <TableCell>
                            {manager.role === 'manager' ? (
                              <div className="space-y-1">
                                <div className="font-semibold text-brand-orange">
                                  {formatNumber(salary.total)} ₸
                                </div>
                                {(salary.bonuses > 0 || salary.penalties > 0) && (
                                  <div className="text-xs text-gray-500">
                                    {salary.bonuses > 0 && <span className="text-green-600">+{formatNumber(salary.bonuses)}</span>}
                                    {salary.bonuses > 0 && salary.penalties > 0 && ' '}
                                    {salary.penalties > 0 && <span className="text-red-600">-{formatNumber(salary.penalties)}</span>}
                                  </div>
                                )}
                              </div>
                            ) : (
                              '-'
                            )}
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

        {/* Recent Activities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Penalties */}
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
                  {penalties.slice(0, 5).map((penalty) => (
                    <div key={penalty.id} className="p-3 bg-red-50 rounded-lg border border-red-200">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="font-semibold text-red-600">-{formatNumber(penalty.amount)} ₸</span>
                          <span className="text-sm text-gray-600 ml-2">{getManagerName(penalty.manager_id)}</span>
                        </div>
                        <span className="text-xs text-gray-500">{formatDate(penalty.created_at)}</span>
                      </div>
                      <p className="text-sm text-gray-700">{penalty.reason}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Bonuses */}
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
                  {bonuses.slice(0, 5).map((bonus) => (
                    <div key={bonus.id} className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="font-semibold text-green-600">+{formatNumber(bonus.amount)} ₸</span>
                          <span className="text-sm text-gray-600 ml-2">{getManagerName(bonus.manager_id)}</span>
                        </div>
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
      </div>
    </div>
  );
};

export default AdminPanel;