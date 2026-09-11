---
name: nashr
description: Deploy to Cloudflare after user confirmation — explains it publishes the app and runs remote migrations, checks wrangler login, runs npm run check and r2:check, deploys, smoke-tests the live URL, and updates PROGRESS. Use when the user says "nashr qil", "deploy qil", "saytni chiqar", or "productionga qo‘y".
---

# Nashr — Cloudflare’ga chiqarish

Deploy **qaytarib bo‘lmaydigan** amal: u haqiqiy foydalanuvchilarga ko‘rinadi va remote bazada migratsiya ishga tushiradi.

## To‘xta va so‘ra — MAJBURIY

Boshlashdan oldin foydalanuvchiga aniq tushuntiring va tasdiq oling:

> "Nashr qilish quyidagilarni bildiradi: (1) sayt haqiqiy internetga chiqadi, (2) uzoqdagi (remote) bazaga yangi o‘zgarishlar (migratsiyalar) qo‘llanadi. Davom etaymi?"

Tasdiq olmasdan hech qanday `deploy` yoki `--remote` buyrug‘ini ishga tushirmang.

## 1. Tayyorgarlik

```
npx wrangler whoami
```

Hisobga kirilganini tasdiqlang (loyiha allaqachon `wrangler login` qilingan bo‘lishi kerak — qayta login so‘ramang, faqat tekshiring).

```
npm run check
npm run r2:check
```

Ikkalasi ham xatosiz o‘tishi kerak.

## 2. Nashr qilish

```
npm run deploy
```

Bu buyruq build qiladi, Cloudflare’ga joylaydi va `db:migrate:remote`ni avtomatik ishga tushiradi.

## 3. Tekshirish

1. Terminalda chiqqan URL’ni oching.
2. Login qiling va `/clients` ro‘yxatini ochib ko‘ring — ma’lumotlar ko‘rinishi kerak.
3. Agar xato bo‘lsa, `xato` skill’iga o‘ting — taxmin bilan qayta deploy qilmang.

## 4. PROGRESS’ni yangilash

`docs/PROGRESS.md`ga: sana, nashr qilingan versiya/o‘zgarishlar, tekshirilgan URL, natija.

## Tekshiruv

- `npx wrangler whoami` — hisob nomi ko‘rinadi.
- `npm run check` va `npm run r2:check` — xatosiz.
- `npm run deploy` — xatosiz tugadi, URL chiqdi.
- Nashr qilingan sayt ochilib, login va `/clients` ishlayapti (aniq URL va natija hisobotda ko‘rsatilgan).
- `docs/PROGRESS.md` yangilangan.
