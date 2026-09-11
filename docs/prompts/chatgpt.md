# Tayyor so‘rovlar — ChatGPT va Codex

Bu yerdagi matnlarni nusxalab, Codex suhbatiga qo‘yasiz. Burchakli qavs ichidagi joylarni (`<...>`) o‘z so‘zlaringiz bilan almashtiring.

Codex’da skill’ni odatda nomi bilan chaqirmaysiz — u `.agents/skills/` papkasidagi tavsiflarni o‘qib, mosini o‘zi tanlaydi. Aniq bo‘lishni istasangiz, skill fayliga to‘g‘ridan-to‘g‘ri ishora qiling: "`.agents/skills/tekshir/SKILL.md` faylidagi ko‘rsatmani bajar."

Ba’zi bo‘limlarda **ChatGPT veb suhbati** uchun alohida variant ham bor — bu fayllarga tegmaydigan, faqat maslahat va tushuntirish uchun so‘rovlar.

Skill’lar haqida: [../guides/10-skilllar.md](../guides/10-skilllar.md). Ulash: [../guides/03-chatgpt-ulash.md](../guides/03-chatgpt-ulash.md).

## Boshlash

Loyihani yangi kompyuterda birinchi marta sozlaganda.

```text
Bu loyihani birinchi marta ishga tushiryapman va texnik bilimim yo‘q.
.agents/skills/boshlash/SKILL.md faylidagi ko‘rsatmani bajar.
node -v va git --version bilan boshla, keyin npm run setup va npm run doctor ishga tushir.
Har qadamdan keyin nima bo‘lganini o‘zbekcha, sodda tilda ayt va natijani qanday tekshirishimni ko‘rsat.
Biror narsa yetishmasa, o‘zing o‘rnatishga urinma — menga nima o‘rnatishim kerakligini ayt.
```

## Holatni bilish

Yangi suhbat ochganingizda, ishni davom ettirishdan oldin.

```text
Shu loyihani davom ettiramiz.
docs/PRODUCT.md, docs/FLOW.md, docs/PLAN.md, docs/TASKS.md va docs/PROGRESS.md’ni o‘qi.
git log va git status’ga qara.
Menga ayt: mahsulot maqsadi nima, hozirgi vazifa qaysi va uning "Tayyor, agar" sharti nima,
oxirgi qayd nima deydi, hujjat bilan kod o‘rtasida qarama-qarshilik bormi.
Yo‘q ma’lumotni taxmin qilma. Hozircha hech narsani o‘zgartirma.
```

**ChatGPT veb suhbatida** (fayllarga kirish yo‘q, faqat muhokama uchun):

```text
Men Next.js va Cloudflare asosidagi kichik CRM ustida ishlayapman.
Hozirgi vazifam: <vazifani o‘z so‘zlaringiz bilan yozing>.
Menga bu vazifani qanday bo‘laklarga ajratish kerakligini ayt va har bir bo‘lakni
qanday tekshirishimni tushuntir. Kod yozma — faqat reja va tekshiruv usullari.
```

## Joriy vazifani bajarish

`docs/TASKS.md`da bitta aniq vazifa turganda.

```text
docs/TASKS.md’dagi joriy vazifani bajar (.agents/skills/vazifa/SKILL.md ko‘rsatmasiga amal qil).
Avval uning "Tayyor, agar" mezonlarini o‘z so‘zlaring bilan qaytar va mendan tasdiq so‘ra.
Keyin 2-5 qatorli reja ber: qaysi fayllar, qaysi tartibda.
Men "davom et" deganimdan keyin bajar.
Oxirida npm run check ishga tushir, natijani ko‘rsat va docs/PROGRESS.md’ga qayd yoz.
Dalilsiz "tayyor" dema.
```

## Yangi sahifa qo‘shish

Mavjud ma’lumot uchun yangi ekran kerak bo‘lganda (yangi jadval emas).

```text
Ilovaga yangi sahifa qo‘shamiz: <sahifa nomi>, manzili /<yo‘l>.
Sahifada <nima ko‘rinishi kerakligini yozing>.
src/app/(app)/dashboard/page.tsx naqshini nusxala: PageHeader bilan boshlansin,
ma’lumot bo‘lmasa EmptyState ko‘rsatsin, matnlar o‘zbekcha bo‘lsin.
src/config/nav.ts fayliga menyu yozuvini ham qo‘sh.
Avval nima o‘zgarishini ayt, keyin qil.
Oxirida sahifani 390px kenglikda va qorong‘i rejimda tekshir.
```

## shadcn komponent qo‘shish

Tugma, dialog, tooltip kabi tayyor komponent kerak bo‘lganda.

```text
shadcn MCP serveri orqali "<komponent nomi>" komponentini qidir, nima ekanini qisqa ayt
va loyihaga qo‘sh (npx shadcn@4.21.0 add <nom> ham bo‘ladi).
src/components/ui ichidagi fayllarni qo‘lda tahrirlama.
Keyin uni <qayerda ishlatilishini yozing> joyida ishlat.
Faqat semantik ranglardan foydalan (bg-background, text-muted-foreground, bg-primary).
Oxirida npm run typecheck ishga tushir.
```

MCP serverlari ko‘rinmasa, loyihaga ishonch bildirilganini tekshiring: `codex mcp list`.

## Jadvalga ustun qo‘shish

Mavjud jadvalga yangi maydon kerak bo‘lganda.

```text
clients jadvaliga yangi ustun qo‘shamiz: <ustun nomi> — <nima saqlaydi, majburiymi>.
.agents/skills/baza/SKILL.md ko‘rsatmasiga amal qil.
Qadamlar: src/lib/db/schema.ts’ni yangila, npm run db:generate, yaratilgan SQL faylni menga ko‘rsat
va tushuntir, keyin npm run db:migrate:local.
So‘ng src/features/clients/schema.ts’dagi tekshiruv qoidasini, formani, jadvalni
va kerak bo‘lsa scripts/seed.mjs’ni yangila.
Allaqachon qo‘llangan migratsiya faylini tahrirlama.
Oxirida npm run check va brauzerda tekshiruv.
```

## Yangi modul

Butunlay yangi bo‘lim kerak bo‘lganda (o‘z jadvali, o‘z sahifalari bilan).

```text
"<Bo‘lim nomi>" nomli yangi bo‘lim qo‘shamiz.
Maydonlari: <maydonlarni sanang, qaysi biri majburiy ekanini ayting>.
.agents/skills/yangi-modul/SKILL.md ko‘rsatmasiga amal qil.
src/features/clients naqshini to‘liq nusxala: jadval, migratsiya, zod sxema, queries, actions,
komponentlar, ro‘yxat/qo‘shish/tafsilot/tahrirlash sahifalari, nav yozuvi, testlar.
Har bir server action requireUser() bilan boshlansin.
Bir qadamda bitta ish qil va har qadamdan keyin to‘xtab, natijani menga ko‘rsat.
Oxirida docs/PRODUCT.md, docs/FLOW.md va docs/PROGRESS.md’ni yangila.
```

Batafsil: [../guides/06-yangi-modul.md](../guides/06-yangi-modul.md).

## Xatoni tuzatish

Xato xabari chiqqanda.

```text
Quyidagi xato chiqdi:

<xato matnini shu yerga to‘liq qo‘ying>

Men <nima qilganimni yozing> qilganimda chiqdi.
Avval npm run doctor ishga tushir. Keyin xatoni o‘zbekcha tushuntir: nima bo‘lgan va nima uchun.
Bitta gipoteza tanla va eng kichik tuzatishni taklif qil — men tasdiqlagunimcha kodni o‘zgartirma.
Sababini bilmasang, taxmin qilma: nimani tekshirish kerakligini ayt.
```

**ChatGPT veb suhbatida** (kompyuteringizga kirmaydi):

```text
Quyidagi xato matnini o‘zbekcha tushuntir: bu nima degani va odatda nimadan kelib chiqadi?

<xato matnini shu yerga qo‘ying>

Loyiham: Next.js 16 + Cloudflare Workers (OpenNext) + D1 + Better Auth.
Kod yozma. Faqat ehtimoliy sabablarni tartib bilan sanab ber va har birini
qanday tekshirishimni ayt.
```

## Dizaynni o‘zgartirish

Ko‘rinishni yaxshilash yoki rangni almashtirish kerak bo‘lganda.

```text
<Qaysi sahifa yoki qaysi element> ko‘rinishini o‘zgartirmoqchiman: <nimani xohlayotganingizni yozing>.
docs/DESIGN-SYSTEM.md’ni o‘qi va faqat undagi qoidalar doirasida ishla:
semantik ranglar, gradientsiz, soyasiz, emojisiz, o‘zbekcha matn.
Avval nima o‘zgarishini ayt, keyin qil.
Oxirida Playwright MCP bilan sahifani yorug‘ va qorong‘i rejimda, hamda 390px kenglikda och,
skrinshot ol va farqni tushuntir.
```

## Tekshirish

Biror ishni "tayyor" deb belgilashdan oldin.

```text
Oxirgi o‘zgarishni boshdan oxirigacha tekshir (.agents/skills/tekshir/SKILL.md ko‘rsatmasi bo‘yicha).
1. npm run check ishga tushir va chiqishini menga ko‘rsat.
2. npm run dev bilan serverni ko‘tar va Playwright MCP orqali o‘zgargan oqimni bosib chiq.
3. 390px kenglikda va qorong‘i rejimda ham ko‘r.
Har bir qadam uchun dalil ber: buyruq chiqishi, ochilgan manzil yoki skrinshot.
Biror narsa ishlamasa, yashirma — aniq ayt.
```

## Nashr qilish

O‘zgarishlarni internetga chiqarish kerak bo‘lganda.

```text
Ilovani Cloudflare’ga nashr qilmoqchiman (.agents/skills/nashr/SKILL.md ko‘rsatmasi bo‘yicha).
Avval menga tushuntir: nima o‘zgaradi, uzoqdagi bazaga qanday migratsiyalar qo‘llanadi
va bu qaytarib bo‘lmaydigan ish ekanini eslat.
Keyin npx wrangler whoami, npm run check va npm run r2:check ishga tushir.
Hammasi joyida bo‘lsa menga ayt va tasdiq so‘ra — tasdiqsiz deploy qilma.
Nashrdan keyin jonli manzilni och, kirish sahifasi ishlashini tekshir
va docs/PROGRESS.md’ga qayd yoz.
```

## Cloudflare’dan ma’lumot so‘rash

Hisobingizdagi holatni bilmoqchi bo‘lganingizda. Avval bir marta `codex mcp login cloudflare` bajarilgan bo‘lishi kerak.

```text
Cloudflare MCP serveri orqali quyidagilarni ayt:
- Hisobimdagi D1 bazalari va R2 bucketlari ro‘yxati.
- crm-boilerplate Worker’ining oxirgi bir soatdagi xatolari bormi.
- crm-boilerplate-db bazasida nechta mijoz yozuvi bor.
Faqat o‘qi — hech narsani yaratma, o‘zgartirma yoki o‘chirma.
Natijani o‘zbekcha, jadval ko‘rinishida ber.
```

**ChatGPT veb suhbatida** shu ish uchun Developer mode’ni yoqib, `https://mcp.cloudflare.com/mcp` manzilini konnektor sifatida qo‘shishingiz kerak — [../guides/03-chatgpt-ulash.md](../guides/03-chatgpt-ulash.md). Yozish amallari har safar tasdiq so‘raydi; tasdiqlashdan oldin so‘rov mazmunini o‘qing.

## O‘z skill’ingizni yasash

Bir xil topshiriqni uchinchi marta yozayotgan bo‘lsangiz.

```text
.agents/skills/skill-creator/SKILL.md ko‘rsatmasidan foydalanib yangi skill yasa.
Nomi: <qisqa nom>. Vazifasi: <skill nima qilishi kerakligini yozing>.
Faylni .agents/skills/<nom>/SKILL.md sifatida yarat.
Frontmatter’dagi description ingliz tilida bo‘lsin va qachon ishlatilishini aniq aytsin;
ichidagi ko‘rsatmalar o‘zbekcha bo‘lsin va har bir qadam tekshirib bo‘ladigan bo‘lsin.
Keyin skills.config.json’dagi project ro‘yxatiga qo‘sh,
npm run skills:sync va npm run skills:check ishga tushir va natijani ko‘rsat.
```

## Umumiy maslahat

- Bir so‘rovda bir ish so‘rang.
- Nimaga tegmaslik kerakligini ham yozing: "Baza sxemasiga tegma", "Dizaynni o‘zgartirma".
- Har doim tekshirish usulini so‘rang: "Buni qanday tekshiraman?"
- Agent "tayyor" desa, dalil so‘rang: buyruq chiqishi, ochilgan manzil yoki skrinshot.
- Ishonchingiz komil bo‘lmasa: "Hozircha kodni o‘zgartirma, avval rejani ko‘rsat."
- **O‘ylash va so‘rash** — ChatGPT veb suhbatida, **qilish** — Codex’da.
