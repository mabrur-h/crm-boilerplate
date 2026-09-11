# Shablondan o‘z nusxangizni olish

**Vaqt:** 10–30 daqiqa (tanlagan yo‘lingizga qarab). **Natija:** GitHub akkauntingizda loyihaning o‘z nusxasi bor va siz uni yo internetda, yo kompyuteringizda, yo brauzerdagi muhitda ochib ko‘rasiz.

Uchta yo‘l bor. Ular bir-birini inkor qilmaydi: A yo‘li bilan boshlab, keyin B yo‘liga o‘tishingiz mumkin.

| Yo‘l | Kim uchun | Vaqt |
| --- | --- | --- |
| A — **Deploy to Cloudflare** tugmasi | Avval ishlaydigan saytni ko‘rmoqchi bo‘lganlar | 10–15 daqiqa |
| B — **Use this template** + kompyuter | Loyihani o‘z biznesiga moslamoqchi bo‘lganlar (asosiy yo‘l) | 20–30 daqiqa |
| C — Codespaces | Kompyuteriga dastur o‘rnata olmaydiganlar | 10–20 daqiqa |

## Kerak bo‘ladi

- GitHub hisobi. Yo‘q bo‘lsa: [00-kompyuter-tayyorlash.md](00-kompyuter-tayyorlash.md).
- A yo‘li uchun: Cloudflare hisobi.
- B yo‘li uchun: kompyuterda Node.js, Git va VS Code.
- C yo‘li uchun: faqat brauzer.

## Yo‘l A — Deploy to Cloudflare tugmasi

Bu tugma shablonni sizning GitHub akkauntingizga nusxalaydi, kerakli Cloudflare resurslarini yaratadi va ilovani nashr qiladi. Kompyuteringizga hech narsa o‘rnatilmaydi.

### A1-qadam. Maxfiy kalitni oldindan tayyorlang

Nashr paytida sizdan `BETTER_AUTH_SECRET` degan qiymat so‘raladi. Bu — ilovaning kirish tizimi cookie’larni imzolash uchun ishlatadigan uzun tasodifiy matn. Uni o‘ylab topmang va boshqa joydan nusxalamang.

Terminalsiz hosil qilish yo‘li: brauzeringiz yoki telefoningizdagi parol menejerining parol generatoridan foydalaning (Apple Passwords, Google Password Manager, Bitwarden, 1Password — hammasida bor). Uzunligini kamida **32 belgi** qilib qo‘ying, harf va raqam bo‘lsin. Chiqqan matnni vaqtincha shu parol menejerining o‘zida saqlang.

**Tekshiring:** qo‘lingizda kamida 32 belgidan iborat tasodifiy matn bor va u parol menejeringizda saqlangan.

### A2-qadam. Tugmani bosing

Loyiha README’sidagi **Deploy to Cloudflare** tugmasini bosing. Ochilgan sahifa ketma-ket quyidagilarni so‘raydi:

1. **Cloudflare hisobiga kirish** — hisobingiz bo‘lmasa shu yerda yaratasiz.
2. **GitHub akkauntini ulash** — Cloudflare shablon nusxasini shu akkauntga yozadi. Ruxsatni faqat yangi yaratiladigan repozitoriyaga cheklab qo‘yishingiz mumkin.
3. **Nomlar** — repozitoriya nomi va Worker nomi. Ikkalasini ham bir xil qoldirish qulay.
4. **Maxfiy qiymatlar** — `BETTER_AUTH_SECRET` maydoniga A1-qadamda tayyorlagan matnni qo‘ying.

Keyin Cloudflare o‘zi: repozitoriyani nusxalaydi, `wrangler.jsonc` faylini o‘qib kerakli resurslarni (D1 bazasi, R2 bucket’i, Workers AI) yaratadi, loyihani yig‘adi va nashr qiladi.

**Tekshiring:** jarayon oxirida `.workers.dev` bilan tugaydigan manzil chiqadi. Uni oching — kirish sahifasi ko‘rinishi kerak.

### A3-qadam. R2 haqidagi xato chiqsa

Fayl saqlash uchun R2 ishlatiladi, R2 esa hisobingizda alohida yoqiladi. Yoqilmagan bo‘lsa, nashr `Please enable R2 through the Cloudflare Dashboard. [code: 10042]` degan xato bilan to‘xtaydi.

Tuzatish: Cloudflare boshqaruv panelida **Storage & databases → R2 → Overview** bo‘limiga o‘ting va R2 obunasini qo‘shish jarayonini oxirigacha bajaring. U to‘lov ma’lumotini (karta yoki PayPal) so‘raydi. Bepul chegara oyiga 10 GB xotira, 1 mln Class A va 10 mln Class B operatsiya; pul faqat shu chegaradan oshganda yechiladi. Keyin nashrni qaytadan ishga tushiring.

**Tekshiring:** R2 sahifasida bucket yaratish tugmasi faollashadi va nashr qaytadan urinilganda 10042 xatosi chiqmaydi.

### A4-qadam. Kodni o‘zgartirishga tayyorlaning

Tugma bilan nashr qilingan ilova ishlaydi, lekin uni o‘zgartirish uchun kodni ochishingiz kerak. Sizning GitHub akkauntingizda endi shu loyihaning repozitoriyasi bor — B yo‘lining 3-qadamidan (klonlash) davom eting yoki C yo‘lidagi Codespaces’ni oching.

Muhim: bu repozitoriya Cloudflare’ga ulangan, ya’ni har bir yangi commit avtomatik nashr qilinadi. Sozlamalari: [04-cloudflare.md](04-cloudflare.md).

**Tekshiring:** GitHub’dagi repozitoriyangizni ochsangiz, `src`, `docs` va `wrangler.jsonc` fayllarini ko‘rasiz.

## Yo‘l B — Use this template

### B1-qadam. Nusxa yarating

https://github.com/mabrur-h/crm-boilerplate sahifasini oching va **Use this template** tugmasini bosing, so‘ng **Create a new repository**’ni tanlang.

Ochilgan formada:

- **Owner** — o‘z akkauntingiz.
- **Repository name** — masalan `mening-crm`. Faqat lotin harflari, raqamlar, `-` va `_`.
- Ko‘rinishi: **Private** (o‘zingiz uchun) yoki **Public**.

**Create repository from template** tugmasini bosing.

**Tekshiring:** brauzer sizning yangi repozitoriyangizga o‘tadi va manzil satrida o‘z foydalanuvchi nomingizni ko‘rasiz.

### B2-qadam. Nusxani kompyuterga tushiring

Ikki usuldan birini tanlang.

- **GitHub Desktop bilan (osonroq):** https://desktop.github.com dasturini o‘rnating, GitHub hisobingiz bilan kiring, **File → Clone repository** orqali yangi repozitoriyangizni tanlang va saqlanadigan papkani ko‘rsating.
- **Buyruq bilan:** repozitoriya sahifasidagi yashil **Code** tugmasini bosing, HTTPS manzilini nusxalang va terminalda yozing:

  ```bash
  git clone https://github.com/FOYDALANUVCHI/REPOZITORIYA.git
  ```

  `FOYDALANUVCHI` va `REPOZITORIYA` o‘rniga o‘z nomlaringizni qo‘ying.

**Tekshiring:** kompyuteringizda loyiha nomi bilan atalgan papka paydo bo‘ladi va uning ichida `package.json` fayli bor.

### B3-qadam. Papkani VS Code’da oching

VS Code’da **File → Open Folder…** orqali yangi papkani tanlang. Butun **Documents** yoki diskni emas, aynan loyiha papkasini oching — agent qayerda ishlayotganini aniq bilishi kerak.

**Tekshiring:** chapdagi Explorer sarlavhasida loyiha papkasining nomi turibdi, ichida `src`, `docs`, `package.json` ko‘rinadi.

### B4-qadam. AI agentini ulang va `boshlash` deng

Agentni ulash: [02-claude-ulash.md](02-claude-ulash.md) (Claude Code) yoki [03-chatgpt-ulash.md](03-chatgpt-ulash.md) (Codex).

Agent paneliga bitta so‘z yozing:

```text
boshlash
```

Loyihada `boshlash` nomli skill bor — agent uni tanib oladi va o‘zi: Node hamda Git versiyasini tekshiradi, `npm run setup` buyrug‘ini ishga tushiradi (paketlarni o‘rnatadi, `.dev.vars` faylini yaratib maxfiy kalitni o‘zi hosil qiladi, mahalliy bazani tayyorlaydi va demo ma’lumotlarni qo‘shadi), so‘ng `npm run doctor` bilan hammasini tekshiradi.

Xohlasangiz, xuddi shu ishni o‘zingiz ham bajarishingiz mumkin:

```bash
npm run setup
```

**Tekshiring:** terminalda `Hammasi tayyor!` xabari va uch qatorli ko‘rsatma chiqadi. Keyin `npm run dev` yozib, `http://localhost:3000` manzilini oching — kirish sahifasi ko‘rinadi va `demo@example.com` / `demo12345` bilan kira olasiz.

## Yo‘l C — GitHub Codespaces

Codespaces — GitHub’ning bulutdagi ish muhiti. Kompyuteringizga hech narsa o‘rnatilmaydi, hamma narsa brauzerda ishlaydi.

### C1-qadam. Muhitni oching

Avval B1-qadamdagidek o‘z nusxangizni yarating, so‘ng README’dagi **Open in GitHub Codespaces** tugmasini bosing (yoki repozitoriyangizdagi **Code → Codespaces → Create codespace**).

Brauzerda VS Code ko‘rinishidagi muhit ochiladi. Loyihada `.devcontainer/devcontainer.json` fayli bor — Codespaces uni o‘qib, ishga tushirish paytida `npm ci && npm run setup` buyrug‘ini o‘zi bajaradi. Bu bir necha daqiqa oladi.

**Tekshiring:** terminalda sozlash xabarlari oqib o‘tadi va oxirida `Hammasi tayyor!` chiqadi.

### C2-qadam. Ilovani ishga tushiring

```bash
npm run dev
```

3000-port avtomatik tashqariga chiqariladi. Pastdagi **PORTS** yorlig‘ida havolani ko‘rasiz, ko‘pincha esa brauzer o‘zi yangi oyna ochadi.

**Tekshiring:** yangi oynada kirish sahifasi ko‘rinadi va demo hisob bilan kira olasiz.

### C3-qadam. Cloudflare’ga kirish kerak bo‘lsa

AI qoralamasi va nashr uchun Cloudflare’ga kirish talab qilinadi. Codespaces ichida oddiy `npx wrangler login` brauzerni o‘zi ocholmaydi. Shuning uchun havolani qo‘lda ochadigan variantdan foydalaning:

```bash
npx wrangler login --browser=false
```

Bu bayroq brauzerni ochish o‘rniga havolani terminalga chop etadi — uni nusxalab, o‘z brauzeringizda oching. Qaytish manzili baribir muhit ichidagi 8976-portga urinadi; loyihada shu port aynan shuning uchun oldindan ochib qo‘yilgan (`.devcontainer/devcontainer.json`). Shunda ham ishlamasa, qurilma kodi orqali kiring — bu usul konteyner va masofaviy muhitlar uchun mo‘ljallangan va localhost’ga umuman tayanmaydi:

```bash
npx wrangler login --device --browser=false
```

**Tekshiring:** `npx wrangler whoami` buyrug‘i hisobingiz nomini qaytaradi.

## Muammo bo‘lsa

- Nashr `code: 10042` bilan to‘xtasa: [R2 yoqilmagan: code 10042](08-muammolar.md#r2-yoqilmagan-code-10042)
- `npm run setup` migratsiyada to‘xtasa: [npm run setup migratsiyada to‘xtadi](08-muammolar.md#npm-run-setup-migratsiyada-toxtadi)
- 3000-port bandligi haqida xabar chiqsa: [3000-port band](08-muammolar.md#3000-port-band)
- Demo hisob bilan kira olmasangiz: [Email yoki parol noto‘g‘ri](08-muammolar.md#email-yoki-parol-notogri)

Barcha muammolar: [08-muammolar.md](08-muammolar.md).

## Keyingi qadam

AI agentini loyihaga ulang: [02-claude-ulash.md](02-claude-ulash.md) yoki [03-chatgpt-ulash.md](03-chatgpt-ulash.md).
