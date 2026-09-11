# Claude Code’ni loyihaga ulash

**Vaqt:** 20–30 daqiqa. **Natija:** Claude Code loyiha papkasini ko‘radi, `AGENTS.md`dagi qoidalarni o‘qiydi, Cloudflare MCP serveriga ulangan va sizning birinchi so‘rovingizga o‘zbek tilida javob beradi.

## Kerak bo‘ladi

- Kompyuterda Node.js, Git va VS Code — [00-kompyuter-tayyorlash.md](00-kompyuter-tayyorlash.md).
- Loyihaning o‘z nusxasi kompyuteringizda — [01-template-olish.md](01-template-olish.md).
- Claude obunasi: Pro, Max, Team yoki Enterprise. Muqobil yo‘l — Claude Console hisobi (oldindan to‘lab qo‘yilgan kredit bilan).

## 1-qadam. Claude Code’ni qayerda ochishni tanlang

Uchta variant bor, uchalasi ham bir xil agent:

- **Desktop ilova.** Claude’ning kompyuterga o‘rnatiladigan ilovasida uchta yorliq bor: **Chat**, **Cowork** va **Code**. **Code** yorlig‘i — aynan shu agent. Windows’da birinchi ochishdan oldin Git for Windows o‘rnatilgan bo‘lishi kerak (uni [00-kompyuter-tayyorlash.md](00-kompyuter-tayyorlash.md)da o‘rnatgansiz), o‘rnatgandan keyin ilovani qaytadan ishga tushiring.
- **VS Code kengaytmasi.** VS Code’dagi **Extensions** bo‘limida `Claude Code` deb qidiring va nashriyotchisi **Anthropic** bo‘lganini o‘rnating.
- **Terminal (CLI).** Eng sodda va eng barqaror yo‘l.

Terminaldan o‘rnatish buyruqlari:

- **Mac’da (va Linux, WSL):**

  ```bash
  curl -fsSL https://claude.ai/install.sh | bash
  ```

  Homebrew ishlatsangiz: `brew install --cask claude-code`.

- **Windows’da (PowerShell):**

  ```powershell
  irm https://claude.ai/install.ps1 | iex
  ```

  WinGet ishlatsangiz: `winget install Anthropic.ClaudeCode`.

  Terminalingiz PowerShell ekanini qatorning boshidagi `PS C:\` yozuvidan bilasiz. `PS`siz `C:\` bo‘lsa — bu CMD, u yerda `irm` ishlamaydi.

**Tekshiring:**

```bash
claude --version
```

Versiya raqami va uning yonida `(Claude Code)` chiqadi.

## 2-qadam. Hisobingizga kiring

Loyiha papkasida turib agentni ishga tushiring:

```bash
claude
```

Birinchi safar u sizdan kirishni so‘raydi va brauzerni ochadi. Kirib bo‘lgach terminalga qaytasiz. Keyinchalik hisobni almashtirmoqchi bo‘lsangiz, suhbat ichida `/login` deb yozing.

**Tekshiring:** terminalda Claude Code so‘rov satri ochiladi, tepasida esa joriy model va ishlayotgan papka nomi turadi. Papka nomi sizning loyiha papkangiz bo‘lishi shart.

## 3-qadam. Loyihaga ishonch bildiring va MCP serverlarini tasdiqlang

Papkani birinchi marta ochganingizda Claude Code sizdan shu papkaga ishonasizmi deb so‘raydi. Tasdiqlang — loyihaning `.claude/settings.json` faylidagi sozlamalar faqat shundan keyin ishlay boshlaydi.

MCP server — bu agentga tashqi vositani ulaydigan ko‘prik. Loyihada uchtasi `.mcp.json` faylida yozilgan:

| Server | Nima qiladi |
| --- | --- |
| `cloudflare` | Cloudflare hisobingiz bilan gaplashadi: resurslar, loglar, hujjatlardan qidirish |
| `shadcn` | shadcn/ui komponentlarini qidiradi, ko‘rsatadi va loyihaga qo‘shadi |
| `playwright` | Haqiqiy brauzerni boshqaradi: sahifani ochadi, tugmani bosadi, natijani tekshiradi |

Loyihaning `.claude/settings.json` faylida shu uchtasi oldindan yoqib qo‘yilgan, shuning uchun odatda qo‘shimcha savol chiqmaydi. Agar chiqsa — ro‘yxatni o‘qing va tasdiqlang.

**Tekshiring:** suhbatda `/mcp` deb yozing. Uchala server ham ro‘yxatda ko‘rinadi.

## 4-qadam. Cloudflare serveriga kiring

`cloudflare` serveri sizning hisobingizga tegadi, shuning uchun u bir martalik kirishni talab qiladi.

1. Suhbatda `/mcp` deb yozing.
2. Ro‘yxatdan `cloudflare`ni tanlang.
3. Autentifikatsiya variantini tanlang — brauzer ochiladi.
4. Cloudflare hisobingizga kiring va agentga beriladigan ruxsatlarni ko‘rib chiqib tasdiqlang.
5. Terminalga qayting.

Brauzer o‘zi ochilmasa, ekranda chiqqan havolani nusxalab, brauzerga qo‘ying.

**Tekshiring:** `/mcp` ro‘yxatida `cloudflare` yonida ulanganlik belgisi turadi. Sinov uchun so‘rang: "Cloudflare hisobimda qanday D1 bazalari bor?"

## 5-qadam. Skill’lar qanday ishlaydi

Skill — bu agentga bitta ishni qanday bajarishni o‘rgatadigan yozma yo‘riqnoma. Loyihada to‘qqizta o‘z skill’i bor, ular `.agents/skills/` papkasida turadi va `npm run skills:sync` buyrug‘i ularni `.claude/skills/`ga nusxalaydi.

Skill’ni ikki yo‘l bilan ishga solasiz:

- **Nomi bilan:** `/boshlash`, `/holat`, `/vazifa` kabi.
- **Oddiy gap bilan:** "Qayerda to‘xtagan edik?" desangiz, Claude skill tavsifiga qarab `holat`ni o‘zi tanlaydi.

To‘liq ro‘yxat va misollar: [10-skilllar.md](10-skilllar.md).

**Tekshiring:** suhbatga `/` yozing — ro‘yxatda `boshlash`, `holat`, `vazifa` kabi nomlarni ko‘rasiz.

## 6-qadam. Ruxsat so‘rovlarini tushunish

Claude Code ba’zi ishlarni so‘ramasdan bajaradi, ba’zilarini esa har safar so‘raydi. Buni loyihaning `.claude/settings.json` fayli belgilaydi.

**So‘ramasdan bajariladi** (xavfsiz, faqat kompyuteringizga ta’sir qiladi):

`npm run check`, `npm run lint`, `npm run typecheck`, `npm run test`, `npm run dev`, `npm run doctor`, `npm run setup`, `npm run db:generate`, `npm run db:migrate:local`, `npm run db:seed`, `npm run skills:check`, shuningdek `git status`, `git diff` va `git log`.

**Har safar so‘raydi** (natijasi tashqarida ko‘rinadi yoki qaytarib bo‘lmaydi):

`npm run deploy`, `npm run db:migrate:remote`, `npx wrangler deploy`, uzoqdagi bazaga migratsiya, `git push`, `npm run cf:setup`.

So‘rov chiqqanda shoshilmang: buyruqni o‘qing va nima o‘zgarishini tushuning. Ishonchingiz komil bo‘lmasa, "Nima uchun bu buyruq kerak?" deb so‘rang.

**Tekshiring:** agentga "Testlarni ishga tushir" deng — u `npm run test`ni so‘ramasdan bajaradi. "Nashr qil" desangiz — avval so‘raydi.

## 7-qadam. Claude ilovasiga Cloudflare’ni ulash (ixtiyoriy)

Kod yozmasdan, oddiy suhbatda Cloudflare hisobingiz haqida savol bermoqchi bo‘lsangiz, xuddi shu MCP serverini Claude ilovasiga ham ulash mumkin. Bu **kod yozish uchun emas** — kod bilan ishlashni Claude Code bajaradi. Bu variant "bazamda nechta yozuv bor", "kecha xato loglari bo‘lganmi", "Worker’im qaysi manzilda" kabi savollar uchun qulay.

Ulanadigan manzil: `https://mcp.cloudflare.com/mcp`

- **Pro va Max rejalarida:** sozlamalardagi **Customize → Connectors** bo‘limini oching, `+` tugmasini bosib maxsus konnektor qo‘shishni tanlang, yuqoridagi manzilni kiriting va qo‘shing.
- **Team va Enterprise rejalarida:** konnektorni faqat egasi (Owner) tashkilot sozlamalaridagi **Connectors** bo‘limidan qo‘sha oladi. Undan keyin qolganlar **Customize → Connectors** ro‘yxatidan uni ulaydi.
- **Bepul rejada** maxsus konnektorlar mavjud, lekin bittasi bilan cheklangan.

Menyu nomlari vaqt o‘tishi bilan o‘zgarishi mumkin. Aynan shu so‘zlarni topolmasangiz, sozlamalar ichidan konnektorlar bo‘limini qidiring.

**Tekshiring:** suhbatda konnektorni yoqib, "Cloudflare hisobimdagi Worker’lar ro‘yxatini ber" deb so‘rang — javobda o‘z Worker’ingiz nomini ko‘rasiz.

## Birinchi so‘rovlar

Papkani ochib bo‘lgandan keyin shulardan boshlang.

Loyihani sozlash:

```text
boshlash
```

Loyiha nima ekanini tushunish:

```text
Bu loyiha nima qiladi? docs/PRODUCT.md va docs/FLOW.md’ni o‘qi va menga o‘zbekcha, sodda tilda ayt.
Hozircha hech narsani o‘zgartirma.
```

Ishni davom ettirish:

```text
Qayerda to‘xtagan edik? docs/TASKS.md va docs/PROGRESS.md’ni o‘qi, git log va git status’ga qara,
keyin joriy vazifani va uning tayyorlik shartini ayt. Kodni o‘zgartirma.
```

Ko‘proq tayyor so‘rovlar: [docs/prompts/claude-code.md](../prompts/claude-code.md).

## Muammo bo‘lsa

- `/mcp` ro‘yxatida `cloudflare` ulanmagan ko‘rinsa: [Claude MCP serveri autentifikatsiya so‘ramoqda](08-muammolar.md#claude-mcp-serveri-autentifikatsiya-soramoqda)
- Windows’da o‘rnatish buyrug‘i ishlamasa: [Windows PowerShell npx buyrug‘ini bloklayapti](08-muammolar.md#windows-powershell-npx-buyrugini-bloklayapti)
- AI qoralamasi ishlamasa: [AI hozir ishlamayapti](08-muammolar.md#ai-hozir-ishlamayapti)

Barcha muammolar: [08-muammolar.md](08-muammolar.md).

## Keyingi qadam

Cloudflare hisobini sozlang va birinchi nashrni qiling: [04-cloudflare.md](04-cloudflare.md).
