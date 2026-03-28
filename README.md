# ![](/assets/logo24.png) Latvijas Radio Discord Bots

Discord bots, kas spēj atskaņot latviešu radio stacijas balss kanālos.

**Bota uzaicinājums uz serveri atrodams [šeit](https://discord.com/api/oauth2/authorize?client_id=1006231500229976154&permissions=3145728&scope=applications.commands%20bot).**

<!--
### Pieejamo radio staciju saraksts

![](/assets/16x16/lr1.png) Latvijas Radio 1 <br>
![](/assets/16x16/lr2.png) Latvijas Radio 2 <br>
![](/assets/16x16/lr3.png) Latvijas Radio 3 <br>
![](/assets/16x16/lr5.png) Latvijas Radio 5 <br>
![](/assets/16x16/lr-vecas-plates.jpg) LR Vecās Plates <br>
![](/assets/16x16/swh.jpg) Radio SWH <br>
![](/assets/16x16/swh-rock.png) Radio SWH Rock <br>
![](/assets/16x16/skonto.jpg) Radio Skonto <br>
![](/assets/16x16/latgales.png) Latgolys Radeja <br>
![](/assets/16x16/kurzemes.png) Kurzemes Radio <br>
![](/assets/16x16/ehr.png) European Hit Radio <br>
![](/assets/16x16/starfm.png) Star FM <br>
-->

### Pieejamo radio staciju saraksts

|                                                        |                                                |
| ------------------------------------------------------ | ---------------------------------------------- |
| ![](/assets/16x16/lr1.png) Latvijas Radio 1            | ![](/assets/16x16/lr2.png) Latvijas Radio 2    |
| ![](/assets/16x16/lr3.png) Latvijas Radio 3            | ![](/assets/16x16/lr5.png) Latvijas Radio 5    |
| ![](/assets/16x16/lr-vecas-plates.jpg) LR Vecās Plates | ![](/assets/16x16/swh.jpg) Radio SWH           |
| ![](/assets/16x16/swh-rock.png) Radio SWH Rock         | ![](/assets/16x16/skonto.jpg) Radio Skonto     |
| ![](/assets/16x16/latgales.png) Latgolys Radeja        | ![](/assets/16x16/kurzemes.png) Kurzemes Radio |
| ![](/assets/16x16/ehr.png) European Hit Radio          | ![](/assets/16x16/starfm.png) Star FM          |

# Kā palaist botu lokāli

Lai palaistu botu, pa priekšu nāksies ... izveidot Discord botu.

- Atver pārlūkā https://discord.com/developers/applications
- New Application > Bot > Reset Token > Copy
  - Šeit tu iegūsti savu Discord bota tokenu, **saglabā to, jo tas būs nepieciešams vēlāk**
- Uzaicini botu uz savu serveri
  - OAuth2 > URL Generator
  - No Scopes izvēlies "applications.commands" un "bot"
  - Atver linku kas ir parādīts apakšā un pievieno botu savam serverim

Kad bots ir izveidots, noklonējam repozitoriju.

```sh
git clone https://github.com/deimoss123/LatvijasRadioBots
cd LatvijasRadioBots
```

Bota palaišanai ir 2 opcijas - Docker konteinerī, vai arī bez. Ja neplāno veikt uzlabojumus/izstrādāt botu, bet tikai to palaist, tad ieteicams ir **Docker**.

# Kā palaist botu ar Docker

## 1.

Ieinstalē Docker, kā arī docker-compose, ja tas nenāk komplektā. Internetā var atrast ļoti foršas pamācības kā to izdarīt.

## 2.

Izveido `.env` failu šajā pašā mapē ņemot [.env.example](./.env.example) failu kā piemēru.

`.env` failā ievadi nepieciešamās vērtības. Šeit būs nepieciešams iepriekš minētais tokens.

## 3.

Palaižam sekojošo komandu, kas izveidos Docker image, uzbūvēs un palaidīs botu.

```sh
docker compose -f docker-compose.prod.yml up
```

## 4.

Ja iepriekšējā solī nav parādījušās kļūdas, tad varam apskatīties `docker compose logs`. Viss ir bumbās, ja redzams šāds teksts un nav kļūdu.

```
lr-bots  |
lr-bots  | > latvijasradio@1.0.0 start /usr/app
lr-bots  | > node dist/index.js
lr-bots  |
lr-bots  | LatvijasRadioTest#3930 logged in
lr-bots  | --------------------------------------------------
lr-bots  | Core Dependencies
lr-bots  | - @discordjs/voice: 0.16.0
lr-bots  | - prism-media: 1.3.5
lr-bots  |
lr-bots  | Opus Libraries
lr-bots  | - @discordjs/opus: 0.9.0
lr-bots  | - opusscript: not found
lr-bots  |
lr-bots  | Encryption Libraries
lr-bots  | - sodium-native: not found
lr-bots  | - sodium: not found
lr-bots  | - libsodium-wrappers: 0.7.13
lr-bots  | - tweetnacl: not found
lr-bots  |
lr-bots  | FFmpeg
lr-bots  | - version: 6.0
lr-bots  | - libopus: yes
lr-bots  | --------------------------------------------------
```

Viss ir forši un fantastiski, bet mums ir problēma - kā klausīties radio? Botam ir nepieciešams reģistrēt komandas, lai tās lietotājiem parādītos Discordā.

## 5.

Tagad jāievada viena (vai abas) no sekojošām komandām, kas Discordam jauki palūgs reģistrēt bota komandas (`/atskaņot` un `/apturet`).

Lai reģistrētu komandas tikai vienā serverī, kas norādīts tavā `.env` failā.

```sh
docker exec -it lr-bots pnpm register
```

Lai reģistrētu komandas globāli, visos serveros.

```sh
docker exec -it lr-bots pnpm register:global
```

**Ja komandas neparādās uzreiz, uzgaidi, ja pēc minūtes nav, tad restartē Discordu (ctrl + r).**

## 6.

Ieej balss kanālā, palaid komandu `/atskaņot` un nosvini šo atgadījumu. Es jau no paša sākuma ticēju, ka tev tas izdosies. Labi padarīts! 🎉

## 7. Papildus punkts par Docker

Konteineris strādās tik ilgi kamēr pats Docker būs ieslēgts. Konteineris automātiski restartēsies pie kļūdām/lūzumiem, tā kā par to nav jāuztraucas. Botu var apstādināt ar komandu `docker compose down`, atrodoties šajā pašā mapē, vai arī ar `docker stop lr-bots`.
