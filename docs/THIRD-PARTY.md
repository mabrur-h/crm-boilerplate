# Tashqi xizmatlar

Bu loyiha bir nechta tashqi xizmatga tayanadi. Har biri uchun quyida bir xil oltita savolga javob bor: nima uchun kerak, loyihada qayerda ishlatilgan, kaliti qayerda turadi, bepul chegarasi qancha, to‘lov qanday va rasmiy hujjati qayerda.

Bepul chegaralar **2026-09-11 holatiga ko‘ra**, xizmatlarning rasmiy narx sahifalaridan olingan. Raqamlar o‘zgarishi mumkin — muhim qaror qabul qilishdan oldin havoladagi sahifani oching.

---

## Cloudflare Workers

**Nima uchun.** Ilova shu yerda ishlaydi. Worker — bu foydalanuvchiga eng yaqin serverda ishga tushadigan kichik dastur.

**Loyihada qayerda.** `wrangler.jsonc` (Worker nomi, bindinglar, sozlamalar), `open-next.config.ts`, `next.config.ts`. Nashr buyrug‘i: `npm run deploy`. Mahalliy sinov: `npm run preview`.

**Kalit yoki secret qayerda.** Kalit saqlanmaydi. Kompyuteringizdan `npx wrangler login` orqali brauzerda kiriladi. Ilovaning o‘z maxfiy qiymati — `BETTER_AUTH_SECRET`: mahalliy ishda `.dev.vars` faylida (u `.gitignore`da), nashrdan keyin esa `npx wrangler secret put BETTER_AUTH_SECRET` orqali Cloudflare’da.

**Bepul limit.** Kuniga 100 000 so‘rov; har bir so‘rovga 10 ms protsessor vaqti.

**To‘lov.** Bepul reja to‘lov ma’lumotisiz ishlaydi. Workers Paid rejasi oyiga $5.

**Hujjat.** https://developers.cloudflare.com/workers/ · narxlar: https://developers.cloudflare.com/workers/platform/pricing/ · wrangler: https://developers.cloudflare.com/workers/wrangler/ · OpenNext adapteri: https://opennext.js.org/cloudflare

---

## Cloudflare D1

**Nima uchun.** Ilovaning SQL bazasi: foydalanuvchilar, sessiyalar, mijozlar va fayl ma’lumotlari shu yerda.

**Loyihada qayerda.** `wrangler.jsonc`da `DB` bindingi (baza nomi `crm-boilerplate-db`). Sxema: `src/lib/db/schema.ts`. Ulanish: `src/lib/db/index.ts`. Migratsiyalar: `migrations/` papkasi, `npm run db:migrate:local` va `npm run db:migrate:remote` buyruqlari.

**Kalit yoki secret qayerda.** Alohida kalit yo‘q. Baza Worker’ga binding orqali ulanadi, ruxsat esa Cloudflare hisobingizdan keladi.

**Bepul limit.** Kuniga 5 mln qator o‘qish va 100 000 qator yozish; jami 5 GB xotira.

**To‘lov.** Workers rejasiga kiradi. Bepul rejada to‘lov ma’lumoti talab qilinmaydi.

**Hujjat.** https://developers.cloudflare.com/d1/ · narxlar: https://developers.cloudflare.com/d1/platform/pricing/

---

## Cloudflare R2

**Nima uchun.** Mijozlarga biriktirilgan fayllar (shartnoma, hisob-faktura, rasm) shu yerda saqlanadi.

**Loyihada qayerda.** `wrangler.jsonc`da `FILES` bindingi (bucket nomi `crm-boilerplate-files`). Kod: `src/lib/files.ts`, `src/features/clients/file-actions.ts`, yuklab olish manzili `src/app/api/files/[id]/route.ts`. Tekshiruv buyrug‘i: `npm run r2:check`.

**Kalit yoki secret qayerda.** Alohida kalit yo‘q — binding orqali ulanadi.

**Bepul limit.** Oyiga 10 GB xotira, 1 mln Class A (yozish) va 10 mln Class B (o‘qish) operatsiya. Chiqish trafigi (egress) doim bepul.

**To‘lov.** ⚠️ R2 **bepul rejada ham** hisobingizda to‘lov ma’lumoti (karta yoki PayPal) turishini talab qiladi. Pul faqat yuqoridagi chegaradan oshgandagina yechiladi. Qadamma-qadam: [guides/04-cloudflare.md](guides/04-cloudflare.md).

**Hujjat.** https://developers.cloudflare.com/r2/ · narxlar: https://developers.cloudflare.com/r2/pricing/

---

## Workers AI

**Nima uchun.** Mijozga yuboriladigan xabar qoralamasini yozadi.

**Loyihada qayerda.** `wrangler.jsonc`da `AI` bindingi. Kod: `src/lib/ai.ts` (model nomi shu yerda), `src/features/clients/ai-prompt.ts` (so‘rov matni), `src/features/clients/ai-actions.ts`. Ekranda: mijoz sahifasidagi "AI bilan xabar qoralamasi" kartochkasi.

Ishlatilayotgan model: `@cf/openai/gpt-oss-20b`. Nima uchun aynan u tanlangani — [DECISIONS.md](DECISIONS.md) D9.

**Kalit yoki secret qayerda.** Alohida kalit yo‘q — binding orqali ulanadi. Eslatma: AI bindingi mahalliy ishda ham Cloudflare’ning haqiqiy serveriga murojaat qiladi, shuning uchun `npm run dev` uchun ham internet va `wrangler login` kerak.

**Bepul limit.** Kuniga 10 000 neuron. Neuron — Cloudflare’ning AI hisob birligi. Bitta xabar qoralamasi o‘lchovda ~16 neuron sarfladi, ya’ni kuniga 600 tacha qoralama.

**To‘lov.** Bepul chegaradan oshsa, Workers Paid rejasi va neuronlar uchun to‘lov kerak bo‘ladi.

**Hujjat.** https://developers.cloudflare.com/workers-ai/ · narxlar: https://developers.cloudflare.com/workers-ai/platform/pricing/

---

## Workers Builds

**Nima uchun.** GitHub’dagi repozitoriyani Cloudflare’ga ulaydi: har safar kod o‘zgarganda ilova avtomatik yig‘iladi va nashr qilinadi. Kompyuteringizda `npm run deploy` yozish shart bo‘lmay qoladi.

**Loyihada qayerda.** Loyihada sozlama fayli yo‘q — bu Cloudflare boshqaruv panelidan yoqiladi. README’dagi **Deploy to Cloudflare** tugmasi bilan nashr qilsangiz, u odatda shu ulanishni ham tuzadi.

**Kalit yoki secret qayerda.** Cloudflare GitHub akkauntingizga o‘z ilovasi orqali ulanadi; hech qanday kalitni qo‘lda yozmaysiz.

**Bepul limit.** Workers rejasiga kiradi; yig‘ish vaqtining aniq chegarasi rasmiy sahifada yozilgan.

**To‘lov.** Alohida to‘lov yo‘q.

**Hujjat.** https://developers.cloudflare.com/workers/ci-cd/builds/

---

## Cloudflare MCP serveri

**Nima uchun.** AI agentiga Cloudflare hisobingiz bilan gaplashish imkonini beradi: resurslarni ko‘rish, loglarni o‘qish, hujjatlardan qidirish.

**Loyihada qayerda.** `.mcp.json` va `.codex/config.toml` fayllarida `cloudflare` nomi bilan, manzili `https://mcp.cloudflare.com/mcp`.

**Kalit yoki secret qayerda.** Kalit yo‘q. Birinchi ulanishda brauzerda Cloudflare hisobingizga kirasiz va ruxsat berasiz. Claude Code’da buni `/mcp` buyrug‘i orqali qilasiz.

**Bepul limit.** Alohida chegara yo‘q; server ishlatadigan xizmatlarning o‘z chegaralari amal qiladi.

**To‘lov.** To‘lovsiz.

**Hujjat.** https://developers.cloudflare.com/agents/model-context-protocol/ · manba kodi: https://github.com/cloudflare/mcp-server-cloudflare

---

## Better Auth

**Nima uchun.** Kirish, ro‘yxatdan o‘tish va sessiyani boshqaradi: parolni xeshlaydi, cookie yozadi, foydalanuvchi jadvallarini belgilaydi.

**Loyihada qayerda.** `src/lib/auth.ts` (server tomoni, har bir so‘rov uchun yangidan quriladi), `src/lib/auth-client.ts` (brauzer tomoni), `src/lib/session.ts` (`getSession()` va `requireUser()`), `src/app/api/auth/[...all]/route.ts`, `src/features/auth/`. Foydalanuvchi jadvallari: `src/lib/db/schema.ts`.

**Kalit yoki secret qayerda.** `BETTER_AUTH_SECRET`. Mahalliy ishda `.dev.vars` faylida — uni `npm run setup` o‘zi yaratadi va tasodifiy qiymat yozadi. Nashrdan keyin `npx wrangler secret put BETTER_AUTH_SECRET` orqali Cloudflare’ga yoziladi. Namunaviy fayl: `.dev.vars.example`.

**Bepul limit.** Yo‘q — bu ochiq kutubxona, o‘z serveringizda ishlaydi.

**To‘lov.** To‘lovsiz, MIT litsenziyasi ostida.

**Hujjat.** https://www.better-auth.com/docs

---

## shadcn/ui (va uning MCP serveri)

**Nima uchun.** Tayyor interfeys komponentlari: tugma, forma, jadval, dialog, yon menyu.

**Loyihada qayerda.** Komponentlar `src/components/ui/` papkasida. Sozlama: `components.json`. Tema o‘zgaruvchilari: `src/app/globals.css`. MCP serveri `.mcp.json` va `.codex/config.toml`da `shadcn` nomi bilan.

**Kalit yoki secret qayerda.** Kalit kerak emas.

**Bepul limit.** Yo‘q.

**To‘lov.** To‘lovsiz, MIT litsenziyasi ostida.

**Hujjat.** https://ui.shadcn.com · MCP: https://ui.shadcn.com/docs/mcp

---

## Drizzle ORM

**Nima uchun.** Baza bilan TypeScript orqali ishlash va sxemadan migratsiya SQL’ini yaratish.

**Loyihada qayerda.** `src/lib/db/schema.ts` (jadvallar), `src/lib/db/index.ts` (ulanish), `drizzle.config.ts` (sozlama), `migrations/` (yaratilgan SQL). Buyruq: `npm run db:generate`.

**Kalit yoki secret qayerda.** Kalit kerak emas.

**Bepul limit.** Yo‘q.

**To‘lov.** To‘lovsiz, Apache-2.0 litsenziyasi ostida.

**Hujjat.** https://orm.drizzle.team/docs/overview

---

## Playwright MCP serveri

**Nima uchun.** AI agentiga haqiqiy brauzerni boshqarish imkonini beradi: sahifani ochadi, formani to‘ldiradi, tugmani bosadi va ekran suratini oladi. O‘zgarishni haqiqatan ishlayotganini tekshirish uchun ishlatiladi.

**Loyihada qayerda.** `.mcp.json` va `.codex/config.toml`da `playwright` nomi bilan (`npx @playwright/mcp@0.0.80`).

**Kalit yoki secret qayerda.** Kalit kerak emas. Birinchi ishga tushganda brauzerni yuklab olishi mumkin.

**Bepul limit.** Yo‘q.

**To‘lov.** To‘lovsiz.

**Hujjat.** https://github.com/microsoft/playwright-mcp

---

## GitHub

**Nima uchun.** Shablonning o‘z nusxasini olasiz, kodni saqlaysiz va Cloudflare’ga ulaysiz.

**Loyihada qayerda.** Shablon manzili: https://github.com/mabrur-h/crm-boilerplate. Brauzerdagi muhit sozlamasi: `.devcontainer/devcontainer.json`.

**Kalit yoki secret qayerda.** Kalit yozilmaydi. Kompyuterda git o‘zining odatiy kirish usulidan foydalanadi. Avtomatik nashr uchun Cloudflare API kaliti kerak bo‘lsa, u faqat GitHub’ning "Secrets" bo‘limida saqlanadi — hech qachon loyiha ichida emas.

**Bepul limit.** Ochiq va yopiq repozitoriyalar bepul. Codespaces uchun oyiga ma’lum miqdorda bepul soat beriladi.

**To‘lov.** Shu loyiha uchun to‘lov kerak emas.

**Hujjat.** https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template

---

## Yangi xizmat qo‘shganda shu bo‘limni nusxalang

```markdown
## <Xizmat nomi>

**Nima uchun.** <Bir-ikki gapda: bu xizmat loyihaga nima beradi.>

**Loyihada qayerda.** <Aniq fayl yo‘llari va buyruqlar.>

**Kalit yoki secret qayerda.** <Qaysi nom bilan, qaysi faylda yoki qayerda saqlanadi. Kalit kerak bo‘lmasa, shuni yozing.>

**Bepul limit.** <Raqamlar va ular qaysi sanaga tegishli.>

**To‘lov.** <To‘lov ma’lumoti kerakmi, pul qachon yechiladi.>

**Hujjat.** <Rasmiy hujjat havolasi.>
```

Yangi xizmat qo‘shganingizda [DECISIONS.md](DECISIONS.md)ga ham qisqa yozuv qoldiring: nima uchun aynan shu xizmat tanlandi.
