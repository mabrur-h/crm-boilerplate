# Muammolar va ularning yechimi

**Vaqt:** kerakli bo‘limni topish uchun 2 daqiqa. **Natija:** xato matnidan kelib chiqib nima bo‘lganini tushunasiz, tuzatish buyrug‘ini ishga tushirasiz yoki tayyor so‘rovni AI agentiga berasiz.

Har bir bo‘lim to‘rt qismdan iborat: **Belgisi** (nima ko‘rasiz), **Sababi**, **Yechim** va **AI’ga aytish uchun** (nusxalab qo‘yiladigan so‘rov).

Umumiy qoida: xato chiqqanda avval shu buyruqni ishga tushiring — ko‘p muammo shu yerda ko‘rinadi va nima qilish kerakligi ham yoziladi:

```bash
npm run doctor
```

Bu buyruq hech narsani o‘zgartirmaydi, faqat tekshiradi.

## Node.js topilmadi

**Belgisi.** Terminalda `node -v` yozganingizda versiya o‘rniga:

- Mac’da: `zsh: command not found: node`
- Windows’da: `'node' is not recognized as an internal or external command, operable program or batch file.`

**Sababi.** Node.js o‘rnatilmagan, yoki o‘rnatilgan-u, terminal uni hali ko‘rmayapti. Terminal o‘zi ochilgan paytdagi dasturlar ro‘yxatini eslab qoladi.

**Yechim.** Avval VS Code’ni butunlay yoping va qaytadan oching, so‘ng yangi terminal oching (**Terminal → New Terminal**) va buyruqni takrorlang. Baribir topilmasa, https://nodejs.org/en/download sahifasidan **LTS** variantini (hozir 24) o‘rnating. Batafsil: [00-kompyuter-tayyorlash.md](00-kompyuter-tayyorlash.md).

**AI’ga aytish uchun.**

```text
Terminalda node -v yozsam "command not found" chiqyapti.
Operatsion tizimimni aniqla va Node.js o‘rnatilgan-o‘rnatilmaganini tekshir.
Hech narsa o‘rnatma va sudo ishlatma — faqat rasmiy nodejs.org yuklab olish yo‘lini ayt.
Men o‘rnatib bo‘lgach node -v va npm -v ni qaytadan tekshir.
```

## Node.js versiyasi eski: EBADENGINE

**Belgisi.** `npm install` yoki `npm run setup` paytida:

```
npm error code EBADENGINE
npm error engine Unsupported engine
```

yoki `npm run doctor` javobida: `Node.js versiyasi juda eski (v20.x.x) — kamida 22 kerak.`

**Sababi.** Loyiha Node.js 22 yoki undan yangisini talab qiladi (`package.json` faylidagi `engines.node`), `.npmrc` faylida esa `engine-strict=true` yozilgan — ya’ni npm bu talabni qat’iy tekshiradi.

**Yechim.** https://nodejs.org/en/download sahifasidan 24 LTS versiyasini o‘rnating, VS Code’ni qaytadan oching va tekshiring:

```bash
node -v
```

Kompyuteringizda bir nechta Node.js versiyasi bo‘lsa (nvm, fnm, volta kabi vositalar bilan), loyiha papkasida `.nvmrc` fayli turibdi — unda `24` yozilgan.

**AI’ga aytish uchun.**

```text
npm run setup ishga tushirsam EBADENGINE xatosi chiqyapti.
node -v natijasini va package.json’dagi engines maydonini ko‘rsat,
qaysi versiya kerakligini ayt. Hech narsa o‘rnatma.
```

## 3000-port band

**Belgisi.** `npm run dev` ishga tushmayapti yoki boshqa portda ochilyapti; `npm run doctor` esa `3000-port band.` deb ogohlantiradi.

**Sababi.** Shu portni boshqa dastur egallab turibdi — ko‘pincha bu avvalgi seansdan yopilmay qolgan `npm run dev`.

**Yechim.** Portni kim band qilganini ko‘ring — Mac’da `lsof -i :3000`, Windows’da `netstat -ano | findstr :3000` (oxirgi ustundagi raqam jarayon raqami, uni Task Manager’dan topasiz). Odatda bu avvalgi dev server: o‘sha terminal oynasida **Ctrl+C** bosing. Yoki boshqa portda ishga tushiring:

```bash
npm run dev -- --port 3001
```

**AI’ga aytish uchun.**

```text
3000-port band. Kim band qilganini top va menga ayt.
Jarayonni o‘zing to‘xtatma — avval qanday dastur ekanini ko‘rsat,
men tasdiqlaganimdan keyin to‘xtat. Muqobil sifatida 3001-portda ishga tushirishni ham taklif qil.
```

## npm run setup migratsiyada to‘xtadi

**Belgisi.** Sozlash paytida:

```
❌ Lokal ma’lumotlar bazasi migratsiyasi muvaffaqiyatsiz tugadi.
   → Nima qilish kerak: npm run doctor orqali muammoni aniqlang, so‘ng qayta urinib ko‘ring: npm run db:migrate:local
```

**Sababi.** Bir nechta ehtimol: paketlar to‘liq o‘rnatilmagan, mahalliy baza fayli buzilgan yoki `migrations/` papkasidagi SQL faylda xato bor.

**Yechim.** Avval `npm run doctor` — nima yetishmayotganini ko‘ring. Keyin `npm install`, so‘ng migratsiyani alohida ishga tushirib, to‘liq xato matnini o‘qing:

```bash
npm run db:migrate:local
```

Mahalliy baza butunlay buzilgan bo‘lsa, uni tozalab boshdan qurish mumkin: mahalliy ma’lumotlar `.wrangler` papkasida saqlanadi. Bu papkani o‘chirish **faqat mahalliy** ma’lumotlarni yo‘qotadi (internetdagi bazaga tegmaydi), keyin `npm run setup` hammasini qaytadan yaratadi. Buni AI’dan so‘rab, tasdiqlab qiling.

**AI’ga aytish uchun.**

```text
npm run setup migratsiyada to‘xtab qoldi. To‘liq xato matni quyida:
<xato matnini shu yerga qo‘ying>
npm run doctor ishga tushir, natijani o‘zbekcha tushuntir va eng kichik tuzatishni taklif qil.
Hech narsani o‘chirishdan oldin mendan so‘ra.
```

## Email yoki parol noto‘g‘ri

**Belgisi.** Kirish sahifasida forma tepasida qizil matn: `Email yoki parol noto‘g‘ri`.

**Sababi.** Uch ehtimol: parol haqiqatan noto‘g‘ri; bunday email bilan hisob yo‘q; yoki mahalliy bazada demo ma’lumot yo‘q.

**Yechim.**

- Demo hisob bilan kiring: `demo@example.com` / `demo12345`. Ishlamasa, demo ma’lumotlarni qo‘shing:

  ```bash
  npm run db:seed
  ```

- Internetdagi saytda parolni unutgan bo‘lsangiz, hozircha parolni tiklash imkoniyati yo‘q (u `docs/PLAN.md`dagi keyingi bosqichlar ro‘yxatida). Yangi hisob oching yoki bazadagi eski hisobni o‘chirtiring.
- Nashrdan keyin `BETTER_AUTH_SECRET` qiymatini o‘zgartirgan bo‘lsangiz, bu sessiyalarni bekor qiladi, lekin parolga ta’sir qilmaydi.

**AI’ga aytish uchun.**

```text
Kirishda "Email yoki parol noto‘g‘ri" chiqyapti.
Mahalliy bazada qanday foydalanuvchilar borligini tekshir (faqat email’larni ko‘rsat, parollarni emas).
Demo hisob yo‘q bo‘lsa npm run db:seed ishga tushir va natijani ayt.
```

## Ro‘yxatdan o‘tish yopilgan

**Belgisi.** Ro‘yxatdan o‘tish sahifasida: `Ro‘yxatdan o‘tish yopilgan. Administrator bilan bog‘laning.`

**Sababi.** `wrangler.jsonc` faylidagi `ALLOW_SIGNUP` qiymati `"false"` qilib qo‘yilgan. Bu ataylab qilinadigan ish: sayt internetda turganda begonalar ro‘yxatdan o‘tmasligi uchun.

**Yechim.** Yangi odam qo‘shmoqchi bo‘lsangiz, vaqtincha oching: `wrangler.jsonc` faylida `"ALLOW_SIGNUP": "true"` qiling, `npm run deploy` bilan nashr qiling, odam ro‘yxatdan o‘tsin, so‘ng qiymatni yana `"false"` qilib qaytadan nashr qiling. Batafsil: [04-cloudflare.md](04-cloudflare.md).

**AI’ga aytish uchun.**

```text
Yangi hodimni tizimga qo‘shmoqchiman, lekin ro‘yxatdan o‘tish yopiq.
wrangler.jsonc’dagi ALLOW_SIGNUP qiymatini "true" qil va nashr qilish kerakligini eslat.
Nashrni o‘zing qilma — men tasdiqlaganimdan keyin qil.
Hodim ro‘yxatdan o‘tgach qiymatni qaytarishni ham eslat.
```

## AI hozir ishlamayapti

**Belgisi.** Mijoz sahifasidagi qoralama tugmasini bosganda: `AI hozir ishlamayapti. Keyinroq urinib ko‘ring.`

**Sababi.** Uch ehtimol:

1. Wrangler tizimga kirmagan. `AI` bindingi mahalliy ishda ham Cloudflare’ning haqiqiy serveriga murojaat qiladi — ya’ni `npm run dev` uchun ham internet va kirish kerak.
2. Kunlik neuron chegarasi (10 000) tugagan.
3. Model javob qaytarmadi yoki bo‘sh javob berdi.

**Yechim.**

```bash
npx wrangler whoami
```

Kirmagan bo‘lsangiz: `npx wrangler login`. Batafsil: [04-cloudflare.md](04-cloudflare.md).

Chegara haqida: bitta qoralama taxminan 16 neuron sarflaydi, ya’ni kuniga 600 tacha qoralama. Chegara har kuni yangilanadi.

**AI’ga aytish uchun.**

```text
Qoralama tugmasi "AI hozir ishlamayapti" deb xato beryapti.
npx wrangler whoami bilan kirish holatini tekshir.
Kirgan bo‘lsam, Cloudflare MCP orqali oxirgi Workers AI so‘rovlari va xatolariga qara,
sababini o‘zbekcha tushuntir. Hech narsani o‘zgartirma.
```

## R2 yoqilmagan: code 10042

**Belgisi.** Nashr paytida yoki `npm run r2:check` natijasida:

```
Please enable R2 through the Cloudflare Dashboard. [code: 10042]
```

yoki: `❌ R2 bu hisobda yoqilmagan.`

Ilovada esa fayl yuklashda: `Faylni saqlab bo‘lmadi. R2 yoqilganini tekshiring (docs/guides/04-cloudflare.md).`

**Sababi.** R2 har bir Cloudflare hisobida alohida yoqiladi, hatto bepul chegara ichida ishlatmoqchi bo‘lsangiz ham. Yoqish jarayoni to‘lov ma’lumotini so‘raydi.

**Yechim.** https://dash.cloudflare.com manzilini oching, **Storage & databases → R2 → Overview** bo‘limiga o‘ting va R2 obunasini qo‘shish jarayonini oxirigacha bajaring (karta yoki PayPal). Keyin tekshiring:

```bash
npm run r2:check
```

Bepul chegara: oyiga 10 GB xotira, 1 mln Class A va 10 mln Class B operatsiya, chiqish trafigi bepul. Pul faqat shu chegaradan oshganda yechiladi.

Hisobingizda to‘lanmagan qarz turgan bo‘lsa, R2 yoqilmasligi mumkin — bunda **Billing** bo‘limini tekshiring.

**AI’ga aytish uchun.**

```text
R2 code 10042 xatosi chiqyapti.
npm run r2:check ishga tushir va natijani o‘zbekcha tushuntir.
Keyin Cloudflare panelida R2’ni yoqish qadamlarini ayt. Hech qanday to‘lov amalini o‘zing bajarma.
```

## Worker exceeded CPU time limit

**Belgisi.** Sayt ochilmayapti yoki xato sahifasi chiqadi; Cloudflare loglarida:

```
Worker exceeded CPU time limit
```

**Sababi.** Bepul rejada har bir so‘rovga 10 millisekund protsessor vaqti beriladi. Bitta so‘rov ichida juda ko‘p hisob-kitob qilingan: og‘ir parol xeshlash, katta ro‘yxatni bir marta o‘qish, yoki tsikl ichidagi ko‘p so‘rov.

**Yechim.** Avval qaysi manzilda chiqayotganini aniqlang — loglarda so‘rov yo‘li ko‘rinadi. Ro‘yxat so‘rovlari bo‘lsa, sahifalash yoki chegara (`limit`) qo‘shing; tsikl ichida baza so‘rovi bo‘lsa, uni bitta so‘rovga birlashtiring. Bularning hech biri yordam bermasa, Workers Paid rejasi (oyiga $5) chegarani ancha ko‘taradi.

**AI’ga aytish uchun.**

```text
Saytda "Worker exceeded CPU time limit" xatosi chiqyapti.
Cloudflare MCP orqali oxirgi loglarga qara va qaysi manzilda chiqayotganini top.
Keyin shu yo‘lga tegishli kodni o‘qib, eng og‘ir joyni ko‘rsat va eng kichik tuzatishni taklif qil.
Hozircha kodni o‘zgartirma.
```

## Nashrdan keyin no such table xatosi

**Belgisi.** Sayt ochiladi, lekin kirish yoki ro‘yxat sahifasida xato; loglarda:

```
D1_ERROR: no such table: client
```

**Sababi.** Kod nashr qilingan, lekin uzoqdagi bazada jadvallar hali yaratilmagan. Migratsiyalar mahalliy va uzoqdagi bazaga alohida qo‘llanadi.

**Yechim.**

```bash
npm run db:migrate:remote
```

`npm run deploy` buyrug‘i buni o‘zi bajaradi. Xato ko‘pincha ikki holatda chiqadi: nashr faqat `wrangler deploy` bilan qilinganda yoki Workers Builds avtomatik nashr qilganda — avtomatik nashr migratsiyalarni qo‘llamaydi.

**AI’ga aytish uchun.**

```text
Saytda "no such table" xatosi chiqyapti.
Uzoqdagi bazada qaysi migratsiyalar qo‘llanganini tekshir va nima yetishmayotganini ayt.
Migratsiyani o‘zing qo‘llama — avval menga ko‘rsat va tasdiq so‘ra.
```

## Claude MCP serveri autentifikatsiya so‘ramoqda

**Belgisi.** Claude Code’da `/mcp` ro‘yxatida `cloudflare` serveri yonida "needs authentication" yoki ulanmaganlik belgisi turadi. Cloudflare haqidagi savolga agent javob bera olmaydi.

**Sababi.** `cloudflare` — bu HTTP orqali ishlaydigan uzoqdagi server, u bir martalik brauzer orqali kirishni talab qiladi. Loyihani birinchi ochganingizda bu qilinmagan yoki kirish muddati tugagan.

**Yechim.** Suhbatda `/mcp` deb yozing, ro‘yxatdan `cloudflare`ni tanlang va autentifikatsiya variantini bosing. Brauzerda Cloudflare hisobingizga kirib, ruxsatni tasdiqlang. Brauzer o‘zi ochilmasa, chiqqan havolani nusxalab, qo‘lda oching.

Papkaga ishonch bildirilmagan bo‘lsa ham serverlar ulanmaydi — Claude Code birinchi ochilishda so‘ragan ishonch savoliga "ha" deb javob berganingizni tekshiring.

**AI’ga aytish uchun.**

```text
/mcp ro‘yxatida cloudflare serveri ulanmagan ko‘rinyapti.
Hozirgi holatni ko‘rsat va ulanish uchun nima qilishim kerakligini qadamma-qadam ayt.
```

## Codex loyiha sozlamalarini o‘qimayapti

**Belgisi.** `codex mcp list` bo‘sh yoki ro‘yxatda `cloudflare`, `shadcn`, `playwright` yo‘q. Agent loyiha skill’lari haqida ham bilmaydi.

**Sababi.** Codex loyiha ichidagi `.codex/config.toml` faylini faqat siz loyihaga ishonch bildirganingizdan keyin o‘qiydi. Ishonch bildirilmagan papkada bu fayl butunlay e’tiborga olinmaydi.

**Yechim.** Codex’ni aynan loyiha papkasidan ishga tushiring — boshqa papkadan emas. Ishonch haqidagi so‘rov chiqsa, tasdiqlang. So‘rov chiqmasa yoki avval rad etgan bo‘lsangiz, sozlamalardan shu papkaning ishonch darajasini o‘zgartiring. Keyin `codex mcp list` bilan tekshiring. Batafsil: [03-chatgpt-ulash.md](03-chatgpt-ulash.md).

**AI’ga aytish uchun.**

```text
codex mcp list bo‘sh chiqyapti, .codex/config.toml o‘qilmayotganga o‘xshaydi.
Hozir qaysi papkada ishlayotganingni ayt va shu papka ishonchli deb belgilanganini tekshir.
Qanday tuzatishni qadamma-qadam ayt.
```

## Windows PowerShell npx buyrug‘ini bloklayapti

**Belgisi.** PowerShell’da `npm` yoki `npx` yozganda:

```
npm.ps1 cannot be loaded because running scripts is disabled on this system.
```

**Sababi.** PowerShell’ning skript ishga tushirish siyosati (execution policy) `Restricted` holatida. Bu Windows’ning odatiy himoyasi; npm o‘zining `.ps1` fayllari orqali ishlagani uchun ular ham bloklanadi.

**Yechim.** Faqat o‘z foydalanuvchingiz uchun siyosatni yumshating — administrator huquqi kerak emas:

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Tasdiqlash so‘ralsa `Y` bosing. `RemoteSigned` — mahalliy skriptlarga ruxsat beradi, internetdan yuklangan imzosiz skriptlarni esa bloklaydi.

Siyosatni butunlay o‘chiradigan (`Unrestricted`, `Bypass -Scope LocalMachine`) variantlarni tavsiya qilmaymiz.

Muqobil yo‘l: PowerShell o‘rniga CMD’dan foydalaning yoki VS Code terminalining odatiy turini Command Prompt qilib qo‘ying.

**AI’ga aytish uchun.**

```text
Windows PowerShell’da npx ishlamayapti: "running scripts is disabled on this system".
Nima uchun bunday bo‘layotganini tushuntir va faqat mening foydalanuvchim uchun amal qiladigan
eng kam ruxsatli yechimni ayt. Buyruqni o‘zing ishga tushirma — men o‘zim yozaman.
```

## Skill tekshiruvi xato beryapti

**Belgisi.** `npm run check` yoki `npm run skills:check` qizil `❌` bilan tugaydi, masalan: skill papkasi `skills.config.json`da yo‘q, `SKILL.md` frontmatter’i noto‘g‘ri, vendored skill’da LICENSE fayli yo‘q, yoki `.agents/skills` bilan `.claude/skills` bir xil emas.

**Sababi.** Loyihada skill’lar ikki joyda turadi: manba `.agents/skills/`, Claude Code uchun nusxa esa `.claude/skills/`. Tekshiruv ular bir xil ekanini va har bir skill to‘g‘ri yozilganini talab qiladi. Skill faylini qo‘lda tahrirlaganda yoki yangi papka qo‘shganda ular bir-biridan uzilib qoladi.

**Yechim.** Avval ikki papkani sinxronlang, keyin qaytadan tekshiring:

```bash
npm run skills:sync
npm run skills:check
```

Yangi skill qo‘shgan bo‘lsangiz, uni `skills.config.json` faylidagi `project` ro‘yxatiga ham qo‘shish kerak. Uchinchi tomon skill’i buzilgan bo‘lsa, uni manbadan qaytadan yuklang: `npm run skills:update`. Batafsil: [10-skilllar.md](10-skilllar.md).

**AI’ga aytish uchun.**

```text
npm run skills:check xato beryapti. To‘liq chiqishni ko‘rsat va har bir ❌ qatorini o‘zbekcha tushuntir.
Keyin eng kichik tuzatishni taklif qil. skills:update ni o‘zing ishga tushirma.
```

## Kerakli bo‘lim topilmadimi

Xato matnini o‘zi aytib turgan bo‘lishi mumkin. Uni to‘liq nusxalab, `xato` skill’iga bering:

- Claude Code’da: `/xato`
- Codex’da: "Xato chiqdi" deb yozing va matnni qo‘ying.

Yaxshi so‘rovda uchta narsa bo‘ladi: **qaysi buyruqni** yozdingiz, **nima kutgan edingiz**, **aynan qanday matn chiqdi**. "Ishlamayapti"ning o‘zi yetarli emas.

## Keyingi qadam

Notanish so‘zlar lug‘ati: [09-lugat.md](09-lugat.md).
