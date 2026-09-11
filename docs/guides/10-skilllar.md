# Skill’lar: agentga ish o‘rgatish

**Vaqt:** 25–40 daqiqa. **Natija:** loyihadagi skill’lar nima ekanini bilasiz, ularni ikkala agentda ham chaqira olasiz, kerak bo‘lsa yangisini o‘rnatasiz va o‘zingiznikini yasaysiz.

Skill — bu agentga bitta ishni **qanday** bajarishni o‘rgatadigan yozma yo‘riqnoma. Oddiy papka: ichida `SKILL.md` fayli, uning boshida esa skill nomi va tavsifi. Agent ish boshlashda barcha skill’larning nomi va tavsifini o‘qib qo‘yadi, kerak bo‘lganda esa to‘liq matnini ochadi.

Foydasi oddiy: har safar "avval `npm run check` ishlat, keyin brauzerda tekshir, keyin PROGRESS.md’ga yoz" deb yozib o‘tirmaysiz — bir marta skill’ga yozib qo‘yasiz.

## Kerak bo‘ladi

- Ulangan AI agenti — [02-claude-ulash.md](02-claude-ulash.md) yoki [03-chatgpt-ulash.md](03-chatgpt-ulash.md).
- Loyiha papkasi ochiq holda.

## 1-qadam. Loyihaning o‘z skill’lari bilan tanishing

Ular `.agents/skills/` papkasida turadi. `npm run skills:sync` ularni `.claude/skills/` papkasiga nusxalaydi — Claude Code shu joydan o‘qiydi.

| Skill | Nima qiladi | Misol so‘rov | Claude Code | Codex |
| --- | --- | --- | --- | --- |
| `boshlash` | Yangi kompyuterda birinchi sozlash: Node va Git tekshiruvi, `npm run setup`, `npm run doctor`, dev server | "Loyihani ishga tushir" | `/boshlash` | "boshlash" |
| `holat` | Hujjatlar va git tarixini o‘qib, hisobot beradi. Hech narsani o‘zgartirmaydi | "Qayerda to‘xtagan edik?" | `/holat` | "Qayerda to‘xtagan edik?" |
| `vazifa` | `docs/TASKS.md`dagi joriy vazifani boshdan oxirigacha bajaradi | "Vazifani bajar" | `/vazifa` | "Vazifani bajar" |
| `yangi-modul` | `src/features/clients` naqshini nusxalab yangi bo‘lim quradi | "Mahsulotlar bo‘limini qil" | `/yangi-modul` | "Yangi modul qo‘sh" |
| `dizayn` | shadcn komponentlari, tema o‘zgaruvchilari va Playwright bilan tekshiruv | "Shu tugmani chiroyliroq qil" | `/dizayn` | "Dizaynni o‘zgartir" |
| `tekshir` | `npm run check`, brauzerda oqimni bosib chiqish, 390px va qorong‘i rejim | "Tekshirib ber" | `/tekshir` | "Tekshirib ber" |
| `nashr` | Tasdiq so‘raydi, tekshiradi, Cloudflare’ga nashr qiladi, jonli manzilni sinaydi | "Nashr qil" | `/nashr` | "Nashr qil" |
| `xato` | Xatoni takrorlaydi, loglarni ko‘radi, bitta gipotezani sinaydi, natijani yozadi | "Xato chiqdi, bu nima degani?" | `/xato` | "Xato chiqdi" |
| `baza` | Sxemani o‘zgartirish, migratsiya yaratish va qo‘llash, forma va seed’ni yangilash | "Bazaga ustun qo‘sh" | `/baza` | "Bazaga ustun qo‘sh" |

Codex’da odatda skill nomini aytish shart emas — tavsifga qarab o‘zi topadi. Aniqroq bo‘lishni istasangiz: "`.agents/skills/tekshir/SKILL.md` faylidagi ko‘rsatmani bajar."

**Tekshiring:** Claude Code’da `/` yozing — ro‘yxatda shu to‘qqizta nomni ko‘rasiz. Codex’da: "Loyihada qanday skill’lar bor?"

## 2-qadam. Ko‘chirib olingan skill’larni biling

Bular boshqalar yozgan skill’lar; loyihaga nusxa qilib qo‘yilgan, shuning uchun internetsiz ham ishlaydi. Ro‘yxati va aniq commit’lari `skills.config.json` faylida, litsenziya matnlari esa [THIRD_PARTY_NOTICES.md](../../THIRD_PARTY_NOTICES.md)da.

| Skill | Manba | Litsenziya | Nimaga foydali |
| --- | --- | --- | --- |
| `wrangler` | github.com/cloudflare/skills | Apache-2.0 | Wrangler buyruqlarini to‘g‘ri yozish: nashr, D1, R2, secret |
| `workers-best-practices` | github.com/cloudflare/skills | Apache-2.0 | Worker kodidagi tipik xatolarni oldini olish |
| `cloudflare` | github.com/cloudflare/skills | Apache-2.0 | Cloudflare platformasi bo‘yicha umumiy yo‘riqnoma |
| `cloudflare-email-service` | github.com/cloudflare/skills | Apache-2.0 | Keyinchalik email yuborish (masalan parolni tiklash) kerak bo‘lganda |
| `turnstile-spin` | github.com/cloudflare/skills | Apache-2.0 | Formani botlardan himoya qilish |
| `shadcn` | github.com/shadcn-ui/ui | MIT | shadcn/ui komponentlarini to‘g‘ri qo‘shish va ishlatish |
| `vercel-react-best-practices` | github.com/vercel-labs/agent-skills | MIT | React kodini toza va tez yozish |
| `web-design-guidelines` | github.com/vercel-labs/agent-skills | MIT | Interfeys va qulaylik qoidalari |
| `skill-creator` | github.com/anthropics/skills | Apache-2.0 | O‘z skill’ingizni yasash |
| `frontend-design` | github.com/anthropics/skills | Apache-2.0 | Ko‘rinishni sifatli qilish bo‘yicha yo‘riqnoma |

Ularni manbadan qaytadan yuklash uchun:

```bash
npm run skills:update
```

**Tekshiring:** `.agents/skills/` papkasini oching — jami 19 ta papka bo‘ladi: to‘qqiztasi loyihaniki, o‘ntasi ko‘chirib olingan.

## 3-qadam. Uchta buyruqni eslab qoling

| Buyruq | Nima qiladi |
| --- | --- |
| `npm run skills:update` | Uchinchi tomon skill’larini manbadan qayta yuklaydi |
| `npm run skills:sync` | `.agents/skills` papkasidagilarni `.claude/skills`ga nusxalaydi |
| `npm run skills:check` | Har bir skill to‘g‘ri yozilganini va ikki papka bir xil ekanini tekshiradi |

`npm run skills:check` buyrug‘i `npm run check` ichiga kiradi, ya’ni har bir commit oldidan o‘zi ishlaydi.

Skill faylini qo‘lda tahrirlasangiz, keyin albatta `npm run skills:sync` ishlating — aks holda tekshiruv "ikki papka bir xil emas" deb xato beradi.

**Tekshiring:** `npm run skills:check` yashil `✅` qatorlar bilan tugaydi.

## 4-qadam. Yangi skill o‘rnating

Ikki yo‘l bor.

### Claude Code plugin’lari orqali

Cloudflare’ning to‘liq skill to‘plamini o‘rnatish:

```
/plugin marketplace add cloudflare/skills
/plugin install cloudflare@cloudflare
```

Bu to‘plamda loyihaga ko‘chirilganlaridan tashqari yana bir nechtasi bor: Agents SDK, Durable Objects, Sandbox, veb tezligini o‘lchash (`web-perf`) va boshqalar.

Codex’da xuddi shu to‘plam:

```
codex plugin marketplace add cloudflare/skills
codex plugin add cloudflare@cloudflare
```

Codex CLI ichida `/plugins` deb yozsangiz, plugin brauzeri ochiladi — u yerdan ham tanlash mumkin. O‘rnatgandan keyin yangi seans boshlang.

### `skills` CLI orqali (ikkala agent uchun ham)

```bash
npx skills add vercel-labs/agent-browser
```

Foydali bayroqlar:

- `-a, --agent <nom>` — qaysi agent uchun: `claude-code`, `codex` va boshqalar.
- `-s, --skill <nom>` — to‘plamdan faqat bittasini olish.
- `-g, --global` — loyihaga emas, foydalanuvchi darajasiga o‘rnatish.
- `--list` — o‘rnatishdan oldin ro‘yxatni ko‘rish.

Masalan, faqat Codex uchun:

```bash
npx skills add vercel-labs/agent-browser -a codex
```

**Tekshiring:** yangi seans boshlab, agentdan "Endi qanday skill’lar bor?" deb so‘rang — yangisi ro‘yxatda ko‘rinadi.

## 5-qadam. Skill qidiring

```bash
npx skills find
```

Bu interaktiv qidiruvni ochadi. So‘z bilan qidirish:

```bash
npx skills find "react testing"
```

Brauzerda ko‘rish uchun: https://skills.sh

**Tekshiring:** qidiruv natijasida skill nomi va manbasini ko‘rasiz.

## Foydali, lekin repoga ko‘chirilmagan skill’lar

Quyidagilar loyihaga qo‘shilmagan — ba’zisining litsenziyasi buni taqiqlaydi, ba’zisi esa hammaga kerak emas. Ularni **o‘zingiz o‘rnatasiz**, loyiha ichiga nusxalamaysiz.

| Skill / to‘plam | Nimaga foydali | Litsenziya holati | O‘rnatish |
| --- | --- | --- | --- |
| `better-auth/skills` | Better Auth bo‘yicha chuqurroq yo‘riqnoma: sessiya, xavfsizlik | Repoda litsenziya fayli yo‘q — shuning uchun **loyihaga nusxalamang** | `/plugin marketplace add better-auth/skills`, so‘ng ro‘yxatdan tanlang |
| Anthropic `xlsx`, `docx`, `pdf`, `pptx` | Excel’dan mijoz import qilish, hisobot va shartnoma tayyorlash | Manbasi ochiq, lekin ochiq litsenziya emas (source-available) — **repoga ko‘chirilmaydi** | `/plugin marketplace add anthropics/skills`, so‘ng `/plugin install document-skills@anthropic-agent-skills` |
| `obra/superpowers` | Reja tuzish, TDD, kod ko‘rib chiqish bo‘yicha uslubiyot | MIT | `/plugin marketplace add obra/superpowers-marketplace`, so‘ng `/plugin install superpowers@superpowers-marketplace` |
| `pbakaus/impeccable` | Dizayn sifati: audit, kritika, sayqal | Apache-2.0 | `/plugin marketplace add pbakaus/impeccable`, so‘ng `/plugin` ro‘yxatidan tanlang |
| `jezweb/claude-skills` | D1 sxemasi va migratsiyalari bo‘yicha jamoa skill’lari | MIT | `/plugin marketplace add jezweb/claude-skills`, so‘ng `/plugin install cloudflare@jezweb-skills` |
| `web-perf` | Sahifa tezligini o‘lchash va yaxshilash | Apache-2.0 | Cloudflare to‘plami bilan birga keladi (4-qadam) |
| `vercel-labs/agent-browser` | Brauzerni boshqarish uchun muqobil vosita | Apache-2.0 | `npx skills add vercel-labs/agent-browser` |

Jamoa yozgan skill’larni (masalan `jezweb/claude-skills`) ishlatishdan oldin `SKILL.md` faylini o‘zingiz o‘qing. Skill — bu agentga beriladigan ko‘rsatma; unda nima yozilganini bilib turishingiz kerak.

## O‘z skill’ingizni yasash

Bir ishni uch marta bir xil tushuntirgan bo‘lsangiz, uni skill qiling. Loyihada `skill-creator` skill’i shu uchun turibdi.

```text
skill-creator skill’idan foydalanib, yangi skill yasa.
Nomi: hisobot. Vazifasi: har oy oxirida mijozlar bo‘yicha qisqa hisobot tayyorlash —
har bir bosqichdagi mijozlar soni, oy davomida qo‘shilganlar va yo‘qotilganlar.
Faylni .agents/skills/hisobot/SKILL.md sifatida yarat, tavsifi ingliz tilida
va qachon ishlatilishini aniq aytsin. Ko‘rsatmalar o‘zbekcha bo‘lsin.
Keyin skills.config.json’dagi project ro‘yxatiga qo‘sh,
npm run skills:sync va npm run skills:check ishga tushir.
```

Yaxshi skill uchta xususiyatga ega: nomi qisqa, tavsifi qachon ishlatilishini aniq aytadi, ichidagi qadamlar tekshirib bo‘ladigan.

**Tekshiring:** `npm run skills:check` xatosiz o‘tadi va yangi seansda agent skill’ni tanidi.

## Litsenziya haqida ehtiyot bo‘ling

Loyihangiz MIT litsenziyasi ostida va uni boshqalarga berishingiz mumkin. Shuning uchun ichiga faqat litsenziyasi ruxsat beradigan narsalarni qo‘shing.

Qoidalar:

- Litsenziya fayli yo‘q skill’ni repoga nusxalamang. Litsenziyasiz kodni tarqatish huquqiga ega emassiz.
- Ko‘chirilgan har bir skill uchun manba, commit va litsenziya `skills.config.json` hamda [THIRD_PARTY_NOTICES.md](../../THIRD_PARTY_NOTICES.md)da qayd etilgan. `npm run skills:check` har bir ko‘chirilgan papkada LICENSE fayli borligini tekshiradi.
- Shaxsan o‘zingiz uchun o‘rnatilgan skill’lar (plugin yoki `-g` bayrog‘i bilan) repoga tushmaydi — bu xavfsiz yo‘l.

## Muammo bo‘lsa

- `npm run skills:check` xato bersa: [Skill tekshiruvi xato beryapti](08-muammolar.md#skill-tekshiruvi-xato-beryapti)
- Codex skill’larni ko‘rmasa: [Codex loyiha sozlamalarini o‘qimayapti](08-muammolar.md#codex-loyiha-sozlamalarini-oqimayapti)

Barcha muammolar: [08-muammolar.md](08-muammolar.md).

## Keyingi qadam

Tayyor so‘rovlar to‘plamini oling: [docs/prompts/claude-code.md](../prompts/claude-code.md) yoki [docs/prompts/chatgpt.md](../prompts/chatgpt.md).
