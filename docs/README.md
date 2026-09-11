# Hujjatlar xaritasi

Har bir hujjat bitta savolga javob beradi. Qidirayotgan narsangizni jadvaldan toping — hammasini ketma-ket o‘qish shart emas.

Agentga ish topshirishdan oldin odatda `PRODUCT.md`, `FLOW.md` va `TASKS.md` yetarli.

## Loyiha hujjatlari

| Hujjat | Qaysi savolga javob beradi | Qachon yangilanadi |
| --- | --- | --- |
| [PRODUCT.md](PRODUCT.md) | Kim uchun, qanday foyda va qaysi chegarada quramiz? | Mahsulot chegarasi yoki qoidasi o‘zgarganda |
| [FLOW.md](FLOW.md) | Odam qaysi qadamlarni bajaradi, tizim nima ko‘rsatadi? | Ekran, tugma yoki xato matni o‘zgarganda |
| [PLAN.md](PLAN.md) | Qaysi vazifalarni qanday tartibda bajaramiz? | Yangi bosqich qo‘shilganda yoki tartib o‘zgarganda |
| [TASKS.md](TASKS.md) | Hozir aynan qaysi bitta vazifani bajaryapmiz? | Har safar yangi vazifaga o‘tganda |
| [PROGRESS.md](PROGRESS.md) | Nima tekshirildi va ishni qayerdan davom ettiramiz? | Har bir tekshirilgan ishdan keyin |
| [DECISIONS.md](DECISIONS.md) | Nima uchun aynan shunday qilingan? | Muhim texnik qaror qabul qilinganda |
| [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md) | Rang, shrift, matn va komponent qoidalari qanday? | UI qoidasi o‘zgarganda |
| [THIRD-PARTY.md](THIRD-PARTY.md) | Qaysi tashqi xizmatlar ishlatiladi, kaliti qayerda, limiti qancha? | Yangi tashqi xizmat qo‘shilganda |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Qaysi fayl nima uchun kerak, so‘rov qanday yo‘l bosadi? | Papka tuzilishi yoki asosiy oqim o‘zgarganda |

## Qadamma-qadam yo‘riqnomalar

| Yo‘riqnoma | Qaysi savolga javob beradi |
| --- | --- |
| [00-kompyuter-tayyorlash.md](guides/00-kompyuter-tayyorlash.md) | Kompyuterimga nima o‘rnatishim kerak? |
| [01-template-olish.md](guides/01-template-olish.md) | Shablondan o‘z nusxamni qanday olaman? |
| [02-claude-ulash.md](guides/02-claude-ulash.md) | Claude Code’ni loyihaga qanday ulayman? |
| [03-chatgpt-ulash.md](guides/03-chatgpt-ulash.md) | ChatGPT / Codex’ni loyihaga qanday ulayman? |
| [04-cloudflare.md](guides/04-cloudflare.md) | Cloudflare hisobini qanday sozlayman va ilovani qanday nashr qilaman? |
| [05-shadcn-ui.md](guides/05-shadcn-ui.md) | Yangi komponentni qanday qo‘shaman, ko‘rinishni qanday o‘zgartiraman? |
| [06-yangi-modul.md](guides/06-yangi-modul.md) | Yangi bo‘limni (masalan, "Mahsulotlar") qanday qo‘shaman? |
| [07-ish-sikli.md](guides/07-ish-sikli.md) | Kundalik ish tartibi qanday: vazifa → bajarish → tekshirish → qayd? |
| [08-muammolar.md](guides/08-muammolar.md) | Nimadir ishlamayapti, nimadan boshlayman? |
| [09-lugat.md](guides/09-lugat.md) | Bu so‘z nima degani? |
| [10-skilllar.md](guides/10-skilllar.md) | Loyihadagi skill’lar nima va ularni qanday ishlataman? |

## Tayyor promptlar

| Fayl | Nima uchun |
| --- | --- |
| [prompts/claude.md](prompts/claude.md) | Claude Code uchun nusxalab qo‘yiladigan so‘rovlar to‘plami |
| [prompts/chatgpt.md](prompts/chatgpt.md) | ChatGPT / Codex uchun nusxalab qo‘yiladigan so‘rovlar to‘plami |

## Yangi suhbatni boshlash

Agent avvalgi suhbatni eslab qolmaydi. Yangi suhbat ochganingizda quyidagi matnni nusxalab yuboring — u agentga nimani o‘qish kerakligini aytadi:

```text
Shu loyihani davom ettiramiz.
docs/PRODUCT.md, docs/FLOW.md, docs/PLAN.md, docs/TASKS.md va docs/PROGRESS.md’ni o‘qi.
Avval faqat o‘qib, mahsulot maqsadi, joriy vazifa va uning tayyorlik shartini ayt.
Oxirgi qayd bilan haqiqiy loyiha holati mos kelishini tekshir: git log va git status’ga qara.
Qarama-qarshilik bo‘lsa ko‘rsat, yo‘q ma’lumotni taxmin qilma.
Hozircha kodni o‘zgartirma. Bitta joriy vazifa uchun qisqa reja ber.
```

Xuddi shu ishni `holat` skill’i ham bajaradi — suhbatga "Qayerda to‘xtagan edik?" deb yozsangiz kifoya.

Agent "eslab qolaman" degani yetarli emas. Hujjat fayldagi matn bilan o‘zgarganini VS Code’dagi Explorer’dan ko‘ring.

## Kurs o‘quvchilari uchun

"Vaybkoding" kursidagi hujjatlar shu loyihada ham bor, faqat bittasining nomi boshqacha:

| Kursda | Shu loyihada | Izoh |
| --- | --- | --- |
| `PRODUCT.md` | [docs/PRODUCT.md](PRODUCT.md) | Bir xil ma’noda |
| `FLOW.md` | [docs/FLOW.md](FLOW.md) | Bir xil ma’noda |
| `PLAN.md` | [docs/PLAN.md](PLAN.md) | Bir xil ma’noda |
| `TASKS.md` | [docs/TASKS.md](TASKS.md) | Bir xil ma’noda |
| `TRACK.md` | [docs/PROGRESS.md](PROGRESS.md) | Nomi boshqa, vazifasi bir xil: nima tekshirildi va keyingi qadam nima |

Ikkinchi farq: kursda bu fayllar loyiha ildizida turadi, bu yerda esa `docs/` papkasida. Agentga havola berganingizda to‘liq yo‘lni yozing, masalan `docs/TASKS.md`.
