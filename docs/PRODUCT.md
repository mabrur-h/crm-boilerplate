# CRM boilerplate — mahsulot tavsifi

> Bu to‘ldirilgan namuna. O‘z biznesingizga moslash uchun AI’ga quyidagini ayting:
>
> ```text
> docs/PRODUCT.md’ni o‘qi. Hozir kodga tegma.
> Men quyidagi biznes bilan shug‘ullanaman: <biznesingizni bir gapda yozing>.
> Mening mijozlarim: <kim>. Hozir ularni qanday yuritaman: <qanday>.
> Shu ma’lumotlarga qarab menga ko‘pi bilan 10 ta savol ber — faqat
> "Kim uchun", "Vaziyat va hozirgi usul", "Foydali natija" va "V1"
> bo‘limlarini to‘g‘rilash uchun kerak bo‘lganlarini.
> Savollarni bittadan ber va javobimni kut.
> Javoblarimdan keyin docs/PRODUCT.md’ning o‘zini yangila va nima
> o‘zgarganini ko‘rsat. O‘zingdan yangi funksiya yoki biznes fakti qo‘shma.
> ```

## Kim uchun

Mijozlar bilan telefon va xabar orqali ishlaydigan kichik jamoa: 1–5 kishi. Masalan, xizmat ko‘rsatuvchi agentlik, savdo bo‘limi yoki kichik studiya.

## Vaziyat va hozirgi usul

Mijoz bilan gaplashiladi, keyingi qadam va sana esa Telegram yozishmasida yoki daftarda qoladi. Ertalab kimga qo‘ng‘iroq qilish kerakligini aniqlash uchun yozishmalarni qayta ko‘rib chiqishga to‘g‘ri keladi. Shartnoma va hisob-faktura fayllari pochta bilan telefon xotirasi orasida sochilib yotadi.

## Foydali natija

Menejer har bir mijozga bosqich, izoh va keyingi aloqa sanasini yozadi. Ertalab bosh sahifani ochadi va bugun kim bilan bog‘lanish kerakligini bir qarashda ko‘radi. Mijozga tegishli fayllar o‘sha mijozning sahifasida turadi.

## Asosiy yo‘l

Ro‘yxatdan o‘tish → kirish → mijoz qo‘shish → bosqich va keyingi aloqa sanasini yozish → bosh sahifada bugungi ishlarni ko‘rish → mijoz sahifasida fayl biriktirish yoki AI qoralamasini olish.

Har bir qadamning aniq matni va xato holatlari — [FLOW.md](FLOW.md).

## V1 — hozir ishlaydigan qismlar

1. Email va parol bilan ro‘yxatdan o‘tish va kirish. Parol kamida 8 ta belgidan iborat.
2. Mijoz yaratish, tahrirlash va o‘chirish. Faqat ism majburiy.
3. Mijoz maydonlari: ism, telefon, kompaniya, bosqich, keyingi aloqa sanasi, izoh.
4. To‘rtta bosqich: Yangi, Jarayonda, Mijoz, Yo‘qotildi.
5. Ro‘yxatda qidiruv (ism, telefon, kompaniya bo‘yicha) va bosqich bo‘yicha filtr. Filtr manzilga yoziladi, shuning uchun sahifani yangilaganda ham saqlanadi.
6. Bosh sahifa: jami son, har bir bosqich bo‘yicha son, "Bugun bog‘lanish kerak" ro‘yxati va "Oxirgi qo‘shilganlar" ro‘yxati.
7. Mijozga fayl biriktirish, yuklab olish va o‘chirish. Fayl Cloudflare R2’da saqlanadi.
8. AI xabar qoralamasi: mijoz ma’lumotlariga qarab 3–5 gapli o‘zbekcha matn yozadi, uni tahrirlab nusxalash mumkin.
9. Sozlamalar: ismni o‘zgartirish, ko‘rinishni (yorug‘ / qorong‘i / tizim) tanlash.
10. Bo‘sh holat, yuklanish va xato ekranlari — har birining o‘z matni bilan.

## Qoidalar

- **Bosqichlar.** To‘rtta qiymat: Yangi, Jarayonda, Mijoz, Yo‘qotildi. Bosqich har doim matn bilan yoziladi — faqat rang bilan ajratilmaydi.
- **Faol bosqichlar.** Yangi va Jarayonda faol hisoblanadi. Mijoz va Yo‘qotildi — tugagan ishlar, ular "Bugun bog‘lanish kerak" ro‘yxatiga kirmaydi.
- **Bugun bog‘lanish kerak.** Bu ro‘yxatga faol bosqichdagi va keyingi aloqa sanasi bugun yoki undan oldin bo‘lgan mijozlar tushadi. Sanasi yo‘qlar kirmaydi. Ro‘yxatda eng ko‘pi bilan 10 ta mijoz ko‘rsatiladi.
- **Muddati o‘tgan.** Sana bugundan oldin bo‘lsa, mijoz nomi yonida "Muddati o‘tgan" deb qizil rangda yoziladi. Bugungi sana oddiy ko‘rinadi.
- **Sana kun aniqligida.** Soat va daqiqa yo‘q. Sanalar `12-sentabr, 2026` ko‘rinishida yoziladi.
- **Vaqt mintaqasi — Asia/Tashkent.** "Bugun" doim Toshkent kuni bo‘yicha hisoblanadi, ilova qaysi serverda ishlayotganidan qat’i nazar.
- **Umumiy ro‘yxat.** Hozircha jamoa va rollar tushunchasi yo‘q: tizimga kirgan har bir foydalanuvchi bir xil mijozlar ro‘yxatini ko‘radi va tahrirlay oladi. Bu ataylab shunday — kichik jamoa uchun soddaroq.
- **Ro‘yxatdan o‘tishni yopish.** `ALLOW_SIGNUP` sozlamasi `wrangler.jsonc`da turadi va boshlang‘ich qiymati `"true"`. Uni boshqa qiymatga o‘zgartirsangiz, ro‘yxatdan o‘tish yopiladi: `/signup` sahifasida forma o‘rniga "Ro‘yxatdan o‘tish yopilgan. Administrator bilan bog‘laning." matni chiqadi. Jamoangizni yig‘ib bo‘lgach shuni qiling.
- **Oxirgi qo‘shilganlar.** Bosh sahifada eng so‘nggi qo‘shilgan 5 ta mijoz ko‘rsatiladi.
- **Fayl chegaralari.** Bitta fayl 10 MB gacha. Ruxsat etilgan turlar: JPEG, PNG, WebP, PDF, Word, Excel, CSV va oddiy matn.
- **Mijozni o‘chirish.** Mijoz o‘chirilganda unga biriktirilgan fayllar ham o‘chadi. Bu amalni ortga qaytarib bo‘lmaydi.
- **AI qoralamasi — qoralama.** Matn hech qayerga avtomatik yuborilmaydi. Uni odam o‘qiydi, tahrirlaydi va o‘zi nusxalab yuboradi.

## Keyin

Excel yoki CSV’dan mijozlarni import qilish, Telegram orqali eslatma, parolni tiklash, rollar va ruxsatlar, mijoz tarixi lentasi, bot himoyasi. Tartib va tafsilotlar — [PLAN.md](PLAN.md).

## Qilmaymiz

Buxgalteriya va hisob-kitob tizimi, telefoniya va qo‘ng‘iroqlar yozuvi, ombor va tovar qoldig‘i, hujjat aylanishi, alohida mobil ilova, chek va soliq bilan bog‘liq hamma narsa.

## Cheklovlar

- Interfeys faqat o‘zbek tilida (lotin). Boshqa til qo‘shish V1 doirasidan tashqarida.
- Desktop va 390px kenglikdagi telefon ekranida asosiy yo‘l ishlashi kerak.
- Ma’lumotlar Cloudflare D1’da, fayllar Cloudflare R2’da. Boshqa baza yoki fayl xizmati ko‘zda tutilmagan.
- Parolni tiklash va emailni tasdiqlash hozircha yo‘q. Parolni unutgan foydalanuvchi uchun yagona yo‘l — yangi hisob ochish yoki bazadagi yozuvni qo‘lda o‘zgartirish.
- Rollar yo‘q: tizimdagi har kim hamma narsani ko‘radi va o‘chira oladi.
- AI qoralamasi Workers AI modeliga bog‘liq. Model javob bermasa, ekranda xato chiqadi va qoralama o‘rniga bo‘sh joy qolmaydi.

## Tayyor, agar

1. Yangi foydalanuvchi ro‘yxatdan o‘tadi, chiqadi va qayta kira oladi.
2. Bo‘sh ism bilan mijoz saqlanmaydi va aniq xato matni chiqadi.
3. Mijoz qo‘shiladi, tahrirlanadi va sahifa yangilanganda joyida qoladi.
4. Qidiruv va bosqich filtri to‘g‘ri ishlaydi, hech narsa topilmaganda tegishli bo‘sh holat ko‘rinadi.
5. Bugungi, kechikkan va sanasiz mijozlar bosh sahifada to‘g‘ri ajraladi.
6. Fayl yuklanadi, ro‘yxatda ko‘rinadi, yuklab olinadi va o‘chiriladi.
7. AI tugmasi bosilganda o‘zbekcha qoralama chiqadi yoki tushunarli xato ko‘rinadi.
8. 390px kenglikdagi ekranda forma va asosiy tugmalar ishlatiladi.
9. Saqlash muvaffaqiyatsiz tugasa, "saqlandi" xabari chiqmaydi.

## Taxminlar

- Menejer keyingi qadam va sanani suhbatdan so‘ng darhol yozib qo‘yishga tayyor.
- Bitta umumiy ro‘yxat kichik jamoa uchun yetarli, rollar hozircha kerak emas.
- AI qoralamasi menejerning vaqtini tejaydi, chunki uni noldan yozgandan ko‘ra tahrirlash tezroq.

Uchala taxmin ham haqiqiy foydalanuvchi bilan sinovda tekshiriladi.
