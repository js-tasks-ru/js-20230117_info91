# createGetter

Необходимо реализовать функцию "createGetter". Функция должна принимать строку вида 
"prop-1.prop-2.prop-n", где "prop-1, ..., prop-n" - это свойства объекта разделенные точкой.

К примеру строка вида "props.images.src" - это путь к свойству "src" следующего объекта:

```javascript
const obj = { 
  props: { 
    images: {
      src: "http://path-to-some-img"
    }
  }
};
```

Функция "createGetter" должна возвращать новую функцию, которая по заданному пути 
найдет значение в переданном ей объекте и вернет это значение. 

```javascript
function createGetter(field) {
  /* ... */
}

const product = {
  category: {
    title: "Goods"
  }
}

const getter = createGetter('category.title');

console.log(getter(product)); // Goods
```
