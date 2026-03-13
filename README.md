# 📚 EsmaSystem — Поиск и работа с документами

Веб-приложение для полнотекстового поиска документов с системой фасетных фильтров, авторизацией и адаптивным интерфейсом.

## 🛠 Технологии

| Категория         | Стек                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------ |
| **Фреймворк**     | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)       |
| **Сборщик**       | [Vite 7](https://vitejs.dev/)                                                        |
| **UI-библиотека** | [Chakra UI v3](https://chakra-ui.com) + [NextUI v2](https://nextui.org/)             |
| **Стилизация**    | [Tailwind CSS v3](https://tailwindcss.com/) + [Emotion](https://emotion.sh/)         |
| **Маршрутизация** | [React Router v6](https://reactrouter.com/)                                          |
| **Запросы к API** | [Axios](https://axios-http.com/) + [TanStack Query v4](https://tanstack.com/query/)  |
| **Анимации**      | [Framer Motion](https://www.framer.com/motion/) + [Lottie](https://lottiefiles.com/) |
| **Формы**         | [React Hook Form](https://react-hook-form.com/)                                      |
| **Линтинг**       | ESLint (Airbnb) + Prettier                                                           |
| **Тестирование**  | [Vitest](https://vitest.dev/)                                                        |
| **Git-хуки**      | Husky + lint-staged                                                                  |

## 📁 Архитектура проекта

Проект построен по методологии **Feature-Sliced Design (FSD)**:

```
src/
├── app/            # Инициализация приложения, провайдеры
├── pages/          # Страницы приложения
│   ├── auth/       # Страница авторизации
│   ├── main/       # Главная страница (layout)
│   ├── search/     # Страница поиска документов
│   └── version-info/ # Информация о версии
├── widgets/        # Составные блоки интерфейса
│   ├── header/     # Шапка приложения
│   ├── sidebar/    # Боковая навигация
│   ├── search-bar/ # Поисковая строка
│   ├── search-results/ # Результаты поиска
│   └── filters-sidebar/ # Боковая панель фильтров
├── features/       # Пользовательские сценарии
│   ├── user/       # Выход, профиль, настройки
│   └── filters/    # Модель фильтров
├── entities/       # Бизнес-сущности
│   ├── facet/      # Фасетные группы фильтров
│   ├── model/      # Общая модель данных
│   ├── search/     # Сущность поиска
│   └── user/       # Сущность пользователя
├── shared/         # Переиспользуемые модули
│   ├── api/        # HTTP-клиент (Axios)
│   ├── ui/         # UI-компоненты (кнопки, инпуты, лейаут и др.)
│   ├── theme/      # Тема Chakra UI + переключатель темы
│   ├── hooks/      # Общие хуки
│   ├── libs/       # Утилиты (крипто и др.)
│   ├── assets/     # Статические ресурсы
│   └── types/      # Общие типы
└── auth/           # Модуль авторизации
```

## 🔍 Контроль архитектуры (Steiger)

Проект использует **Steiger** — официальный линтер для Feature-Sliced Design, который автоматически проверяет соблюдение архитектурных правил FSD.

### Что делает Steiger?

Steiger анализирует импорты между слоями FSD и предотвращает нарушения архитектуры. Это помогает:
- Поддерживать чистую архитектуру проекта
- Предотвращать циклические зависимости
- Обеспечивать правильную иерархию слоёв
- Выявлять проблемы на ранних этапах разработки

### Иерархия слоёв и правила импорта

В проекте используется следующая иерархия FSD-слоёв (от низшего к высшему):

```
shared (базовый слой)
  ↑
  ├── entities
  └── auth
      ↑
      └── features
          ↑
          └── widgets
              ↑
              └── pages
                  ↑
                  └── app (верхний слой)
```

**Правила импорта:**

| Слой       | Может импортировать из                              |
| ---------- | --------------------------------------------------- |
| `shared`   | ничего (базовый слой)                               |
| `entities` | `shared`                                            |
| `auth`     | `shared`                                            |
| `features` | `entities`, `auth`, `shared`                        |
| `widgets`  | `features`, `entities`, `auth`, `shared`            |
| `pages`    | `widgets`, `features`, `entities`, `auth`, `shared` |
| `app`      | все слои                                            |

### Примеры нарушений и их исправление

#### ❌ Неправильно: entities импортирует из features

```typescript
// src/entities/user/model.ts
import { getUserSettings } from '@/features/user/settings'; // ОШИБКА!
```

**Проблема:** Слой `entities` не может импортировать из `features` (нарушение иерархии).

**Решение:** Переместите общую логику в `shared` или `entities`:

```typescript
// src/shared/api/user.ts
export const getUserSettings = () => { /* ... */ };

// src/entities/user/model.ts
import { getUserSettings } from '@/shared/api/user'; // ✅ Правильно
```

#### ❌ Неправильно: shared импортирует из entities

```typescript
// src/shared/ui/UserAvatar.tsx
import { User } from '@/entities/user'; // ОШИБКА!
```

**Проблема:** Слой `shared` не должен зависеть от других слоёв.

**Решение:** Определите общий тип в `shared`:

```typescript
// src/shared/types/user.ts
export interface UserBase {
  id: string;
  name: string;
  avatar?: string;
}

// src/shared/ui/UserAvatar.tsx
import { UserBase } from '@/shared/types/user'; // ✅ Правильно
```

#### ❌ Неправильно: features импортирует из widgets

```typescript
// src/features/filters/model.ts
import { SearchBar } from '@/widgets/search-bar'; // ОШИБКА!
```

**Проблема:** Слой `features` находится ниже `widgets` в иерархии.

**Решение:** Используйте композицию на уровне `widgets` или `pages`:

```typescript
// src/widgets/search-panel/ui/SearchPanel.tsx
import { SearchBar } from '@/widgets/search-bar';
import { useFilters } from '@/features/filters'; // ✅ Правильно

export const SearchPanel = () => {
  const filters = useFilters();
  return <SearchBar filters={filters} />;
};
```

### Запуск Steiger вручную

Для проверки архитектуры выполните:

```bash
yarn lint:fsd
```

Эта команда проанализирует все файлы в директории `src/` и выведет список нарушений (если они есть).

### Автоматическая проверка

#### Pre-commit хук

Steiger автоматически запускается перед каждым коммитом через `lint-staged`. Если обнаружены нарушения архитектуры, коммит будет заблокирован:

```bash
git commit -m "Add new feature"
# → Запускается Steiger
# → Если есть нарушения — коммит отклоняется
```

#### CI/CD интеграция

Steiger также запускается в GitHub Actions при каждом push и pull request. Если проверка не пройдена, сборка будет помечена как failed.

Шаг в CI/CD pipeline:
```yaml
- name: Validate FSD Architecture
  run: yarn lint:fsd
```

### Исключения

Следующие файлы исключены из проверки Steiger (не требуют строгого соблюдения FSD):
- Тестовые файлы: `*.test.ts`, `*.test.tsx`, `*.spec.ts`, `*.spec.tsx`
- Директории тестов: `__tests__/`, `__mocks__/`

Конфигурация находится в файле `.steiger.json` в корне проекта.

## 🚀 Начало работы

### Требования

- **Node.js** ≥ 16
- **Yarn** (менеджер пакетов)

### Установка

```bash
# Клонируйте репозиторий
git clone <url-репозитория>
cd library

# Установите зависимости
yarn install

cd mock-server
yarn install
```

### Переменные окружения

Создайте файл `.env` в корне проекта:

```env
VITE_API_HOST=http://localhost:8000/api/
VITE_MOCK_API_HOST=http://localhost:3002
VITE_APP_VERSION=0.0.1
VITE_MD5_SALT="your-salt"
VITE_IS_MOCK=true
```

### Запуск

1) docker: docker-compose up --build
(Контейнер для api так же должен быть запущен)  

2) local: 

```bash
# Запуск dev-сервера (порт 3001)
yarn dev

# Запуск мок-сервера
yarn mock (логин: admin; password: любой )

# Сборка для продакшена
yarn build

# Предпросмотр собранного приложения
yarn preview
```

## ✨ Основные возможности

- **Авторизация** — вход в систему с шифрованием пароля (MD5)
- **Полнотекстовый поиск** — поиск по коллекции документов
- **Фасетные фильтры** — фильтрация по темам, персонам, организациям и локациям
- **Адаптивный интерфейс** — мобильная и десктопная версии (фильтры в drawer на мобильных)
- **Тёмная / светлая тема** — переключатель цветовой схемы
- **Сворачиваемый сайдбар** — навигационная панель с состоянием в localStorage
- **Lazy loading** — ленивая загрузка страниц с анимированным лоадером
- **Error Boundary** — корректная обработка ошибок на уровне страниц

## 📜 Скрипты

| Команда        | Описание                              |
| -------------- | ------------------------------------- |
| `yarn dev`     | Запуск dev-сервера на порту 3001      |
| `yarn mock`    | Запуск мок-сервера                    |
| `yarn build`   | Сборка проекта (TypeScript + Vite)    |
| `yarn preview` | Предпросмотр production-сборки        |
| `yarn lint`    | Линтинг с автоисправлением            |
| `yarn lint:fsd`| Проверка архитектуры FSD (Steiger)    |
| `yarn test`    | Запуск тестов (Vitest)                |
| `yarn test:ci` | Запуск тестов для CI (JUnit reporter) |
| `yarn gen:log` | Генерация CHANGELOG                   |

## 📂 UI-компоненты (shared/ui)

- **Layout** — основной лейаут с хедером, сайдбаром и областью контента
- **Badge** — пользовательский бейдж
- **UIButton / UIIconButton** — кастомные кнопки
- **DeleteButton / DownloadButton** — кнопки действий
- **UiInput / PasswordInput** — поля ввода
- **NavLink / NavigationLinks** — навигационные ссылки
- **MotionBox** — Chakra Box с поддержкой Framer Motion
- **ErrorFallback** — компонент отображения ошибок
- **PrivateRoute** — защита маршрутов для авторизованных пользователей
- **Snackbar** — уведомления (use-snackbar хук)

## 🎨 Темизация

Проект использует кастомную тему Chakra UI с расширенной палитрой цветов:

- **brand** — основные цвета интерфейса (от `#151521` до `#FFFFFF`)
- **accent** — акцентные цвета: синий, фиолетовый, зелёный, жёлтый, красный
- **accentBg / accentBgLight** — фоновые варианты акцентных цветов для тёмной и светлой темы

Кастомизированные компоненты темы: Alert, Modal, Popover, Header, Sidebar, List, Card, Drawer, Button, Input, NavLink, Tooltip, Menu.
