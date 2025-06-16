import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, getCurrentUser, isAdmin } from '@/lib/supabaseClient';
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
  X
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
      // Create user in Supabase Auth
      const email = `${newManager.username}@yourcompany.local`;
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password: newManager.password,
        options: {
          emailRedirectTo: undefined // Disable email confirmation
        }
      });

      if (authError) {
        setError('Ошибка создания пользователя: ' + authError.message);
        return;
      }

      if (!authData.user) {
        setError('Не удалось создать пользователя');
        return;
      }

      // Create manager profile
      const { error: profileError } = await supabase
        .from('manager_profiles')
        .insert({
          user_id: authData.user.id,
          username: newManager.username,
          base_salary: parseFloat(newManager.base_salary) || 0,
          sales_percentage: parseFloat(newManager.sales_percentage) || 0,
          kpi_target: parseFloat(newManager.kpi_target) || 0,
          role: 'manager'
        });

      if (profileError) {
        setError('Ошибка создания профиля менеджера: ' + profileError.message);
        return;
      }

      setSuccess('Менеджер успешно добавлен');
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

  const handleDeleteManager = async (managerId: string, userId: string) => {
    if (!confirm('Вы уверены, что хотите удалить этого менеджера?')) {
      return;
    }

    try {
      // Delete from manager_profiles first
      const { error: profileError } = await supabase
        .from('manager_profiles')
        .delete()
        .eq('id', managerId);

      if (profileError) {
        setError('Ошибка удаления профиля менеджера');
        return;
      }

      // Note: We can't delete from auth.users directly from client
      // This would need to be done via a server function or manually
      
      setSuccess('Менеджер удален');
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
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Добавить нового менеджера</DialogTitle>
              <DialogDescription>
                Заполните данные для создания нового менеджера
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddManager} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Логин</label>
                <Input
                  value={newManager.username}
                  onChange={(e) => setNewManager({...newManager, username: e.target.value})}
                  placeholder="Введите логин"
                  required
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Пароль</label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={newManager.password}
                    onChange={(e) => setNewManager({...newManager, password: e.target.value})}
                    placeholder="Введите пароль"
                    required
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
                  placeholder="0"
                  min="0"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Процент от продаж (%)</label>
                <Input
                  type="number"
                  value={newManager.sales_percentage}
                  onChange={(e) => setNewManager({...newManager, sales_percentage: e.target.value})}
                  placeholder="0"
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
                  placeholder="0"
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
                                  onClick={() => handleDeleteManager(manager.id, manager.user_id)}
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