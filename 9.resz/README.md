# Biztonság. SQL Injection, és egyéb web security alapok

## Miért fontos?
elég egyértelmű szerintem:D. Védeni kell a rendszerünket illetve a felhasználót, mindenféle ártó szándéktól.
## Ez nem egy hacker tutoriál
**TILOS MÁS WEBOLDALT TESZTELNI.** Más nem általunk kezelt oldal számámára a biztonségi tesztelések támadásnak minősülnek, ezért illegális.
### Leggyakoribb támadások
https://owasp.org/www-project-top-ten/
Ezekből nézünk meg pár példát vagy átbeszéljük.
#### 1.	SQL injection
A mi esetünkbe a szerver felé olyan bemenő adatok küldése amik, SQL lekérdezések, így kényszerítve ki különböző ártó dolgokat.

###### Példák
example1
###### Hogyan védekezzünk
* preparestatement
* input ellenőrzés
* jelszó ellenőrzés külön kódba, nem SQL query-be
* ORM használata
#### 2. CSRF: cross-site request forgery

Ha van egy oldal, a mi példánkba az authme-s oldal, ahol be vagyunk loginolva, és a gonosz felhasználó küld nekünk egy  linket h. néz meg a tuti kis weboldalam, ahol egy rejtett űrlap van, ami automatikusan elküld egy kérést a szerver felé. Ez lehet jelszó változtatás, email cím változtatás vagy súlyosabb esetben akár egy banki átutalás. Ez csak akkor működhet ha az adott oldalra be vagyunk loginolva, ilyenkor cookie-k között el van tárolva a tokenünk, ami mutatja h be vagyunk loginolva. Az ártó szándékú oldal pedig küld egy egy kérést a szerver fele, ami ilyenkor azt hiszi h. be vagyunk loginolva.

##### Példa: megváltoztatja a jelszót.

```html
<html>
  <body>
    <h1>Gonosz egy oldal ez</h1>
    <form action="http://localhost:3000/users/changemypassword" method="POST">
      <input type="hidden" name="password" value="gonosz" />
    </form>
    <script>
      document.forms[0].submit();
    </script>
  </body>
</html>
```

##### Hogyan védekezzünk?

CSRF tokennel, ilyenkor a form-ok tartalmaznak egy rejtett mezőbe generált tokent, amit a szerver fele küldünk és szerver.

https://github.com/expressjs/csurf

#### 3. Bruteforce
Próbálkozások jelszó feltörésére
Szótár alapú is lehet
###### Hogyan védekezzünk
* Általános jelszavak tiltása
* Rate limiter
```javascript
//Rate limiter setup
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!"
});
```

## Hasznos védekezések

### Kerüljük függőségek  biztonsági hibáit
Egyszerű npm paranccsal a biztonsági kockázatokat tudjuk ellenőrizni
```npm audit```
```npm audit fix``` Ha javítható a hiba, akkor frissíti a régi csomagokat.
egyéb megoldás: https://snyk.io/
### Helmet használata
Helmet segít megvédeni az applikáció a jól ismert security sebezhetőségek ellen a header pontos beállításával.
```npm install --save helmet```

```javascript
const helmet = require('helmet');
...
app.use(helmet())
```
### TLS használata
https://letsencrypt.org/about/



## Hasznos linkek

https://portswigger.net/web-security/csrf
https://owasp.org/www-project-top-ten/
https://medium.com/@nodepractices/were-under-attack-23-node-js-security-best-practices-e33c146cb87d





