---
name: vazifa
description: Execute the current task in docs/TASKS.md end to end — restate its done-when criteria, make a short plan, implement it, run the tekshir verification steps, update the task status and docs/PROGRESS.md, commit locally, and propose the next task from docs/PLAN.md. Use when the user says "vazifani bajar", "keyingi ishni qil", "shu taskni tugat", or "davom et".
---

# Vazifa — joriy vazifani bajarish

## 1. Vazifani aniqlash

`docs/TASKS.md`dan hozirgi (birinchi tugallanmagan) vazifani toping. Uning "Tayyor, agar" (done-when) mezonlarini o‘z so‘zlaringiz bilan qayta ayting va foydalanuvchiga tasdiqlash uchun ko‘rsating.

## 2. Qisqa reja

2-5 qatordan iborat qisqa reja tuzing: qaysi fayllar o‘zgaradi, qaysi tartibda. Katta yoki noaniq vazifa bo‘lsa, avval savol bering.

## 3. Bajarish

`AGENTS.md`dagi qoidalarga amal qiling:

- Yangi modul kerak bo‘lsa — `yangi-modul` skill'idan foydalaning.
- Baza sxemasi o‘zgarsa — `baza` skill'idan foydalaning.
- UI ishi bo‘lsa — `dizayn` skill'idan foydalaning.

## 4. Tekshirish

`tekshir` skill'idagi qadamlarni bajaring: `npm run check`, keyin o‘zgargan oqimni brauzerda (yoki Playwright MCP orqali) sinab ko‘ring, 390px va dark mode'ni tekshiring.

## To‘xta va so‘ra

- Agar vazifa `AGENTS.md` §10'dagi "Ask before" ro‘yxatiga tegsa (deploy, remote migratsiya, sekret o‘zgartirish va h.k.) — avval so‘rang.
- Agar vazifa noaniq yoki mezonlar qarama-qarshi bo‘lsa — taxmin qilmang, savol bering.

## 5. Yakunlash

1. `docs/TASKS.md`da vazifaning holatini yangilang ("Holat: tayyor" va qisqa izoh).
2. `docs/PROGRESS.md`ga yozuv qo‘shing: sana, nima o‘zgardi, qanday tekshirildi (aniq buyruq/URL), ochiq muammolar, keyingi qadam.
3. Mahalliy commit qiling (conventional commit, aniq xabar bilan). **`git push` qilmang.**
4. `docs/PLAN.md`dan keyingi vazifani foydalanuvchiga taklif qiling.

## Tekshiruv

- `npm run check` — xatosiz.
- O‘zgargan oqim qo‘lda yoki Playwright bilan sinab ko‘rilgan, natija ekranga yoki matnga yozilgan.
- `docs/TASKS.md` va `docs/PROGRESS.md` yangilangan.
- `git log -1` — yangi commit ko‘rinadi.
