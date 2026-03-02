# Long-Only Stock Analyst

Next.js 16 + TypeScript app for **long-only** stock analysis and manual decision support.

## Guarantees
- Long-only suggestions.
- No automatic buy/sell execution.
- No stop-loss sell logic.
- Missing data is shown as `Data unavailable`.

## Stack
- Next.js App Router
- TailwindCSS
- Prisma + PostgreSQL
- lightweight-charts
- Finnhub provider abstraction (`MarketDataProvider`)

## Setup
1. Node.js 20+
2. `cp .env.example .env`
3. `docker compose up -d`
4. `npx prisma migrate dev --name init`
5. `npm run prisma:seed`
6. `npm run dev`

## Env
- `DATABASE_URL`
- `FINNHUB_API_KEY`
- Optional for server-side fetches: `NEXT_PUBLIC_BASE_URL=http://localhost:3000`

## Testing
- `npm run test`

## Routes
- `/` dashboard
- `/search`
- `/stock/[ticker]`
- `/watchlist`
- `/portfolio`
- `/settings`

## API
- `GET /api/market/search?q=`
- `GET /api/market/ohlc?ticker=&tf=D1|W1`
- `GET /api/market/fundamentals?ticker=`
- `GET /api/indicators?ticker=&tf=D1|W1`
- `POST /api/fib/calc`
- `GET /api/stock/snapshot?ticker=`

## Disclaimer
Informace jsou pouze informativní, nejde o investiční doporučení. Rozhodnutí je na uživateli.
