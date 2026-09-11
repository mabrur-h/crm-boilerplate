---
name: baza
description: Change the database schema safely — edit src/lib/db/schema.ts, generate and apply a migration, update zod/forms/tables/seed, and test. Worked example: add a "source" ("Manba") column to clients. Use when the user says "bazaga ustun qo‘sh", "jadvalni o‘zgartir", "yangi maydon kerak", or "sxemani yangila".
---

# Baza — sxema o‘zgarishi

Loyihada **bitta** migratsiya tizimi bor: Drizzle. Hech qachon allaqachon qo‘llangan migratsiya faylini qo‘lda tahrirlamang — yangi migratsiya qo‘shing.

## Misol: `clients`ga `source` ("Manba") ustunini qo‘shish

1. **Sxema** — `src/lib/db/schema.ts`da `client` jadvaliga qator qo‘shing:
   ```ts
   source: text("source"), // masalan: "Instagram", "Tavsiya", "Sayt"
   ```
2. **Migratsiya yaratish**:
   ```
   npm run db:generate
   ```
   `migrations/`da yangi SQL fayl paydo bo‘ladi — uni ochib, `ALTER TABLE`ning to‘g‘riligini tekshiring.
3. **Mahalliy bazaga qo‘llash**:
   ```
   npm run db:migrate:local
   ```
4. **Zod sxema** — `src/features/clients/schema.ts`ga ixtiyoriy `source` maydonini qo‘shing (bo‘sh bo‘lsa `null`).
5. **Forma** — `src/features/clients/components/client-form.tsx`ga "Manba" input/select maydonini qo‘shing.
6. **Jadval/ko‘rinish** — kerak bo‘lsa `clients-table.tsx` yoki tafsilot sahifasida "Manba" ustunini ko‘rsating.
7. **Seed** (agar kerak bo‘lsa) — `scripts/seed.mjs`da namunaviy `source` qiymatlarini qo‘shing:
   ```
   npm run db:seed
   ```
8. **Test** — `src/features/clients/schema.test.ts`ga yangi maydon uchun holat qo‘shing.

## Umumiy qoida (istalgan jadval uchun)

`src/lib/db/schema.ts` → `npm run db:generate` → `npm run db:migrate:local` → kerak bo‘lsa `npm run db:seed` → tegishli zod sxema/forma/jadvalni yangilash → test.

## To‘xta va so‘ra

- **Remote migratsiya** (`npm run db:migrate:remote` yoki `--remote` bilan hech narsa) faqat `nashr` jarayonining bir qismi sifatida, foydalanuvchi tasdiqlagandan keyin ishga tushadi — bu yerda emas.
- Allaqachon qo‘llangan (production’da ishlatilgan) migratsiya faylini o‘chirish yoki tahrirlashdan oldin albatta so‘rang.
- Ustun turi yoki majburiyligi (`NOT NULL`) haqida shubha bo‘lsa, mavjud ma’lumotlarga ta’sirini o‘ylab, foydalanuvchidan tasdiq so‘rang.

## Tekshiruv

- `npm run db:generate` yangi SQL fayl yaratdi, uning mazmuni ko‘rib chiqildi.
- `npm run db:migrate:local` xatosiz o‘tdi.
- `npm run check` xatosiz.
- Brauzerda forma/jadvalda yangi maydon ko‘rinadi va saqlanadi (mahalliy `npm run dev` bilan sinab ko‘rilgan).
