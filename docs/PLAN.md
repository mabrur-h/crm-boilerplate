# Reja

Bu yerda V1 ichida nima allaqachon qilingani va keyin nima qilish mumkinligi yozilgan. Hozir bajarilayotgan bitta vazifa esa [TASKS.md](TASKS.md)da turadi.

Belgilar: `[x]` — bajarilgan va tekshirilgan, `[ ]` — hali boshlanmagan.

## V1 — bajarilgan

- [x] **Loyiha karkasi.** Next.js 16, TypeScript, ESLint, Tailwind CSS 4 va Vitest sozlangan; versiyalar aniq raqam bilan qotirilgan.
      *Dalil:* `npm run check` xatosiz tugaydi.
- [x] **Cloudflare Workers’da ishlash.** OpenNext adapteri va `wrangler.jsonc` sozlangan, bindinglar: `DB`, `FILES`, `AI`, `ASSETS`.
      *Dalil:* `npm run preview` haqiqiy Worker’ni mahalliy ishga tushiradi.
- [x] **Baza va migratsiyalar.** Drizzle sxemasi `src/lib/db/schema.ts`, migratsiyalar `migrations/` papkasida.
      *Dalil:* `npm run db:migrate:local` uchta migratsiyani qo‘llaydi.
- [x] **Kirish va ro‘yxatdan o‘tish.** Better Auth, email va parol, sessiya cookie’si.
      *Dalil:* `/signup` sahifasida hisob yaratib, `/login`dan kira olasiz.
- [x] **Himoyalangan qism.** `(app)` guruhidagi barcha sahifalar `requireUser()` orqali tekshiriladi, har bir server amali ham alohida tekshiradi.
      *Dalil:* chiqib turib `/clients` manzilini ochsangiz, `/login`ga o‘tadi.
- [x] **Mijozlar moduli.** Yaratish, ro‘yxat, ko‘rish, tahrirlash, o‘chirish; zod validatsiyasi; bosqichlar.
      *Dalil:* `/clients` sahifasi va `src/features/clients/` papkasi.
- [x] **Qidiruv va filtr.** Ism, telefon, kompaniya bo‘yicha qidiruv; bosqich bo‘yicha filtr; ikkalasi ham manzilga yoziladi.
      *Dalil:* `/clients?q=aziz&stage=new` manzili to‘g‘ridan-to‘g‘ri ishlaydi.
- [x] **Bosh sahifa.** Bosqichlar bo‘yicha sonlar, "Bugun bog‘lanish kerak" va "Oxirgi qo‘shilganlar" ro‘yxatlari; Toshkent vaqti bo‘yicha.
      *Dalil:* `/dashboard` sahifasi.
- [x] **Fayllar (R2).** Yuklash, ro‘yxat, yuklab olish, o‘chirish; hajm va tur tekshiruvi.
      *Dalil:* mijoz sahifasidagi "Fayllar" kartochkasi va `/api/files/{id}` manzili.
- [x] **AI xabar qoralamasi.** Workers AI orqali o‘zbekcha qoralama; model `@cf/openai/gpt-oss-20b`.
      *Dalil:* mijoz sahifasidagi "Qoralama yaratish" tugmasi.
- [x] **Sozlamalar.** Ismni o‘zgartirish va ko‘rinishni tanlash.
      *Dalil:* `/settings` sahifasi.
- [x] **Dizayn tizimi.** Plus Jakarta Sans shrifti, bitta brend rangi, qorong‘i rejim, bo‘sh/yuklanish/xato holatlari, 390px uchun qoidalar.
      *Dalil:* `src/app/globals.css` va [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md).
- [x] **Sozlash skriptlari.** `npm run setup`, `npm run doctor`, `npm run cf:setup`, `npm run r2:check`, `npm run db:seed`.
      *Dalil:* `npm run doctor` har bir tekshiruv natijasini o‘zbek tilida yozadi.
- [x] **Agent qatlami.** `AGENTS.md`, `CLAUDE.md`, MCP sozlamalari va 9 ta loyiha skill’i.
      *Dalil:* `npm run skills:check` xatosiz tugaydi.
- [x] **Hujjatlar.** README, `docs/` papkasidagi mahsulot va texnik hujjatlar.
      *Dalil:* shu fayl va [docs/README.md](README.md).

## Keyingi bosqichlar (taklif)

Bu vazifalar hali boshlanmagan. Tartib majburiy emas — o‘zingizga keragini tanlang. Har birini AI agentiga bitta-bittadan bering.

### 1. Excel yoki CSV’dan mijozlarni import qilish

- [ ] Holati: boshlanmagan.
- **Bog‘liqlik:** mijozlar moduli (bajarilgan). Qo‘shimcha tashqi xizmat kerak emas.
- **Natija:** foydalanuvchi `/clients` sahifasida fayl tanlaydi, ustunlarni mijoz maydonlariga moslaydi va ro‘yxatni bir marta yuklaydi. Xatoli qatorlar alohida ko‘rsatiladi va qolganlari baribir saqlanadi.
- **Tekshiruv:** 20 qatorli namunaviy CSV yuklang. Ro‘yxatda 20 ta yangi mijoz paydo bo‘lsin. Ataylab bitta qatorga bo‘sh ism qo‘ying — o‘sha qator saqlanmasin va sababi ko‘rsatilsin. Bir xil faylni ikkinchi marta yuklaganda takror yozuv paydo bo‘lmasligini ham tekshiring.
- **Tegmaymiz:** eksport, avtomatik takrorlarni birlashtirish, jadval ustunlarini o‘zgartirish.

### 2. Telegram orqali eslatma

- [ ] Holati: boshlanmagan.
- **Bog‘liqlik:** "Bugun bog‘lanish kerak" ro‘yxati (bajarilgan); Telegram bot tokeni; Cloudflare Cron Trigger.
- **Natija:** har kuni belgilangan vaqtda bot foydalanuvchiga bugun bog‘lanish kerak bo‘lgan mijozlar ro‘yxatini yuboradi.
- **Tekshiruv:** Cron’ni qo‘lda ishga tushiring va Telegram’ga xabar kelganini ko‘ring. Ro‘yxat bo‘sh bo‘lgan kunda xabar yuborilmasligini ham tekshiring.
- **Tegmaymiz:** Telegram orqali mijoz qo‘shish yoki tahrirlash, guruh chatlari, ikki tomonlama sinxronlash.

### 3. Cloudflare Email orqali parolni tiklash

- [ ] Holati: boshlanmagan.
- **Bog‘liqlik:** Better Auth o‘rnatilgan, lekin parolni tiklash qismi sozlanmagan; Cloudflare Email Service va tasdiqlangan domen kerak bo‘ladi. Loyihada `cloudflare-email-service` skill’i shu ish uchun tayyor turibdi.
- **Natija:** kirish sahifasida "Parolni unutdingizmi?" havolasi paydo bo‘ladi; foydalanuvchi emailini kiritadi, pochtasiga bir martalik havola keladi va yangi parol o‘rnatadi.
- **Tekshiruv:** haqiqiy email manzil bilan tiklash so‘rovini yuboring, xatdagi havola orqali parolni o‘zgartiring va yangi parol bilan kiring. Eski havola ikkinchi marta ishlamasligini tekshiring.
- **Tegmaymiz:** emailni tasdiqlash, ikki bosqichli kirish, boshqa pochta xizmatlari.

### 4. Rollar va ruxsatlar

- [ ] Holati: boshlanmagan.
- **Bog‘liqlik:** hozirgi bitta umumiy ro‘yxat modeli (qarang: [PRODUCT.md](PRODUCT.md) "Qoidalar"). Bu vazifa `requireUser()` chaqiriladigan barcha joyga tegadi.
- **Natija:** ikki rol bo‘ladi: administrator va menejer. Menejer mijozlarni ko‘radi va tahrirlaydi, lekin o‘chira olmaydi va sozlamalarga kira olmaydi.
- **Tekshiruv:** menejer roli bilan kiring — "O‘chirish" tugmasi ko‘rinmasin. O‘sha foydalanuvchi o‘chirish so‘rovini to‘g‘ridan-to‘g‘ri yuborishga urinsa ham, server rad etsin.
- **Tegmaymiz:** bir nechta jamoa (tenant), taklifnoma orqali qo‘shish, har bir maydon uchun alohida ruxsat.

### 5. Mijoz tarixi va izohlar lentasi

- [ ] Holati: boshlanmagan.
- **Bog‘liqlik:** mijozlar moduli (bajarilgan); bazaga yangi jadval kerak — `baza` skill’idan foydalaning.
- **Natija:** mijoz sahifasida vaqt bo‘yicha tartiblangan lenta: qo‘lda yozilgan izohlar va avtomatik yozuvlar (bosqich o‘zgardi, fayl qo‘shildi). Hozirgi bitta "Izoh" maydoni o‘rniga to‘liq tarix.
- **Tekshiruv:** bosqichni o‘zgartiring — lentada yangi yozuv paydo bo‘lsin. Qo‘lda izoh qo‘shing va uni o‘chiring. Sahifani yangilaganda tartib saqlanishini tekshiring.
- **Tegmaymiz:** izohlarga fayl biriktirish, boshqa foydalanuvchilarni eslatish (mention), bildirishnomalar.

### 6. Turnstile bilan bot himoyasi

- [ ] Holati: boshlanmagan.
- **Bog‘liqlik:** kirish va ro‘yxatdan o‘tish formalari (bajarilgan); Cloudflare Turnstile kaliti. Loyihada `turnstile-spin` skill’i shu ish uchun tayyor turibdi.
- **Natija:** ro‘yxatdan o‘tish va kirish formalarida Turnstile tekshiruvi bo‘ladi; server tekshiruvdan o‘tmagan so‘rovni rad etadi.
- **Tekshiruv:** formani to‘ldiring — tekshiruv o‘tgach hisob yaratilsin. Turnstile javobisiz so‘rov yuborilsa, server rad etsin va tushunarli xato chiqsin.
- **Tegmaymiz:** boshqa formalarni himoyalash, IP bo‘yicha cheklash, WAF qoidalari.

## Bu ro‘yxatga qanday qo‘shasiz

Yangi bosqich qo‘shganda yuqoridagi shaklni saqlang: **Bog‘liqlik**, **Natija**, **Tekshiruv**, **Tegmaymiz**. "Backendni yoz" yoki "UI’ni tugat" kabi katta vazifa o‘rniga foydalanuvchi oxirida nima qila olishini yozing.
