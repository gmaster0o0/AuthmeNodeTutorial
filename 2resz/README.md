# 2. rész.

**Az adás live-ja**: https://www.youtube.com/watch?v=CpHUenHkXMk

## Felhasznált packagek:

Nem volt új felhasznál package.

## Jelenleg az Authme WEB-API-nk ezt tudja:

### **API HÍVÁSOK**
#### -  /login : felhasználó bejelentkezés
Method: **POST**
Parameterek:

| Név       | Leírás         |
| --------- | -------------- |
| username* | felhasználónév |
| password* | jelszó         |
*Kötelező parameterek

válasz:
```json
{
    "status": "String",
    "data": "String"
}
```

#### - /register
Method: **POST**
Parameterek:

| Név       | Leírás         |
| --------- | -------------- |
| username* | felhasználónév |
| password* | jelszó         |
|passwordConfirm* | jelszó megerősítése |
| email | email cím |

válasz:
```json
{
    "status": "String",
    "data": {
        "username": "String",
        "realname": "String",
        "password": "String",
        "email": "String",
        "regdate": "number"
    }

}
```
*Kötelező parameterek

#### - /users
Method: **GET**
Védett útvonal. Bejelentkezés szükséges

válasz:
```json
[{
    "status": "String",
    "data": {
        "username": "String",
        "realname": "String",
        "password": "String",
        "email": "String",
        "regdate": "number"
    }

}]
```

