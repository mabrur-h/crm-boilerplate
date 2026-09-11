# Cloudflare: sozlash va nashr qilish

**Vaqt:** 40–60 daqiqa. **Natija:** ilovangiz internetda `.workers.dev` manzilida ishlaydi, bazasi va fayl omborxonasi ulangan, maxfiy kalit joyida, har bir yangi commit avtomatik nashr qilinadi.

Cloudflare — ilova ishlaydigan joy. Bu yerda uchta narsadan foydalanamiz: **Workers** (ilovaning o‘zi), **D1** (SQL bazasi) va **R2** (fayllar). Ular sizning hisobingizda turadi, biz esa ularga kompyuteringizdan yoki GitHub’dan murojaat qilamiz.

## Kerak bo‘ladi

- Loyihaning o‘z nusxasi kompyuteringizda va ishlaydigan `npm run dev` — [01-template-olish.md](01-template-olish.md).
- Cloudflare hisobi: https://dash.cloudflare.com/sign-up.
- Fayl saqlash uchun: karta yoki PayPal (R2 uchun; pul bepul chegaradan oshgandagina yechiladi).

## 1-qadam. Kompyuteringizni Cloudflare hisobiga ulang

`wrangler` — Cloudflare’ning buyruq satri vositasi. U loyihaga allaqachon o‘rnatilgan.

```bash
npx wrangler login
```

Brauzer ochiladi va Cloudflare sahifasi Wrangler’ga hisobingiz bilan ishlash uchun ruxsat so‘raydi: Worker’larni nashr qilish, D1 va R2 bilan ishlash, hisob ma’lumotlarini o‘qish. Bu — o‘z hisobingizga o‘zingizning kompyuteringizdan kirish, ruxsat berish xavfsiz. **Allow** tugmasini bosing va terminalga qayting.

Brauzer o‘zi ochilmasa yoki siz brauzerdagi muhitda ishlayotgan bo‘lsangiz, havolani qo‘lda ochadigan variantdan foydalaning: `npx wrangler login --browser=false`.

**Tekshiring:**

```bash
npx wrangler whoami
```

Hisobingiz nomi va emailingiz chiqadi.

## 2-qadam. Binding nima ekanini bilib oling

Binding — Worker ichidan tashqi resursga beriladigan qisqa nom. Kodda `env.DB` deb yozasiz, Cloudflare esa buni haqiqiy bazaga ulaydi. Kalit yoki parol yozilmaydi — ruxsat hisobingizdan keladi.

Loyihadagi bindinglar `wrangler.jsonc` faylida yozilgan:

| Nomi | Nima | Qayerda ishlatiladi |
| --- | --- | --- |
| `DB` | D1 bazasi `crm-boilerplate-db` | Mijozlar, foydalanuvchilar, sessiyalar, fayl yozuvlari |
| `FILES` | R2 bucket’i `crm-boilerplate-files` | Mijozga biriktirilgan fayllar |
| `AI` | Workers AI | Mijoz sahifasidagi xabar qoralamasi |
| `ASSETS` | Statik fayllar | Rasm, CSS, JS |
| `WORKER_SELF_REFERENCE` | Worker’ning o‘ziga havolasi | Next.js’ning ba’zi imkoniyatlari uchun |

`wrangler.jsonc` faylida hech qanday resurs identifikatori yozilmagan — wrangler nashr paytida kerakli resurslarni nomi bo‘yicha o‘zi topadi yoki yaratadi.

Eslatma: `AI` bindingi mahalliy ishda ham Cloudflare’ning haqiqiy serveriga murojaat qiladi. Shuning uchun `npm run dev` paytida ham qoralama tugmasi ishlashi uchun internet va `wrangler login` kerak.

**Tekshiring:** `wrangler.jsonc` faylini oching va yuqoridagi beshta nomni topib chiqing.

## 3-qadam. Bepul limitlarni biling

2026-09-11 holatiga ko‘ra, Cloudflare’ning rasmiy narx sahifalaridan:

| Xizmat | Bepul rejada |
| --- | --- |
| Workers | Kuniga 100 000 so‘rov; har bir so‘rovga 10 ms protsessor vaqti |
| D1 | Kuniga 5 mln qator o‘qish va 100 000 qator yozish; 5 GB xotira |
| R2 | Oyiga 10 GB xotira, 1 mln Class A (yozish) va 10 mln Class B (o‘qish) operatsiya; chiqish trafigi bepul |
| Workers AI | Kuniga 10 000 neuron (bitta xabar qoralamasi taxminan 16 neuron) |

Kichik jamoa uchun bu odatda yetarli. Kamlik qilsa, Workers Paid rejasi oyiga $5.

**Tekshiring:** raqamlarni [docs/THIRD-PARTY.md](../THIRD-PARTY.md)dagi havolalardan solishtiring — narxlar o‘zgarishi mumkin.

## 4-qadam. R2’ni yoqing

R2 bepul rejada ham hisobingizda alohida yoqiladi va yoqish jarayoni to‘lov ma’lumotini so‘raydi. Pul faqat yuqoridagi chegaradan oshganda yechiladi.

1. https://dash.cloudflare.com manzilini oching.
2. Chap menyudan **Storage & databases → R2** bo‘limiga o‘ting va **Overview** sahifasini oching.
3. R2 obunasini qo‘shish jarayonini oxirigacha bajaring: karta yoki PayPal ma’lumotini kiriting.

R2’ni yoqmasangiz, ilovaning qolgan qismi ishlaydi, faqat fayl yuklashda "Faylni saqlab bo‘lmadi" xatosi chiqadi.

**Tekshiring:**

```bash
npm run r2:check
```

"R2 bu hisobda yoqilgan." deb yozilishi kerak. Bucket hali yaratilmagan bo‘lsa, buyruq ogohlantiradi — u birinchi nashrda o‘zi yaratiladi.

## 5-qadam. Birinchi nashr

```bash
npm run deploy
```

Bu bitta buyruq uchta ishni ketma-ket bajaradi:

1. `opennextjs-cloudflare build` — Next.js ilovasini Cloudflare Worker’i tushunadigan ko‘rinishga yig‘adi.
2. `opennextjs-cloudflare deploy` — natijani hisobingizga yuklaydi va kerakli resurslarni (D1 bazasi, R2 bucket’i) yaratadi.
3. `npm run db:migrate:remote` — internetdagi bazaga migratsiyalarni qo‘llaydi, ya’ni jadvallarni yaratadi.

Uchinchi qadam muhim: usiz sayt ochiladi, lekin kirishga urinsangiz "no such table" xatosi chiqadi.

Nashr tugagach terminalda manzil chiqadi: `crm-boilerplate.<sizning-subdomeningiz>.workers.dev`. Uni keyin ham topish mumkin: Cloudflare panelidagi **Workers & Pages** bo‘limidan Worker’ingizni tanlang.

**Tekshiring:** chiqqan manzilni brauzerda oching — kirish sahifasi ko‘rinadi. Ro‘yxatdan o‘tib, birinchi mijozni qo‘shib ko‘ring.

## 6-qadam. Maxfiy kalitni internetdagi ilovaga yozing

Mahalliy ishda `BETTER_AUTH_SECRET` qiymati `.dev.vars` faylida turadi va uni `npm run setup` o‘zi hosil qilgan. Bu fayl GitHub’ga yuborilmaydi, shuning uchun internetdagi ilova uchun kalitni alohida yozasiz:

```bash
npx wrangler secret put BETTER_AUTH_SECRET
```

Buyruq qiymatni so‘raydi. Uzun tasodifiy matn kiriting (kamida 32 belgi — parol menejeringizning generatoridan oling) va Enter bosing. Kiritilgan qiymat ekranda ko‘rinmaydi va keyin ham hech qayerda ko‘rsatilmaydi.

**Deploy to Cloudflare** tugmasi bilan nashr qilgan bo‘lsangiz, bu qiymatni allaqachon kiritgansiz — qaytarish shart emas.

Kalitni almashtirsangiz, hamma foydalanuvchilar tizimdan chiqib ketadi va qaytadan kirishi kerak bo‘ladi.

**Tekshiring:** `npx wrangler secret list` ro‘yxatida `BETTER_AUTH_SECRET` ko‘rinadi (qiymati emas, faqat nomi).

## 7-qadam. Ro‘yxatdan o‘tishni yoping

Sayt internetda turgani uchun har kim ro‘yxatdan o‘tib, mijozlaringizni ko‘ra oladi. O‘z jamoangizni kiritib bo‘lganingizdan keyin buni yopib qo‘ying.

`wrangler.jsonc` faylida quyidagi qatorni toping va qiymatini `"false"` qiling:

```jsonc
"vars": {
  "ALLOW_SIGNUP": "false"
}
```

So‘ng qaytadan nashr qiling: `npm run deploy`.

**Tekshiring:** `/signup` sahifasini oching — ro‘yxatdan o‘tishga urinsangiz "Ro‘yxatdan o‘tish yopilgan. Administrator bilan bog‘laning." xabari chiqadi. Mavjud hisoblar odatdagidek kiraveradi.

## 8-qadam. Har bir o‘zgarishda avtomatik nashr (Workers Builds)

Bu yoqilsa, GitHub’ga yuborilgan har bir o‘zgarish avtomatik yig‘iladi va nashr qilinadi — `npm run deploy` yozish shart bo‘lmaydi. **Deploy to Cloudflare** tugmasi bilan boshlagan bo‘lsangiz, bu odatda allaqachon sozlangan.

Qo‘lda sozlash:

1. Cloudflare panelida **Workers & Pages** bo‘limiga o‘ting va Worker’ingizni tanlang.
2. **Settings → Builds** bo‘limini oching va **Connect** tugmasi orqali GitHub akkauntingizni hamda repozitoriyangizni ulang.
3. Yig‘ish sozlamalarini kiriting:
   - **Build command** — bo‘sh qoldiring (bu maydon ixtiyoriy)
   - **Deploy command** — `npx opennextjs-cloudflare build && npx opennextjs-cloudflare deploy`. Odatiy qiymat `npx wrangler deploy`, lekin bu loyiha OpenNext orqali yig‘iladi, shuning uchun uni almashtirish shart — aks holda yig‘ilmagan ilova nashr qilinadi.
   - **Git branch** — odatda `main`
   - **Root directory** — bo‘sh qoldiring

Muhim shart: Cloudflare paneldagi Worker nomi `wrangler.jsonc` faylidagi `name` qiymati bilan bir xil bo‘lishi kerak (`crm-boilerplate`), aks holda yig‘ish xato bilan tugaydi.

Eslatma: avtomatik nashr uzoqdagi bazaga migratsiyalarni **qo‘llamaydi**. Baza sxemasini o‘zgartirgan bo‘lsangiz, kompyuteringizdan `npm run db:migrate:remote` buyrug‘ini ishga tushiring.

**Tekshiring:** kichik bir o‘zgarish qilib, uni GitHub’ga yuboring. Worker’ning **Builds** bo‘limida yangi yig‘ish paydo bo‘ladi va bir necha daqiqada saytda o‘zgarish ko‘rinadi.

## 9-qadam. O‘z domeningiz (ixtiyoriy)

Domeningiz Cloudflare’da boshqarilayotgan bo‘lsa:

1. **Workers & Pages** bo‘limidan Worker’ingizni tanlang.
2. **Settings → Domains & Routes → Add → Custom Domain**.
3. Domen yoki subdomenni kiriting va tasdiqlang.

Domen boshqa joyda ro‘yxatdan o‘tgan bo‘lsa, avval uni Cloudflare’ga o‘tkazishingiz kerak. Mavjud CNAME yozuvi turgan nomga custom domain qo‘shib bo‘lmaydi.

**Tekshiring:** bir necha daqiqadan keyin o‘z domeningizni brauzerda oching — ilova ochilishi kerak.

## 10-qadam. `npm run cf:setup` qachon kerak

Odatda kerak emas: `npm run deploy` resurslarni o‘zi topadi va yaratadi. Bu buyruq ikki holatda foydali:

- Nashr "baza topilmadi" yoki "bucket topilmadi" degan xato bersa.
- Siz resurs identifikatorini `wrangler.jsonc` faylida aniq yozib qo‘yishni istasangiz.

Buyruq nima qilishini avval ko‘rib olish uchun: `npm run cf:setup -- --dry-run`. U hech narsani o‘zgartirmasdan, nima bo‘lishini yozib beradi.

**Tekshiring:** `--dry-run` bilan ishga tushirilganda buyruq faqat rejani chop etadi va Cloudflare’da hech narsa o‘zgarmaydi.

## Cloudflare MCP: nima so‘rash mumkin

Agent Cloudflare hisobingizga ulangan bo‘lsa ([02-claude-ulash.md](02-claude-ulash.md) yoki [03-chatgpt-ulash.md](03-chatgpt-ulash.md)), shunday savollar berishingiz mumkin:

```text
Cloudflare hisobimdagi D1 bazalari va R2 bucketlarini ro‘yxatla.
```

```text
crm-boilerplate Worker’ining oxirgi bir soatdagi xato loglariga qara va nima bo‘lganini o‘zbekcha tushuntir.
```

```text
crm-boilerplate-db bazasidagi client jadvalida nechta qator bor?
```

## API kaliti: faqat CI uchun (ixtiyoriy)

Kundalik ishda API kaliti kerak emas — `npx wrangler login` yetadi. Kalit faqat GitHub Actions kabi avtomatik tizim sizning nomingizdan nashr qilishi kerak bo‘lganda ishlatiladi.

1. https://dash.cloudflare.com/?to=/:account/api-tokens sahifasini oching va **Create Token** tugmasini bosing.
2. Ruxsatlar bo‘limida **Edit Cloudflare Workers** shablonini tanlang.
3. Chiqqan qiymatni **faqat bir marta** ko‘rasiz — uni darhol GitHub repozitoriyangizning **Settings → Secrets and variables → Actions** bo‘limiga `CLOUDFLARE_API_TOKEN` nomi bilan qo‘shing. Yoniga `CLOUDFLARE_ACCOUNT_ID` qiymatini ham qo‘shing.

Kalitni hech qachon loyiha fayllariga yozmang va AI suhbatiga qo‘ymang.

## Muammo bo‘lsa

- Nashr `code: 10042` bilan to‘xtasa: [R2 yoqilmagan: code 10042](08-muammolar.md#r2-yoqilmagan-code-10042)
- Saytda `no such table` chiqsa: [Nashrdan keyin no such table xatosi](08-muammolar.md#nashrdan-keyin-no-such-table-xatosi)
- `Worker exceeded CPU time limit` chiqsa: [Worker exceeded CPU time limit](08-muammolar.md#worker-exceeded-cpu-time-limit)
- Qoralama tugmasi ishlamasa: [AI hozir ishlamayapti](08-muammolar.md#ai-hozir-ishlamayapti)
- Ro‘yxatdan o‘ta olmasangiz: [Ro‘yxatdan o‘tish yopilgan](08-muammolar.md#royxatdan-otish-yopilgan)

Barcha muammolar: [08-muammolar.md](08-muammolar.md).

## Keyingi qadam

Ko‘rinishni o‘zingizga moslang: [05-shadcn-ui.md](05-shadcn-ui.md).
