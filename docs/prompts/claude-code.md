# Tayyor so‘rovlar — Claude Code

Bu yerdagi matnlarni nusxalab, Claude Code suhbatiga qo‘yasiz. Burchakli qavs ichidagi joylarni (`<...>`) o‘z so‘zlaringiz bilan almashtiring.

Har bir bo‘limda avval qisqa skill chaqiruvi, keyin to‘liq so‘rov beriladi. Skill chaqiruvi qisqa, to‘liq so‘rov esa aniqroq — shoshilmayotgan paytda ikkinchisini ishlating.

Skill’lar haqida: [../guides/10-skilllar.md](../guides/10-skilllar.md). Ulash: [../guides/02-claude-ulash.md](../guides/02-claude-ulash.md).

## Boshlash

Loyihani yangi kompyuterda birinchi marta sozlaganda.

Qisqa: `/boshlash`

```text
Bu loyihani birinchi marta ishga tushiryapman va texnik bilimim yo‘q.
node -v va git --version bilan boshla, keyin npm run setup va npm run doctor ishga tushir.
Har qadamdan keyin nima bo‘lganini o‘zbekcha, sodda tilda ayt va natijani qanday tekshirishimni ko‘rsat.
Biror narsa yetishmasa, o‘zing o‘rnatishga urinma — menga nima o‘rnatishim kerakligini ayt.
```

## Holatni bilish

Yangi suhbat ochganingizda, ishni davom ettirishdan oldin.

Qisqa: `/holat`

```text
Shu loyihani davom ettiramiz.
docs/PRODUCT.md, docs/FLOW.md, docs/PLAN.md, docs/TASKS.md va docs/PROGRESS.md’ni o‘qi.
git log va git status’ga qara.
Menga ayt: mahsulot maqsadi nima, hozirgi vazifa qaysi va uning "Tayyor, agar" sharti nima,
oxirgi qayd nima deydi, hujjat bilan kod o‘rtasida qarama-qarshilik bormi.
Yo‘q ma’lumotni taxmin qilma. Hozircha hech narsani o‘zgartirma.
```

## Joriy vazifani bajarish

`docs/TASKS.md`da bitta aniq vazifa turganda.

Qisqa: `/vazifa`

```text
docs/TASKS.md’dagi joriy vazifani bajar.
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

Qisqa: `/dizayn`

```text
shadcn MCP serveri orqali "<komponent nomi>" komponentini qidir, nima ekanini qisqa ayt
va loyihaga qo‘sh (npx shadcn@4.21.0 add <nom> ham bo‘ladi).
src/components/ui ichidagi fayllarni qo‘lda tahrirlama.
Keyin uni <qayerda ishlatilishini yozing> joyida ishlat.
Faqat semantik ranglardan foydalan (bg-background, text-muted-foreground, bg-primary).
Oxirida npm run typecheck ishga tushir.
```

## Jadvalga ustun qo‘shish

Mavjud jadvalga yangi maydon kerak bo‘lganda.

Qisqa: `/baza`

```text
clients jadvaliga yangi ustun qo‘shamiz: <ustun nomi> — <nima saqlaydi, majburiymi>.
Qadamlar: src/lib/db/schema.ts’ni yangila, npm run db:generate, yaratilgan SQL faylni menga ko‘rsat
va tushuntir, keyin npm run db:migrate:local.
So‘ng src/features/clients/schema.ts’dagi tekshiruv qoidasini, formani, jadvalni
va kerak bo‘lsa scripts/seed.mjs’ni yangila.
Allaqachon qo‘llangan migratsiya faylini tahrirlama.
Oxirida npm run check va brauzerda tekshiruv.
```

## Yangi modul

Butunlay yangi bo‘lim kerak bo‘lganda (o‘z jadvali, o‘z sahifalari bilan).

Qisqa: `/yangi-modul`

```text
"<Bo‘lim nomi>" nomli yangi bo‘lim qo‘shamiz.
Maydonlari: <maydonlarni sanang, qaysi biri majburiy ekanini ayting>.
src/features/clients naqshini to‘liq nusxala: jadval, migratsiya, zod sxema, queries, actions,
komponentlar, ro‘yxat/qo‘shish/tafsilot/tahrirlash sahifalari, nav yozuvi, testlar.
Har bir server action requireUser() bilan boshlansin.
Bir qadamda bitta ish qil va har qadamdan keyin to‘xtab, natijani menga ko‘rsat.
Oxirida docs/PRODUCT.md, docs/FLOW.md va docs/PROGRESS.md’ni yangila.
```

Batafsil: [../guides/06-yangi-modul.md](../guides/06-yangi-modul.md).

## Xatoni tuzatish

Xato xabari chiqqanda.

Qisqa: `/xato`

```text
Quyidagi xato chiqdi:

<xato matnini shu yerga to‘liq qo‘ying>

Men <nima qilganimni yozing> qilganimda chiqdi.
Avval npm run doctor ishga tushir. Keyin xatoni o‘zbekcha tushuntir: nima bo‘lgan va nima uchun.
Bitta gipoteza tanla va eng kichik tuzatishni taklif qil — men tasdiqlagunimcha kodni o‘zgartirma.
Sababini bilmasang, taxmin qilma: nimani tekshirish kerakligini ayt.
```

## Dizaynni o‘zgartirish

Ko‘rinishni yaxshilash yoki rangni almashtirish kerak bo‘lganda.

Qisqa: `/dizayn`

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

Qisqa: `/tekshir`

```text
Oxirgi o‘zgarishni boshdan oxirigacha tekshir.
1. npm run check ishga tushir va chiqishini menga ko‘rsat.
2. npm run dev bilan serverni ko‘tar va Playwright MCP orqali o‘zgargan oqimni bosib chiq.
3. 390px kenglikda va qorong‘i rejimda ham ko‘r.
Har bir qadam uchun dalil ber: buyruq chiqishi, ochilgan manzil yoki skrinshot.
Biror narsa ishlamasa, yashirma — aniq ayt.
```

## Nashr qilish

O‘zgarishlarni internetga chiqarish kerak bo‘lganda.

Qisqa: `/nashr`

```text
Ilovani Cloudflare’ga nashr qilmoqchiman.
Avval menga tushuntir: nima o‘zgaradi, uzoqdagi bazaga qanday migratsiyalar qo‘llanadi
va bu qaytarib bo‘lmaydigan ish ekanini eslat.
Keyin npx wrangler whoami, npm run check va npm run r2:check ishga tushir.
Hammasi joyida bo‘lsa menga ayt va tasdiq so‘ra — tasdiqsiz deploy qilma.
Nashrdan keyin jonli manzilni och, kirish sahifasi ishlashini tekshir
va docs/PROGRESS.md’ga qayd yoz.
```

## Cloudflare’dan ma’lumot so‘rash

Hisobingizdagi holatni bilmoqchi bo‘lganingizda.

```text
Cloudflare MCP serveri orqali quyidagilarni ayt:
- Hisobimdagi D1 bazalari va R2 bucketlari ro‘yxati.
- crm-boilerplate Worker’ining oxirgi bir soatdagi xatolari bormi.
- crm-boilerplate-db bazasida nechta mijoz yozuvi bor.
Faqat o‘qi — hech narsani yaratma, o‘zgartirma yoki o‘chirma.
Natijani o‘zbekcha, jadval ko‘rinishida ber.
```

## O‘z skill’ingizni yasash

Bir xil topshiriqni uchinchi marta yozayotgan bo‘lsangiz.

```text
skill-creator skill’idan foydalanib yangi skill yasa.
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
