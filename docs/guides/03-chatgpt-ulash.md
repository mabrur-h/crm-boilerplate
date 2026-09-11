# ChatGPT va Codex’ni loyihaga ulash

**Vaqt:** 20–30 daqiqa. **Natija:** Codex loyiha papkasini ko‘radi, `AGENTS.md` va `.agents/skills` papkasidagi qoidalarni o‘qiydi, Cloudflare MCP serveriga ulangan, ChatGPT’ning veb suhbatidan esa hisobingiz haqida savol bera olasiz.

Codex — OpenAI’ning kod bilan ishlaydigan agenti. U ChatGPT rejalariga kiritilgan (Free, Go, Plus, Pro, Business, Edu, Enterprise), limitlar esa rejaga qarab farq qiladi.

## Kerak bo‘ladi

- Kompyuterda Node.js, Git va VS Code — [00-kompyuter-tayyorlash.md](00-kompyuter-tayyorlash.md).
- Loyihaning o‘z nusxasi kompyuteringizda — [01-template-olish.md](01-template-olish.md).
- ChatGPT hisobi.

## 1-qadam. Codex’ni qayerda ochishni tanlang

Codex bir nechta ko‘rinishda keladi, ichidagi agent bir xil:

- **VS Code kengaytmasi.** VS Code’dagi **Extensions** bo‘limida qidiring, nashriyotchisi **OpenAI** bo‘lgan rasmiy kengaytmani o‘rnating. Belgisi ko‘rinmasa, Command Palette’ni oching (**Ctrl+Shift+P** / **Cmd+Shift+P**) va `Codex: Open Codex Sidebar` buyrug‘ini toping.
- **Desktop ilova.** Mac va Windows uchun alohida ilova bor.
- **Terminal (CLI).** Bu yo‘riqnomada asosan shu ishlatiladi, chunki loyihaning skill’lari va MCP sozlamalari u bilan bevosita ishlaydi.
- **Bulut (veb).** Brauzerdan topshiriq berish uchun.

CLI’ni o‘rnatish:

- **Mac’da (va Linux):**

  ```bash
  curl -fsSL https://chatgpt.com/codex/install.sh | sh
  ```

- **Node.js orqali (Mac va Windows uchun bir xil):**

  ```bash
  npm install -g @openai/codex
  ```

Homebrew va Windows uchun alohida o‘rnatuvchi ham mavjud — rasmiy ro‘yxat https://developers.openai.com/codex/cli sahifasida.

**Tekshiring:**

```bash
codex --version
```

Versiya raqami chiqadi.

## 2-qadam. ChatGPT hisobi bilan kiring

Loyiha papkasida turib ishga tushiring:

```bash
codex
```

Birinchi safar u kirish usulini so‘raydi — **Sign in with ChatGPT** variantini tanlang. Brauzer ochiladi, hisobingizga kirasiz va terminalga qaytasiz.

**Tekshiring:** suhbat ichida `/status` deb yozing — hisobingiz va joriy papka ko‘rinadi.

## 3-qadam. Loyihaga ishonch bildiring

Bu qadamni o‘tkazib yubormang. Loyihada `.codex/config.toml` fayli bor va unda uchta MCP serveri yozilgan. Codex loyiha ichidagi `.codex/config.toml` faylini **faqat siz loyihaga ishonch bildirganingizdan keyin** o‘qiydi. Ishonch bildirilmagan papkada bu fayl butunlay e’tiborga olinmaydi.

Papkani birinchi marta ochganingizda Codex ishonch haqida so‘raydi — tasdiqlang. So‘rov chiqmasa yoki avval rad etgan bo‘lsangiz, sozlamalar ichidan shu papkaning ishonch darajasini o‘zgartirasiz.

**Tekshiring:**

```bash
codex mcp list
```

Ro‘yxatda `cloudflare`, `shadcn` va `playwright` ko‘rinishi kerak. Ro‘yxat bo‘sh bo‘lsa — papka hali ishonchli emas.

## 4-qadam. Cloudflare serveriga kiring

`cloudflare` serveri HTTP orqali ishlaydi va hisobingizga tegadi, shuning uchun alohida kirish kerak:

```bash
codex mcp login cloudflare
```

Brauzer ochiladi, Cloudflare hisobingizga kirasiz va agentga beriladigan ruxsatlarni tasdiqlaysiz.

**Tekshiring:** `codex mcp list` ro‘yxatida `cloudflare` ulangan holatda ko‘rinadi. Sinov savoli: "Cloudflare hisobimda qanday D1 bazalari bor?"

## 5-qadam. Codex loyiha qoidalarini qanday o‘qiydi

Ikkita mexanizm ishlaydi:

- **`AGENTS.md`** — loyiha ildizidagi qoidalar fayli. Codex uni o‘zi o‘qiydi: u yerda o‘zbek tilida javob berish, bitta vazifa ustida ishlash, `src/components/ui/*`ni qo‘lda tahrirlamaslik kabi qoidalar yozilgan. Claude uchun `CLAUDE.md` fayli bor, u shu faylni ichiga oladi — ya’ni ikkala agent bir xil qoidalarga bo‘ysunadi.
- **`.agents/skills/`** — skill’lar papkasi. Codex joriy papkadan repozitoriya ildizigacha bo‘lgan har bir darajada `.agents/skills` papkasini qidiradi va topgan har bir `SKILL.md` faylining nomi hamda tavsifini eslab qoladi. Kerak bo‘lganda o‘zi ochib o‘qiydi.

Shuning uchun Codex’da skill’ni odatda **oddiy gap bilan** chaqirasiz: "Loyihani ishga tushir", "Qayerda to‘xtagan edik?", "Mahsulotlar bo‘limini qil". Agent tavsifga qarab mos skill’ni topadi. Aniqroq bo‘lishni istasangiz, skill nomini gapning ichida ayting:

```text
.agents/skills/holat/SKILL.md faylidagi ko‘rsatmani bajar.
```

To‘liq ro‘yxat: [10-skilllar.md](10-skilllar.md).

**Tekshiring:** agentga "Loyihada qanday skill’lar bor?" deb yozing — u to‘qqizta loyiha skill’ini sanab beradi.

## 6-qadam. ChatGPT veb suhbatiga Cloudflare’ni ulash (ixtiyoriy)

Kod yozmasdan, oddiy suhbatda Cloudflare hisobingiz haqida savol bermoqchi bo‘lsangiz, ChatGPT’ning veb versiyasida Developer mode’ni yoqib, shu MCP serverini ulashingiz mumkin.

Ulanadigan manzil: `https://mcp.cloudflare.com/mcp`

1. Developer mode veb ChatGPT’da Pro, Plus, Business, Enterprise va Edu hisoblarida mavjud. Uni **Settings → Security and login** bo‘limidagi tegishli tugmadan yoqasiz. Business va Enterprise ish maydonlarida buni avval administrator ruxsat berishi kerak bo‘lishi mumkin.
2. Yoqilgandan keyin konnektorlar bo‘limidan yangi MCP serverini qo‘shasiz va yuqoridagi manzilni kiritasiz.
3. Yozish amallari (ya’ni biror narsani o‘zgartiradigan amallar) sukut bo‘yicha har safar sizdan tasdiq so‘raydi. Tasdiqlashdan oldin agent yubormoqchi bo‘lgan ma’lumotni o‘qing — noto‘g‘ri yozish amali ma’lumotni o‘chirib yoki o‘zgartirib yuborishi mumkin.

Sozlamalar nomlari o‘zgarishi mumkin. Aynan shu so‘zlarni topolmasangiz, sozlamalar ichidan xavfsizlik va konnektorlar bo‘limlarini qidiring.

**Tekshiring:** suhbatda "Cloudflare hisobimdagi Worker’lar ro‘yxatini ber" deb so‘rang — javobda o‘z Worker’ingiz nomini ko‘rasiz.

## Qaysi ish qayerda

| Ish | ChatGPT veb suhbati | Codex (CLI, kengaytma, ilova) |
| --- | --- | --- |
| Nima qilishni maslahatlashish, rejani muhokama qilish | Ha | Ha |
| Xato matnini tushuntirib berish | Ha | Ha |
| Cloudflare hisobidan ma’lumot so‘rash | Ha (Developer mode va konnektor bilan) | Ha (`cloudflare` MCP serveri bilan) |
| Fayllarni o‘qish va o‘zgartirish | Yo‘q | Ha |
| Buyruq ishga tushirish (`npm run dev`, testlar) | Yo‘q | Ha |
| Loyiha skill’laridan foydalanish | Yo‘q | Ha |
| Nashr qilish | Yo‘q | Ha (tasdiqlashingiz bilan) |

Qisqasi: **o‘ylash va so‘rash** — veb suhbatda, **qilish** — Codex’da.

## Birinchi so‘rovlar

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

Ko‘proq tayyor so‘rovlar: [docs/prompts/chatgpt.md](../prompts/chatgpt.md).

## Muammo bo‘lsa

- `codex mcp list` bo‘sh chiqsa: [Codex loyiha sozlamalarini o‘qimayapti](08-muammolar.md#codex-loyiha-sozlamalarini-oqimayapti)
- Windows’da `npx` yoki `npm` bloklansa: [Windows PowerShell npx buyrug‘ini bloklayapti](08-muammolar.md#windows-powershell-npx-buyrugini-bloklayapti)
- AI qoralamasi ishlamasa: [AI hozir ishlamayapti](08-muammolar.md#ai-hozir-ishlamayapti)

Barcha muammolar: [08-muammolar.md](08-muammolar.md).

## Keyingi qadam

Cloudflare hisobini sozlang va birinchi nashrni qiling: [04-cloudflare.md](04-cloudflare.md).
