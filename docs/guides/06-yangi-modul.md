# Yangi bo‘lim qo‘shish: "Mahsulotlar" misolida

**Vaqt:** 1,5–3 soat. **Natija:** ilovada "Mahsulotlar" nomli yangi bo‘lim paydo bo‘ladi: ro‘yxat, qo‘shish, tahrirlash va o‘chirish ishlaydi, chap menyuda havolasi turadi, testlar o‘tadi va hujjatlar yangilangan.

Bu loyihada har bir bo‘lim bir xil tuzilishga ega. `src/features/clients` — namuna. Yangi bo‘lim qo‘shish deganda biz shu naqshni nusxalaymiz, boshqatdan o‘ylab topmaymiz.

Misol uchun oladigan bo‘limimiz — **Mahsulotlar**, maydonlari: nomi, narxi (so‘mda), soni va izoh.

## Kerak bo‘ladi

- Ishlaydigan loyiha va `npm run dev` — [01-template-olish.md](01-template-olish.md).
- Ulangan AI agenti — [02-claude-ulash.md](02-claude-ulash.md) yoki [03-chatgpt-ulash.md](03-chatgpt-ulash.md).
- Yarim soatlik xotirjam vaqt: har qadamdan keyin natijani o‘zingiz ko‘rasiz.

Ishni bitta buyruq bilan boshlash mumkin: Claude Code’da `/yangi-modul`, Codex’da "Mahsulotlar bo‘limini qo‘shamiz" deb yozing. Skill quyidagi qadamlarni o‘zi bajaradi. Quyida esa har bir qadam alohida yozilgan — shunda nima bo‘layotganini kuzatib borasiz.

## 1-qadam. Avval hujjatga yozing

Kod yozishdan oldin bo‘lim nima qilishini bir joyda aniqlab oling. Bu bekorga sarflangan vaqt emas: agent keyin shu matnga qarab ishlaydi.

```text
docs/PRODUCT.md va docs/FLOW.md fayllarini o‘qi.
Men "Mahsulotlar" nomli yangi bo‘lim qo‘shmoqchiman. Maydonlari: nomi (majburiy),
narxi so‘mda (butun son, majburiy), soni (butun son) va izoh (ixtiyoriy matn).
Bosqich yoki holat maydoni kerak emas.
Shu ikki faylga qisqa bo‘lim qo‘sh: mahsulot nima uchun kerak va foydalanuvchi qanday qadamlarni bosadi.
Hozircha kod yozma.
```

**Tekshiring:** `docs/PRODUCT.md` va `docs/FLOW.md` fayllarida mahsulotlar haqida yangi matn paydo bo‘ldi. VS Code’dagi Explorer’dan fayllarni ochib o‘qing — agentning "yozdim" degani yetarli emas.

## 2-qadam. Bazaga jadval qo‘shing

```text
src/lib/db/schema.ts faylini o‘qi va client jadvalining naqshini takrorlab, product jadvalini qo‘sh:
id, name (majburiy), priceUzs (butun son, majburiy), quantity (butun son), note (ixtiyoriy),
createdAt va updatedAt.
Keyin npm run db:generate ishga tushir, yaratilgan SQL faylni menga ko‘rsat va tushuntir,
so‘ng npm run db:migrate:local bilan mahalliy bazaga qo‘lla.
```

Migratsiya — bu baza tuzilishini o‘zgartiradigan buyruqlar yozilgan fayl. Ular `migrations/` papkasida turadi va bir marta qo‘llangandan keyin **hech qachon qo‘lda tahrirlanmaydi**: o‘zgartirish kerak bo‘lsa, yangi migratsiya qo‘shiladi.

**Tekshiring:** `migrations/` papkasida yangi `.sql` fayl bor, uni ochsangiz `CREATE TABLE` yozuvini ko‘rasiz. `npm run doctor` "Lokal ma’lumotlar bazasi migratsiyalari qo‘llangan." deydi.

## 3-qadam. Tekshiruv qoidalarini yozing

```text
src/features/clients/schema.ts faylini o‘qi va shu naqsh bo‘yicha
src/features/products/schema.ts faylini yarat.
Xato matnlari o‘zbekcha va nima qilish kerakligini aytadigan bo‘lsin:
"Mahsulot nomini kiriting", "Narxni kiriting", "Narx musbat son bo‘lsin", "Soni butun son bo‘lsin".
Bo‘sh maydonlarni null’ga aylantirish qoidasini clients’dagidek qoldir.
```

Bu fayl bitta ish qiladi: forma to‘g‘ri to‘ldirilganmi yoki yo‘qmi, shuni aytadi. Xuddi shu qoidalar brauzerda ham, serverda ham ishlaydi.

**Tekshiring:** `src/features/products/schema.ts` fayli bor va `npm run typecheck` xatosiz o‘tadi.

## 4-qadam. O‘qish va yozish funksiyalarini yarating

```text
src/features/clients/queries.ts va actions.ts fayllarini o‘qi.
Shu naqsh bo‘yicha src/features/products/queries.ts (ro‘yxat, bitta mahsulot, qidiruv)
va src/features/products/actions.ts (yaratish, yangilash, o‘chirish) fayllarini yarat.
Har bir server action albatta requireUser() bilan boshlansin — bu loyihada middleware yo‘q,
himoya aynan shu yerda.
```

**Tekshiring:** `src/features/products/actions.ts` faylini oching — har bir eksport qilingan funksiya ichida `requireUser()` chaqiruvini ko‘rishingiz kerak.

## 5-qadam. Sahifalar va komponentlarni qo‘shing

```text
src/features/clients/components va src/app/(app)/clients papkalarini o‘qi.
Shu naqsh bo‘yicha mahsulotlar uchun quyidagilarni yarat:
- src/features/products/components/products-table.tsx va product-form.tsx
- src/app/(app)/products/page.tsx (ro‘yxat), new/page.tsx, [id]/page.tsx, [id]/edit/page.tsx
- ro‘yxat va tafsilot sahifalari uchun loading.tsx
Sahifa PageHeader bilan boshlansin, bo‘sh holat EmptyState bilan ko‘rsatilsin.
Narx so‘mda, uch xonali guruhlar bilan yozilsin. Matnlar o‘zbekcha.
```

**Tekshiring:** `npm run dev` ishlab tursa, `http://localhost:3000/products` manzilini oching — bo‘sh ro‘yxat va "Mahsulot qo‘shish" tugmasi ko‘rinadi.

## 6-qadam. Menyuga havola qo‘shing

```text
src/config/nav.ts fayliga "Mahsulotlar" yozuvini qo‘sh: href /products,
ikonka lucide-react’dan mos biri (masalan Package). Mijozlardan keyin tursin.
```

**Tekshiring:** chap menyuda "Mahsulotlar" paydo bo‘ladi, bosganda `/products` ochiladi va menyudagi yozuv faol holatga o‘tadi.

## 7-qadam. Testlar yozing

```text
src/features/clients/schema.test.ts faylini o‘qi.
Shu uslubda src/features/products/schema.test.ts yoz: bo‘sh nom, manfiy narx,
kasr son bilan berilgan soni va to‘g‘ri to‘ldirilgan forma holatlarini tekshirsin.
Keyin npm run test ishga tushir.
```

**Tekshiring:** `npm run test` yashil natija beradi va yangi testlar sonini ko‘rsatadi.

## 8-qadam. Hammasini birga tekshiring

```text
npm run check ishga tushir (lint, typecheck, test va skill tekshiruvi).
Keyin Playwright MCP bilan quyidagini bajar: /products sahifasini och, yangi mahsulot qo‘sh,
ro‘yxatda ko‘rinishini tekshir, tahrirla, o‘chir.
Har qadamda skrinshot ol. 390px kenglikda va qorong‘i rejimda ham ko‘r.
Natijani o‘zbekcha ayt: nima ishladi, nima ishlamadi.
```

Playwright ulanmagan bo‘lsa, shu qadamlarni brauzerda o‘zingiz bajaring.

**Tekshiring:** `npm run check` xatosiz tugaydi va siz brauzerda mahsulot qo‘shib, tahrirlab, o‘chira olasiz.

## 9-qadam. Qaydni yozing

```text
docs/PROGRESS.md fayliga bugungi sana bilan yangi qayd qo‘sh:
nima o‘zgardi, nima tekshirildi va qanday (buyruq nomi yoki ochilgan sahifa),
ochiq qolgan muammo bormi, keyingi qadam nima.
Tekshirilmagan narsani "bajarildi" deb yozma.
Keyin o‘zgarishlarni bitta conventional commit bilan saqla.
```

**Tekshiring:** `git log --oneline -1` yangi commit’ni ko‘rsatadi, `docs/PROGRESS.md` esa yangi qaydni.

## Nazorat ro‘yxati

| # | Nima | Qaysi fayl | Namuna |
| --- | --- | --- | --- |
| 1 | Hujjat | `docs/PRODUCT.md`, `docs/FLOW.md` | — |
| 2 | Jadval | `src/lib/db/schema.ts` | `client` jadvali |
| 3 | Migratsiya | `migrations/` (avtomatik) | mavjud `.sql` fayllar |
| 4 | Tekshiruv qoidalari | `src/features/products/schema.ts` | `src/features/clients/schema.ts` |
| 5 | Doimiy qiymatlar (kerak bo‘lsa) | `src/features/products/constants.ts` | `src/features/clients/constants.ts` |
| 6 | O‘qish | `src/features/products/queries.ts` | `src/features/clients/queries.ts` |
| 7 | Yozish | `src/features/products/actions.ts` | `src/features/clients/actions.ts` |
| 8 | Komponentlar | `src/features/products/components/` | `src/features/clients/components/` |
| 9 | Sahifalar | `src/app/(app)/products/` | `src/app/(app)/clients/` |
| 10 | Menyu | `src/config/nav.ts` | mavjud uchta yozuv |
| 11 | Testlar | `src/features/products/*.test.ts` | `src/features/clients/schema.test.ts` |
| 12 | Qayd | `docs/PROGRESS.md` | oldingi qaydlar |

Bosqich yoki holat maydoni kerak bo‘lsa (masalan "Sotuvda / Tugagan"), `src/features/clients/constants.ts` faylidagi `CLIENT_STAGES` naqshini nusxalang: har bir qiymatning o‘zbekcha yorlig‘i bo‘lsin va yorliq har doim matn bilan ko‘rsatilsin.

## Nimalarga e’tibor bering

- **Bir qadamda bir ish.** Agentga "hammasini qilib ber" demang. Har qadamdan keyin natijani o‘zingiz ko‘ring.
- **Qo‘llangan migratsiyani tahrirlamang.** Har bir o‘zgarish uchun yangi migratsiya.
- **`requireUser()` majburiy.** Har bir server action va himoyalangan route handler shundan boshlanadi.
- **Semantik ranglar.** `bg-blue-500` yoki xom hex yozilmaydi.
- **Uzoqdagi baza.** Nashrdan keyin `npm run db:migrate:remote` ishlatilmasa, saytda "no such table" xatosi chiqadi. Buni `npm run deploy` o‘zi bajaradi.

## Muammo bo‘lsa

- Migratsiya to‘xtasa: [npm run setup migratsiyada to‘xtadi](08-muammolar.md#npm-run-setup-migratsiyada-toxtadi)
- Nashrdan keyin jadval topilmasa: [Nashrdan keyin no such table xatosi](08-muammolar.md#nashrdan-keyin-no-such-table-xatosi)
- Sahifa "Nimadir xato ketdi" deb chiqsa: [08-muammolar.md](08-muammolar.md)

## Keyingi qadam

Kundalik ish tartibini o‘rganing: [07-ish-sikli.md](07-ish-sikli.md).
