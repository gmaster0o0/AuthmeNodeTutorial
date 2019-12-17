# 8. rész. Validálás, user input ellenörzése

https://youtu.be/mN3DtlEBVi4

**Kicsit hosszabb részben végigmentünk a user inputok validálásán, illetve csinosítottuk a hiba üzeneteket is.**

## Használtuk:
### validatorjs

https://github.com/validatorjs/validator.js

#### Telepítés, használata

`npm install validator`

```javascript
// ES6 import
import validator from 'validator';

vagy 

const validator = require('validator');
```

a validatorjs rengeteg ellenörző függvényt tartalmaz, amik vagy true vagy false-al térnek vissza, attól függően az adott feltétel teljesül e.

Példa

```javascript
const validator = require('validator');

const emailAddress = "example@email.com";

if(validator.isEmail(emailAddress)){
    console.log("Ez egy email cím");
}
```


### Express validator

https://express-validator.github.io/

### Telepítés, használat
`npm install --save express-validator`



Az express-validator-ba a validatorjs fuggvenyeit hasznalhatjuk mint, express middleware-k.

Példa( magyarázat a commentbe)

```javascript
const { check, validationResult } = require('express-validator');

app.post('/user',
  check('email') //check utan meghatározzuk melyik mezőt akarjuk ellenőrízni
    .isEmail()   //validatorjs ellenörző függvény
    .withMessage('Érvénytelen email'), //custom message
  (req, res) => {
    //ellenőrízzük a hibákat.
    const errors = validationResult(req); // validationResult- el nyerjük ki az errorokat
										  // ez egy req obj-et vár
    //ha van hiba
    if (!errors.isEmpty()) {              // isEmpty() -vel nézzük meg üres e az errors 										  // object
      return res.status(422).json({ errors: errors.array() });
    }
	//ha nincs hiba
    User.create({
      username: req.body.username,
      password: req.body.password
    }).then(user => res.json(user));
});
```

