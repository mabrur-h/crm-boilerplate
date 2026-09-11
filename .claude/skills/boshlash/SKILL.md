---
name: boshlash
description: First-time project setup on a new machine — check Node/git, run npm run setup and npm run doctor, get Cloudflare and MCP auth approved, start the dev server, and offer to fill in docs/PRODUCT.md. Use when the user opens this repo for the first time, says "loyihani ishga tushir", "birinchi marta sozlash", "setup qil", or "boshlash kerak".
---

# Boshlash — birinchi marta sozlash

Bu skill loyihani yangi kompyuterda birinchi marta ishga tushirish uchun. Har bir qadamdan keyin natijani foydalanuvchiga tushuntiring.

## 1. Kerakli dasturlarni tekshirish

```
node -v
git --version
```

`node -v` `.nvmrc`dagi versiyaga yaqin (24) yoki `package.json`dagi `engines.node` (`>=22`) talabiga mos bo‘lishi kerak. Agar `node` yoki `git` topilmasa, foydalanuvchiga ularni o‘rnatishni ayting va bu yerda to‘xtang.

## 2. Bog‘liqliklarni o‘rnatish va sozlash

```
npm run setup
```

Bu skript paketlarni o‘rnatadi va boshlang‘ich fayllarni (masalan, `.dev.vars`) tayyorlaydi.

## 3. Sog‘liqni tekshirish

```
npm run doctor
```

Agar xato chiqsa, uning tavsiyasiga amal qiling (masalan, yetishmayotgan fayl yoki noto‘g‘ri versiya haqida bo‘ladi). Muammo hal bo‘lguncha keyingi qadamga o‘tmang.

## 4. Cloudflare va MCP autentifikatsiyasi

**To‘xta va so‘ra**: quyidagilarni ishga tushirishdan oldin foydalanuvchidan ruxsat so‘rang — bular brauzerda login oynasini ochadi:

- `npx wrangler login` — Cloudflare hisobiga ulanish uchun (agar allaqachon ulangan bo‘lsa, kerak emas).
- Claude Code'da: `/mcp` buyrug‘ini yozib, `cloudflare` serverini autentifikatsiya qiling.
- Codex'da: `codex mcp login cloudflare`.

Foydalanuvchiga tushuntiring: bu qadam loyihaning Cloudflare resurslariga (baza, fayllar) kirish huquqini beradi, hech narsa o‘chirilmaydi yoki nashr qilinmaydi.

## 5. Loyihani ishga tushirish

```
npm run dev
```

So‘ng brauzerda `http://localhost:3000` ni oching. Demo hisob bilan kirib ko‘ring (agar `docs/guides/00-kompyuter-tayyorlash.md`da demo login ma’lumotlari bo‘lsa, o‘shani ishlating; bo‘lmasa, "Ro‘yxatdan o‘tish" orqali yangi hisob yarating).

Tekshirish tugagach, serverni to‘xtatishni unutmang (terminalda `Ctrl+C`).

## 6. docs/PRODUCT.md'ni moslashtirish (ixtiyoriy taklif)

Foydalanuvchiga ayting: "Loyihangiz haqida bir nechta savol beraman, shunga qarab `docs/PRODUCT.md`ni yangilayman." Savollarni **bittalab** bering (barchasini birdan emas):

1. Loyiha kimlar uchun (qaysi biznes/soha)?
2. Eng muhim 2-3 ta funksiya nima?
3. Boshqa nima o‘zgartirilishi kerak (nomlar, ranglar, tildagi atamalar)?

Har bir javobdan keyin `docs/PRODUCT.md`ga mos o‘zgartirish kiriting va foydalanuvchiga qisqacha ko‘rsating.

## Tekshiruv

- `node -v`, `git --version` — versiyalar mos.
- `npm run doctor` — xatosiz o‘tadi.
- `npm run dev` ishga tushdi, `http://localhost:3000` ochildi va sahifa ko‘rindi.
- Foydalanuvch bilan Cloudflare/MCP autentifikatsiyasi haqida kelishildi (majburiy emas, keyinroq ham qilsa bo‘ladi).
