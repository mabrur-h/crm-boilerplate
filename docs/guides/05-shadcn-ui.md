# Ko‘rinishni o‘zgartirish: shadcn/ui

**Vaqt:** 30–45 daqiqa. **Natija:** ilovaning brend rangini o‘zgartirasiz, yangi tayyor komponent qo‘shasiz va natijani telefon kengligida hamda qorong‘i rejimda tekshirasiz.

shadcn/ui — bu odatiy kutubxona emas. U tugma, forma, jadval va dialog kabi komponentlarning **kodini loyihangizga nusxalab beradi**. Nusxalar `src/components/ui/` papkasida turadi va ular endi sizniki. Shuning uchun ularni yangilash ham, o‘zgartirish ham CLI orqali bo‘ladi — qo‘lda emas.

## Kerak bo‘ladi

- Ishlaydigan loyiha va `npm run dev` — [01-template-olish.md](01-template-olish.md).
- Ulangan AI agenti — [02-claude-ulash.md](02-claude-ulash.md) yoki [03-chatgpt-ulash.md](03-chatgpt-ulash.md).
- Dizayn qoidalari: [docs/DESIGN-SYSTEM.md](../DESIGN-SYSTEM.md). Har bir o‘zgarish shu hujjatga mos bo‘lishi kerak.

## 1-qadam. Yangi komponent qo‘shing

Ikki yo‘li bor, natija bir xil.

- **AI’dan so‘rash (qulayroq).** Loyihada `shadcn` MCP serveri ulangan, ya’ni agent komponentlarni o‘zi qidiradi, ko‘radi va qo‘shadi:

  ```text
  shadcn MCP orqali "tooltip" komponentini qidirib top, nima ekanini ayt va loyihaga qo‘sh.
  Qo‘shgandan keyin src/components/ui ichida qaysi yangi fayl paydo bo‘lganini ko‘rsat.
  ```

- **O‘zingiz buyruq bilan:**

  ```bash
  npx shadcn@4.21.0 add tooltip
  ```

  Versiya raqamini o‘zgartirmang: loyihada aynan 4.21.0 qotirilgan, `.mcp.json` va `.codex/config.toml` fayllarida ham shu versiya yozilgan.

**Tekshiring:** `src/components/ui/` papkasida yangi fayl paydo bo‘ladi va `npm run typecheck` xatosiz o‘tadi.

## 2-qadam. Tayyor blokdan foydalaning

Blok — bir nechta komponentdan yig‘ilgan tayyor bo‘lak: kirish formasi, sozlamalar sahifasi, statistika kartochkalari va hokazo. Ularni https://ui.shadcn.com/blocks sahifasida ko‘rasiz.

Yoqqan blokni tanlang, uning nomini eslab qoling va agentga ayting:

```text
https://ui.shadcn.com/blocks sahifasidagi "<blok nomi>" blokini asos qilib ol.
Uni bizning loyihamizga moslashtir: matnlar o‘zbekcha bo‘lsin, ranglar faqat semantik tokenlardan
(bg-background, text-muted-foreground, bg-primary) olinsin, xom hex yoki bg-blue-500 ishlatilmasin.
Avval nima o‘zgarishini ayt, keyin qil.
```

Blokni ko‘r-ko‘rona nusxalamang: ko‘p bloklarda ingliz tilidagi matn va boshqa rang sxemasi bo‘ladi. Agent uni loyiha qoidalariga moslashi kerak.

**Tekshiring:** yangi bo‘lak sahifada ko‘rinadi, matnlar o‘zbekcha va ranglar ilovaning qolgan qismi bilan bir xil.

## 3-qadam. Brend rangini o‘zgartiring

Ilovaning butun rang palitrasi ikkita o‘zgaruvchidan hisoblanadi. Ular `src/app/globals.css` faylida, izoh bilan belgilangan joyda turadi:

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

`--brand-hue` — rang doirasidagi burchak: `196` ko‘kimtir-yashil, `265` siyohrang, `25` g‘ishtrang, `145` yashil. `--brand-chroma` — rangning to‘yinganligi. Qorong‘i rejimda u biroz yuqoriroq, chunki qora fonda rang so‘nib ko‘rinadi.

Shu to‘rt qatordan boshqa hech narsaga tegmang.

Agentga so‘rov:

```text
src/app/globals.css faylidagi --brand-hue qiymatini 265 qil (:root va .dark ikkalasida ham).
Boshqa hech qanday rang qiymatiga tegma.
Keyin Playwright MCP bilan /dashboard va /clients sahifalarini yorug‘ va qorong‘i rejimda och,
skrinshot ol va matn bilan fon farqi yetarli ekanini ayt.
```

**Tekshiring:** `npm run dev` ishlab tursa, sahifa o‘zi yangilanadi va tugmalar yangi rangga o‘tadi. Matn bilan fon orasidagi farq kamida 4.5:1 bo‘lishi kerak — https://webaim.org/resources/contrastchecker/ da tekshiring.

## 4-qadam. Tayyor tema olib kelish (tweakcn)

Butun temani boshqatdan yig‘moqchi bo‘lsangiz, https://tweakcn.com saytida rang, radius va shriftni vizual tanlab, natijani CSS o‘zgaruvchilari ko‘rinishida eksport qilasiz.

1. tweakcn’da temani yig‘ing va eksport qiling.
2. Chiqqan o‘zgaruvchilarni `src/app/globals.css` faylidagi tegishli bloklarga (`:root` va `.dark`) ko‘chiring.
3. Har bir sahifani ikkala rejimda ko‘zdan kechiring.

Bu qadamdan keyin brend o‘zgaruvchilari (`--brand-hue`, `--brand-chroma`) ishlamay qolishi mumkin — tweakcn ranglarni to‘g‘ridan-to‘g‘ri yozadi. Bu normal holat, lekin buni bilib turing.

**Tekshiring:** barcha sahifalar ochiladi, hech qayerda o‘qilmaydigan (fon bilan qo‘shilib ketgan) matn yo‘q.

## 5-qadam. Agentga shadcn hujjatlarini ko‘rsating

shadcn/ui’ning hujjatlari agentlar uchun bitta matnli faylga jamlangan: https://ui.shadcn.com/llms.txt

Agent biror komponentni noto‘g‘ri ishlatayotgan bo‘lsa yoki eskirgan ma’lumotdan foydalanayotgan bo‘lsa, shu faylni o‘qishni so‘rang:

```text
https://ui.shadcn.com/llms.txt faylini o‘qi va shu loyihadagi Dialog komponentining
to‘g‘ri ishlatilishini tekshir. Farq bo‘lsa ko‘rsat.
```

**Tekshiring:** agent javobida hujjatdagi aniq bo‘limga ishora bo‘ladi, quruq taxmin emas.

## Qoidalar

Bu qoidalar `AGENTS.md` va [docs/DESIGN-SYSTEM.md](../DESIGN-SYSTEM.md)da yozilgan. Agent ularni buzsa, to‘xtating.

- `src/components/ui/*` fayllarini **qo‘lda tahrirlamang**. Komponentni o‘zgartirish kerak bo‘lsa, uni o‘rab, tashqaridan klass bering.
- Faqat semantik nomlardan foydalaning: `bg-background`, `text-muted-foreground`, `bg-primary`. `#2563EB` yoki `bg-blue-500` kabi yozuvlar bu loyihada uchramaydi.
- Interfeys matni — o‘zbekcha. Tugma so‘zlari doimiy: Saqlash, Bekor qilish, O‘chirish, Tahrirlash, Qo‘shish, Kirish, Chiqish, Ro‘yxatdan o‘tish.
- Har bir o‘zgarishni **390px kenglikda** va **qorong‘i rejimda** ko‘ring.
- Holat faqat rang bilan berilmaydi: bosqich yorlig‘ida har doim matn bo‘ladi.
- Gradient, katta soya, emoji bezak va reklama ohangidagi matn ishlatilmaydi. To‘liq ro‘yxat: DESIGN-SYSTEM.md’ning "Rad etilgan uslublar" bo‘limi.

## `dizayn` skill’i

Har safar bu qoidalarni qayta yozib o‘tirmaslik uchun loyihada `dizayn` nomli skill bor. U komponent qidirishdan tortib Playwright bilan tekshirishgacha bo‘lgan tartibni o‘zi biladi.

- Claude Code’da: `/dizayn`
- Codex’da: "Dizaynni o‘zgartir" deb yozing yoki `.agents/skills/dizayn/SKILL.md` faylini o‘qishni so‘rang.

## Beshta tayyor so‘rov

Mavjud ekranni yaxshilash:

```text
/clients sahifasidagi jadvalni ko‘rib chiq. Bo‘shliqlar va tekislanish DESIGN-SYSTEM.md qoidalariga
mos kelmasa, tuzat. Yangi rang yoki yangi komponent qo‘shma.
Keyin 390px kenglikda va qorong‘i rejimda skrinshot ol.
```

Yangi komponent qo‘shish:

```text
Mijoz sahifasidagi telefon raqami yoniga nusxa olish tugmasi kerak.
shadcn’dan mos komponentni tanla va qo‘sh, tugmaga o‘zbekcha aria-label yoz,
bosilganda "Nusxalandi" xabari chiqsin.
```

Bo‘sh holatni yaxshilash:

```text
Mijozlar ro‘yxatining bo‘sh holatini ko‘rib chiq (EmptyState komponenti).
Matn nima qilish kerakligini aytsin, tugma esa mijoz qo‘shish sahifasiga olib borsin.
Reklama ohangida yozma.
```

Rangni o‘zgartirish:

```text
Brend rangini yashilga o‘zgartir: src/app/globals.css faylida --brand-hue qiymatini 145 qil,
:root va .dark ikkalasida ham. Boshqa hech narsaga tegma.
Keyin barcha sahifalarni ikkala rejimda tekshir va kontrast yetarli ekanini ayt.
```

Mobil ko‘rinishni tekshirish:

```text
Playwright MCP bilan 390px kenglikda /dashboard, /clients va /clients/new sahifalarini och.
Gorizontal siljish, kesilgan matn yoki 40px dan kichik tugma bo‘lsa ko‘rsat va tuzat.
```

## Muammo bo‘lsa

- `npx shadcn` buyrug‘i Windows’da bloklansa: [Windows PowerShell npx buyrug‘ini bloklayapti](08-muammolar.md#windows-powershell-npx-buyrugini-bloklayapti)
- O‘zgarishdan keyin `npm run check` xato bersa: [08-muammolar.md](08-muammolar.md)

## Keyingi qadam

Yangi bo‘lim qo‘shishni o‘rganing: [06-yangi-modul.md](06-yangi-modul.md).
