---
name: holat
description: Resume work by reading PRODUCT/FLOW/PLAN/TASKS/PROGRESS docs plus git log/status, then report the goal, current task, its done-when criteria, last progress entry, and any doc/code mismatches — changes nothing. Use when the user asks "qayerda to‘xtagan edik", "holatni ayt", "nima bo‘lyapti", or starts a new session and wants a summary.
---

# Holat — ishni davom ettirish uchun hisobot

Bu skill **hech narsani o‘zgartirmaydi** — faqat o‘qiydi va foydalanuvchiga Uzbek tilida qisqa hisobot beradi.

## 1. Hujjatlarni o‘qish

Quyidagilarni tartib bilan o‘qing (mavjud bo‘lsa):

1. `docs/PRODUCT.md` — loyiha nima uchun kerak.
2. `docs/FLOW.md` — asosiy foydalanuvchi oqimlari.
3. `docs/PLAN.md` — bosqichlar rejasi.
4. `docs/TASKS.md` — hozirgi vazifa va uning "Tayyor, agar" mezonlari.
5. `docs/PROGRESS.md` — oxirgi yozuvlar (охирги 3-5 tasi yetarli).

## 2. Git holatini tekshirish

```
git log --oneline -5
git status
```

## 3. Hisobot berish

Foydalanuvchiga quyidagi tuzilishda, Uzbek tilida qisqa javob bering:

- **Maqsad**: loyihaning umumiy maqsadi (1 jumla, `docs/PRODUCT.md`dan).
- **Hozirgi vazifa**: `docs/TASKS.md`dagi joriy band va uning "Tayyor, agar" shartlari.
- **Oxirgi progress**: `docs/PROGRESS.md`dagi so‘nggi yozuv sanasi va mazmuni.
- **Git holati**: oxirgi commit va saqlanmagan o‘zgarishlar bormi.
- **Nomuvofiqliklar**: agar hujjat aytgan narsa kod bilan mos kelmasa (masalan, `docs/TASKS.md` bir vazifani "tayyor" deb ko‘rsatadi, lekin unga tegishli fayllar yo‘q), buni aniq ayting.

## To‘xta va so‘ra

Agar hujjatlar (`docs/TASKS.md`, `docs/PROGRESS.md`) umuman topilmasa yoki bo‘sh bo‘lsa, buni foydalanuvchiga ayting va `boshlash` skill'ini taklif qiling — o‘zingiz hujjat yarata boshlamang.

## Tekshiruv

Bu skill hech qanday faylni o‘zgartirmaydi, shuning uchun tekshiruv shart emas — faqat hisobotning hujjatlar va `git log`/`git status` chiqishiga mos kelishini o‘zingiz solishtirib ko‘ring.
