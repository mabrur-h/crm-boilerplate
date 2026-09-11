# Ish qaydlari

Bu fayl — loyihaning xotirasi. Yangi suhbatda agent shu yerdan ishning qayerda to‘xtaganini biladi.

## Qanday yozasiz

Har bir qayd quyidagi beshta savolga javob bersin:

1. **Sana** — qaysi kuni.
2. **Nima o‘zgardi** — qaysi fayl yoki ekran, bir-ikki gapda.
3. **Nima tekshirildi va qanday** — qaysi buyruq ishga tushirildi, qaysi sahifa ochildi, nima ko‘rindi.
4. **Ochiq muammo** — hal qilinmagan narsa bo‘lsa.
5. **Keyingi qadam** — ertaga nimadan boshlanadi.

Yangi qaydni fayl tepasiga, eskilarining ustiga qo‘ying.

### Belgilar

| Belgi | Ma’nosi |
| --- | --- |
| `[x]` | Bajarildi va tekshirildi |
| `[~]` | Qisman bajarildi |
| `[ ]` | Boshlanmagan |
| `[-]` | Rejadan tashqari, bajarilmaydi |

### Bitta qoida

Chatdagi "bajardim" javobini dalilsiz yozmang. Dalil — buyruq chiqishi, ekrandagi natija yoki siz haqiqatda ochgan manzil. Agent "tayyor" desa, o‘zingiz ko‘rgan narsani yozing.

---

## 2026-09-11 — shablon yig‘ildi

Loyiha shu kuni boshlandi va ertasiga yakunlandi (qaydlar `git log`da: `76daf98` dan `cc8a48d` gacha).

**Nima o‘zgardi**

- [x] Next.js 16 loyihasi yaratildi, versiyalar aniq raqam bilan qotirildi (`.npmrc`da `save-exact=true`).
- [x] OpenNext orqali Cloudflare Workers’ga moslash qo‘shildi: `wrangler.jsonc`, `open-next.config.ts`.
- [x] shadcn/ui o‘rnatildi (Radix asosi, neutral rang), kerakli komponentlar qo‘shildi.
- [x] D1 baza, Drizzle sxemasi va uchta migratsiya qo‘shildi (`migrations/`).
- [x] Better Auth bilan kirish va ro‘yxatdan o‘tish ishga tushirildi; himoya `src/app/(app)/layout.tsx`dagi `requireUser()` orqali.
- [x] Mijozlar moduli yozildi: yaratish, ro‘yxat, qidiruv, filtr, tahrirlash, o‘chirish, bosh sahifa.
- [x] Fayllar (R2) va AI xabar qoralamasi (Workers AI, `@cf/openai/gpt-oss-20b`) qo‘shildi.
- [x] Dizayn o‘tkazildi: Plus Jakarta Sans shrifti, bitta brend rangi, qorong‘i rejim, bo‘sh va xato holatlari.
- [x] Sozlash skriptlari yozildi: `setup`, `doctor`, `cf:setup`, `r2:check`, `db:seed`.
- [x] Agent qatlami qo‘shildi: `AGENTS.md`, `CLAUDE.md`, MCP sozlamalari, 9 ta loyiha skill’i va vendor qilingan skill’lar.
- [x] Hujjatlar yozildi: `README.md`, `LICENSE` va `docs/` papkasi.
- [ ] Qadamma-qadam yo‘riqnomalar (`docs/guides/`) va tayyor promptlar (`docs/prompts/`) — hali yozilmagan.

**Nima tekshirildi va qanday**

- [x] `npm run check` — lint, typecheck, testlar va skill tekshiruvi xatosiz o‘tdi.
- [x] `npm run build` — ishlab chiqarish uchun yig‘ilish xatosiz tugadi.
- [x] `npm run db:migrate:local` — uchta migratsiya mahalliy bazaga qo‘llandi.
- [x] `npm run preview` — ilova haqiqiy Cloudflare Worker sifatida mahalliy ishladi.
- [ ] To‘liq oqimni brauzerda boshidan oxirigacha bosib chiqish ([FLOW.md](FLOW.md) "Tekshiruv" ro‘yxati bo‘yicha) — hali qilinmagan.

**Ochiq muammo**

- Parolni tiklash yo‘q. Parolni unutgan foydalanuvchi uchun yagona yo‘l — yangi hisob ochish.
- Rollar yo‘q: tizimga kirgan har kim hamma mijozni ko‘radi va o‘chira oladi.
- AI qoralamasidagi apostroflar bir xil emas — model matnni o‘zi yozadi, shuning uchun uni odam tahrirlashi kutiladi.

**Keyingi qadam**

[TASKS.md](TASKS.md)dagi vazifa: loyihani o‘z biznesingizga moslash.
