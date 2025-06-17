# Полное руководство по настройке администратора в Supabase

## 🔍 Диагностика проблем с входом

### Шаг 1: Проверка переменных окружения

1. **Откройте файл `.env` в корне проекта**
2. **Убедитесь, что переменные настроены правильно:**
   ```env
   VITE_SUPABASE_URL=https://ваш-проект-id.supabase.co
   VITE_SUPABASE_ANON_KEY=ваш-anon-ключ
   ```
3. **Проверьте, что нет лишних пробелов или кавычек**
4. **Перезапустите сервер разработки после изменения .env:**
   ```bash
   npm run dev
   ```

### Шаг 2: Проверка в Supabase Dashboard

1. **Перейдите в Authentication → Users**
2. **Найдите пользователя с email `admin@internal.local`**
3. **Убедитесь, что:**
   - Пользователь существует
   - Email Confirmed = true (галочка зеленая)
   - Статус = Active

### Шаг 3: Проверка таблицы manager_profiles

1. **Перейдите в Table Editor → manager_profiles**
2. **Найдите запись с username = 'admin'**
3. **Убедитесь, что:**
   - user_id соответствует ID пользователя из Authentication
   - role = 'admin'
   - username = 'admin'

### Шаг 4: Использование отладочного режима

1. **Откройте страницу `/admin-login`**
2. **Нажмите "Показать отладку" внизу формы**
3. **Проверьте статус подключения к Supabase**
4. **Попробуйте войти и посмотрите консоль браузера (F12)**

## 🛠️ Пошаговое создание администратора

### Метод 1: Через Supabase Dashboard (Рекомендуется)

#### Шаг 1: Создание пользователя в Authentication

1. **Откройте Supabase Dashboard → Authentication → Users**
2. **Нажмите "Add user"**
3. **Заполните форму:**
   ```
   Email: admin@internal.local
   Password: Admin123!
   Auto Confirm User: ✅ ОБЯЗАТЕЛЬНО ВКЛЮЧИТЕ
   ```
4. **Нажмите "Create user"**
5. **СКОПИРУЙТЕ User UID** (например: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)

#### Шаг 2: Создание профиля в manager_profiles

1. **Перейдите в SQL Editor**
2. **Выполните запрос (замените USER_ID на скопированный):**
   ```sql
   INSERT INTO manager_profiles (user_id, username, base_salary, sales_percentage, kpi_target, role)
   VALUES (
     'ВСТАВЬТЕ_СКОПИРОВАННЫЙ_USER_ID_СЮДА', 
     'admin', 
     0, 
     0, 
     0, 
     'admin'
   );
   ```

### Метод 2: Полностью через SQL

```sql
-- Шаг 1: Создание пользователя в auth.users (ВНИМАНИЕ: это продвинутый метод)
-- Обычно лучше использовать Dashboard для создания пользователей

-- Шаг 2: Создание профиля (выполните после создания пользователя)
INSERT INTO manager_profiles (user_id, username, base_salary, sales_percentage, kpi_target, role)
SELECT 
  id,
  'admin',
  0,
  0,
  0,
  'admin'
FROM auth.users 
WHERE email = 'admin@internal.local';
```

## 🔧 Устранение типичных проблем

### Проблема: "Неверный логин или пароль"

**Возможные причины и решения:**

1. **Пользователь не подтвержден:**
   - Перейдите в Authentication → Users
   - Найдите пользователя `admin@internal.local`
   - Убедитесь, что Email Confirmed = true
   - Если нет, нажмите на пользователя и включите "Email Confirmed"

2. **Неправильный пароль:**
   - В Authentication → Users найдите пользователя
   - Нажмите на него и выберите "Reset Password"
   - Установите новый пароль

3. **Пользователь не существует:**
   - Проверьте, что email точно `admin@internal.local`
   - Если пользователя нет, создайте его заново

4. **Проблемы с переменными окружения:**
   - Проверьте файл `.env`
   - Убедитесь, что VITE_SUPABASE_URL и VITE_SUPABASE_ANON_KEY правильные
   - Перезапустите сервер разработки

### Проблема: "Профиль пользователя не найден"

**Решение:**
1. **Проверьте таблицу manager_profiles:**
   ```sql
   SELECT * FROM manager_profiles WHERE username = 'admin';
   ```

2. **Если записи нет, создайте её:**
   ```sql
   INSERT INTO manager_profiles (user_id, username, role)
   SELECT id, 'admin', 'admin'
   FROM auth.users 
   WHERE email = 'admin@internal.local';
   ```

3. **Проверьте соответствие user_id:**
   ```sql
   SELECT 
     u.id as auth_user_id,
     u.email,
     mp.user_id as profile_user_id,
     mp.username,
     mp.role
   FROM auth.users u
   LEFT JOIN manager_profiles mp ON u.id = mp.user_id
   WHERE u.email = 'admin@internal.local';
   ```

### Проблема: "Row Level Security policy violation"

**Решение:**
1. **Проверьте, что RLS политики созданы:**
   ```sql
   SELECT * FROM pg_policies WHERE tablename = 'manager_profiles';
   ```

2. **Если политик нет, создайте их:**
   ```sql
   -- Политика для менеджеров
   CREATE POLICY "Managers can view and update their own profile"
     ON manager_profiles
     FOR ALL
     TO authenticated
     USING (auth.uid() = user_id);

   -- Политика для администраторов
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

## 🧪 Тестирование системы

### Тест 1: Проверка подключения к Supabase
1. Откройте `/admin-login`
2. Включите отладочный режим
3. Нажмите "Проверить подключение"
4. Статус должен быть "success"

### Тест 2: Проверка создания email из логина
1. Откройте консоль браузера (F12)
2. Введите логин "admin" в форму
3. В консоли должно появиться: "Generated email: admin@internal.local"

### Тест 3: Проверка аутентификации
1. Попробуйте войти с логином "admin"
2. В консоли должны появиться сообщения о процессе аутентификации
3. При успехе: "✅ Authentication successful!"
4. При ошибке: детальное описание проблемы

### Тест 4: Проверка профиля
1. После успешной аутентификации
2. В консоли должно появиться: "✅ Profile found"
3. И затем: "🔑 Admin access granted"

## 📋 Чек-лист для проверки

- [ ] Файл `.env` настроен правильно
- [ ] Сервер разработки перезапущен после изменения `.env`
- [ ] Пользователь `admin@internal.local` существует в Authentication
- [ ] Email пользователя подтвержден (Email Confirmed = true)
- [ ] Запись в `manager_profiles` существует с username = 'admin'
- [ ] user_id в `manager_profiles` соответствует ID из Authentication
- [ ] role в `manager_profiles` установлен как 'admin'
- [ ] RLS политики созданы для таблицы `manager_profiles`
- [ ] Статус подключения к Supabase показывает "OK"

## 🆘 Если ничего не помогает

1. **Удалите пользователя и создайте заново:**
   - Authentication → Users → найдите пользователя → Delete
   - Table Editor → manager_profiles → удалите запись
   - Создайте всё заново по инструкции

2. **Проверьте логи Supabase:**
   - Logs → Auth logs
   - Найдите записи о попытках входа
   - Изучите сообщения об ошибках

3. **Создайте тестового пользователя:**
   ```sql
   -- Создайте простого пользователя для теста
   INSERT INTO manager_profiles (user_id, username, role)
   SELECT id, 'test', 'manager'
   FROM auth.users 
   WHERE email = 'test@internal.local';
   ```

4. **Обратитесь за помощью с логами:**
   - Скопируйте сообщения из консоли браузера
   - Скопируйте ошибки из Supabase Logs
   - Приложите скриншоты настроек Authentication

## 🎯 Быстрый старт (если всё сломалось)

```sql
-- 1. Очистка (ОСТОРОЖНО! Удаляет всех пользователей)
DELETE FROM manager_profiles;

-- 2. Создание через SQL (замените на реальные данные)
-- Сначала создайте пользователя через Dashboard: admin@internal.local / Admin123!
-- Затем выполните:
INSERT INTO manager_profiles (user_id, username, role)
SELECT id, 'admin', 'admin'
FROM auth.users 
WHERE email = 'admin@internal.local';
```

После этого попробуйте войти с логином `admin` и паролем `Admin123!`.