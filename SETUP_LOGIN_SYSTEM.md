# Настройка системы аутентификации по логину и паролю

## Что изменилось

Теперь система работает **только с логинами и паролями**, без использования email адресов в интерфейсе.

### Как это работает:

1. **Пользователи вводят только логин** (например: `admin`, `manager1`)
2. **Система автоматически конвертирует** логин в email формат для Supabase: `admin` → `admin@internal.local`
3. **В интерфейсе отображается только логин**, email скрыт от пользователей

## Пошаговая настройка

### Шаг 1: Настройка Supabase

1. **Отключите подтверждение email:**
   - Supabase Dashboard → Authentication → Settings
   - **ОТКЛЮЧИТЕ** "Enable email confirmations"
   - Сохраните изменения

2. **Создайте таблицу (если еще не создана):**
   ```sql
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

   ALTER TABLE manager_profiles ENABLE ROW LEVEL SECURITY;

   CREATE POLICY "Managers can view and update their own profile"
     ON manager_profiles FOR ALL TO authenticated
     USING (auth.uid() = user_id);

   CREATE POLICY "Admins can manage all manager profiles"
     ON manager_profiles FOR ALL TO authenticated
     USING (EXISTS (
       SELECT 1 FROM public.manager_profiles 
       WHERE user_id = auth.uid() AND role = 'admin'
     ));
   ```

### Шаг 2: Создание первого администратора

**Способ 1: Через интерфейс Supabase (Рекомендуется)**

1. **Создайте пользователя:**
   - Authentication → Users → Add user
   - Email: `admin@internal.local`
   - Password: `Admin123!`
   - ✅ Auto Confirm User

2. **Создайте профиль администратора:**
   ```sql
   INSERT INTO manager_profiles (user_id, username, role)
   VALUES ('СКОПИРУЙТЕ_USER_ID_ОТСЮДА', 'admin', 'admin');
   ```

**Способ 2: Через приложение (после настройки)**

1. Временно разрешите регистрацию в коде
2. Зарегистрируйте администратора
3. Отключите регистрацию обратно

### Шаг 3: Тестирование системы

1. **Откройте приложение**
2. **Перейдите на `/admin-login`**
3. **Войдите как администратор:**
   - Логин: `admin`
   - Пароль: `Admin123!`

## Создание пользователей

### Через админ-панель (Рекомендуется):

1. **Войдите как администратор**
2. **Перейдите в админ-панель**
3. **Нажмите "Добавить менеджера"**
4. **Заполните форму:**
   - Логин: `manager1` (только буквы, цифры, _)
   - Пароль: `Manager123!`
   - Зарплата: `250000`
   - Процент: `5`
   - KPI: `500000`

### Через SQL (для массового создания):

```sql
-- Сначала создайте пользователей в Authentication → Users:
-- manager1@internal.local / Manager123!
-- manager2@internal.local / Manager123!

-- Затем создайте профили:
INSERT INTO manager_profiles (user_id, username, base_salary, sales_percentage, kpi_target, role) VALUES
('USER_ID_1', 'manager1', 250000, 5, 500000, 'manager'),
('USER_ID_2', 'manager2', 300000, 7, 600000, 'manager');
```

## Правила для логинов

### ✅ Разрешенные символы:
- Буквы: `a-z`, `A-Z`
- Цифры: `0-9`
- Подчеркивание: `_`

### ❌ Запрещенные символы:
- Пробелы
- Специальные символы: `@`, `#`, `$`, `%`, и т.д.
- Точки: `.`
- Дефисы: `-`

### Примеры хороших логинов:
- `admin`
- `manager1`
- `sales_manager`
- `user_123`

## Роли пользователей

### Администратор (`role = 'admin'`):
- Логин: только логин (например: `admin`)
- Доступ: админ-панель
- Права: создание/редактирование/удаление менеджеров

### Менеджер (`role = 'manager'`):
- Логин: только логин (например: `manager1`)
- Доступ: личный профиль
- Права: просмотр своих данных и зарплаты

## Безопасность

1. **Email скрыты от пользователей** - они видят только логины
2. **Автоматическая конвертация** логинов в email для Supabase
3. **Валидация логинов** - только разрешенные символы
4. **Уникальность логинов** - проверка при создании
5. **Row Level Security** - пользователи видят только свои данные

## Примеры использования

### Вход в систему:
```
Логин: admin
Пароль: Admin123!
```

### Создание нового менеджера:
```
Логин: sales_manager
Пароль: Sales123!
Зарплата: 300000
Процент: 7%
KPI: 600000
```

Теперь ваша система работает полностью на логинах без видимых email адресов!