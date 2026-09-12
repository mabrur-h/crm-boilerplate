# Boshqa xizmatlar bilan bog‘lash (integratsiyalar)

**Vaqt:** 1–3 soat, xizmatga qarab. **Natija:** tashqi xizmatdagi ma’lumot CRM’ga tushadi yoki CRM tashqi xizmatga xabar yuboradi, yangi kalit esa xavfsiz joyda turadi.

Bu shablonda hozircha birorta ham tayyor integratsiya yo‘q. Bu hujjat kod emas, **usul**ni o‘rgatadi: tashqi xizmatni ulash kerak bo‘lganda AI agentga qanday topshiriq berish, kalitni qayerga yozish va kodni qaysi naqsh bo‘yicha yozdirish kerakligini. Har qanday integratsiya kodi ham `src/features/clients` naqshiga amal qilishi kerak — bo‘lim ichida schema, queries, actions, components ([06-yangi-modul.md](06-yangi-modul.md)dagi kabi).

## Kerak bo‘ladi

- Ishlaydigan loyiha va `npm run dev` — [01-template-olish.md](01-template-olish.md).
- Ulangan AI agenti — [02-claude-ulash.md](02-claude-ulash.md) yoki [03-chatgpt-ulash.md](03-chatgpt-ulash.md).
- Ulanmoqchi bo‘lgan xizmatning o‘z hisobi (masalan, Google hisobingiz).

## Asosiy tushunchalar

Har bir onlayn xizmat (Google, Telegram, bank, pochta xizmati) dasturlar kira oladigan "eshik" ochib qo‘yadi — buni **API** deyiladi. Odam uchun bu tugma yoki forma bo‘lsa, dastur uchun aynan shu eshik: belgilangan formatda so‘rov yuborasiz, belgilangan formatda javob olasiz.

**Integratsiya** — ikkita dasturning shu eshik orqali ma’lumot almashishi. Masalan, CRM Google Jadvaliga "menga mijozlar ro‘yxatini ber" deb so‘raydi, Google esa javobni JSON deb ataladigan formatda qaytaradi — bu ikkala tomon ham tushunadigan matn ko‘rinishi.

Xizmat qanday bo‘lishidan qat’iy nazar, integratsiya doim uchta qismdan iborat:

1. **Kalit yoki ruxsat (API key yoki OAuth).** Xizmatga "bu men, ruxsat ber" deb tanishtiradigan maxfiy qiymat — bank kartasidagi PIN kabi, kim ekaningizni tasdiqlaydi.
2. **So‘rov yuboradigan kod.** Kalitni ishlatib xizmatga murojaat qiladigan, javobni o‘qiydigan funksiya. Bu loyihada bunday kod `src/features/<bo‘lim>/` ichida yashaydi va kalitni faqat `getEnv()` orqali oladi.
3. **Natijani CRM’ning o‘z interfeysida ko‘rsatish.** Xom javobni odam o‘qiydigan jadval, tugma yoki xabarga aylantirish — masalan, "Google’dan import qilish" tugmasi yoki mijoz kartasidagi yangi bo‘lim.

Uchinchi qism ko‘pincha unutiladi: kalit ham bor, kod ham ishlayapti, lekin natija hech qayerda ko‘rinmaydi. Agentga topshiriq berganda uni ham aniq so‘rang.

## 1-qadam. Kalitni xavfsiz joylashtiring

Bu bo‘lim eng muhimi: noto‘g‘ri joyga yozilgan kalit internetda ochiq qolib ketishi mumkin. Uch qoida, istisnosiz:

- Kalitni kod ichiga yozmang.
- Kalitni AI suhbatiga oddiy matn sifatida yopishtirmang — agent uni o‘qib, keyin qayerdadir saqlab qo‘yishi mumkin.
- Kalitni hech qachon commit qilmang.

Loyihada `BETTER_AUTH_SECRET` kaliti aynan shu naqsh bo‘yicha saqlanadi — yangi kalitni ham xuddi shunday joylashtirasiz:

1. **Mahalliy ishda:** qiymatni `.dev.vars` fayliga yozasiz. Bu fayl `.gitignore`da turibdi (`.dev.vars` va `.dev.vars.*` qatorlari), shuning uchun GitHub’ga hech qachon ketmaydi. `.dev.vars.example` fayliga esa nomi bo‘sh qoldirilgan holda qo‘shiladi — boshqa odam loyihani ochganda qaysi kalit kerakligini shundan bilib oladi.
2. **Tur bildirish:** `src/lib/env.d.ts` fayliga yangi maydonni qo‘shasiz — `BETTER_AUTH_SECRET` qanday yozilgan, xuddi shunday. Bu maydon `wrangler.jsonc`da yozilmaydi, chunki maxfiy qiymatlar u yerga yozilmaydi.
3. **Kodda o‘qish:** faqat `src/lib/cloudflare.ts`dagi `getEnv()` orqali — boshqa hech qayerda `getCloudflareContext()` chaqirilmaydi.
4. **Nashr qilingan ilovada:** kalitni quyidagi buyruq bilan yozasiz — `BETTER_AUTH_SECRET` uchun ishlatilgan xuddi shu buyruq, faqat nomi boshqa:

   ```bash
   npx wrangler secret put GOOGLE_SHEETS_API_KEY
   ```

   Buyruq qiymatni so‘raydi, ekranda ko‘rinmaydi va keyin ham hech qayerda ko‘rsatilmaydi. Batafsil: [04-cloudflare.md](04-cloudflare.md#6-qadam-maxfiy-kalitni-internetdagi-ilovaga-yozing).

**Tekshiring:** `.gitignore` faylini oching — `.dev.vars` qatorini ko‘rasiz. `npx wrangler secret list` buyrug‘ini ishga tushirsangiz, yangi kalitning nomi (qiymati emas) ro‘yxatda chiqadi.

## 2-qadam. Misol: Google Jadvalidan bir martalik import

Eng oddiy yo‘l — hech qanday kalit kerak emas. Google Jadvalini ochib, **Fayl → Yuklab olish → CSV** orqali kompyuteringizga saqlaysiz, so‘ng agentdan bir martalik skript yozib, to‘g‘ridan-to‘g‘ri mahalliy bazaga yozishini so‘raysiz.

```text
scripts/seed.mjs faylini o‘qi — bu bir martalik skriptlar qanday yozilishini ko‘rsatadi.
Men Google Jadvalidan yuklab olgan mijozlar.csv faylini loyiha papkasiga qo‘ydim.
Shu naqsh bo‘yicha scripts/import-google-sheet.mjs skriptini yoz: CSV faylni o‘qisin,
har bir qatorni src/lib/db/schema.ts’dagi client jadvaliga mos ustunlarga solishtirsin,
so‘ng mahalliy D1 bazasiga yozsin. Hech qanday API kalit kerak emas.
Ishga tushirishdan oldin qatorlar sonini va bir nechta namunani menga ko‘rsat,
faqat men tasdiqlagandan keyin bazaga yoz.
```

**Tekshiring:** `npm run dev` ishlab turganda `/clients` sahifasini oching — import qilingan mijozlar ro‘yxatda ko‘rinadi.

## 3-qadam. Misol: Google Jadvali bilan doimiy sinxronizatsiya

Ma’lumot Google Jadvalida doim yangilanib tursa va CRM shundan xabardor bo‘lishi kerak bo‘lsa, bir martalik import yetarli emas — bunda Google Sheets API kerak bo‘ladi, ya’ni 1-qadamdagi kalit.

Google’ning o‘z konsolida kalit olish qadamlari (loyiha yaratish, API’ni yoqish, kalit yoki xizmat hisobini olish) vaqt o‘tishi bilan o‘zgarib turadi. Shuning uchun bu yerda aniq tugma yoki menyu nomlarini yozib qo‘ymaymiz — bunday holatda loyihaning o‘zi ham xuddi shu qoidaga amal qiladi ([02-claude-ulash.md](02-claude-ulash.md) va [03-chatgpt-ulash.md](03-chatgpt-ulash.md)dagi Claude/ChatGPT sozlamalari kabi): agentga hozirgi rasmiy yo‘lni o‘zi izlashni topshiring.

```text
CRM’ni Google Sheets API bilan ulamoqchiman: bazadagi mijozlar ro‘yxati bitta jadvalda
doim yangilanib tursin.
Avval Google Sheets API uchun kalit olishning hozirgi qadamlarini o‘zing izlab top —
aniq menyu nomlarini menga taxmin qilib aytma, hozirgi rasmiy hujjatga qara.
Qadamlarni menga oddiy tilda tushuntir, men Google konsolida o‘zim bosaman.
Kalitni olgach, uni src/lib/env.d.ts’ga GOOGLE_SHEETS_API_KEY nomi bilan qo‘sh,
.dev.vars.example’ga bo‘sh qator sifatida qo‘sh, so‘ng src/features/clients naqshi
bo‘yicha sinxronizatsiya funksiyasini yoz va uni sozlamalar sahifasidagi
"Google Jadvali bilan yangilash" tugmasiga bog‘la.
Kalit qiymatini menga hech qachon ko‘rsatma — faqat qayerga yozganingni ayt.
```

**Tekshiring:** sozlamalar sahifasida yangi tugma ko‘rinadi, bosganingizda Google Jadvalidagi o‘zgarish mijozlar ro‘yxatiga tushadi.

## Boshqa integratsiya turlari

Bu ro‘yxat chuqur emas, faqat yo‘nalish uchun:

- **Telegram bot xabarnomasi.** Yangi mijoz qo‘shilganda jamoangizga Telegram’da xabar yuboradi. Kalit — bot tokeni, xuddi 1-qadamdagi naqsh bilan saqlanadi.
- **Pochta xabarnomasi.** Loyihada tayyor `cloudflare-email-service` skill’i bor (`.agents/skills/cloudflare-email-service`) — Cloudflare Email Service orqali pochta yuborishni to‘g‘ridan-to‘g‘ri shu skill orqali so‘rang.
- **Boshqa CRM’dan CSV eksport/import.** 2-qadamdagi bir martalik import naqshi bilan bir xil.
- **To‘lov qabul qilish.** Eng og‘ir talab qo‘yiladigan integratsiya — mijozning kartasi yoki puli bilan ishlaydi. Bu holatda faqat kalitni saqlash yetarli emas, to‘lov xizmatining o‘z xavfsizlik talablarini ham o‘rganish kerak. Bunday integratsiyani boshlashdan oldin alohida maslahat oling.

## Muammo bo‘lsa

Aniq bitta xato matni bo‘lmagani uchun tayyor havola yo‘q, lekin umumiy tartib bir xil:

- Xato matnini to‘liq nusxalab, `xato` skill’iga bering — umumiy yo‘l [08-muammolar.md](08-muammolar.md)dagi "Kerakli bo‘lim topilmadimi" bo‘limida yozilgan.
- Kalit noto‘g‘ri joyga tushib qolganidan shubhalansangiz, avval `git status`ni tekshiring — `.dev.vars` hech qachon "yangi fayl" sifatida ko‘rinmasligi kerak.
- Xizmat "ruxsat yo‘q" yoki 401/403 xato qaytarsa, odatda kalit noto‘g‘ri yozilgan yoki muddati o‘tgan — avval `npx wrangler secret list` bilan kalit nomi to‘g‘ri yozilganini tekshiring.

## Keyingi qadam

Endi buni haqiqiy vazifa sifatida bajaring: kundalik ish tartibi — [07-ish-sikli.md](07-ish-sikli.md).
