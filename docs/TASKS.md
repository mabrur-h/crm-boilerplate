# Hozir: loyihani o‘z biznesingizga moslash

## Natija

Ilova endi umumiy "CRM boilerplate" emas, sizning biznesingizga tegishli bo‘ladi: nomi, ochilish sahifasidagi matn va mijoz bosqichlari sizning ish jarayoningizga mos keladi. Boshqa hech narsa buzilmaydi.

## Avval

[PRODUCT.md](PRODUCT.md)ni oching va tepasidagi promptni agentga bering — "Kim uchun", "Vaziyat va hozirgi usul", "Foydali natija" va "V1" bo‘limlari sizning biznesingiz haqida bo‘lsin.

Keyin agentga ayting: avval hozirgi kodni o‘qisin. Mavjud imkoniyatni qaytadan yaratish shart emas; faqat matn va ro‘yxatlarni moslash kerak.

## Tayyor, agar

1. `src/app/layout.tsx`dagi sahifa sarlavhasi va tavsifi sizning loyihangiz nomi bilan yozilgan.
2. Ochilish sahifasidagi (`src/app/(marketing)/page.tsx`) katta sarlavha va tavsif sizning mijozingizga qaratilgan.
3. Chapdagi menyu va ochilish sahifasidagi `CRM` yozuvi o‘rniga loyihangiz nomi turadi.
4. `src/features/clients/constants.ts`dagi bosqichlar sizning ish jarayoningizga mos: kerak bo‘lsa nomi o‘zgargan, kerak bo‘lsa soni boshqa.
5. Bosqichlar o‘zgargan bo‘lsa, ular bosh sahifadagi kartochkalarda, ro‘yxat filtrida va formada ham to‘g‘ri ko‘rinadi.
6. `npm run check` xatosiz tugaydi.
7. `npm run dev` bilan ochib, mijoz qo‘shdingiz, tahrirladingiz va o‘chirdingiz — hammasi ishlaydi.
8. 390px kenglikdagi ekranda ham matn kesilmaydi.
9. [PROGRESS.md](PROGRESS.md)ga nima o‘zgarganini va qanday tekshirganingizni yozdingiz.

## Tegmaymiz

Baza sxemasi (yangi ustun yoki jadval), kirish tizimi, fayllar va AI qismi, Cloudflare’ga nashr, dizayn tizimidagi ranglar va shrift.

## Holat

Rejalashtirilgan. Hali bajarilgan deb belgilanmagan.
