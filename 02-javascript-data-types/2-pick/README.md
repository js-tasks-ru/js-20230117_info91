# pick

Необходимо реализовать функцию, которая на вход будет принимать объект и произвольное 
количество строк - ключей объекта:

```javascript
const obj = {}

pick(obj, 'field-1', 'field-2', ...'field-n');
```

а возвращать будет новый объект с перечисленными полями.

**Пример:**

```javascript
const fruits = {
 apple: 2,
 orange: 4,
 banana: 3
};

console.log(pick(fruits, 'apple', 'banana')); // { apple: 2, banana: 3 }
```
 
**Подсказка:** Обратите внимание на метод [Object.entries](https://learn.javascript.ru/keys-values-entries)
