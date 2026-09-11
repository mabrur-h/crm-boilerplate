---
name: xato
description: Debug an error by reproducing it, copying the exact message, running npm run doctor, checking local terminal logs or production logs (npx wrangler tail, Cloudflare MCP observability), testing one hypothesis at a time with the smallest fix, then recording the result in PROGRESS. Use when the user says "xato chiqdi", "ishlamayapti", "bu nima degani", or pastes an error message.
---

# Xato — muammoni tuzatish

## 1. Xatoni aniq ko‘rish

Xatoni **aynan qanday chiqqan bo‘lsa, o‘shanday** nusxa oling (terminal, brauzer konsoli, yoki ekran suratidagi matn). Taxmin qilib boshlamang.

## 2. Tezkor tekshiruv

```
npm run doctor
```

Ko‘p muammolar (yetishmagan fayl, noto‘g‘ri versiya, bog‘lanmagan Cloudflare hisobi) shu yerda ko‘rinadi.

## 3. Loglarni ko‘rish

- **Mahalliy** (`npm run dev` yoki `npm run preview`): terminaldagi chiqishni o‘qing.
- **Production**: `npx wrangler tail` (jonli loglar) yoki Cloudflare MCP orqali observability/loglarni so‘rang.

## 4. Bitta gipoteza, bitta safar

Bir vaqtda faqat **bitta** taxminni sinab ko‘ring: "Bu xato X sababli bo‘lishi mumkin" → shu joyni tekshiring → tasdiqlansa, eng kichik tuzatishni qiling. Bir nechta narsani birdan o‘zgartirmang — aks holda nima yordam berganini bilib bo‘lmaydi.

## 5. Tuzatish va tekshirish

Tuzatishdan keyin `tekshir` skill’idagi qadamlarni bajaring: `npm run check`, oqimni qayta sinang, xato endi chiqmasligiga ishonch hosil qiling.

## 6. Yozib qo‘yish

`docs/PROGRESS.md`ga: xato nima edi, sababi nima topildi, qanday tuzatildi, qanday tekshirildi.

## Umumiy holatlar

Ko‘p uchraydigan muammolar va yechimlari uchun `docs/guides/08-muammolar.md`ga qarang (masalan: Cloudflare login muddati tugashi, D1 migratsiya nomuvofiqligi, port band bo‘lishi).

## To‘xta va so‘ra

- Agar tuzatish sekret o‘zgartirish, remote bazaga tegish yoki Cloudflare resursini o‘chirish/yaratishni talab qilsa — avval so‘rang.
- Agar 2-3 gipotezadan keyin ham sabab topilmasa, foydalanuvchiga holatni tushuntirib, birga davom etish yo‘lini so‘rang — cheksiz taxmin qilishda davom etmang.

## Tekshiruv

- Xatoning aniq matni va uni qayta hosil qilish qadamlari hisobotda bor.
- Sinab ko‘rilgan gipotezalar va nima topilgani ro‘yxati bor.
- Tuzatishdan keyin `npm run check` va tegishli oqim qayta tekshirilgan, xato endi chiqmaydi.
- `docs/PROGRESS.md` yangilangan.
