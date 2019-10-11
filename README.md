# AuthmeNodeTutorial

Authme weblogin tutorial NodeJS-be. 0-rol feleptunk egy alap nodejs alapu weboldalt, ami kezeli az authme felhasznalokat.

**Mirol szol a tutorial**
A tutorial, az authme integaciorol szol, az erintett technologiak nem mutatja be. Minden erintett technologiarol leiras linkje megtalalhato az adott reszhez tartozo leirasnal, illetve a itt a fo oldalon a lap aljan.

**Hogy miert Nodejs es miert nem PHP** :scream::scream::scream:
https://youtu.be/MqY83YjA0JE?t=86

**Kinek ajanljuk?**
Annak akit erdekel a programozas, javascript, vagy epp a szerveret szeretne kicsit feldobni.

**Hol lathato a tutorial**
:tv: Minden resz elobe zajlik a www.youtube.com/epiteszsuli/live linkel lehet elerni ha epp van adas.

**Mi van ha lemaradtam**
:tv: A tutorial megtalalhato a www.youtube.com/epiteszsuli csatornan. A Authme Tutorial lejatszasi listaba

## 1. rész: Indulás és Setup

https://youtu.be/s9tLocOKlPQ (2019.09.14)

## 2. rész: Refaktorálás MVC strukturára

https://www.youtube.com/watch?v=CpHUenHkXMk (2019.09.18)

## 3. rész: Login, user listazas VIEW elkészítése

https://www.youtube.com/watch?v=F-8oGFV9QdA (2019.09.20)

## 4.rész: Regisztráció és 404-es error page

https://www.youtube.com/watch?v=h2dngvqxUiY (2019.09.27)

## 5. rész: Kijelentkezés, User role-ok: Admin user.

https://www.youtube.com/watch?v=oVNOxCCZukk (2019.10.05)

## 6. rész User törlés
https://youtu.be/53Mqc3fDWIE (2019.10.11)

## 7. rész Jelszó módosítása

## 8. rész Validálás: bemenő adatok ellenörzése

## 9. rész: Biztonság. SQL Injection, és egyéb web security alapok

## Amire szukseged lesz: fejlesztesi kornyezet beallitasa

**Letoltendo programok**

- **NodeJS**
  Toltsd le es telepitsd a NodeJS-t. LST verzio tokeltes lesz.
  https://nodejs.org/en/

- **Adatbazis**
  Az adattarolashoz szuksegunk lesz egy SQL adatbazisa.
  Az authme configja a kovetkezoket tamogatja:

  | SQL        | link                              | package leírás                        | telepítő parancs           |
  | ---------- | --------------------------------- | ------------------------------------- | -------------------------- |
  | SQLITE     | https://www.sqlite.org/index.html | https://www.npmjs.com/package/mysql2  | npm install --save mysql2  |
  | MYSQL      | https://www.mysql.com/            | https://www.npmjs.com/package/sqlite3 | npm install --save sqlite3 |
  | POSTGRESQL | https://www.postgresql.org/       | https://node-postgres.com/            | npm install pg             |

* **VSCode**
  Toltsd le es telepitsd a Node
  https://code.visualstudio.com/

* **Minecraft szerver**

1. Teszteleshez toltsd le es indits el egy minecraft szervert local gepre,
   Mi az 1.12 paper spigot legacyt fogjuk hasznalni: https://papermc.io/legacy
2. Rakj fel egy authme plugin-t
   Authme Reloaded plugin: https://www.spigotmc.org/resources/authmereloaded.6269/
3. Configold be, a configfileba allitsd be az adatbazist.

- **GIT** opcionalisan
  verzio kezelo rendszert fogunk hasznalni, de le is lehet tolteni zipkent es kicsomagolni.

# `1. # project beallitasa.`

0rol elkezdhetjuk, vagy letoltjuk a git repot es onnan kezjuk

## 1.1a 0-rol valo beallitas

##### Project inicializalasa

`npm init`

##### **Express** telepitese

`npm install express`

##### Express project generalas

Generator telepitese mint globalis package.
`npm i -g express-generator`
Express project generalasa PUG templattel. "authmeweb" lesz a project es a konyvtar neve. Ezt atirhatod arra amire szeretned.
`express --view=pug authmeweb`

`cd authmeweb npm install`

https://expressjs.com/en/starter/generator.html

## 1.1b Gitbol valo beallitas

Töltsük le a repot es menjunk a starter mappaba, es telepitsuk a fuggosegeket

`git clone git@github.com:gmaster0o0/AuthmeNodeTutorial.git`
`cd authmeweb/starter`
`npm install`

Ha nincs gitunk akkor a githubrol toltsuk le a zip-et es tomoritsuk ki: nagy zold gomb vagy itt a link:https://github.com/gmaster0o0/AuthmeNodeTutorial/archive/master.zip

## 1.2 SQL beállítása

Az authme alapba sqlite-ot hasznal, de az nem halozati adatbazis, igy nem tudnank tavolrol elerni, ezert MYSQL-t fogunk hasznalni. Ehhez be kell allitani az authme configot, illetve szukseg van egy MYSQL szerverre.

### MYSQL szerver létrehozása.

Mi a tutorialba, mi egy ingyenes mysql adatbazist fogunk hasznalni:
https://remotemysql.com
Az itt kapott adatokkal modositjuk az authme configjat.

### :heavy_exclamation_mark: :heavy_exclamation_mark: :heavy_exclamation_mark: <span style="color:red">**NE HASZNÁLD AZ ITT LEVŐ PÉLDA ADATOKAT**</span>. :heavy_exclamation_mark: :heavy_exclamation_mark: :heavy_exclamation_mark:

Példa:

```Yaml
DataSource:
    # What type of database do you want to use?
    # Valid values: SQLITE, MYSQL, POSTGRESQL
    backend: MYSQL
    # Enable the database caching system, should be disabled on bungeecord environments
    # or when a website integration is being used.
    caching: true
    # Database host address
    mySQLHost: remotemysql.com
    # Database port
    mySQLPort: '3306'
    # Connect to MySQL database over SSL
    mySQLUseSSL: true
    # Verification of server's certificate.
    # We would not recommend to set this option to false.
    # Set this option to false at your own risk if and only if you know what you're doing
    mySQLCheckServerCertificate: true
    # Username to connect to the MySQL database
    mySQLUsername: VZcZY6yvcl
    # Password to connect to the MySQL database
    mySQLPassword: 'mBddUXcQDW'
    # Database Name, use with converters or as SQLITE database name
    mySQLDatabase: VZcZY6yvcl
```

# :question::question: Hogyan kaphatok segítséget :question::question:

Segitseget legkonnyebben discordon kaphatsz. Facebookon is valaszolok, de discordon lehet screen share-elni, liveolni és forrás kodot beilleszteni.

[![discord](https://discordapp.com/api/guilds/329854736998334464/embed.png?style=banner3)][discord]

# Ha hibat talaltok

Akkor nyugodtan forkoljatok es kuldjetek pull requestet. Ha nem tudod mi az nem baj. Irj Issuet, vagy ha ezt se szeretnel, vagy tudsz jelezd discordon.
