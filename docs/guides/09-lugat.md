# Lug‘at

**Vaqt:** kerakli so‘zni topish uchun 1 daqiqa. **Natija:** hujjatlarda va AI javoblarida uchraydigan texnik so‘zlarning ma’nosini bilasiz.

So‘zlar alifbo tartibida. Har biri ikki jumladan oshmaydi. Loyihaga tegishli joyi bo‘lsa, u ham ko‘rsatilgan.

## A

**Agent** — sizning topshirig‘ingizni o‘qib, fayllarni o‘zgartiradigan va buyruq ishga tushiradigan AI dasturi. Bu loyihada Claude Code va Codex ishlatiladi.

**AGENTS.md** — loyiha ildizidagi qoidalar fayli. Har bir agent ish boshlashdan oldin uni o‘qiydi: qaysi tilda javob berish, nimaga tegmaslik, qaysi buyruqni so‘ramasdan ishlatmaslik.

**API** — bir dastur ikkinchisiga murojaat qiladigan aniq belgilangan yo‘l. Odam uchun tugma bo‘lsa, dastur uchun API.

## B

**Baza (ma’lumotlar bazasi)** — ma’lumot tartibli saqlanadigan joy. Bu loyihada Cloudflare D1.

**Better Auth** — kirish, ro‘yxatdan o‘tish va sessiyani boshqaradigan kutubxona. Parolni xeshlaydi va cookie yozadi.

**Binding** — Worker ichidan tashqi resursga beriladigan qisqa nom. Kodda `env.DB` deb yozasiz, Cloudflare buni haqiqiy bazaga ulaydi. Ro‘yxati `wrangler.jsonc` faylida.

**Branch (tarmoq)** — kodning parallel yo‘nalishi. Asosiy yo‘nalishga tegmasdan biror narsani sinab ko‘rish uchun ishlatiladi.

**Build (yig‘ish)** — kodni brauzer va server tushunadigan ko‘rinishga aylantirish. Buyrug‘i: `npm run build`.

## C

**CLI** — buyruq satri vositasi, ya’ni terminaldan matn bilan boshqariladigan dastur. `wrangler`, `codex`, `claude` — hammasi CLI.

**Cloudflare Workers** — ilova ishlaydigan platforma. Kod foydalanuvchiga eng yaqin serverda ishga tushadi.

**Clone (klonlash)** — GitHub’dagi repozitoriyaning nusxasini kompyuteringizga tushirish. Buyrug‘i: `git clone`.

**Codespaces** — GitHub’ning bulutdagi ish muhiti. Kompyuteringizga hech narsa o‘rnatmasdan, brauzerda ishlash imkonini beradi.

**Commit** — saqlash nuqtasi. Fayllarning hozirgi holatini nom bilan tarixga yozib qo‘yish; kompyuteringizda qoladi.

## D

**D1** — Cloudflare’ning SQL bazasi. Bu loyihada mijozlar, foydalanuvchilar va fayl yozuvlari shu yerda; nomi `crm-boilerplate-db`.

**Dev server** — ishlab chiqish serveri. `npm run dev` bilan ishga tushadi, `http://localhost:3000` manzilida ochiladi va faylni o‘zgartirsangiz sahifani o‘zi yangilaydi.

**Deploy (nashr)** — ilovani internetga chiqarish. Bu loyihada `npm run deploy`; skill nomi — `nashr`.

**Drizzle** — baza bilan TypeScript orqali ishlash va sxemadan migratsiya SQL’ini yaratish vositasi.

## E

**Env (muhit o‘zgaruvchisi)** — ilovaga tashqaridan beriladigan sozlama. Masalan `ALLOW_SIGNUP` — ro‘yxatdan o‘tish ochiqmi yoki yopiq.

## F

**Feature papkasi** — bitta bo‘limning barcha fayllari turadigan papka: `src/features/clients` mijozlar uchun. Yangi bo‘lim shu naqshni takrorlaydi.

**Frontmatter** — fayl boshidagi `---` chiziqlari orasiga yoziladigan qisqa ma’lumot. Har bir `SKILL.md` faylida skill nomi va tavsifi shu yerda turadi.

## G

**Git** — fayllarning o‘zgarish tarixini yuritadigan dastur. Kompyuteringizda ishlaydi.

**GitHub** — kod onlayn saqlanadigan xizmat. Git bilan bir narsa emas: Git — vosita, GitHub — sayt.

## L

**Lint** — kod uslubini tekshiradigan vosita. Buyrug‘i: `npm run lint`.

**localhost** — "shu kompyuterning o‘zi" degani. `http://localhost:3000` — faqat sizga ko‘rinadigan mahalliy manzil.

## M

**MCP** — agentga tashqi vositani ulaydigan ko‘prik. Bu loyihada uchtasi bor: `cloudflare`, `shadcn`, `playwright`.

**Migratsiya** — baza tuzilishini o‘zgartiradigan buyruqlar yozilgan fayl. Ular `migrations/` papkasida turadi va bir marta qo‘llangandan keyin tahrirlanmaydi.

## N

**Neuron** — Cloudflare’ning AI hisob birligi. Bepul rejada kuniga 10 000 ta beriladi; bitta xabar qoralamasi taxminan 16 tasini sarflaydi.

**Next.js** — ilovaning karkasi: sahifalar, manzillar va server amallari shu asosda quriladi.

**Node.js** — kompyuteringizda JavaScript kodini ishga tushiradigan dastur. Loyihaning barcha buyruqlari shunga tayanadi.

**npm** — Node.js bilan birga keladigan paket menejeri. `npm run <nom>` ko‘rinishidagi buyruqlar `package.json` faylida yozilgan.

## O

**OAuth** — parolingizni bermasdan boshqa xizmatga ruxsat berish usuli. `npx wrangler login` va MCP serverlariga kirish shu tarzda ishlaydi.

**OpenNext** — Next.js ilovasini Cloudflare Workers’da ishlatishga imkon beradigan adapter.

## P

**Paket (package)** — boshqalar yozgan, loyihangiz ishlatadigan tayyor kod bo‘lagi. Ro‘yxati `package.json` faylida.

**Playwright** — brauzerni dastur orqali boshqaradigan vosita. Agent u bilan sahifani ochib, tugmani bosib, natijani tekshiradi.

**Port** — bitta kompyuterdagi dasturlarni ajratib turadigan raqam. Bu loyihada dev server 3000-portda ishlaydi.

**Prompt** — agentga beradigan topshiriq matni. Yaxshi prompt nima qilish kerakligini, nimaga tegmaslikni va natijani qanday tekshirishni aytadi.

**Push** — kompyuteringizdagi commit’larni GitHub’ga yuborish. Bu loyihada agent buni har doim sizdan so‘rab bajaradi.

## R

**R2** — Cloudflare’ning fayl omborxonasi. Mijozlarga biriktirilgan shartnoma va hisob-fakturalar shu yerda; bucket nomi `crm-boilerplate-files`.

**Repozitoriya (repo)** — loyihaning bir butun kod ombori. Sizniki GitHub akkauntingizda turadi.

**Revert** — biror commit’ning ta’sirini bekor qiladigan yangi commit yasash. Tarixni o‘chirmaydi — ustiga yangi commit qo‘shadi.

## S

**Schema (sxema)** — ikki ma’noda ishlatiladi: baza jadvallarining tuzilishi (`src/lib/db/schema.ts`) va forma tekshiruv qoidalari (`src/features/<modul>/schema.ts`).

**Secret (maxfiy qiymat)** — hech kimga ko‘rsatilmaydigan sozlama. Bu loyihada `BETTER_AUTH_SECRET`: mahalliy ishda `.dev.vars` faylida, nashrdan keyin Cloudflare’da.

**Seed** — bazaga sinov uchun namunaviy ma’lumot qo‘shish. Buyrug‘i: `npm run db:seed`.

**Server action** — brauzerdan chaqiriladigan, lekin serverda bajariladigan funksiya. Bu loyihada har biri `requireUser()` bilan boshlanadi.

**shadcn/ui** — komponentlar kodini loyihangizga nusxalab beradigan to‘plam. Nusxalar `src/components/ui/` papkasida turadi va qo‘lda tahrirlanmaydi.

**Skill** — agentga bitta ishni qanday bajarishni o‘rgatadigan yozma yo‘riqnoma. Loyihada to‘qqiztasi bor: [10-skilllar.md](10-skilllar.md).

## T

**Tailwind CSS** — uslublarni klass nomlari orqali yozish usuli. Bu loyihada faqat semantik nomlar ishlatiladi: `bg-background`, `text-muted-foreground`.

**Template (shablon)** — nusxa olib, o‘zingizga moslaydigan tayyor loyiha. GitHub’dagi **Use this template** tugmasi shu ish uchun.

**Terminal** — kompyuterga matn bilan buyruq beradigan oyna. VS Code’da: **Terminal → New Terminal**.

**Typecheck** — tiplardagi xatolarni topadigan tekshiruv. Buyrug‘i: `npm run typecheck`.

## W

**Worker** — Cloudflare’da ishlaydigan kichik dastur; sizning ilovangiz ham shu. Nomi `wrangler.jsonc` faylidagi `name` qiymatida.

**Workers AI** — Cloudflare’ning tayyor AI modellari. Bu loyihada xabar qoralamasini yozadi.

**Workers Builds** — GitHub’dagi o‘zgarishni avtomatik yig‘ib nashr qiladigan xizmat. Sozlash: [04-cloudflare.md](04-cloudflare.md).

**workers.dev** — nashrdan keyin beriladigan bepul manzil, masalan `crm-boilerplate.sizning-nomingiz.workers.dev`.

**wrangler** — Cloudflare’ning buyruq satri vositasi. Kirish, nashr, baza va bucket bilan ishlash shu orqali bo‘ladi.

## Muammo bo‘lsa

So‘z bu yerda yo‘q bo‘lsa, agentdan so‘rang:

```text
"<so‘z>" nima degani? Shu loyiha kontekstida, ikki jumlada, texnik bo‘lmagan odamga tushunarli qilib ayt.
Loyihada qayerda uchrashini ham ko‘rsat.
```

Xato matnlari va ularning yechimi: [08-muammolar.md](08-muammolar.md).

## Keyingi qadam

Skill’lar bilan tanishing: [10-skilllar.md](10-skilllar.md).
