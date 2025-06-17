import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, getCurrentUser, isAdmin, createUserWithUsername } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
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
  Percent
} from 'lucide-react';

interface ManagerProfile {
  id: string;
  user_id: string;
  username: string;
  base_salary: number;
  sales_percentage: number;
  kpi_target: number;
  role: string;
  created_at: string;
}

const AdminPanel = () => {
  const [managers, setManagers] = useState<ManagerProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingManager, setEditingManager] = useState<ManagerProfile | null>(null);
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

      loadManagers();
    } catch (err) {
      console.error('Error checking admin access:', err);
      navigate('/admin-login');
    }
  };

  const loadManagers = async () => {
    try {
      const { data, error } = await supabase
        .from('manager_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        setError('Ошибка загрузки списка менеджеров');
        return;
      }

      setManagers(data || []);
    } catch (err) {
      setError('Произошла ошибка при загрузке данных');
    } finally {
      setLoading(false);
    }
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
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <AlertDescription className="text-green-700">{success}</AlertDescription>
          </Alert>
        )}

        {/* Add Manager Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mb-6 bg-brand-orange hover:bg-brand-orange/90">
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
                      <TableHead>KPI цель</TableHead>
                      <TableHead>Дата создания</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {managers.map((manager) => (
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
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPanel;