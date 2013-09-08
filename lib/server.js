var fs = require('fs'),
    path = require('path'),
    chokidar = require('chokidar'),
    ConfigLoader = require('./config-loader'),
    testRunner = require('./phpunit-test-runner');

exports.start = function(pathToConfigFile) {
    var configLoader = ConfigLoader.load(pathToConfigFile);

    var filesOrDirectoriesToWatch = configLoader.fileOrDirectoriesToWatch(),
        rootPath = configLoader.rootPath(),
        commandArgs = configLoader.commandArguments();

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
}