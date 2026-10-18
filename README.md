# bileet

Демо-сайт бронирования кино на Next.js (порт **43123**).

## Запуск

```bash
npm install
cp .env.example .env.local   # заполните TURSO_DATABASE_URL и TURSO_AUTH_TOKEN
npm run db:migrate
npm run dev
```

### Turso (облачная БД)

Брони и занятые места хранятся в [Turso](https://turso.tech). Афиша (фильмы, сеансы, зал) — по-прежнему в `src/data/mock/`.

1. Создайте базу в Turso и выпустите токен с правами read/write.
2. В `.env.local` (и в **Vercel → Settings → Environment Variables**):
   - `TURSO_DATABASE_URL` — URL вида `libsql://….turso.io`
   - `TURSO_AUTH_TOKEN`
3. `npm run db:migrate`

Без `TURSO_*` приложение работает с in-memory store (брони сбрасываются при перезапуске).

Откройте [http://127.0.0.1:43123](http://127.0.0.1:43123).

## Проверка

1. Главная → два разных фильма → сеансы → места → **В корзину**.
2. **Корзина** (справа снизу) — оба сеанса в списке.
3. **Оформить все билеты** → имя и email → номер заказа.
4. **Помощник** — 6 FAQ и свободный ввод.

```bash
npm run build
```
