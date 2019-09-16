
# 1. rész.
**Az adás live-ja**: https://youtu.be/s9tLocOKlPQ

## Felhasznált packagek:

- ### dotenv 
Környezeti változókat szbaályozó modul. ".env" file lévő kulcs érték párokat fel tudjuk használni az app-ba, mint környezeti változók
https://www.npmjs.com/package/dotenv

- ### jsonwebtoken
User authentikációhoz használt package.
https://www.npmjs.com/package/jsonwebtoken

- ### crypto
Nodejs beépített modul a hash generáláshoz
https://nodejs.org/api/crypto.html

## Ami az adásból kimaradt, de repositoryba felkerült:
Ezeknek a pluginokak a bemutatása a következő adás elején

- ### ESLINT
Statikus kód analizáló. Segít különféle hibák kiszűrésében és kód egyésegítésben
https://eslint.org

- ### prettier
Kód formázó modul, az eslintbe hozzá lehet adni a saját beépített formázója helyett
https://prettier.io/

- ### ESLINT AIRBNB pluginok es styleguide
ESLINT-hez a legelterjedtem styleguilde és pluginjai. Ezeket a kész ajánlásokat használjuk mi is a kódunkba.
https://www.npmjs.com/package/eslint-config-airbnb

### Kimaradt pluginok telepítése:

Ezek a formázó pluginok mind fejlesztési dependenciák, azaz a devDependencies részbe kerülnek a package.json-ba.
Fel tudjuk őket egyessével rakni, de egyszerűbb, ha bemásoljátok őket a devDependencies-be és kiadtok egy **npm install** parancsot
```
    "eslint": "^6.4.0",
    "eslint-config-airbnb": "^18.0.1",
    "eslint-config-prettier": "^6.2.0",
    "eslint-plugin-import": "^2.18.2",
    "eslint-plugin-jsx-a11y": "^6.2.3",
    "eslint-plugin-mocha": "^6.1.0",
    "eslint-plugin-node": "^10.0.0",
    "eslint-plugin-prettier": "^3.1.0",
    "eslint-plugin-react": "^7.14.3",
    "eslint-plugin-react-hooks": "^2.0.1",
    "prettier": "^1.18.2"
```

## Első rész tartalma

- felhasználó regisztráció API része
- felhasználó bejelentkezés  API része
- Jelszó titkosítás SHA256-al.

Ezekkel a funckiókkal már tudunk működő minecraftba regisztrálni, loginolni, következő részben, kicsit refaktiráljuk: 
- csinálunk egy MVC(  https://hu.wikipedia.org/wiki/Modell-n%C3%A9zet-vez%C3%A9rl%C5%91 ) struktúrát.
- A callback-eket átírjuk promise alapúra és az async await-et fogjuk hasznalni. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
- Elkezdjük a VIEW-t vagyis a frontend-et elkészíteni Bootstrap segítségével: https://getbootstrap.com/
