# Пошаговая настройка Supabase

## Шаг 1: Создание проекта в Supabase

1. **Перейдите на сайт Supabase:**
   - Откройте браузер и перейдите на https://supabase.com
   - Нажмите кнопку **"Start your project"** или **"Sign up"**

2. **Зарегистрируйтесь или войдите:**
   - Если у вас нет аккаунта, зарегистрируйтесь через GitHub, Google или email
   - Если аккаунт есть, войдите в систему

3. **Создайте новый проект:**
   - На главной странице дашборда нажмите **"New project"**
   - Выберите организацию (обычно ваше имя пользователя)
   - Заполните форму:
     - **Name**: `ai-manager-system` (или любое другое название)
     - **Database Password**: придумайте надежный пароль (СОХРАНИТЕ ЕГО!)
     - **Region**: выберите ближайший регион (например, Europe West)
     - **Pricing Plan**: выберите **"Free"** для начала
   - Нажмите **"Create new project"**

4. **Дождитесь создания проекта:**
   - Процесс займет 1-2 минуты
   - Вы увидите экран загрузки с прогрессом

## Шаг 2: Получение ключей API

1. **Перейдите в настройки API:**
   - В левом меню нажмите на **"Settings"** (иконка шестеренки)
   - Выберите **"API"**

2. **Скопируйте необходимые данные:**
   - **Project URL**: скопируйте значение из поля "URL" (например: `https://abcdefgh.supabase.co`)
   - **anon public key**: скопируйте значение из раздела "Project API keys" → "anon public"

## Шаг 3: Настройка аутентификации

1. **Перейдите в настройки аутентификации:**
   - В левом меню нажмите **"Authentication"**
   - Выберите **"Settings"**

2. **Отключите подтверждение email:**
   - Найдите раздел **"User Signups"**
   - **ОТКЛЮЧИТЕ** опцию **"Enable email confirmations"**
   - Нажмите **"Save"**

3. **Настройте провайдеры аутентификации:**
   - В разделе **"Auth Providers"**
   - Убедитесь, что **"Email"** включен
   - Остальные провайдеры можно отключить

## Шаг 4: Создание таблиц в базе данных

1. **Перейдите в SQL Editor:**
   - В левом меню нажмите **"SQL Editor"**
   - Нажмите **"New query"**

2. **Выполните SQL-скрипт:**
   - Скопируйте и вставьте следующий код:

```sql
-- Создание таблицы профилей менеджеров
CREATE TABLE IF NOT EXISTS manager_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  base_salary numeric NOT NULL DEFAULT 0,
  sales_percentage numeric NOT NULL DEFAULT 0,
  kpi_target numeric DEFAULT 0,
  role text DEFAULT 'manager',
  created_at timestamptz DEFAULT now()
);

-- Включение Row Level Security
ALTER TABLE manager_profiles ENABLE ROW LEVEL SECURITY;

-- Политика для менеджеров (могут видеть только свой профиль)
CREATE POLICY "Managers can view and update their own profile"
  ON manager_profiles
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Политика для администраторов (могут управлять всеми профилями)
CREATE POLICY "Admins can manage all manager profiles"
  ON manager_profiles
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.manager_profiles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );
```

3. **Запустите скрипт:**
   - Нажмите кнопку **"Run"** (или Ctrl+Enter)
   - Убедитесь, что выполнение прошло без ошибок

## Шаг 5: Создание администратора

1. **Создайте пользователя-администратора:**
   - В SQL Editor выполните новый запрос:

```sql
-- Сначала создайте пользователя через Auth (замените email и пароль)
-- Это нужно сделать через интерфейс Authentication → Users → Add user
-- Или выполните этот запрос, заменив данные:

-- После создания пользователя в Auth, получите его ID и выполните:
-- (ID пользователя можно найти в Authentication → Users)

INSERT INTO manager_profiles (user_id, username, base_salary, sales_percentage, kpi_target, role)
VALUES (
  'ЗАМЕНИТЕ_НА_РЕАЛЬНЫЙ_USER_ID', 
  'admin', 
  0, 
  0, 
  0, 
  'admin'
);
```

2. **Альтернативный способ создания админа:**
   - Перейдите в **"Authentication"** → **"Users"**
   - Нажмите **"Add user"**
   - Заполните:
     - **Email**: `admin@yourcompany.local`
     - **Password**: придумайте пароль
     - **Auto Confirm User**: включите эту опцию
   - Нажмите **"Create user"**
   - Скопируйте ID созданного пользователя
   - Вернитесь в SQL Editor и выполните INSERT запрос выше, заменив USER_ID

## Шаг 6: Обновление .env файла

1. **Откройте файл .env в вашем проекте**
2. **Замените значения на реальные:**

```env
VITE_SUPABASE_URL=https://ваш-проект-id.supabase.co
VITE_SUPABASE_ANON_KEY=ваш-anon-ключ
```

3. **Сохраните файл**
4. **Перезапустите сервер разработки:**
   ```bash
   npm run dev
   ```

## Шаг 7: Проверка работы

1. **Откройте приложение в браузере**
2. **Перейдите на `/admin-login`**
3. **Войдите с данными администратора:**
   - Логин: `admin`
   - Пароль: тот, что вы указали при создании

## Возможные проблемы и решения

### Проблема: "Invalid login credentials"
**Решение:** 
- Убедитесь, что пользователь создан в Authentication → Users
- Проверьте, что email формируется как `логин@yourcompany.local`
- Убедитесь, что пароль правильный

### Проблема: "Row Level Security policy violation"
**Решение:**
- Убедитесь, что запись в manager_profiles создана с правильным user_id
- Проверьте, что role установлен как 'admin'

### Проблема: Таблица не создается
**Решение:**
- Проверьте SQL-запрос на ошибки
- Убедитесь, что у вас есть права на создание таблиц
- Попробуйте выполнить запросы по частям

## Полезные ссылки

- [Документация Supabase](https://supabase.com/docs)
- [Supabase Dashboard](https://supabase.com/dashboard)
- [Руководство по Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)