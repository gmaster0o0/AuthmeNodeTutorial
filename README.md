# AuthmeNodeTutorial


Authme weblogin tutorial NodeJS-be. 0-rol feleptunk egy alap nodejs alapu weboldalt, ami kezeli az authme felhasznalokat.

A tutorial, az authme integaciorol szol, az erintett technologiak nem mutatja be. Minden erintett technologiarol leiras linkje megtalalhato az adott reszhez tartozo leirasnal, illetve a itt a fo oldalon a lap aljan.

## Amire szukseged lesz: fejlesztesi kornyezet beallitasa


### Letoltendo programok


#### NodeJS
Toltsd le es telepitsd a NodeJS-t. LST verzio tokeltes lesz.
https://nodejs.org/en/

#### Adatbazis
Az adattarolashoz szuksegunk lesz egy SQL-re

#### VSCode
Toltsd le es telepitsd a Node
https://code.visualstudio.com/

#### Minecraft szerver
1. Teszteleshez toltsd le es indits el egy minecraft szervert local gepre,
2. Rakj fel egy authme plugin-t
3. Configold be, a configfileba allitsd be az adatbazist.


### NodeJS project beallitasa.
0rol elkezdhetjuk, vagy letoltjuk a git repot es onnan kezjuk


#### 0 rol valo beallitas


##### Project inicializalasa
`npm init`
##### Express telepitese
`npm install express`

##### Express project generalas
Generator telepitese mint globalis package. 
`npm i -g express-generator`
Express project generalasa PUG templattel. "authmeweb" lesz a project es a konyvtar neve. Ezt atirhatod arra amire szeretned.
`express --view=pug authmeweb`

`cd authmeweb
npm install`

https://expressjs.com/en/starter/generator.html


#### Gitbol valo beallitas


`git clone git@github.com:gmaster0o0/AuthmeNodeTutorial.git`
`cd authmeweb/starter`
`npm install`





