# Hogyan telepítsük az alkalmazást VPS-re

## amire szükség van:

LINUX VPS hozzáférés root joggal,
SSH kliens
NODEJS alkalmazás

## Szükséges alkalmazások telepítése

#### Készítsünk egy felhasználót.

```bash
#create new user
adduser gmaster
```

Adjunk a usernek admin jogokat

```bash
#providing superuser rigth
usermod -aG sudo gmaster
```

Utána relogolj az új flehazsnálóval

#### NODEJS telepítése

NVM-et azaz node version managert fogunk először feltelepíteni, ezzel könnyebben kezelhetjük a különböző node verziókat

**frissítsük a package listat**

```bash
sudo apt-get update
sudo apt-get upgrade
```

##### CURL telepítése

**Telepítsük a curl-t ha nincs fenn**

```bash
#if not installed
sudo apt-get install curl
```

##### NODE VERISON MANAGER (NVM) telepítése

**Futtasuk az alábbi telepítő parancsot**

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
```

Ahhoz h. a vátlozások érvénybe lépjenek, újra be kell jelentkeznünk

Próbáljuk ki az nvm-et

```bash
nvm --verison
```

##### NODEJS telepítése

Telepítsük azt a node verziót amit az alkalmazásunk használni fog

```bash
nvm install v12.16.1
```

#### Git telepítése

```bash
sudo apt-get install git
```

#### SSH kulcs létrehozása

Kövessük a lépéseket, és adjuk hozzá a generált kulcsot a githubhoz, gitlabhoz vagy amit épp használunk:

- GITLAB:
  https://docs.gitlab.com/ee/ssh/#rsa-ssh-keys
- GITHUB:
  https://docs.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent

```bash
ssh-keygen -t rsa -b 4096 -C "myeamil@example.com"
```

Másoljuk ki a **publikus** kulcsot

```bash
cat ~/.ssh/id_rsa.pub
```

Adjuk hozzá a kulcsot: **/setting/ssh key** menüpontba. Ez nagyjából hasonló a gitlabon és a githubon is.

Ha ez megvan teszteljük.

#### git repo clonozás

```
git clone git@github.com:gmaster0o0/AuthmeNodeTutorial.git
```

#### PM2 telepítése

```bash
npm install pm2 -g
```

**app inditása**
`pm2 start app.js`

**app inditása szerver indulásakor**

```
pm2
pm2 startup

pm2 save
#test it
sudo reboot
```

**egyéb hasznos pm2 parancsok**

```
#app leállítása
pm2 stop app.js
#futo alkalmazások listázása
pm2 list
#info az almalmazásról
pm2 info app
#logok
pm2 log [app]
```

#### NGIX telepítése és beállítása

**Telepítés**

```bash
sudo apt-get install nginx
# check if installed
sudo nginx -v
```

##### server config

**létrehozás**

```
cd /etc/nginx/sites-available
sudo nano authmeServer
```

**editálás**

```
server {
    listen 80;
    server_name <YourVPSIpAddress>;
    location / {
        proxy_pass http://localhost:3000/;
    }
}
```

**config ellenörzése**

```
sudo nginx -t
```

**config engedélyezése**

```
sudo ln -s /etc/nginx/sites-available/authmeServer /etc/nginx/sites-enabled
```

**ngix újrainditása**

```
sudo systemctl restart nginx
```
