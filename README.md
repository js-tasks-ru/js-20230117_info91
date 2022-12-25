## To start project:

Для старта проекта необходимо выполнить следующие команды:

* `npm install` - установит необходимые зависимости

**Note:** У вас уже должна быть установлена Nodejs 
Проверить текущие версии можно набрав в консоли/терминале следующие команды: `node -v` и `npm -v`.

Версии требуемые проектом указаны в `package.json` в поле `engines`  

## To run tests:

### To run all tests
Чтобы запустить тесты, воспользуйтесь командой:

`npm run test:all`

### To run tests from a specific directory

Чтобы запустить тесты из определенной директории, воспользуйтесь командой:

`npm run test:specific --findRelatedTests 01-javascript-data-types/1-sort-strings/**/*.spec.js`

"01-javascript-data-types" - это имя директории модуля  
"1-sort-strings" - имя директории задачи  

### To run a single test

Чтобы запустить только один тест, можно воспользоваться командой:

`jest -t '<describeString> <itString>'`

к примеру команда:

`jest -t 'javascript-data-types/sort-strings'`

выполнит весь блок `describe`, а команда 

`jest -t 'javascript-data-types/sort-strings should correctly sort strings started from uppercase'`

выполнит только блок `it` с соответствующим названием.  
Более подробно про запуск тестов можно посмотреть в документации [Jest](https://jestjs.io/docs/en/cli.html#--testnamepatternregex)
