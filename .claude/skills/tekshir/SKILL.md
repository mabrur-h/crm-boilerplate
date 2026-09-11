---
name: tekshir
description: Verify a change end to end before calling it done — run npm run check, walk the changed flow in a browser (Playwright MCP or manual click-through), check 390px and dark mode, and report evidence in Uzbek. Use when the user says "tekshirib ber", "ishlayaptimi", "sinab ko‘r", or before marking any task finished.
---

# Tekshir — o‘zgarishni tasdiqlash

Hech qachon dalilsiz "tayyor" demang. Dalil — buyruq chiqishi, skrinshot yoki haqiqatda ochilgan URL.

## 1. Avtomatik tekshiruvlar

```
npm run check
```

Bu lint, typecheck, test va `skills:check`ni ishga tushiradi. Xato chiqsa, keyingi qadamga o‘tmasdan tuzating.

## 2. Oqimni jonli sinash

1. `npm run dev` bilan serverni ishga tushiring.
2. O‘zgargan sahifa/oqimni oching (masalan, mijoz qo‘shish, tahrirlash, o‘chirish).
3. Agar `playwright` MCP ulangan bo‘lsa, brauzerni shu orqali boshqaring: sahifani oching, formani to‘ldiring, tugmani bosing, natijani skrinshot qiling.
4. Agar Playwright mavjud emas bo‘lsa, foydalanuvchiga aniq qadamlarni yozib bering ("shu tugmani bosing, mana bunday natija ko‘rinishi kerak") va ular sinab ko‘rgach javobini so‘rang.

## 3. Responsive va tema tekshiruvi

- Ekranni 390px kenglikka o‘zgartirib, joylashuv buzilmaganini tekshiring.
- Dark mode'ni yoqib, matn/rang kontrastini tekshiring.

## 4. Server'ni to‘xtatish

Tekshiruv tugagach, ishga tushirgan `npm run dev` yoki `npm run preview` server'larini albatta to‘xtating.

## To‘xta va so‘ra

Agar tekshiruv paytida kutilmagan xato chiqsa (masalan, 500 xatosi, konsolda qizil xato), taxminiy tuzatishni sinab ko‘rishdan oldin `xato` skill'iga o‘ting.

## Tekshiruv (bu skillning o‘zi uchun)

Yakuniy hisobotda quyidagilar bo‘lishi kerak:
- `npm run check` chiqishi (yoki "xatosiz o‘tdi" degan aniq holat).
- Sinab ko‘rilgan oqim va uning natijasi (matn yoki skrinshot).
- 390px va dark mode natijasi.
- Server to‘xtatilgani haqida eslatma.
