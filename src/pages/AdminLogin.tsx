import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginWithUsername, getUserProfile, testSupabaseConnection } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Eye, EyeOff, Bug, CheckCircle, XCircle } from 'lucide-react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [debugMode, setDebugMode] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'unknown' | 'success' | 'failed'>('unknown');
  const navigate = useNavigate();

  // Проверяем подключение к Supabase при загрузке компонента
  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    console.log('🔍 Checking Supabase connection...');
    const result = await testSupabaseConnection();
    setConnectionStatus(result.success ? 'success' : 'failed');
    
    if (!result.success) {
      setError(`Ошибка подключения к Supabase: ${result.error}`);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    console.log('🚀 Login attempt started');
    console.log('Form data:', { username, passwordLength: password.length });

    try {
      // Дополнительная проверка входных данных
      if (!username.trim()) {
        setError('Логин не может быть пустым');
        return;
      }

      if (!password.trim()) {
        setError('Пароль не может быть пустым');
        return;
      }

      console.log('📝 Validation passed, attempting login...');

      const { data, error } = await loginWithUsername(username.trim(), password);

      if (error) {
        console.error('❌ Login failed with error:', error);
        
        // Более детальная обработка ошибок
        if (error.message.includes('Invalid login credentials')) {
          setError('Неверный логин или пароль. Проверьте правильность введенных данных.');
        } else if (error.message.includes('Email not confirmed')) {
          setError('Email не подтвержден. Обратитесь к администратору.');
        } else if (error.message.includes('Too many requests')) {
          setError('Слишком много попыток входа. Попробуйте позже.');
        } else {
          setError(`Ошибка входа: ${error.message}`);
        }
        return;
      }

      if (data.user) {
        console.log('✅ Login successful, checking profile...');
        
        // Check if user profile exists and get role
        const profile = await getUserProfile(data.user.id);
        
        if (!profile) {
          console.error('❌ Profile not found for user:', data.user.id);
          setError('Профиль пользователя не найден. Обратитесь к администратору.');
          return;
        }

        console.log('✅ Profile found:', profile);

        if (profile.role === 'admin') {
          console.log('🔑 Admin access granted, redirecting to admin panel');
          navigate('/admin-panel');
        } else {
          console.log('👤 User access granted, redirecting to profile');
          navigate('/profile');
        }
      } else {
        console.error('❌ No user data returned');
        setError('Не удалось получить данные пользователя');
      }
    } catch (err) {
      console.error('💥 Unexpected error during login:', err);
      setError('Произошла неожиданная ошибка при входе');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-purple/20 to-brand-orange/20 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-brand-orange rounded-full flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-brand-darkBlue">
            Вход в систему
          </CardTitle>
          <CardDescription>
            Введите ваш логин и пароль для доступа
          </CardDescription>
          
          {/* Статус подключения */}
          <div className="flex items-center justify-center gap-2 mt-2">
            {connectionStatus === 'success' && (
              <div className="flex items-center gap-1 text-green-600 text-sm">
                <CheckCircle className="w-4 h-4" />
                <span>Подключение к Supabase: OK</span>
              </div>
            )}
            {connectionStatus === 'failed' && (
              <div className="flex items-center gap-1 text-red-600 text-sm">
                <XCircle className="w-4 h-4" />
                <span>Ошибка подключения к Supabase</span>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium text-gray-700">
                Логин
              </label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Введите логин"
                required
                disabled={loading}
                autoComplete="username"
              />
              <p className="text-xs text-gray-500">
                Используйте только логин, без @email.com
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Пароль
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Введите пароль"
                  required
                  disabled={loading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-brand-orange hover:bg-brand-orange/90"
              disabled={loading || connectionStatus === 'failed'}
            >
              {loading ? 'Вход...' : 'Войти'}
            </Button>
          </form>
          
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 text-center">
              <strong>Примеры логинов:</strong><br />
              Администратор: <code>admin</code><br />
              Менеджер: <code>manager1</code>
            </p>
          </div>

          {/* Debug Mode Toggle */}
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setDebugMode(!debugMode)}
              className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1 mx-auto"
            >
              <Bug className="w-3 h-3" />
              {debugMode ? 'Скрыть отладку' : 'Показать отладку'}
            </button>
          </div>

          {/* Debug Information */}
          {debugMode && (
            <div className="mt-4 p-3 bg-gray-100 rounded-lg text-xs">
              <h4 className="font-semibold mb-2">Отладочная информация:</h4>
              <div className="space-y-1 text-gray-600">
                <div>Supabase URL: {import.meta.env.VITE_SUPABASE_URL || 'НЕ НАСТРОЕН'}</div>
                <div>Anon Key: {import.meta.env.VITE_SUPABASE_ANON_KEY ? 'НАСТРОЕН' : 'НЕ НАСТРОЕН'}</div>
                <div>Статус подключения: {connectionStatus}</div>
                <div className="mt-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={checkConnection}
                    className="text-xs"
                  >
                    Проверить подключение
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;