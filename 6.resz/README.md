# 4. rész. regisztrációs form elkészítése és bekötése

https://www.youtube.com/watch?v=h2dngvqxUiY

## extra: ha marad ido akkor az error page elkészítése

# Amire szükségünk lesz:

- **PUGJS** template nyelvet használunk: https://pugjs.org

- HTML PUG átalakító: https://html2jade.org/

- Formázáshoz pedig a **Bootstrap** libary-t használjuk: https://getbootstrap.com/

A register oldalhoz a Card componenst hasznaltuk:
https://getbootstrap.com/docs/4.3/components/card/

Ezt az alap kodot alakitottuk at es hasznaltuk fel.

```html
<div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="..." />
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">
      Some quick example text to build on the card title and make up the bulk of the card's content.
    </p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
```

Középre igazításhoz pedig, a kovetkező classokat használtuk:

```pug
  .row.h-100
    .col-sm-6.my-auto.mx-auto
```
