# CRM boilerplate

Texnik bilimsiz ham AI yordamida o‘z CRM’ingizni quring: Next.js, shadcn/ui va Cloudflare asosidagi tayyor shablon.

## Tezkor harakatlar

| Nima qilmoqchisiz | Tugma/havola | Izoh |
| --- | --- | --- |
| Shablondan o‘zingizga nusxa olish | [**Use this template**](https://github.com/mabrur-h/crm-boilerplate/generate) | GitHub akkauntingizda o‘z repozitoriyangiz paydo bo‘ladi. Qadamlar: [01-template-olish.md](docs/guides/01-template-olish.md) |
| Darhol internetga chiqarish | [![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/mabrur-h/crm-boilerplate) | Fayllar uchun R2 ishlatiladi, R2 esa Cloudflare hisobingizda to‘lov ma’lumotini so‘raydi. Tushuntirish: [04-cloudflare.md](docs/guides/04-cloudflare.md) |
| O‘rnatmasdan brauzerda ochish | [![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/mabrur-h/crm-boilerplate?quickstart=1) | Kompyuteringizga hech narsa o‘rnatilmaydi; hamma narsa brauzerdagi muhitda ishlaydi |
| Demo ko‘rish | Demo havolasi nashrdan keyin qo‘shiladi <!-- DEMO_URL --> | |
| Claude’dan yordam so‘rash | [Claude’da ochish](https://claude.ai/new?q=Men%20https%3A%2F%2Fgithub.com%2Fmabrur-h%2Fcrm-boilerplate%20shablonidan%20foydalanib%20o%E2%80%98z%20CRM%E2%80%99imni%20qurmoqchiman.%20Texnik%20bilimim%20yo%E2%80%98q.%20README%20va%20docs%2Fguides%20papkasini%20o%E2%80%98qib%2C%20kompyuterim%20uchun%20qadamma-qadam%20yo%E2%80%98l%20ko%E2%80%98rsat%20va%20har%20qadamdan%20keyin%20natijani%20qanday%20tekshirishni%20ayt.) | Suhbat tayyor savol bilan ochiladi |
| ChatGPT’dan yordam so‘rash | [ChatGPT’da ochish](https://chatgpt.com/?q=Men%20https%3A%2F%2Fgithub.com%2Fmabrur-h%2Fcrm-boilerplate%20shablonidan%20foydalanib%20o%E2%80%98z%20CRM%E2%80%99imni%20qurmoqchiman.%20Texnik%20bilimim%20yo%E2%80%98q.%20README%20va%20docs%2Fguides%20papkasini%20o%E2%80%98qib%2C%20kompyuterim%20uchun%20qadamma-qadam%20yo%E2%80%98l%20ko%E2%80%98rsat%20va%20har%20qadamdan%20keyin%20natijani%20qanday%20tekshirishni%20ayt.) | Suhbat tayyor savol bilan ochiladi |

<details>
<summary>Havola ishlamasa, shu matnni nusxalab, Claude yoki ChatGPT suhbatiga qo‘ying</summary>

```text
Men https://github.com/mabrur-h/crm-boilerplate shablonidan foydalanib o‘z CRM’imni qurmoqchiman. Texnik bilimim yo‘q. README va docs/guides papkasini o‘qib, kompyuterim uchun qadamma-qadam yo‘l ko‘rsat va har qadamdan keyin natijani qanday tekshirishni ayt.
```

</details>

## Bu nima?

Bu — kichik jamoa uchun mijozlar ro‘yxatini yuritadigan sodda CRM. Uni bo‘sh varaqdan emas, ishlaydigan holatdan boshlaysiz: hisob yaratasiz, kirasiz va birinchi mijozni qo‘shasiz. Keyin AI agentiga aytib, o‘z biznesingizga moslaysiz.

Hozir ishlaydigan qismlar:

- **Kirish va ro‘yxatdan o‘tish** — email va parol bilan. Ro‘yxatdan o‘tishni bitta sozlama orqali yopib qo‘yish mumkin.
- **Mijozlar ro‘yxati** — ism, telefon, kompaniya, bosqich, keyingi aloqa sanasi va izoh. Qidiruv ism, telefon va kompaniya bo‘yicha ishlaydi, bosqich bo‘yicha filtr bor.
- **To‘rtta bosqich** — Yangi, Jarayonda, Mijoz, Yo‘qotildi. Bosqich har doim matn bilan yoziladi, faqat rang bilan emas.
- **Bosh sahifa** — jami mijozlar soni, har bir bosqich bo‘yicha son, bugun bog‘lanish kerak bo‘lganlar va oxirgi qo‘shilganlar.
- **Fayllar** — har bir mijozga shartnoma yoki hisob-faktura biriktirasiz. Fayllar Cloudflare R2’da saqlanadi, hajmi 10 MB gacha.
- **AI qoralama** — mijoz sahifasidagi tugma keyingi aloqa uchun qisqa o‘zbekcha xabar qoralamasini yozadi. Uni tekshirib, tahrirlab, keyin ishlatasiz.
- **Sozlamalar** — ismingizni o‘zgartirasiz, ilova ko‘rinishini (yorug‘ / qorong‘i / tizim) tanlaysiz.
- **Mobil ko‘rinish** — 390px kenglikdagi ekranda ham asosiy yo‘l ishlaydi.

Interfeys butunlay o‘zbek tilida. Kodning o‘zi, papka nomlari va manzillar ingliz tilida — bu AI agentlari uchun qulay va o‘zgartirish shart emas.

Kimga mos:

- Mijozlarini daftar yoki Excel’da yuritadigan kichik jamoa.
- Birinchi ishlaydigan mahsulotini AI bilan qurmoqchi bo‘lgan, texnik bilimi yo‘q odam.
- "Vaybkoding" kursi o‘quvchisi: kursdagi hujjatlar tartibi shu loyihada ham saqlangan.

Kimga mos emas: buxgalteriya tizimi, telefoniya yoki omborxona kerak bo‘lsa — bu shablon bunga mo‘ljallanmagan.

## Qaysi yo‘l sizga mos?

### A) Tugma bilan nashr — 5–15 daqiqa

Kim uchun: avval ishlaydigan saytni ko‘rib, keyin qaror qilmoqchi bo‘lganlar uchun. Kompyuteringizga hech narsa o‘rnatilmaydi.

1. Yuqoridagi jadvaldan **Deploy to Cloudflare** tugmasini bosing.
2. Cloudflare hisobingizga kiring (yoki yangisini yarating).
3. Cloudflare shablonni o‘z GitHub akkauntingizga nusxalaydi va nashr qiladi.
4. R2 haqidagi so‘rov chiqsa, to‘lov ma’lumotini kiriting — bepul chegara ichida pul yechilmaydi.
5. Chiqqan manzilni oching va ro‘yxatdan o‘ting.

**Tekshiring:** `.workers.dev` bilan tugaydigan manzil ochiladi va unda kirish sahifasi ko‘rinadi.

Batafsil: [04-cloudflare.md](docs/guides/04-cloudflare.md)

### B) Shablon + kompyuter + AI — 1–2 soat (tavsiya etiladi)

Kim uchun: loyihani o‘z biznesiga moslamoqchi bo‘lganlar uchun. Asosiy yo‘l shu — AI agenti fayllarni o‘qiydi va o‘zgartiradi.

1. Kompyuteringizni tayyorlang: VS Code, Node.js, GitHub akkaunti — [00-kompyuter-tayyorlash.md](docs/guides/00-kompyuter-tayyorlash.md).
2. **Use this template** tugmasini bosib, o‘z nusxangizni yarating — [01-template-olish.md](docs/guides/01-template-olish.md).
3. Papkani VS Code’da oching va AI agentini ulang: [02-claude-ulash.md](docs/guides/02-claude-ulash.md) yoki [03-chatgpt-ulash.md](docs/guides/03-chatgpt-ulash.md).
4. Agent suhbatiga `boshlash` deb yozing — u `npm run setup` va `npm run doctor` orqali hamma narsani sozlaydi.
5. `npm run dev` bilan ishga tushiring va `http://localhost:3000` manzilini oching.

**Tekshiring:** brauzerda kirish sahifasi ochiladi va `demo@example.com` / `demo12345` bilan kira olasiz.

### C) Codespaces — 10–20 daqiqa

Kim uchun: kompyuteriga dastur o‘rnata olmaydigan yoki hozircha o‘rnatishni istamaganlar uchun. Hammasi brauzerda ishlaydi.

1. Yuqoridagi jadvaldan **Open in GitHub Codespaces** tugmasini bosing.
2. Muhit tayyor bo‘lishini kuting — paketlar avtomatik o‘rnatiladi (`.devcontainer/devcontainer.json`).
3. Terminalda `npm run dev` yozing.
4. 3000-port uchun chiqqan havolani oching.

**Tekshiring:** brauzerdagi yangi oynada kirish sahifasi ko‘rinadi.

Batafsil: [00-kompyuter-tayyorlash.md](docs/guides/00-kompyuter-tayyorlash.md)

## Ichida nimalar bor

| Texnologiya | Versiya | Vazifasi |
| --- | --- | --- |
| Next.js | 16.3.4 | Ilova karkasi: sahifalar, marshrutlar va server amallari |
| React | 19.2.8 | Ekrandagi komponentlar shu kutubxona ustida quriladi |
| shadcn/ui | CLI 4.21.0 | Tayyor tugma, forma, jadval va dialog komponentlari |
| Tailwind CSS | 4.3.3 | Uslublar; ranglar `src/app/globals.css`dagi o‘zgaruvchilardan olinadi |
| Cloudflare Workers + OpenNext | @opennextjs/cloudflare 1.20.6, wrangler 4.131.1 | Ilova Cloudflare serverlarida ishlaydi |
| Cloudflare D1 + Drizzle | drizzle-orm 0.45.2 | Mijozlar va hisoblar saqlanadigan SQL baza |
| Cloudflare R2 | — | Fayllar (shartnoma, hisob-faktura) saqlanadigan joy |
| Workers AI | `@cf/openai/gpt-oss-20b` | Xabar qoralamasini yozadigan model (`src/lib/ai.ts`) |
| Better Auth | 1.7.4 | Email va parol bilan kirish, sessiya |

Versiyalar `package.json`da aniq raqam bilan qotirilgan (`.npmrc`da `save-exact=true`). Nima uchun aynan shu tanlovlar qilingani — [docs/DECISIONS.md](docs/DECISIONS.md).

## AI bilan ishlash

Loyiha papkasini Claude Code yoki Codex’da oching va suhbatga `boshlash` deb yozing. Agent `AGENTS.md`dagi qoidalarni o‘qiydi, o‘zbek tilida javob beradi va har qadamdan keyin natijani qanday tekshirishni aytadi.

Loyihaning o‘z ko‘nikmalari (skill’lari) — ular `.agents/skills/` papkasida turadi:

| Skill | Qachon ishlatiladi | Misol so‘rov |
| --- | --- | --- |
| `boshlash` | Loyihani yangi kompyuterda birinchi marta sozlashda | "Loyihani ishga tushir" |
| `holat` | Ishni davom ettirishdan oldin: nima qilingan, hozir nima qilinyapti | "Qayerda to‘xtagan edik?" |
| `vazifa` | `docs/TASKS.md`dagi joriy vazifani bajarishda | "Vazifani bajar" |
| `yangi-modul` | Yangi bo‘lim qo‘shishda (mijozlar naqshini nusxalaydi) | "Mahsulotlar bo‘limini qil" |
| `dizayn` | Ko‘rinishni o‘zgartirishda, yangi komponent qo‘shishda | "Shu tugmani chiroyliroq qil" |
| `tekshir` | O‘zgarishni "tayyor" deyishdan oldin sinab ko‘rishda | "Tekshirib ber" |
| `nashr` | Cloudflare’ga nashr qilishda | "Nashr qil" |
| `xato` | Xato xabari chiqqanda | "Xato chiqdi, bu nima degani?" |
| `baza` | Bazaga yangi ustun yoki jadval qo‘shishda | "Bazaga ustun qo‘sh" |

Bulardan tashqari, uchinchi tomon skill’lari ham loyihaga ko‘chirib qo‘yilgan (Cloudflare, Wrangler, shadcn/ui va boshqalar) — manbalari va litsenziyalari [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)da.

MCP serverlari — bu agentga tashqi vositalarni ulaydigan ko‘prik. Loyihada uchtasi sozlangan (`.mcp.json`, `.codex/config.toml`):

| Server | Nima qiladi |
| --- | --- |
| `cloudflare` | Cloudflare hisobingiz bilan ishlaydi: resurslar, loglar, hujjatlar qidiruvi |
| `shadcn` | shadcn/ui komponentlarini qidiradi, ko‘rsatadi va loyihaga qo‘shadi |
| `playwright` | Haqiqiy brauzerni boshqaradi: sahifani ochadi, tugmani bosadi, natijani tekshiradi |

Ulash yo‘riqnomalari: [02-claude-ulash.md](docs/guides/02-claude-ulash.md), [03-chatgpt-ulash.md](docs/guides/03-chatgpt-ulash.md). Skill’lar haqida batafsil: [10-skilllar.md](docs/guides/10-skilllar.md). Tayyor promptlar: [docs/prompts/claude-code.md](docs/prompts/claude-code.md), [docs/prompts/chatgpt.md](docs/prompts/chatgpt.md).

## Asosiy buyruqlar

Buyruqlarni VS Code terminalida yozasiz (**Terminal → New Terminal**). Har birini AI agentidan ham so‘rashingiz mumkin.

| Buyruq | Nima qiladi |
| --- | --- |
| `npm run setup` | Birinchi sozlash: paketlarni o‘rnatadi, `.dev.vars` faylini tayyorlaydi, bazani to‘ldiradi |
| `npm run doctor` | Nima ishlamayotganini topadi va nima qilish kerakligini aytadi. Hech narsani o‘zgartirmaydi |
| `npm run dev` | Ilovani kompyuteringizda ishga tushiradi (`http://localhost:3000`) |
| `npm run build` | Ishlab chiqarish uchun yig‘adi (xatolarni tekshirish uchun ham foydali) |
| `npm run lint` | Kod uslubini tekshiradi |
| `npm run typecheck` | Tiplardagi xatolarni tekshiradi |
| `npm run test` | Testlarni bir marta ishga tushiradi |
| `npm run test:watch` | Testlarni kuzatuv rejimida ishlatadi |
| `npm run check` | Yuqoridagilarning hammasi birga: lint + typecheck + test + skill tekshiruvi |
| `npm run preview` | Ilovani haqiqiy Cloudflare Worker sifatida mahalliy ishga tushiradi |
| `npm run deploy` | Cloudflare’ga nashr qiladi va uzoqdagi bazaga migratsiyalarni qo‘llaydi — **avval so‘rasin** |
| `npm run db:generate` | Baza sxemasi o‘zgargach yangi migratsiya fayli yaratadi |
| `npm run db:migrate:local` | Migratsiyalarni mahalliy bazaga qo‘llaydi |
| `npm run db:migrate:remote` | Migratsiyalarni uzoqdagi bazaga qo‘llaydi — **avval so‘rasin** |
| `npm run db:seed` | Mahalliy bazaga demo hisob va 12 ta namunaviy mijoz qo‘shadi |
| `npm run cf-typegen` | `wrangler.jsonc`dagi sozlamalardan tip fayllarini qayta yaratadi |
| `npm run cf:setup` | Cloudflare’dagi baza va bucket’ni bir martalik sozlaydi — **avval so‘rasin** |
| `npm run r2:check` | R2 yoqilganini va bucket mavjudligini tekshiradi |
| `npm run skills:update` | Uchinchi tomon skill’larini manbadan qayta yuklaydi |
| `npm run skills:sync` | `.agents/skills`dagi skill’larni `.claude/skills`ga nusxalaydi |
| `npm run skills:check` | Har bir skill fayli to‘g‘ri yozilganini tekshiradi |

Migratsiya — bu baza tuzilishini o‘zgartiradigan buyruqlar yozilgan fayl. Ular `migrations/` papkasida turadi.

## Bepul limitlar

2026-09-11 holatiga ko‘ra, Cloudflare’ning rasmiy narx sahifalaridagi bepul reja chegaralari:

| Xizmat | Bepul rejada | Izoh |
| --- | --- | --- |
| Workers | Kuniga 100 000 so‘rov; har bir so‘rovga 10 ms protsessor vaqti | Sahifa ochilishi ham, tugma bosilishi ham so‘rov hisoblanadi |
| D1 (baza) | Kuniga 5 mln qator o‘qish va 100 000 qator yozish; 5 GB xotira | Mijozlar, hisoblar va fayl ma’lumotlari shu yerda |
| R2 (fayllar) | Oyiga 10 GB xotira, 1 mln Class A va 10 mln Class B operatsiya; chiqish trafigi bepul | Class A — yozish, Class B — o‘qish operatsiyalari |
| Workers AI | Kuniga 10 000 neuron | Neuron — Cloudflare’ning AI hisob birligi. Bitta xabar qoralamasi o‘lchovda ~16 neuron sarfladi, ya’ni kuniga 600 tacha qoralama |

**R2 haqida muhim eslatma.** R2 bepul rejada ham hisobingizda to‘lov ma’lumoti (karta yoki PayPal) turishini talab qiladi. Pul faqat yuqoridagi chegaradan oshgandagina yechiladi. Agar fayl saqlash kerak bo‘lmasa, R2’siz ham ishlashingiz mumkin — buni [04-cloudflare.md](docs/guides/04-cloudflare.md)da tushuntirganmiz.

Bu chegaralar kichik jamoa uchun odatda yetarli. Ular kamlik qilsa, Workers Paid rejasi oyiga $5 turadi.

Har bir xizmat qayerda ishlatilgani, kaliti qayerda turishi va rasmiy hujjat havolasi — [docs/THIRD-PARTY.md](docs/THIRD-PARTY.md).

## Hujjatlar

Barcha hujjatlar xaritasi: [docs/README.md](docs/README.md).

Eng ko‘p kerak bo‘ladiganlari:

- [docs/PRODUCT.md](docs/PRODUCT.md) — kim uchun, nima uchun va qaysi chegarada quramiz.
- [docs/FLOW.md](docs/FLOW.md) — foydalanuvchi qaysi qadamlarni bosadi va tizim nima javob beradi.
- [docs/TASKS.md](docs/TASKS.md) — hozir bajarilayotgan bitta vazifa.
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — qaysi fayl nima uchun kerak.
- [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md) — ranglar, shrift, matn va komponent qoidalari.

Qadamma-qadam yo‘riqnomalar `docs/guides/` papkasida. Notanish so‘z uchrasa — [09-lugat.md](docs/guides/09-lugat.md).

## Litsenziya

MIT — [LICENSE](LICENSE). Loyihani xohlagancha ishlatishingiz, o‘zgartirishingiz va sotishingiz mumkin.

Loyihaga ko‘chirilgan uchinchi tomon skill’larining manbalari va litsenziyalari alohida yozilgan: [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
