var fs = require('fs'),
    path = require('path'),
    chokidar = require('chokidar'),
    configLoader = require('./lib/config-loader'),
    testRunner = require('./lib/phpunit-test-runner');

var pathToConfigFile = process.argv[2];
if (fs.existsSync(pathToConfigFile) == false) {
    console.log('Config file %s does not exist.', pathToConfigFile);
    process.exit(1);
}

configLoader.load(pathToConfigFile)
var filesOrDirectoriesToWatch = configLoader.fileOrDirectoriesToWatch(),
    rootPath = configLoader.rootPath(),
    commandArgs = configLoader.commandArguments();

if (fs.existsSync(rootPath) == false) {
    console.log('%s does not exist.', rootPath);
    process.exit(1);
}

process.chdir(rootPath);

var watcher = new chokidar.watch(
    filesOrDirectoriesToWatch, 
    {ignored: /^\./, persistent: true}
);

var watcherCallback = function() {
    testRunner.run(commandArgs);
}

watcher
    .on('change', watcherCallback)
    .on('unlink', watcherCallback);