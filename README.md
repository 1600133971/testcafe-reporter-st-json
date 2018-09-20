# testcafe-reporter-st-json

This is the **JSON** reporter plugin for [TestCafe](http://devexpress.github.io/testcafe).

## Install

```
npm install testcafe-reporter-st-json
```

## Usage

When you run tests from the command line, specify the reporter name by using the `--reporter` option:

```
testcafe chrome 'path/to/test/file.js' --reporter st-json
```


When you use API, pass the reporter name to the `reporter()` method:

```js
testCafe
    .createRunner()
    .src('path/to/test/file.js')
    .browsers('chrome')
    .reporter('st-json') // <-
    .run();
```

## Author
1600133971
