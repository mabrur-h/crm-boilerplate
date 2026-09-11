---
name: yangi-modul
description: Build a new feature module by copying the src/features/clients reference pattern (schema, migration, zod, queries, actions, components, list/new/[id]/edit pages, nav entry, tests, docs). Use when the user says "yangi modul qo‘sh", "mahsulotlar bo‘limini qil", "yana bir jadval kerak", or wants a new CRUD section like clients.
---

# Yangi modul — `src/features/clients` naqshini nusxalash

Bu loyihada har bir yangi bo‘lim (masalan, "Mahsulotlar") `src/features/clients`ning bir xil tuzilishini takrorlaydi. Quyida `products` / "Mahsulotlar" misolida to‘liq ro‘yxat.

## Tekshiruv ro‘yxati

1. **Jadval** — `src/lib/db/schema.ts`ga yangi jadval qo‘shing (masalan `product`), `clients` jadvaliga o‘xshab (id, maydonlar, `createdAt`/`updatedAt`).
2. **Migratsiya**:
   ```
   npm run db:generate
   npm run db:migrate:local
   ```
   Yaratilgan SQL faylni `migrations/`da ko‘rib chiqing.
3. **Zod sxema** — `src/features/products/schema.ts`: forma validatsiyasi, `src/features/clients/schema.ts`dagi naqsh bo‘yicha (bo‘sh qiymatlarni `null`ga aylantirish, sana/format tekshiruvi).
4. **Constants** — `src/features/products/constants.ts`: agar bosqich/holat kabi qiymatlar bo‘lsa, `CLIENT_STAGES`ga o‘xshab Uzbek label’lar bilan массив qiling.
5. **Queries** — `src/features/products/queries.ts`: `getDb()` orqali o‘qish funksiyalari (`listProducts`, `getProduct`), `src/features/clients/queries.ts`dagidek.
6. **Actions** — `src/features/products/actions.ts`: server action’lar, har biri `requireUser()` bilan boshlanadi (`src/features/clients/actions.ts`ga qarang).
7. **Komponentlar** — `src/features/products/components/`: jadval, forma, badge kabi UI qismlari (`clients-table.tsx`, `client-form.tsx` naqshi bo‘yicha). shadcn komponentlarini `npx shadcn@4.21.0 add …` orqali qo‘shing, `src/components/ui/*`ni qo‘lda tahrirlamang.
8. **Sahifalar** — `src/app/(app)/products/` ostida:
   - `page.tsx` — ro‘yxat
   - `new/page.tsx` — yangi qo‘shish
   - `[id]/page.tsx` — ko‘rish
   - `[id]/edit/page.tsx` — tahrirlash
   Har birida `requireUser()` chaqiring (yoki layout orqali himoyalangan bo‘lsa, tasdiqlang).
9. **Navigatsiya** — `src/config/nav.ts`ga yangi qatorni qo‘shing:
   ```ts
   { title: "Mahsulotlar", href: "/products", icon: Package }
   ```
10. **Testlar** — kod yoniga `*.test.ts` fayllar (`schema.test.ts`, `constants.test.ts` naqshi bo‘yicha).
11. **Hujjat** — tegishli `docs/` faylida (masalan `docs/FLOW.md`) yangi bo‘limni tasvirlang.

## To‘xta va so‘ra

Modul nomi, maydonlari yoki Uzbek atamalari noaniq bo‘lsa (masalan, "Mahsulot" so‘zining ko‘plik/birlik shakli, maydon nomlari), boshlashdan oldin foydalanuvchidan aniqlashtiring.

## Tekshiruv

- `npm run db:migrate:local` xatosiz o‘tdi.
- `npm run check` — lint/typecheck/test/skills:check xatosiz.
- Brauzerda `/products` ro‘yxati, "Yangi qo‘shish" formasi, tafsilot va tahrirlash sahifalari ochilib, saqlash/o‘chirish ishlaydi.
- 390px va dark mode’da ko‘rinish tekshirilgan.
