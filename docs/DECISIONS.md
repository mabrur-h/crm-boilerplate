# Qarorlar

Bu yerda loyihaning muhim texnik tanlovlari yozilgan: nima uchun aynan shunday qilingan va bu nimaga olib keladi.

Yangi muhim qaror qabul qilganda shu yerga qo‘shing. Eskisini o‘chirmang — u nima uchun shunday bo‘lganini keyin tushuntiradi.

Har bir yozuv to‘rt qismdan iborat: **Kontekst** (vaziyat), **Qaror** (nima tanlandi), **Sabab** (nega), **Oqibat** (bundan keyin nima o‘zgaradi). Oqibatda: ➕ yutuq, ➖ yo‘qotish, ⚠️ ehtiyot bo‘lish kerak bo‘lgan joy.

---

## D1. Next.js Cloudflare Workers’da OpenNext orqali ishlaydi

**Kontekst.** Next.js ilovasini Cloudflare’da ishlatishning bir nechta yo‘li bor. Ular orasida yangi, tezroq deb taklif qilinadigan vinext ham bor, lekin u hali beta bosqichida.

**Qaror.** `@opennextjs/cloudflare` adapteri ishlatiladi. vinext ishlatilmaydi.

**Sabab.** Loyihada faqat barqaror (stable) versiyalar ishlatiladi. Beta vosita ustida qurilgan shablon texnik bilimi yo‘q odam uchun tuzatib bo‘lmaydigan xatolarga olib keladi.

**Oqibat.**
- ➕ Yig‘ilish va nashr jarayoni barqaror: kutilmagan o‘zgarish bo‘lmaydi.
- ➖ Eng yangi imkoniyatlar biroz kechroq yetib keladi.
- ⚠️ AI agenti Cloudflare hujjatlarini o‘qib, vinext’ga o‘tishni taklif qilishi mumkin. `AGENTS.md`da bu aniq taqiqlangan — taklifni qabul qilmang.

---

## D2. Paket menejeri — faqat npm

**Kontekst.** Node loyihalarida npm, pnpm, yarn va bun ishlatiladi.

**Qaror.** Faqat npm. `package-lock.json` loyihaga qo‘shiladi.

**Sabab.** npm Node.js bilan birga keladi, alohida o‘rnatish shart emas. Bitta qulf faylining bo‘lishi "menda ishlayapti, sizda ishlamayapti" holatlarini kamaytiradi.

**Oqibat.**
- ➕ `npm run setup` boshqa hech narsa talab qilmaydi.
- ➖ npm ba’zi muqobillaridan sekinroq.
- ⚠️ `package-lock.json` faylini qo‘lda tahrirlamang; u buyruqlar orqali yangilanadi.

---

## D3. Interfeys — shadcn/ui, Radix asosida, neutral rang

**Kontekst.** Tayyor komponent kutubxonasi kerak edi: tugma, forma, jadval, dialog.

**Qaror.** shadcn/ui, `components.json`da `baseColor: "neutral"`, CSS o‘zgaruvchilari yoqilgan. Komponentlar faqat `npx shadcn@4.21.0 add …` orqali qo‘shiladi; `src/components/ui/*` fayllari qo‘lda tahrirlanmaydi.

**Sabab.** shadcn/ui komponentlari sizning loyihangiz ichida turadi, ya’ni ular o‘zgarmas kutubxona emas. Neutral asos har qanday brend rangi bilan yaxshi ishlaydi. Qo‘lda tahrirlash taqiqlangani komponentni keyin yangilash imkonini saqlaydi.

**Oqibat.**
- ➕ Yangi komponent bir buyruq bilan qo‘shiladi.
- ➖ Komponent xatti-harakatini o‘zgartirish uchun uni o‘rab olishga to‘g‘ri keladi.
- ⚠️ `src/components/ui/*`ga qo‘lda kiritilgan o‘zgarish keyingi yangilashda yo‘qoladi.

---

## D4. Baza — Cloudflare D1, Drizzle bilan, migratsiyalar wrangler orqali

**Kontekst.** Ma’lumotlar Cloudflare ichida saqlanishi kerak edi, sxema o‘zgarishlari esa kuzatilishi kerak.

**Qaror.** D1 (SQLite) baza; sxema `src/lib/db/schema.ts`da Drizzle bilan yoziladi; `npm run db:generate` `migrations/` papkasiga SQL fayl yaratadi; u `wrangler d1 migrations apply` bilan qo‘llanadi.

**Sabab.** Bitta migratsiya tizimi bo‘lishi kerak. Drizzle sxemadan SQL yozadi, wrangler esa qaysi migratsiya qo‘llanganini o‘zi kuzatadi — ikki tizim orasidagi ziddiyat yo‘qoladi.

**Oqibat.**
- ➕ Sxema o‘zgarishi kod bilan birga versiyalanadi.
- ➖ Har bir o‘zgarish uchun ikki qadam: yaratish, keyin qo‘llash.
- ⚠️ Allaqachon qo‘llangan migratsiya faylini hech qachon tahrirlamang — yangisini qo‘shing.

---

## D5. Parol xeshlash — Better Auth’ning standart usuli

**Kontekst.** Cloudflare Workers’ning bepul rejasida bitta so‘rovga 10 ms protsessor vaqti beriladi. Parol xeshlash — ataylab sekin qilingan amal, shuning uchun bu chegara savol tug‘diradi.

**Qaror.** Better Auth’ning o‘z standart xeshlashi ishlatiladi, hech qanday maxsus xeshlash qo‘shilmaydi.

**Sabab.** Better Auth `scrypt`ni ishlatadi va muhitga qarab mos amalga oshirishni o‘zi tanlaydi: Node muhitida (`nodejs_compat` yoqilgan Workers ham shunga kiradi) `node:crypto scrypt`, qolganda esa toza JS muqobili — buni `node_modules/better-auth/dist/crypto/password.mjs` faylidagi izoh tasdiqlaydi. Mahalliy Worker’da o‘tkazilgan sinovda kirish va ro‘yxatdan o‘tish so‘rovlarida protsessor vaqti chegarasiga tegishli xato chiqmadi.

**Oqibat.**
- ➕ Xavfsizlik kutubxonaning o‘z mas’uliyatida qoladi, qo‘lda yozilgan kriptografiya yo‘q.
- ➖ Xeshlash tezligini o‘zimiz sozlay olmaymiz.
- ⚠️ Agar nashrdan keyin loglarda protsessor vaqti bilan bog‘liq xato ko‘rinsa, birinchi navbatda shu joyni tekshiring.

---

## D6. `middleware.ts` yo‘q — himoya server tomonida

**Kontekst.** Next.js’da sahifalarni himoyalashning odatiy yo‘li — `middleware.ts` fayli.

**Qaror.** `middleware.ts` ham, `proxy.ts` ham ishlatilmaydi. Himoya `requireUser()` funksiyasi orqali: u `src/app/(app)/layout.tsx`da chaqiriladi va yana alohida — foydalanuvchi ma’lumotiga tegadigan har bir server amali va marshrut ichida.

**Sabab.** Middleware faqat sahifalarni qoplaydi, server amallarini emas. Himoyani ma’lumotga eng yaqin joyga qo‘yish xavfsizroq: bitta joyda unutib qo‘yish butun tizimni ochib yubormaydi.

**Oqibat.**
- ➕ Har bir amal o‘zini o‘zi himoya qiladi.
- ➖ `requireUser()` ko‘p joyda takrorlanadi.
- ⚠️ Yangi server amali yozganda birinchi qator `await requireUser()` bo‘lishi shart. Yangi modul yozayotganda `src/features/clients/actions.ts` faylidan nusxa oling.

---

## D7. Ro‘yxatdan o‘tishni yopish uchun `ALLOW_SIGNUP` sozlamasi

**Kontekst.** Ilova internetga chiqqanidan keyin istalgan odam hisob yaratib kirishi mumkin edi.

**Qaror.** `wrangler.jsonc`da `ALLOW_SIGNUP` degan sozlama bor, boshlang‘ich qiymati `"true"`. Qiymat boshqa bo‘lsa, ro‘yxatdan o‘tish serverda ham, ekranda ham yopiladi.

**Sabab.** Boshlang‘ich holatda ochiq bo‘lishi kerak — aks holda hech kim birinchi hisobni yarata olmaydi. Yopish esa bir so‘zni o‘zgartirish darajasida oson bo‘lishi kerak.

**Oqibat.**
- ➕ Jamoani yig‘ib bo‘lgach eshikni yopish bir qatorlik ish.
- ➖ Taklifnoma orqali qo‘shish yo‘q: yangi xodim uchun sozlamani vaqtincha ochishga to‘g‘ri keladi.
- ⚠️ Nashr qilgandan keyin uni yopishni unutmang.

---

## D8. R2 boshidanoq yoqilgan

**Kontekst.** Fayl saqlash uchun Cloudflare R2 ishlatiladi. R2 bepul rejada ham hisobda to‘lov ma’lumoti turishini talab qiladi.

**Qaror.** R2 shablonning asosiy qismi bo‘lib qoladi: `wrangler.jsonc`da `FILES` bindingi boshidan yozilgan.

**Sabab.** Mijozga shartnoma biriktirish — CRM’ning asosiy ehtiyoji. Uni keyinroq qo‘shish ancha qiyin ish.

**Oqibat.**
- ➕ Fayllar birinchi kundan ishlaydi.
- ➖ Foydalanuvchi Cloudflare’da to‘lov ma’lumotini kiritishi kerak bo‘ladi.
- ⚠️ Pul faqat bepul chegaradan oshgandagina yechiladi. `npm run r2:check` R2 yoqilganini tekshiradi, `docs/guides/04-cloudflare.md` esa jarayonni qadamma-qadam tushuntiradi.

---

## D9. AI modeli — `@cf/openai/gpt-oss-20b`

**Kontekst.** Workers AI’da o‘zbekcha matn yoza oladigan bir nechta model bor. Uchtasi bir xil so‘rov bilan solishtirildi.

**Qaror.** `@cf/openai/gpt-oss-20b` tanlandi. Model nomi `src/lib/ai.ts` faylidagi bitta o‘zgaruvchida turadi.

**Sabab.** Solishtirishda u eng arzon (bitta so‘rovga ~16 neuron) va eng tez bo‘ldi, o‘zbekchasi toza chiqdi va boshqa modellardek `[Ismingiz]` kabi to‘ldirilmagan joy qoldirmadi. `@cf/openai/gpt-oss-120b` qimmatroq va o‘rin egallovchi qoldirdi; `@cf/meta/llama-3.3-70b-instruct-fp8-fast` eng qimmat bo‘ldi va bitta gapi g‘aliz chiqdi.

**Oqibat.**
- ➕ Bepul chegaraga kuniga 600 tacha qoralama sig‘adi.
- ➖ Bu "fikrlaydigan" model: javob berishdan oldin ichki hisob-kitobga token sarflaydi, juda uzun izoh berilsa javob bo‘sh qolishi mumkin.
- ⚠️ Javob bo‘sh kelsa, ilova bo‘sh qoralama ko‘rsatmaydi — "AI hozir ishlamayapti. Keyinroq urinib ko‘ring." xabarini chiqaradi. Modelni almashtirish uchun `src/lib/ai.ts`dagi bitta qatorni o‘zgartiring.

---

## D10. Cloudflare bilan bog‘lanish — brauzer orqali kirish, API kalitisiz

**Kontekst.** Cloudflare’ga ulanishning ikki yo‘li bor: brauzer orqali kirish yoki API kaliti (token) yaratib, uni faylga yozib qo‘yish.

**Qaror.** Kundalik ishda `npx wrangler login` (brauzerda ochiladi) va Cloudflare MCP serverining o‘z kirish jarayoni ishlatiladi. API kaliti faqat avtomatik tizim (CI) uchun, uni ham loyihaga emas, GitHub’ning maxfiy sozlamalariga yoziladi.

**Sabab.** Texnik bilimi yo‘q odam uchun brauzerdagi "Allow" tugmasi token yaratishdan ancha oson va xavfsizroq. Kalit fayl ichida qolib ketsa, u tasodifan GitHub’ga chiqib ketishi mumkin.

**Oqibat.**
- ➕ Loyihada saqlanadigan Cloudflare kaliti yo‘q.
- ➖ Har bir yangi kompyuterda bir marta brauzerdan kirishga to‘g‘ri keladi.
- ⚠️ Kalitni hech qachon chatga yozmang va `.dev.vars` faylini GitHub’ga yubormang — u `.gitignore`da ataylab turibdi.

---

## D11. Resurslar avtomatik yaratiladi, `cf:setup` esa zaxira yo‘l

**Kontekst.** Ilova ishlashi uchun Cloudflare’da baza va bucket bo‘lishi kerak. Ularning identifikatorini `wrangler.jsonc`ga qo‘lda yozish mumkin edi.

**Qaror.** `wrangler.jsonc`da hech qanday identifikator yozilmagan — faqat nomlar (`crm-boilerplate-db`, `crm-boilerplate-files`). Nashr paytida wrangler yo‘q resursni o‘zi yaratadi. Bu ishlamasa yoki boshqacha qilish kerak bo‘lsa, `npm run cf:setup` bor.

**Sabab.** Shablondan nusxa olgan har bir odam o‘z hisobida o‘z resurslarini oladi. Faylda begona identifikator qolib ketsa, u boshqa birovning bazasiga ulanishga urinadi.

**Oqibat.**
- ➕ Nusxa olib, darhol nashr qilish mumkin — hech narsa sozlash shart emas.
- ➖ Birinchi nashr biroz uzoqroq davom etadi.
- ⚠️ `npm run cf:setup` Cloudflare’da haqiqiy resurs yaratadi. U avval so‘raydi; `--dry-run` bilan nima qilishini oldindan ko‘rish mumkin.

---

## D12. Nashr tartibi — avval ilova, keyin migratsiya

**Kontekst.** `npm run deploy` ikki ishni bajaradi: ilovani chiqaradi va uzoqdagi bazaga migratsiyalarni qo‘llaydi. Tartib muhim.

**Qaror.** Avval `opennextjs-cloudflare deploy`, keyin `npm run db:migrate:remote` — shu tartibda, bitta buyruqda.

**Sabab.** Birinchi nashrdan oldin baza umuman mavjud bo‘lmaydi: uni wrangler nashr paytida yaratadi. Migratsiyani oldin qo‘yish esa birinchi nashrni butunlay to‘xtatib qo‘yadi.

**Oqibat.**
- ➕ Birinchi nashr bo‘sh hisobda ham ishlaydi.
- ➖ Nashr bilan migratsiya orasida qisqa oraliq bor: o‘sha qisqa oraliqda yangi kod hali eski bazaga murojaat qilishi mumkin.
- ⚠️ Ustun o‘chiradigan yoki nomini o‘zgartiradigan migratsiyani ikki bosqichda qiling: avval kod ikkala variantda ham ishlaydigan bo‘lsin, keyin sxemani o‘zgartiring.

---

## D13. Uchinchi tomon skill’lari loyiha ichiga nusxalanadi

**Kontekst.** Cloudflare, shadcn/ui va boshqalar AI agentlari uchun tayyor skill’lar chiqargan. Ularni har safar internetdan yuklab olish yoki loyiha ichiga ko‘chirib qo‘yish mumkin edi.

**Qaror.** Skill’lar loyiha ichiga ko‘chiriladi (`.agents/skills/`, `.claude/skills/`). Har bir skill uchun manba repozitoriyasi, yo‘li, aniq commit va litsenziyasi `skills.config.json` faylida yoziladi; odam o‘qiydigan izoh esa `THIRD_PARTY_NOTICES.md`da. Har bir papkada o‘z `LICENSE` fayli turadi. Litsenziyasi topilmagan yoki cheklovli bo‘lgan skill umuman olinmaydi.

**Sabab.** Agent internetsiz ham ishlashi kerak, natija esa bugun va olti oydan keyin bir xil bo‘lishi kerak. Boshqa odamning ishini nusxalab olar ekansiz, uning litsenziyasini ham ko‘rsatish shart.

**Oqibat.**
- ➕ Agent har doim bir xil ko‘rsatmani o‘qiydi.
- ➖ Yangilanishlar avtomatik kelmaydi — `npm run skills:update` buyrug‘ini o‘zingiz ishga tushirasiz.
- ⚠️ Yangi skill qo‘shganda `THIRD_PARTY_NOTICES.md`ni ham yangilang. `npm run skills:check` fayllar mos kelishini tekshiradi.

---

## D14. `AGENTS.md` — asosiy fayl, `CLAUDE.md` esa unga havola qiladi

**Kontekst.** Har bir AI agenti o‘z qoidalar faylini qidiradi: Claude `CLAUDE.md`ni, Codex esa `AGENTS.md`ni.

**Qaror.** Barcha loyiha qoidalari `AGENTS.md`da yoziladi. `CLAUDE.md` esa uni `@AGENTS.md` qatori orqali ichiga oladi va faqat Claude’ga tegishli bir necha eslatmani qo‘shadi.

**Sabab.** Bitta qoida ikki faylda takrorlansa, ular albatta bir-biridan uzoqlashadi. Havola bunday bo‘linishga yo‘l qo‘ymaydi.

**Oqibat.**
- ➕ Qoidani bitta joyda o‘zgartirasiz, ikkala agent ham darhol ko‘radi.
- ➖ Faqat `CLAUDE.md` faylini o‘qigan odam qoidalarni ko‘rmaydi.
- ⚠️ `AGENTS.md` tepasidagi Next.js bloki avtomatik yoziladi (`npm run dev` uni qayta qo‘shadi). Uni o‘chirmang; ostidagi "Project rules" qismini tahrirlang.

---

## D15. O‘zbek matnida tipografik apostrof

**Kontekst.** O‘zbek lotin yozuvida `o‘`, `g‘` va `ma’lumot` kabi so‘zlarda apostrof ishlatiladi. Klaviaturadan odatda oddiy ASCII `'` belgisi kiritiladi.

**Qaror.** `o‘` va `g‘` uchun `‘` (U+2018), tutuq belgisi uchun `’` (U+2019). ASCII `'` belgisi o‘zbekcha so‘zlarda ishlatilmaydi. Kod, manzil va buyruqlarda bu qoida amal qilmaydi.

**Sabab.** Bu O‘zbekistonda qabul qilingan yozuv me’yori. Ikki xil belgi aralashib ketsa, matn qidiruvda ham, ko‘rinishda ham buziladi.

**Oqibat.**
- ➕ Matn bir xil va to‘g‘ri ko‘rinadi. Shrift sozlamalari ham shunga moslangan.
- ➖ Bu belgilarni klaviaturadan to‘g‘ridan-to‘g‘ri yozish qiyin — nusxalash osonroq.
- ⚠️ AI yozgan qoralamada apostroflar aralash kelishi mumkin. Bu ataylab tuzatilmaydi: qoralamani odam baribir tahrirlaydi.

---

## D16. Versiyalar aniq raqam bilan qotiriladi

**Kontekst.** `package.json`da versiyani `^16.3.4` kabi yozish mumkin — u holda `npm install` har safar yangiroq versiyani olib kelishi mumkin.

**Qaror.** `.npmrc`da `save-exact=true`. Har bir paket aniq bitta versiyaga bog‘langan. Beta, rc yoki canary versiyalar ishlatilmaydi. `engine-strict=true` esa Node versiyasi mos kelmasa o‘rnatishni to‘xtatadi.

**Sabab.** Shablondan nusxa olgan odam bugun ham, olti oydan keyin ham bir xil ishlaydigan loyihani olishi kerak. Kutilmagan yangilanish texnik bilimi yo‘q odam uchun tuzatib bo‘lmas muammo.

**Oqibat.**
- ➕ Loyiha bugun va keyin bir xil ishlaydi.
- ➖ Xavfsizlik yangilanishlari o‘z-o‘zidan kelmaydi.
- ⚠️ Versiyani ko‘tarishdan oldin `peerDependencies`ni tekshiring va keyin `npm run check` ishga tushiring.

### Hozirgi versiyalar

Bular `package.json` faylidan olingan.

| Paket | Versiya |
| --- | --- |
| Node (`.nvmrc`) | `24` |
| Node (`engines.node`) | `>=22` |
| next | 16.3.4 |
| eslint-config-next | 16.3.4 |
| react | 19.2.8 |
| react-dom | 19.2.8 |
| @opennextjs/cloudflare | 1.20.6 |
| wrangler | 4.131.1 |
| typescript | 6.0.3 |
| eslint | 9.39.5 |
| tailwindcss | 4.3.3 |
| @tailwindcss/postcss | 4.3.3 |
| shadcn | 4.21.0 |
| radix-ui | 1.6.7 |
| better-auth | 1.7.4 |
| drizzle-orm | 0.45.2 |
| drizzle-kit | 0.31.10 |
| zod | 4.6.2 |
| vitest | 4.1.11 |
| next-themes | 0.4.6 |
| lucide-react | 1.45.0 |
| sonner | 2.0.8 |
| class-variance-authority | 0.7.1 |
| cn | 0.2.6 |
| tw-animate-css | 1.4.0 |
| @types/node | 20.19.43 |
| @types/react | 19.3.0 |
| @types/react-dom | 19.3.0 |
