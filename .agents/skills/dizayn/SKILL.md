---
name: dizayn
description: UI work using the shadcn MCP server or CLI, shadcn/ui blocks, theme variables in src/app/globals.css, docs/DESIGN-SYSTEM.md, and Playwright MCP verification at desktop + 390px in light and dark mode. Use when the user says "dizaynni o‘zgartir", "shu tugmani chiroyliroq qil", "yangi komponent qo‘sh", or asks for a UI/UX change.
---

# Dizayn — UI ishi

## 1. Komponent qidirish/qo‘shish

- **shadcn MCP** orqali (agar ulangan bo‘lsa): komponentni qidiring (`search`), ko‘ring (`view`), keyin qo‘shing (`add`).
- Yoki CLI orqali:
  ```
  npx shadcn@4.21.0 add <component>
  ```
- Tayyor bloklar kerak bo‘lsa, https://ui.shadcn.com/blocks dan ilhom oling, keyin loyihaga moslang.
- **`src/components/ui/*`ni hech qachon qo‘lda tahrirlamang** — faqat CLI/MCP orqali qo‘shing yoki yangilang.

## 2. Tema va ranglar

- Barcha ranglar `src/app/globals.css`dagi semantik CSS o‘zgaruvchilaridan (`bg-background`, `text-muted-foreground`, `bg-primary` va h.k.) olinadi — xom hex yoki `bg-blue-500` kabi palitra klasslari yo‘q.
- Brendni sozlash uchun `src/app/globals.css`dagi o‘zgaruvchilarni yangilang; xohlasangiz https://tweakcn.com saytida tema yig‘ib, undan eksport qilingan o‘zgaruvchilarni shu faylga ko‘chiring.

## 3. Loyiha qoidalariga rioya qilish

`docs/DESIGN-SYSTEM.md`ni o‘qing va unga amal qiling: bo‘shliqlar, komponent variantlari, Uzbek matn lug‘ati (Saqlash, Bekor qilish, O‘chirish, Tahrirlash, Qo‘shish, Kirish, Chiqish, Ro‘yxatdan o‘tish).

## 4. Tekshirish — Playwright MCP bilan

Agar `playwright` MCP serveri ulangan bo‘lsa:

1. `npm run dev` bilan serverni ishga tushiring.
2. Playwright orqali sahifani oching, o‘zgargan qismni skrinshot qiling.
3. Ekran o‘lchamini 390px (mobil) ga o‘zgartirib, yana skrinshot oling.
4. Dark mode'ni yoqib, ikkalasini ham tekshiring.

Agar Playwright MCP mavjud bo‘lmasa, foydalanuvchidan aniq qadamlar bilan (qaysi sahifani ochish, nimani bosish) qo‘lda tekshirishni so‘rang.

## To‘xta va so‘ra

Katta dizayn o‘zgarishi (butun sahifa qayta qurilishi, rang sxemasi almashtirilishi) bo‘lsa, avval qisqa reja yoki eskiz tasvirlab, foydalanuvchi tasdig‘ini oling.

## Tekshiruv

- `npm run check` xatosiz.
- Desktop va 390px skrinshotlar (yoki qo‘lda tekshiruv natijasi) — light va dark rejimda.
- Stage badge kabi elementlar matn bilan ko‘rinadi, faqat rang bilan emas.
- `docs/DESIGN-SYSTEM.md` yangi qoida bo‘lsa yangilangan.
