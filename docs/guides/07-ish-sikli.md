# Kundalik ish tartibi

**Vaqt:** o‘qish uchun 15 daqiqa, keyin har kuni ishlatasiz. **Natija:** har bir ish seansini bir xil tartibda boshlaysiz va tugatasiz, agentning "tayyor" degan javobini dalil bilan tekshirasiz va hech narsani yo‘qotmaysiz.

Bitta aylanani eslab qoling:

**holat → vazifa → tekshir → commit → nashr → qayd**

Har bir bosqichning o‘z skill’i bor, ya’ni bitta so‘z yozsangiz kifoya.

## Kerak bo‘ladi

- Ishlaydigan loyiha va ulangan AI agenti.
- `docs/TASKS.md` faylida bitta joriy vazifa.

## 1-qadam. Holat: qayerda to‘xtagan edik

Har bir yangi suhbat bo‘m-bo‘sh xotira bilan boshlanadi. Agent kechagi ishni eslamaydi.

- Claude Code’da: `/holat`
- Codex’da: "Qayerda to‘xtagan edik?"

Skill hech narsani o‘zgartirmaydi. U `docs/PRODUCT.md`, `FLOW.md`, `PLAN.md`, `TASKS.md` va `PROGRESS.md` fayllarini o‘qiydi, `git log` va `git status`ga qaraydi, so‘ng qisqa hisobot beradi: maqsad nima, joriy vazifa qaysi, uning tayyorlik sharti nima, oxirgi qayd nima deydi va hujjat bilan kod o‘rtasida qarama-qarshilik bormi.

**Tekshiring:** hisobotda joriy vazifa nomi va uning "Tayyor, agar" mezonlari aytilgan. Agar agent umumiy gap bilan javob bersa, hujjatlarni haqiqatan o‘qiganini so‘rang.

## 2-qadam. Vazifa: bitta ishni bajarish

- Claude Code’da: `/vazifa`
- Codex’da: "Vazifani bajar"

Skill joriy vazifani oladi, uning tayyorlik shartini o‘z so‘zlari bilan qaytaradi (siz tasdiqlaysiz), qisqa reja tuzadi, bajaradi, tekshiradi, `PROGRESS.md`ni yangilaydi va commit qiladi.

Bitta seansda **bitta vazifa**. "Ham buni, ham buni" desangiz, natijani tekshirish qiyinlashadi va xato qayerdan kelganini topib bo‘lmaydi.

**Tekshiring:** agent avval rejani ko‘rsatadi va sizdan tasdiq so‘raydi, keyin fayllarni o‘zgartiradi.

## 3-qadam. Tekshir: dalilsiz "tayyor" yo‘q

- Claude Code’da: `/tekshir`
- Codex’da: "Tekshirib ber"

Bu qadam eng muhimi. Skill `npm run check` buyrug‘ini ishga tushiradi (lint, tiplar, testlar va skill tekshiruvi), so‘ng o‘zgargan oqimni brauzerda bosib chiqadi — Playwright MCP orqali yoki sizga qadamlarni aytib.

### Agentning "tayyor" javobini qanday o‘qish kerak

Quyidagi uchta narsadan kamida bittasi bo‘lmasa, ish tayyor emas:

1. **Buyruq chiqishi.** `npm run check` natijasi ko‘chirib qo‘yilganmi? "Testlar o‘tdi" degan gapning o‘zi dalil emas.
2. **Ochilgan manzil.** Qaysi sahifa ochildi va u yerda nima ko‘rindi?
3. **Skrinshot.** Ayniqsa dizayn o‘zgarishlarida.

Shubhalansangiz, to‘g‘ridan-to‘g‘ri so‘rang:

```text
Buni qanday tekshirding? Ishga tushirgan buyruqni va uning chiqishini ko‘rsat.
Brauzerda ochgan bo‘lsang, qaysi manzilni ochding va u yerda nimani ko‘rding?
Tekshirmagan bo‘lsang, shuni ochiq ayt — taxmin qilma.
```

Va o‘zingiz ham ochib ko‘ring. Bir daqiqalik tekshiruv keyinchalik bir soatlik izlanishdan qutqaradi.

**Tekshiring:** `npm run check` xatosiz tugaydi va siz o‘zgarishni brauzerda o‘z ko‘zingiz bilan ko‘rdingiz.

## 4-qadam. Commit: saqlash nuqtasi

Git — fayllaringizning tarixini yuritadigan tizim. Uchta so‘zni bilsangiz yetadi:

| So‘z | Oddiy tilda |
| --- | --- |
| **commit** | Saqlash nuqtasi. Hozirgi holatni nomi bilan tarixga yozib qo‘yish. Kompyuteringizda qoladi |
| **push** | Shu saqlash nuqtalarini GitHub’ga yuborish. Shundan keyin ular internetda ham turadi |
| **revert** | Ortga qaytish. Biror commit’ning ta’sirini bekor qiladigan yangi commit yasash |

Bularning hammasini agentdan so‘rang, o‘zingiz buyruq yozib o‘tirmang. Faqat bitta qoida: **`git push` har doim sizning tasdiqingiz bilan bo‘ladi.** Bu `AGENTS.md`da ham, `.claude/settings.json`da ham yozilgan.

Yaxshi commit xabari nima o‘zgarganini bir qatorda aytadi: `feat: add products module`, `fix: correct phone validation message`, `docs: update progress`.

Bir narsa buzilib qolsa:

```text
Oxirgi commit’dan keyin sayt ishlamay qoldi.
git log --oneline -5 ni ko‘rsat, keyin oxirgi commit’ni revert qiladigan buyruqni ayt
va nima bo‘lishini tushuntir. Men tasdiqlagunimcha ishga tushirma.
```

**Tekshiring:** `git log --oneline -3` yangi commit’ni ko‘rsatadi, `git status` esa toza ishchi papkani.

## 5-qadam. Nashr: internetga chiqarish

- Claude Code’da: `/nashr`
- Codex’da: "Nashr qil"

Skill avval to‘xtaydi va sizdan tasdiq so‘raydi, chunki nashr ikkita qaytarib bo‘lmaydigan ish qiladi: sayt haqiqiy foydalanuvchilarga ko‘rinadi va uzoqdagi bazaga migratsiyalar qo‘llanadi. Keyin `npm run check` va `npm run r2:check`ni ishga tushiradi, `npm run deploy` bilan nashr qiladi va jonli manzilni ochib tekshiradi.

Har bir kichik o‘zgarishni nashr qilish shart emas. Bir nechta tekshirilgan o‘zgarishni to‘plab, keyin bir marta nashr qilish qulayroq.

**Tekshiring:** jonli manzil ochiladi, kirish ishlaydi va yangi o‘zgarish ko‘rinadi.

## 6-qadam. Qayd: keyingi safar uchun

Har bir tekshirilgan ishdan keyin `docs/PROGRESS.md` faylida beshta narsa yoziladi:

1. Sana.
2. Nima o‘zgardi.
3. Nima tekshirildi va **qanday** (buyruq nomi, ochilgan manzil, skrinshot).
4. Ochiq qolgan muammo.
5. Keyingi qadam.

Belgilar: `[x]` bajarildi, `[~]` qisman, `[ ]` boshlanmagan, `[-]` rejadan tashqari.

Bu fayl — ertangi kungi o‘zingizga yozilgan xat. Suhbatdagi "bajardim" javobini dalilsiz bu yerga ko‘chirmang.

**Tekshiring:** `docs/PROGRESS.md`ning tepasida bugungi sana bilan yangi qayd turibdi.

## Yaxshi vazifa qanday yoziladi

`docs/TASKS.md` faylida **bir vaqtda faqat bitta** vazifa turadi. Shakli quyidagicha:

```markdown
# Hozir: <vazifa nomi>

## Natija
<Bir-ikki gap: bu ish tugagandan keyin foydalanuvchi uchun nima o‘zgaradi.>

## Avval
<Boshlashdan oldin nimani o‘qish yoki hal qilish kerak.>

## Tayyor, agar
1. <Tekshirib bo‘ladigan aniq shart>
2. <Yana bittasi>
3. `npm run check` xatosiz tugaydi.
4. docs/PROGRESS.md’ga qayd yozilgan.

## Tegmaymiz
<Bu vazifada qo‘l urilmaydigan narsalar.>

## Holat
Rejalashtirilgan. Hali bajarilgan deb belgilanmagan.
```

Yaxshi "Tayyor, agar" bandi — uchinchi odam ham tekshira oladigan band.

- Yomon: "Mijozlar sahifasi yaxshilansin."
- Yaxshi: "`/clients` sahifasida qidiruv maydoniga kompaniya nomini yozganda ro‘yxat filtrlanadi, topilmasa esa `Bu filtr bo‘yicha mijoz topilmadi.` matni chiqadi."

Yangi vazifa yozishni ham agentdan so‘rashingiz mumkin:

```text
docs/PLAN.md’dagi "Keyingi bosqichlar" ro‘yxatidan birinchi bandni ol va uni
docs/TASKS.md formatida yoz: Natija, Avval, Tayyor agar (raqamlangan, tekshirib bo‘ladigan),
Tegmaymiz, Holat. Hozircha kod yozma.
```

## Bir kunlik namunaviy tartib

1. VS Code’ni oching, agent panelini oching.
2. `holat` — nima qilinganini eshiting.
3. Kerak bo‘lsa `docs/TASKS.md`ni yangilang.
4. `vazifa` — ishni bajartiring, har qadamni kuzating.
5. `tekshir` — dalil so‘rang, o‘zingiz ham brauzerda ko‘ring.
6. Commit qildiring.
7. Yetarli o‘zgarish to‘plangach — `nashr`.
8. `docs/PROGRESS.md`ni ko‘zdan kechiring.

## Muammo bo‘lsa

- Xato chiqsa, avval `xato` skill’ini ishlating: Claude Code’da `/xato`, Codex’da "Xato chiqdi".
- Muhit buzilganga o‘xshasa: `npm run doctor`.
- Tanish bo‘lgan xatolar ro‘yxati: [08-muammolar.md](08-muammolar.md).
- Skill tekshiruvi xato bersa: [Skill tekshiruvi xato beryapti](08-muammolar.md#skill-tekshiruvi-xato-beryapti)

## Keyingi qadam

Xatolar bilan ishlashni o‘rganing: [08-muammolar.md](08-muammolar.md).
