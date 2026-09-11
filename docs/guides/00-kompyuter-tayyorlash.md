# Kompyuterni tayyorlash

**Vaqt:** 30–45 daqiqa (yuklab olish tezligiga qarab). **Natija:** kompyuteringizda Node.js, Git va VS Code ishlaydi, GitHub va Cloudflare hisoblaringiz bor, terminalda tekshiruv buyruqlari versiya raqamini qaytaradi.

Terminal — bu kompyuterga matn bilan buyruq beradigan oyna. Sichqoncha bilan tugma bosish o‘rniga siz bir qator matn yozasiz va Enter bosasiz; kompyuter esa javobini xuddi shu oynaga yozadi. Bu yo‘riqnomada terminalga bor-yo‘g‘i bir nechta tayyor buyruqni nusxalab qo‘yasiz. Buyruqni o‘zingiz o‘ylab topishingiz shart emas.

## Kerak bo‘ladi

- Internetga ulangan kompyuter (Mac yoki Windows) va unga dastur o‘rnatish huquqi.
- Ishlaydigan email manzil — GitHub va Cloudflare hisobini shu bilan ochasiz.
- 2–3 GB bo‘sh joy.
- Ixtiyoriy: Claude yoki ChatGPT obunasi. Qaysi biri kerakligi 5-qadamda yozilgan.

## 1-qadam. VS Code o‘rnating

VS Code — loyiha fayllari va AI agenti paneli turadigan ish joyi. https://code.visualstudio.com/download sahifasini oching.

- **Mac’da:** o‘z kompyuteringizga mos yuklamani oling, arxivdan chiqqan `Visual Studio Code.app` faylini **Applications** papkasiga ko‘chiring va shu yerdan ishga tushiring. Kompyuteringiz turini bilmasangiz: **Apple menyusi → About This Mac**.
- **Windows’da:** **User Installer** variantini tanlang, yuklangan faylni oching va oynadagi ko‘rsatmalarni bajaring.

"Visual Studio" nomli boshqa katta dasturni emas, aynan **Visual Studio Code**’ni yuklaganingizga ishonch hosil qiling.

**Tekshiring:** VS Code ochiladi va chap tomonda fayllar ro‘yxati (Explorer) belgisini ko‘rasiz.

## 2-qadam. Terminalni oching

VS Code’ning yuqori menyusidan **Terminal → New Terminal**’ni tanlang. Oynaning pastida matn yozish joyi paydo bo‘ladi — bu terminal.

Buyruqni terminalga nusxalab qo‘yasiz va Enter bosasiz. Har bir buyruqdan keyin javobni o‘qing: keyingi qadamga o‘tishdan oldin nima chiqqanini bilishingiz kerak.

**Tekshiring:** pastdagi panelda kursor miltillab turibdi va siz u yerga matn yoza olasiz.

## 3-qadam. Node.js 24 LTS o‘rnating

Node.js — loyihaning ishga tushirish va tekshirish buyruqlarini bajaradigan dastur. Avval o‘rnatilgan-o‘rnatilmaganini tekshiring:

```bash
node -v
```

Versiya raqami chiqsa (masalan `v24.21.0`), Node.js bor. `command not found` yoki `is not recognized` chiqsa — hali yo‘q.

O‘rnatish uchun https://nodejs.org/en/download sahifasini oching va **LTS** deb belgilangan variantni tanlang. LTS — "uzoq muddat qo‘llab-quvvatlanadigan" degani; hozirgi LTS liniyasi 24. Loyiha 22 va undan yangi versiyada ishlaydi, ammo tavsiya etilgani — 24.

- **Mac’da:** `.pkg` o‘rnatuvchi faylni yuklab, ochib, ko‘rsatmalarni bajaring.
- **Windows’da:** `.msi` o‘rnatuvchi faylni yuklab, ochib, ko‘rsatmalarni bajaring.

O‘rnatish tugagach VS Code’ni **butunlay yoping va qaytadan oching**, so‘ng yangi terminal oching. Eski terminal yangi o‘rnatilgan dasturni ko‘rmaydi.

**Tekshiring:** ikkala buyruq ham versiya raqamini qaytaradi:

```bash
node -v
npm -v
```

`node -v` javobi `v22.` yoki undan yuqori bo‘lishi kerak.

## 4-qadam. Git o‘rnating

Git — fayllaringizning o‘zgarish tarixini yuritadigan dastur. Uni kompyuteringizdagi loyiha bilan GitHub o‘rtasidagi ko‘prik deb tasavvur qiling.

```bash
git --version
```

- **Mac’da:** agar Git hali yo‘q bo‘lsa, shu buyruqning o‘zi "command line developer tools" o‘rnatishni taklif qiladigan oyna chiqaradi — **Install** tugmasini bosing va litsenziyaga rozilik bering. Oyna chiqmasa, `xcode-select --install` buyrug‘ini yozing. Muqobil yo‘l: https://git-scm.com/install/mac.
- **Windows’da:** https://git-scm.com/downloads/win sahifasidan **Standalone Installer**’ning 64-bitli variantini yuklab, o‘rnating. Barcha oynalarda tavsiya etilgan sozlamalarni o‘zgartirmasdan qoldiring.

O‘rnatishdan keyin VS Code’ni qaytadan oching.

**Tekshiring:** `git --version` versiya raqamini qaytaradi, masalan `git version 2.51.0`.

## 5-qadam. Hisoblarni oching

Uchta joyda hisob kerak bo‘ladi. Har birini brauzerda oching va kirishni tekshiring.

1. **GitHub** — https://github.com. Kodning onlayn nusxasi shu yerda saqlanadi. Hisobingiz bo‘lmasa **Sign up**, bo‘lsa **Sign in**. Ro‘yxatdan o‘tsangiz emailni tasdiqlashni unutmang.
2. **Cloudflare** — https://dash.cloudflare.com/sign-up. Ilova internetda shu yerda ishlaydi. Bepul rejaning o‘zi boshlash uchun yetadi; fayl saqlash (R2) kerak bo‘lganda to‘lov ma’lumoti so‘raladi, buni [04-cloudflare.md](04-cloudflare.md)da tushuntirganmiz.
3. **AI agenti** — bittasi yetarli:
   - **Claude Code** uchun Claude obunasi kerak: Pro, Max, Team yoki Enterprise (yoki Claude Console hisobi). Ulash: [02-claude-ulash.md](02-claude-ulash.md).
   - **Codex** uchun ChatGPT hisobi kerak. Codex ChatGPT rejalariga kiritilgan, limit rejaga qarab farq qiladi. Ulash: [03-chatgpt-ulash.md](03-chatgpt-ulash.md).

Parolni yoki tasdiqlash kodini AI suhbatiga yozmang. Ularni faqat xizmatning o‘z kirish oynasiga kiriting.

**Tekshiring:** uchala saytga ham kira olasiz va o‘z hisobingiz nomini ekranda ko‘rasiz.

## 6-qadam. Hammasini birga tekshiring

Terminalda uchta buyruqni ketma-ket yozing:

```bash
node -v
npm -v
git --version
```

Uchalasi ham versiya raqamini qaytarsa, kompyuteringiz tayyor.

Xohlasangiz, tekshiruvni AI agentiga ham topshirishingiz mumkin:

```text
Kompyuterimda Node.js, npm va Git bor-yo‘qligini tekshir.
Faqat versiyalarni ko‘r; hech narsa o‘rnatma va hech narsani o‘zgartirma.
Node.js 22 yoki undan yangi bo‘lishi kerak, 24 LTS eng mosi.
Biror narsa topilmasa, mening operatsion tizimim uchun rasmiy yuklab olish sahifasini ayt.
Noma’lum saytdan skript ishga tushirma va sudo ishlatma.
Men o‘rnatib bo‘lganimdan keyin versiyalarni qaytadan tekshir.
```

**Tekshiring:** uchta versiya raqami ekranda turibdi va sizda GitHub, Cloudflare hamda AI hisoblariga kirish bor.

## Muammo bo‘lsa

- Versiya o‘rniga `command not found` yoki `is not recognized` chiqsa: [Node.js topilmadi](08-muammolar.md#nodejs-topilmadi)
- Node.js bor, lekin versiyasi eski deyilsa: [Node.js versiyasi eski: EBADENGINE](08-muammolar.md#nodejs-versiyasi-eski-ebadengine)
- Windows’da `npx` yoki `npm` "running scripts is disabled" deb to‘xtasa: [Windows PowerShell npx buyrug‘ini bloklayapti](08-muammolar.md#windows-powershell-npx-buyrugini-bloklayapti)

Boshqa xatolar uchun: [08-muammolar.md](08-muammolar.md). Notanish so‘z uchrasa: [09-lugat.md](09-lugat.md).

## Keyingi qadam

Shablonning o‘z nusxangizni oling: [01-template-olish.md](01-template-olish.md).
