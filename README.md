PHPUnit TestRunner
==================

This very simple test runner was inspired by karma (another test runner for javascript).

Blog post: http://uyi.ehondor.com/blog/simple-php-testrunner-using-phpunit/

#### How to install
```bash
$ npm install phpunit-testrunner
```

#### Usage
```bash 
$ phpunit-testrunner -c path/to/configuration/file.js
```

Use the following as a template for the required configuration file. 
```javascript
{
    "rootPath": ".",
    "fileOrDirectoriesToWatch": [
        "src/Acme"
    ],
    "commandArguments": [
        "-c",
        "app/phpunit.xml", 
        "--testsuite",
        "TestSuite"
    ]
}
```

###TODO
* Add better documentation
* Add a `--version` option
* Add unit tests
