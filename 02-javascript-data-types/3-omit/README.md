# omit

Необходимо реализовать функцию, которая на вход будет принимать объект и произвольное 
количество строк - ключей объекта:

```javascript
const obj = {}

omit(obj, 'field-1', 'field-2', ...'field-n');
```

а возвращать будет новый объект с полями которые не были перечислены при вызове функции

**Пример:**

```javascript
const fruits = {
 apple: 2,
 orange: 4,
 banana: 3
};

console.log(omit(fruits, 'apple', 'banana')); // Вернет объект - { orange: 4 }
```
 
**Подсказка:** Обратите внимание на метод [Object.entries](https://learn.javascript.ru/keys-values-entries) 
