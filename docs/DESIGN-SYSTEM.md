# Dizayn tizimi

Bu yerda ilovaning ko‘rinish qoidalari yozilgan: shrift, rang, matn, komponentlar va holatlar. Yangi ekran qo‘shayotganda shu qoidalarga amal qiling — shunda ilova bitta mahsulotdek ko‘rinadi.

Barcha ranglar va shrift sozlamalari bitta faylda: `src/app/globals.css`.

## Shrift

**Plus Jakarta Sans**, `next/font/google` orqali `src/app/layout.tsx`da yuklanadi. Qamrovi: `latin` va `latin-ext`. O‘zbekcha apostroflar (`‘` va `’`) asosiy `latin` to‘plamida turadi, ya’ni ular har doim to‘g‘ri chiziladi.

`globals.css`da:

- `--font-sans` va `--font-heading` — ikkalasi ham shu shriftga ishora qiladi.
- `font-feature-settings: "kern" 1, "calt" 1` — apostrof harfga tegib turishi uchun.
- Jadval kataklari va `.tabular-figures` klassi `tabular-nums` ishlatadi, shunda sonlar ustunda tik turadi.
- `h1`, `h2`, `h3` — `text-wrap: balance`, sarlavha satrlari teng bo‘linadi.

O‘lchamlar shadcn’ning odatiy shkalasidan olinadi (`text-sm` matn uchun). Faqat ochilish sahifasidagi katta sarlavha uchun alohida o‘lcham bor: `--text-display`, u ekran kengligiga qarab 2.125rem dan 3.5rem gacha o‘zgaradi.

## Brend rangi

Ilovaning rangi — **bitta xotirjam ko‘kimtir-yashil (teal)** ton. U OKLCH rang modelida yozilgan: `oklch(yorqinlik to‘yinganlik ton)`.

Butun palitrani ikkita o‘zgaruvchi boshqaradi. Ular `src/app/globals.css`da, izoh bilan belgilangan joyda turadi:

```css
:root {
  /* Brand color — change these two lines to re-theme the whole app. */
  --brand-hue: 196;
  --brand-chroma: 0.085;
}
.dark {
  --brand-hue: 196;
  --brand-chroma: 0.1;
}
```

`--brand-hue` — rang doirasidagi burchak: `196` ko‘kimtir-yashil, `265` siyohrang, `25` g‘ishtrang, `145` yashil. `--brand-chroma` — rang qanchalik to‘yingan.

**Rangni o‘zgartirish uchun:** shu to‘rt qatorni o‘zgartiring, boshqa hech narsaga tegmang. Qorong‘i rejimda `--brand-chroma` biroz yuqoriroq bo‘ladi — qora fonda rang yo‘qolib ketmasligi uchun.

**Tayyor tema olib kelmoqchi bo‘lsangiz:** https://tweakcn.com saytida temani yig‘ing, eksport qiling va chiqqan o‘zgaruvchilarni `globals.css`dagi tegishli joyga ko‘chiring. Undan keyin har bir sahifani yorug‘ va qorong‘i rejimda ko‘zdan kechiring.

### Ranglarni o‘zgartirganda nimani tekshirish kerak

Yangi rang matn bilan yetarli farq qilishi shart (kamida 4.5:1). Buni https://webaim.org/resources/contrastchecker/ kabi vositada tekshiring. Eng muhim juftliklar: asosiy tugmadagi matn, muted matn va fon, qizil (xato) matn va uning foni.

## Rang nomlari va ularning ma’nosi

Kodda xom rang (`#0ea5e9` yoki `bg-blue-500`) yozilmaydi. Faqat shu nomlar ishlatiladi:

| Nomi | Qayerda ishlatiladi |
| --- | --- |
| `background` / `foreground` | Sahifaning asosiy foni va matni |
| `card` / `card-foreground` | Kartochka foni va undagi matn |
| `popover` / `popover-foreground` | Ochiladigan menyu va dialog foni |
| `primary` / `primary-foreground` | Asosiy tugma, havola matni, faol holat |
| `secondary` / `secondary-foreground` | Ikkinchi darajali tugma va yorliq |
| `muted` / `muted-foreground` | Sokin fon va ikkinchi darajali matn |
| `accent` / `accent-foreground` | Sichqoncha ostidagi va tanlangan holat |
| `destructive` | O‘chirish, xato va "Muddati o‘tgan" |
| `border` / `input` | Chegara chiziqlari va maydon ramkasi |
| `ring` | Klaviatura fokusi halqasi |
| `chart-1` … `chart-5` | Kelajakdagi diagrammalar uchun |
| `sidebar-*` | Chapdagi menyuning o‘z ranglari |

Tailwind’da ular `bg-background`, `text-muted-foreground`, `bg-primary` ko‘rinishida ishlatiladi.

`--radius` — burchaklarning yumaloqligi, `0.625rem`. Qolgan barcha radius o‘lchamlari shundan hisoblanadi.

## Komponentlar

- Yangi komponent faqat `npx shadcn@4.21.0 add <nomi>` buyrug‘i yoki shadcn MCP serveri orqali qo‘shiladi.
- `src/components/ui/*` fayllari **hech qachon qo‘lda tahrirlanmaydi**. O‘zgartirish kerak bo‘lsa, komponentni o‘rab, ustidan klass bering.
- Belgilar (ikonkalar) — faqat `lucide-react`. Ikonka doim `aria-hidden="true"` bilan qo‘yiladi; agar tugmada matn bo‘lmasa, tugmaga o‘zbekcha `aria-label` yoziladi.
- Kartochkalar soyasiz: ilova kodida `Card` har doim `shadow-none` bilan ishlatiladi. Soya faqat ochiladigan oynalarda (dialog, menyu) qoladi — ular shadcn’ning o‘z komponentlari.

### Umumiy qoliplar

| Komponent | Nima uchun |
| --- | --- |
| `PageHeader` (`src/components/page-header.tsx`) | Har bir sahifaning sarlavhasi, izohi va o‘ng tomondagi tugmalari. Yangi sahifa shu bilan boshlanadi |
| `EmptyState` (`src/components/empty-state.tsx`) | "Hozircha hech narsa yo‘q" holati: belgi, sarlavha, izoh va ixtiyoriy tugma |
| `StageBadge` (`src/features/clients/components/stage-badge.tsx`) | Bosqich yorlig‘i |
| `SavedToast` (`src/features/clients/components/saved-toast.tsx`) | Saqlash yoki o‘chirishdan keyingi xabar |

Bo‘sh holat shunchaki "ro‘yxat bo‘sh" demasin — bu yerga nima kelishini va uni qanday qo‘shishni aytsin.

## Matn qoidalari

Tugmalar uchun doimiy so‘zlar:

| So‘z | Qachon |
| --- | --- |
| Saqlash | Forma yuborilganda |
| Bekor qilish | Formadan chiqishda va dialogda |
| O‘chirish | O‘chirish amalida |
| Tahrirlash | Mavjud yozuvni o‘zgartirishda |
| Qo‘shish | Yangi yozuv yaratishda ("Mijoz qo‘shish") |
| Kirish | Tizimga kirishda |
| Chiqish | Tizimdan chiqishda |
| Ro‘yxatdan o‘tish | Yangi hisob yaratishda |

Kutish holatida tugma matni uch nuqta bilan yoziladi: "Saqlanmoqda…", "Kirilmoqda…", "Yaratilmoqda…", "Yuklanmoqda…", "Yozilmoqda…".

Boshqa qoidalar:

- Foydalanuvchiga "siz" deb murojaat qilinadi.
- Gaplar qisqa. Reklama ohangi yo‘q: "eng zo‘r", "oson va tez", "inqilobiy" kabi so‘zlar ishlatilmaydi.
- Texnik atama birinchi marta ishlatilganda bir jumlada tushuntiriladi.
- Bo‘sh maydon o‘rniga uzun tire qo‘yiladi: `—`.
- Sana `12-sentabr, 2026` ko‘rinishida yoziladi (`src/lib/dates.ts`).
- Fayl hajmida kasr vergul bilan yoziladi: `3,4 KB`.

### Apostrof

`o‘` va `g‘` uchun `‘` (U+2018). Tutuq belgisi uchun `’` (U+2019), masalan `ma’lumot`, `sun’iy`. Oddiy ASCII `'` belgisi o‘zbekcha so‘zlarda ishlatilmaydi.

Kod, fayl nomi, manzil va buyruqlarda bu qoida amal qilmaydi.

## Bosqich yorliqlari

| Qiymat (kodda) | Yorliq (ekranda) | Ko‘rinishi |
| --- | --- | --- |
| `new` | Yangi | `outline` — faqat ramka |
| `in_progress` | Jarayonda | `secondary` — sokin fon |
| `won` | Mijoz | `default` — brend rangi bilan to‘ldirilgan |
| `lost` | Yo‘qotildi | `destructive` — qizil |

Qoida: **yorliq har doim matnni ko‘rsatadi.** Bosqich hech qachon faqat rang bilan bildirilmaydi — rang ko‘rmaydigan odam ham o‘qiy olishi kerak.

Ro‘yxat `src/features/clients/constants.ts` faylida, ko‘rinish esa `stage-badge.tsx`da.

## Holatlar

### Bo‘sh

| Joy | Matni |
| --- | --- |
| Mijozlar ro‘yxati | "Hali mijoz yo‘q." + "Birinchi mijozni qo‘shing." + tugma |
| Filtrdan keyin bo‘sh | "Bu filtr bo‘yicha mijoz topilmadi." + "Qidiruv so‘zini qisqartiring yoki bosqich filtrini tozalang." |
| Bugungi ishlar | "Bugun bog‘lanish kerak bo‘lgan mijoz yo‘q." |
| Oxirgi qo‘shilganlar | "Hali mijoz yo‘q." |
| Fayllar | "Hali fayl yuklanmagan." + "Shartnoma yoki hisob-fakturani shu yerga qo‘shing." |

### Yuklanish

Har bir og‘ir sahifaning yonida `loading.tsx` fayli turadi va u haqiqiy joylashuvni takrorlaydigan kulrang qoliplarni (skeleton) ko‘rsatadi — aylanadigan belgi emas. Mavjud fayllar: `dashboard/loading.tsx`, `clients/loading.tsx`, `clients/[id]/loading.tsx`.

### Xato

- Sahifa yuklanmasa: "Nimadir xato ketdi" + "Sahifani yuklab bo‘lmadi. Qaytadan urinib ko‘ring." + "Qayta urinish" tugmasi (`src/app/(app)/error.tsx`).
- Manzil topilmasa: "Sahifa topilmadi" + "Manzil noto‘g‘ri bo‘lishi yoki sahifa o‘chirilgan bo‘lishi mumkin." + "Bosh sahifaga qaytish" (`src/app/not-found.tsx`).
- Xato matni hech qachon texnik tafsilot ko‘rsatmaydi. Dasturchi uchun tafsilot brauzer konsoliga yoziladi.

### Muvaffaqiyat

Xabarlar pastki burchakda chiqadi (sonner): "Mijoz saqlandi", "Mijoz o‘chirildi", "Fayl yuklandi", "Fayl o‘chirildi", "Nusxalandi", "Saqlandi".

Saqlash muvaffaqiyatsiz tugasa, muvaffaqiyat xabari **hech qachon** chiqmaydi.

## Formalar

- Har bir maydonda ko‘rinadigan yorliq bor. Faqat placeholder bilan cheklanilmaydi.
- Xato matni maydon ostida, qizil rangda chiqadi, maydon esa `aria-invalid` belgisini oladi.
- Xato matni nima qilish kerakligini aytadi: "Mijoz ismini kiriting", "Telefon raqami noto‘g‘ri", "Sana noto‘g‘ri". "Xato" yoki "Noto‘g‘ri qiymat" kabi quruq matn yozilmaydi.
- Xato chiqqanda foydalanuvchi yozgan matn joyida qoladi.
- Umumiy (maydonga tegishli bo‘lmagan) xato forma tepasida `role="alert"` bilan chiqadi.
- Tekshiruv ikki joyda: brauzerda (tez javob uchun) va serverda (haqiqiy himoya uchun). Qoidalar bitta faylda — `src/features/<modul>/schema.ts`.

## Mobil ko‘rinish

Asosiy tekshiruv kengligi — **390px**.

- `globals.css`da 640px dan tor ekranlarda har bir maydon, tugma va tanlagich kamida 40px balandlikda bo‘ladi; faqat belgili tugmalar esa 40px enida.
- Mijozlar ro‘yxati tor ekranda jadval o‘rniga kartochkalarga aylanadi.
- Chapdagi menyu yashirinadi va yuqoridagi tugma orqali ochiladi.
- Uzun matn `wrap-anywhere` bilan ko‘chiriladi, gorizontal siljish paydo bo‘lmaydi.

Har bir UI o‘zgarishini 390px kenglikda tekshiring. Playwright MCP ulangan bo‘lsa, buni agentdan so‘rashingiz mumkin.

## Qorong‘i rejim

`next-themes` orqali, `class` usulida. Uchta variant: "Yorug‘", "Qorong‘i", "Tizim" — boshlang‘ich qiymat "Tizim", ya’ni qurilma sozlamasiga moslashadi.

Tanlash ikki joyda: chapdagi menyudagi tugma va Sozlamalar sahifasidagi "Ko‘rinish" kartochkasi. Ikkalasi ham bitta ro‘yxatdan (`THEME_OPTIONS`) foydalanadi.

Har bir o‘zgarishni ikkala rejimda ham ko‘ring. Qorong‘i rejim ranglari `globals.css`dagi `.dark` blokida turadi.

## Qulaylik (accessibility)

- `<html lang="uz">` — o‘qish dasturlari matnni o‘zbekcha o‘qiydi.
- Har bir matnsiz tugmada o‘zbekcha `aria-label`: "Menyuni ochish", "Ko‘rinishni o‘zgartirish", "Mijozlarni qidirish", "Bosqich bo‘yicha filtr", "{fayl nomi} faylini yuklab olish".
- Klaviatura fokusi ko‘rinadigan halqa bilan ko‘rsatiladi. Jadval qatorida halqa qatorning o‘ziga chiziladi.
- Matn va fon orasidagi farq kamida 4.5:1.
- Ma’no faqat rang bilan berilmaydi: bosqich yorlig‘ida matn bor, "Muddati o‘tgan" ham so‘z bilan yozilgan.
- Ro‘yxatlar haqiqiy `<ul>`/`<li>` teglari bilan quriladi, jadval esa `<table>` bilan.

## Rad etilgan uslublar (AI-slop)

Quyidagilar bu loyihada ishlatilmaydi. Agent shundaylarini taklif qilsa, rad eting:

- **Siyohrang-pushti gradient.** Fon, tugma va sarlavhada gradient yo‘q. Ilova kodida bitta ham gradient ishlatilmagan.
- **Katta soyalar va shishasimon "glassmorphism" panellar.** Kartochkalar tekis, chegara chizig‘i bilan ajratiladi.
- **Emoji bilan bezash.** Sarlavhada, tugmada va xabarlarda emoji yo‘q. Belgi kerak bo‘lsa — `lucide-react`dagi ikonka.
- **Reklama ohangidagi matn.** "Inqilobiy", "eng zo‘r", "bir necha soniyada" kabi iboralar yo‘q. Matn nima bo‘layotganini aytadi, maqtamaydi.
- **Ko‘p rang birdan.** Bitta brend rangi va qizil (xato uchun) yetarli. Har bir bo‘limga alohida rang berilmaydi.
- **Keraksiz animatsiya.** Sahifa ochilganda paydo bo‘lish effektlari yo‘q. Animatsiya faqat dialog va menyu ochilishida, u ham shadcn’ning o‘zidan keladi.
- **Faqat rang bilan berilgan holat.** Har bir holatning o‘z matni bor.
- **Xom rang qiymatlari.** `bg-blue-500` yoki `#2563EB` kabi yozuvlar kodda uchramaydi.
- **Ingliz tilidagi interfeys matni.** "Submit", "Loading…", "No data" o‘rniga o‘zbekcha matn.
- **Bo‘sh ekran.** Har bir bo‘sh holatda nima qilish kerakligi yozilgan.
