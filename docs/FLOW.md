# Foydalanuvchi yo‘llari

Bu hujjatda ilovadagi har bir qadam yozilgan: odam nima qiladi, tizim nima ko‘rsatadi va nimadir noto‘g‘ri ketsa nima chiqadi.

Qo‘shtirnoq ichidagi matnlar ekranda aynan shunday ko‘rinadi. Matnni o‘zgartirsangiz, shu hujjatni ham yangilang.

---

## 1. Ochilish sahifasi (`/`)

Bu sahifani tizimga kirmagan odam ham ko‘radi.

**Harakat:** brauzerda ilova manzilini ochish.

**Tizim javobi:** yuqorida `CRM` yozuvi, `Imkoniyatlar` va `GitHub` havolalari, ko‘rinish tugmasi va `Kirish` tugmasi. O‘rtada "Ochiq manba shablon" yozuvi, katta sarlavha "Mijozlaringizni bir joyda boshqaring", qisqa tavsif va ikkita tugma: "Boshlash" (ro‘yxatdan o‘tishga olib boradi) va "Kirish". Pastda "Asosiy imkoniyatlar" bo‘limidagi uchta kartochka va "Qanday qurilgan" ro‘yxati.

**Xato holati:** bu sahifa bazaga ham, sessiyaga ham murojaat qilmaydi, shuning uchun unda xato holati yo‘q.

---

## 2. Ro‘yxatdan o‘tish (`/signup`)

**Harakat:** "Boshlash" tugmasini bosish yoki `/signup` manzilini ochish.

**Tizim javobi:** "Ro‘yxatdan o‘tish" sarlavhali kartochka, ostida "Yangi hisob yarating" izohi va uchta maydon: `Ism`, `Email`, `Parol`. Pastda "Ro‘yxatdan o‘tish" tugmasi va "Hisobingiz bormi? Kiring" havolasi.

**Harakat:** maydonlarni to‘ldirib, "Ro‘yxatdan o‘tish" tugmasini bosish.

**Tizim javobi:** tugma "Yaratilmoqda…" holatiga o‘tadi, hisob yaratiladi va foydalanuvchi darhol `/dashboard` sahifasiga o‘tadi.

**Xato holatlari:**

| Nima bo‘ldi | Ekranda nima chiqadi |
| --- | --- |
| Ism bo‘sh | "Ismingizni kiriting" |
| Email noto‘g‘ri | "To‘g‘ri email kiriting" |
| Parol 8 ta belgidan qisqa | "Parol kamida 8 ta belgidan iborat bo‘lsin" |
| Bu email bilan hisob bor | "Bu email bilan hisob allaqachon mavjud" |
| Boshqa noma’lum xato | "Xatolik yuz berdi. Qaytadan urinib ko‘ring." |

**Ro‘yxatdan o‘tish yopilgan bo‘lsa** (`ALLOW_SIGNUP` qiymati `"true"`dan boshqa bo‘lsa): `/signup` sahifasida forma umuman ko‘rinmaydi, uning o‘rniga "Ro‘yxatdan o‘tish yopilgan. Administrator bilan bog‘laning." matni turadi. Kirish sahifasidagi "Hisobingiz yo‘qmi? Ro‘yxatdan o‘ting" havolasi ham yashiriladi.

---

## 3. Kirish (`/login`)

**Harakat:** "Kirish" tugmasini bosish yoki `/login` manzilini ochish.

**Tizim javobi:** "Kirish" sarlavhali kartochka, "Hisobingizga kiring" izohi, `Email` va `Parol` maydonlari, "Kirish" tugmasi.

**Harakat:** maydonlarni to‘ldirib, "Kirish"ni bosish.

**Tizim javobi:** tugma "Kirilmoqda…" holatiga o‘tadi, keyin `/dashboard` ochiladi.

**Xato holatlari:**

| Nima bo‘ldi | Ekranda nima chiqadi |
| --- | --- |
| Email noto‘g‘ri yozilgan | "To‘g‘ri email kiriting" |
| Parol 8 ta belgidan qisqa | "Parol kamida 8 ta belgidan iborat bo‘lsin" |
| Email yoki parol mos kelmadi | "Email yoki parol noto‘g‘ri" |
| Boshqa noma’lum xato | "Xatolik yuz berdi. Qaytadan urinib ko‘ring." |

**Agar allaqachon kirgan bo‘lsangiz:** `/login` yoki `/signup` manzilini ochsangiz, tizim sizni darhol `/dashboard`ga qaytaradi.

**Agar kirmagan bo‘lsangiz:** `/dashboard`, `/clients` yoki `/settings` manzilini ochishga urinsangiz, tizim sizni `/login` sahifasiga yuboradi.

---

## 4. Umumiy ko‘rinish (kirgandan keyin)

Chap tomonda doimiy menyu: tepasida `CRM`, ostida "Bosh sahifa", "Mijozlar", "Sozlamalar" havolalari, pastda ismingiz, emailingiz, ko‘rinish tugmasi va "Chiqish" tugmasi.

Telefon ekranida menyu yashirinadi; uni yuqoridagi tugma (aria-nomi "Menyuni ochish") orqali ochasiz.

---

## 5. Bosh sahifa (`/dashboard`)

**Harakat:** menyudan "Bosh sahifa"ni tanlash.

**Tizim javobi:** sarlavha "Bosh sahifa", ostida "Xush kelibsiz, {ismingiz}!". Keyin beshta kichik kartochka: "Jami", "Yangi", "Jarayonda", "Mijoz", "Yo‘qotildi" — har birida son.

Pastda ikkita ro‘yxat:

- **"Bugun bog‘lanish kerak"** — faol bosqichdagi (Yangi yoki Jarayonda) va keyingi aloqa sanasi bugun yoki undan oldin bo‘lgan mijozlar, sana bo‘yicha tartiblangan, eng ko‘pi bilan 10 ta. Sanasi o‘tib ketganlar yonida qizil rangda "Muddati o‘tgan" yoziladi; bugungilar yonida esa sana turadi.
- **"Oxirgi qo‘shilganlar"** — eng so‘nggi qo‘shilgan 5 ta mijoz.

**Bo‘sh holat:** birinchi ro‘yxat bo‘sh bo‘lsa — "Bugun bog‘lanish kerak bo‘lgan mijoz yo‘q.". Ikkinchisi bo‘sh bo‘lsa — "Hali mijoz yo‘q.".

**Xato holati:** ma’lumot o‘qilmasa, sahifa o‘rniga "Nimadir xato ketdi" sarlavhasi, "Sahifani yuklab bo‘lmadi. Qaytadan urinib ko‘ring." izohi va "Qayta urinish" tugmasi chiqadi.

---

## 6. Mijozlar ro‘yxati (`/clients`)

**Harakat:** menyudan "Mijozlar"ni tanlash.

**Tizim javobi:** sarlavha "Mijozlar", ostida "{son} ta mijoz ko‘rsatilmoqda". O‘ng tomonda "Mijoz qo‘shish" tugmasi. Ostida qidiruv maydoni ("Ism, telefon yoki kompaniya bo‘yicha qidirish") va bosqich tanlagichi ("Barcha bosqichlar", "Yangi", "Jarayonda", "Mijoz", "Yo‘qotildi").

Katta ekranda jadval ko‘rinadi, ustunlari: "Ism", "Kompaniya", "Telefon", "Bosqich", "Keyingi aloqa". Qatorning istalgan joyini bosish mijoz sahifasini ochadi. Telefon ekranida jadval o‘rniga kartochkalar chiqadi; har bir kartochkada ism, bosqich, kompaniya, telefon va "Keyingi aloqa: …" qatori bo‘ladi.

To‘ldirilmagan maydon o‘rniga `—` belgisi turadi.

**Harakat:** qidiruv maydoniga matn yozish.

**Tizim javobi:** yozishni to‘xtatganingizdan taxminan uchdan bir soniya keyin ro‘yxat yangilanadi va manzilga `?q=` qo‘shiladi. Bosqichni tanlasangiz, manzilga `?stage=` qo‘shiladi. Shu manzilni saqlab qo‘ysangiz yoki sahifani yangilasangiz, filtr o‘z holicha qoladi.

**Bo‘sh holatlar:**

| Vaziyat | Ekranda nima chiqadi |
| --- | --- |
| Hech qanday mijoz yo‘q | "Hali mijoz yo‘q." va "Birinchi mijozni qo‘shing." izohi, ostida "Mijoz qo‘shish" tugmasi |
| Filtr bo‘yicha hech narsa topilmadi | "Bu filtr bo‘yicha mijoz topilmadi." va "Qidiruv so‘zini qisqartiring yoki bosqich filtrini tozalang." izohi |

---

## 7. Mijoz qo‘shish (`/clients/new`)

**Harakat:** "Mijoz qo‘shish" tugmasini bosish.

**Tizim javobi:** yuqorida "Mijozlar"ga qaytish havolasi, sarlavha "Yangi mijoz", ostida "Faqat ism majburiy — qolganini keyin ham to‘ldirsangiz bo‘ladi." Forma maydonlari: `Ism`, `Telefon`, `Kompaniya`, `Bosqich` (boshlang‘ich qiymati "Yangi"), `Keyingi aloqa` (kalendar), `Izoh`. Pastda "Saqlash" va "Bekor qilish" tugmalari.

**Harakat:** formani to‘ldirib, "Saqlash"ni bosish.

**Tizim javobi:** tugma "Saqlanmoqda…" holatiga o‘tadi, keyin yangi mijoz sahifasi ochiladi va pastki burchakda "Mijoz saqlandi" xabari chiqadi.

**Harakat:** "Bekor qilish"ni bosish.

**Tizim javobi:** mijozlar ro‘yxatiga qaytadi, hech narsa saqlanmaydi.

**Xato holatlari:**

| Nima bo‘ldi | Ekranda nima chiqadi |
| --- | --- |
| Ism bo‘sh | "Mijoz ismini kiriting" |
| Ism 120 belgidan uzun | "Ism 120 belgidan oshmasin" |
| Telefonda ruxsat etilmagan belgi bor | "Telefon raqami noto‘g‘ri" |
| Kompaniya nomi 120 belgidan uzun | "Kompaniya nomi 120 belgidan oshmasin" |
| Bosqich tanlanmagan yoki noto‘g‘ri | "Bosqichni tanlang" |
| Sana mavjud bo‘lmagan kun (masalan, 31-fevral) | "Sana noto‘g‘ri" |
| Izoh 2000 belgidan uzun | "Izoh 2000 belgidan oshmasin" |
| Bazaga yozib bo‘lmadi | Forma tepasida "Saqlab bo‘lmadi. Qaytadan urinib ko‘ring." |

Xato chiqqanda yozgan matningiz joyida qoladi — qaytadan terish shart emas.

Telefon maydoniga raqam, `+`, `-`, qavs va bo‘shliq yozish mumkin; uzunligi 7 tadan 20 tagacha belgi.

---

## 8. Mijoz sahifasi (`/clients/{id}`)

**Harakat:** ro‘yxatdan mijozni tanlash.

**Tizim javobi:** yuqorida "Mijozlar"ga qaytish havolasi. Sarlavhada mijoz ismi va bosqich yorlig‘i, o‘ng tomonda "Tahrirlash" va "O‘chirish" tugmalari.

Kartochkada maydonlar: "Telefon", "Kompaniya", "Keyingi aloqa", "Qo‘shilgan sana", "Izoh". Bo‘sh maydon o‘rniga `—` turadi. Keyingi aloqa sanasi o‘tib ketgan bo‘lsa, u qizil rangda va yonida "· Muddati o‘tgan" deb yoziladi.

Ostida ikkita kartochka: "Fayllar" va "AI bilan xabar qoralamasi".

**Xato holati:** shunday `id` bilan mijoz topilmasa, "Sahifa topilmadi" sarlavhasi, "Manzil noto‘g‘ri bo‘lishi yoki sahifa o‘chirilgan bo‘lishi mumkin." izohi va "Bosh sahifaga qaytish" tugmasi chiqadi.

---

## 9. Mijozni tahrirlash (`/clients/{id}/edit`)

**Harakat:** "Tahrirlash" tugmasini bosish.

**Tizim javobi:** yuqorida mijoz nomi bilan qaytish havolasi, sarlavha "Mijozni tahrirlash", ostida o‘sha formaning to‘ldirilgan ko‘rinishi.

**Harakat:** o‘zgartirib, "Saqlash"ni bosish.

**Tizim javobi:** mijoz sahifasi ochiladi va "Mijoz saqlandi" xabari chiqadi.

**Xato holatlari:** qo‘shish formasidagi bilan bir xil (7-bo‘limga qarang).

**Eslatma:** tahrirlash sahifasidagi "Bekor qilish" tugmasi mijozlar ro‘yxatiga qaytaradi, mijoz sahifasiga emas. Bitta mijozga qaytish uchun yuqoridagi havoladan foydalaning.

---

## 10. Mijozni o‘chirish

**Harakat:** mijoz sahifasida "O‘chirish" tugmasini bosish.

**Tizim javobi:** tasdiqlash oynasi ochiladi: sarlavha "Mijozni o‘chirasizmi?", izoh "Bu amalni ortga qaytarib bo‘lmaydi.", tugmalar "Bekor qilish" va "O‘chirish".

**Harakat:** oynadagi "O‘chirish"ni bosish.

**Tizim javobi:** mijoz va unga biriktirilgan barcha fayllar o‘chadi, ro‘yxat sahifasi ochiladi va "Mijoz o‘chirildi" xabari chiqadi.

**Harakat:** "Bekor qilish"ni bosish.

**Tizim javobi:** oyna yopiladi, hech narsa o‘chmaydi.

---

## 11. Fayllar

Mijoz sahifasidagi "Fayllar" kartochkasi.

**Harakat:** fayl tanlash maydonidan fayl tanlab, "Fayl yuklash" tugmasini bosish.

**Tizim javobi:** tugma "Yuklanmoqda…" holatiga o‘tadi, keyin "Fayl yuklandi" xabari chiqadi va fayl ro‘yxatda paydo bo‘ladi: nomi, hajmi va yuklangan sanasi bilan.

**Bo‘sh holat:** hali fayl yo‘q bo‘lsa — "Hali fayl yuklanmagan." va "Shartnoma yoki hisob-fakturani shu yerga qo‘shing." izohi.

**Harakat:** fayl qatoridagi yuklab olish belgisini bosish.

**Tizim javobi:** rasm va PDF brauzerda ochiladi, qolgan turlar kompyuterga yuklanadi.

**Harakat:** fayl qatoridagi o‘chirish belgisini bosish.

**Tizim javobi:** tasdiqlash oynasi: "Faylni o‘chirasizmi?", "Bu amalni ortga qaytarib bo‘lmaydi.", tugmalar "Bekor qilish" va "O‘chirish". Tasdiqlagach "Fayl o‘chirildi" xabari chiqadi.

**Xato holatlari:**

| Nima bo‘ldi | Ekranda nima chiqadi |
| --- | --- |
| Fayl tanlanmagan | "Fayl tanlanmagan" |
| Fayl 10 MB dan katta | "Fayl hajmi 10 MB dan oshmasligi kerak" |
| Fayl turi ruxsat etilmagan | "Bu turdagi faylni yuklab bo‘lmaydi" |
| R2 yoqilmagan yoki javob bermadi | "Faylni saqlab bo‘lmadi. R2 yoqilganini tekshiring (docs/guides/04-cloudflare.md)." |
| Bazaga yozib bo‘lmadi | "Saqlab bo‘lmadi. Qaytadan urinib ko‘ring." |
| Tizimga kirmagan holda fayl havolasini ochish | Brauzerda `{"error":"Avval tizimga kiring"}` javobi |

Ruxsat etilgan fayl turlari: JPEG, PNG, WebP, PDF, Word (`.doc`, `.docx`), Excel (`.xls`, `.xlsx`), CSV va oddiy matn.

---

## 12. AI xabar qoralamasi

Mijoz sahifasidagi "AI bilan xabar qoralamasi" kartochkasi. Tepasida doimiy eslatma: "AI yozgan matnni yuborishdan oldin albatta tekshiring."

**Harakat:** "Qoralama yaratish" tugmasini bosish.

**Tizim javobi:** tugma "Yozilmoqda…" holatiga o‘tadi. Bir necha soniyadan keyin tahrirlanadigan matn maydonida o‘zbekcha qoralama paydo bo‘ladi, tugma esa "Qayta yaratish"ga aylanadi va yonida "Nusxalash" tugmasi chiqadi.

Qoralama mijozning ismi, kompaniyasi, bosqichi, izohi va keyingi aloqa sanasidan tuziladi. Bo‘sh maydonlar so‘rovga qo‘shilmaydi.

**Harakat:** "Nusxalash"ni bosish.

**Tizim javobi:** matn buferga ko‘chiriladi va "Nusxalandi" xabari chiqadi.

**Xato holatlari:**

| Nima bo‘ldi | Ekranda nima chiqadi |
| --- | --- |
| Model javob bermadi yoki bo‘sh javob qaytardi | "AI hozir ishlamayapti. Keyinroq urinib ko‘ring." |
| Brauzer nusxalashga ruxsat bermadi | "Nusxalab bo‘lmadi" |

Qoralama hech qayerga o‘z-o‘zidan yuborilmaydi — uni faqat siz nusxalab ishlatasiz.

---

## 13. Sozlamalar (`/settings`)

**Harakat:** menyudan "Sozlamalar"ni tanlash.

**Tizim javobi:** sarlavha "Sozlamalar" va ikkita kartochka.

**"Profil"** — izohi "Ismingiz ilovada ko‘rinadi. Email o‘zgartirilmaydi.". Ichida `Ism` maydoni (tahrirlanadi), `Email` maydoni (faqat o‘qish uchun) va "Saqlash" tugmasi.

**Harakat:** ismni o‘zgartirib, "Saqlash"ni bosish.

**Tizim javobi:** tugma "Saqlanmoqda…" holatiga o‘tadi, keyin "Saqlandi" xabari chiqadi va yangi ism chapdagi menyuda ko‘rinadi.

**"Ko‘rinish"** — izohi "«Tizim» qurilmangiz sozlamasiga moslashadi.". Uchta variant: "Yorug‘", "Qorong‘i", "Tizim". Tanlanganda ilova darhol o‘zgaradi va tanlov brauzerda saqlanib qoladi.

**Xato holatlari:**

| Nima bo‘ldi | Ekranda nima chiqadi |
| --- | --- |
| Ism bo‘sh | "Ismingizni kiriting" |
| Saqlab bo‘lmadi | "Saqlab bo‘lmadi. Qaytadan urinib ko‘ring." |

---

## 14. Chiqish

**Harakat:** chapdagi menyuning pastidagi "Chiqish" tugmasini bosish.

**Tizim javobi:** sessiya tugatiladi va kirish sahifasi ochiladi.

**Xato holati:** chiqqandan keyin `/dashboard`ga qaytishga urinsangiz, tizim yana `/login` sahifasiga yuboradi.

---

## Tekshiruv

Ilovani o‘zgartirgandan keyin quyidagi ro‘yxatni birma-bir bosib chiqing. Hammasi ishlasa, asosiy yo‘l buzilmagan.

1. Chiqib, `/dashboard`ni ochishga urining — kirish sahifasiga o‘tishi kerak.
2. Yangi hisob yarating, chiqing va o‘sha hisob bilan qayta kiring.
3. Noto‘g‘ri parol bilan kiring — "Email yoki parol noto‘g‘ri" chiqishi kerak.
4. Bo‘sh ism bilan mijoz saqlang — "Mijoz ismini kiriting" chiqishi va mijoz saqlanmasligi kerak.
5. To‘liq mijoz qo‘shing — "Mijoz saqlandi" xabari chiqishi va mijoz sahifasi ochilishi kerak.
6. Mijozni tahrirlang va saqlang — o‘zgarish mijoz sahifasida ko‘rinishi kerak.
7. Qidiruvga mavjud ismni yozing, keyin mavjud bo‘lmagan so‘zni yozing — ikkinchisida "Bu filtr bo‘yicha mijoz topilmadi." chiqishi kerak.
8. Keyingi aloqa sanasini kechagi kunga qo‘ying va bosh sahifani oching — mijoz "Bugun bog‘lanish kerak" ro‘yxatida "Muddati o‘tgan" belgisi bilan turishi kerak.
9. Bosqichni "Mijoz"ga o‘zgartiring — u shu ro‘yxatdan chiqib ketishi kerak.
10. Kichik PDF yuklang, yuklab oling va o‘chiring — har uchala qadamda tegishli xabar chiqishi kerak.
11. 10 MB dan katta fayl tanlang — "Fayl hajmi 10 MB dan oshmasligi kerak" chiqishi kerak.
12. "Qoralama yaratish"ni bosing — o‘zbekcha matn yoki tushunarli xato chiqishi kerak.
13. Mijozni o‘chiring — ro‘yxatga qaytishi va "Mijoz o‘chirildi" xabari chiqishi kerak.
14. Brauzer oynasini 390px kenglikka toraytiring va 5–13-qadamlarni takrorlang — matn kesilmasligi, tugmalar bosiladigan bo‘lishi kerak.
15. Sozlamalarda "Qorong‘i" ko‘rinishni yoqing va yuqoridagi sahifalarni bir aylanib chiqing — matn o‘qilishi kerak.
