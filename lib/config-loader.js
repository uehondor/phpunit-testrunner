var fs = require('fs'),
    path = require('path');

var ConfigLoader = function(config, pathToConfigFile) {

    this.fileOrDirectoriesToWatch = function() {
        return config['filesOrDirectoriesToWatch'];
    };

    this.rootPath = function() {
        return config['rootPath'];
    };

    this.commandArguments = function() {
        return config['commandArguments'];
    }    
}

module.exports.load = function(pathToConfigFile) {
    if (fs.existsSync(pathToConfigFile) == false) {
        console.log('Config file %s does not exist.', pathToConfigFile);
        process.exit(1);
    }

    pathToConfigFile = path.resolve(pathToConfigFile);

    var data = fs.readFileSync(pathToConfigFile);
    var configJson = JSON.parse(data.toString('utf8'));
    var rootPath = loadRootPath(configJson, pathToConfigFile);
    var filesOrDirectoriesToWatch = loadFilesOrDirsToWatch(configJson, rootPath);

    var configHash = {
        rootPath: rootPath,
        filesOrDirectoriesToWatch: filesOrDirectoriesToWatch,
        commandArguments: configJson['commandArguments'] || []
    };

    return new ConfigLoader(configHash, pathToConfigFile);
}

function loadRootPath(config, pathToConfigFile) {
    var rootPath = path.resolve(
        path.dirname(pathToConfigFile), config['rootPath']
    );

    if (fs.existsSync(rootPath) == false) {
        console.log('%s does not exist.', rootPath);
        process.exit(1);
    }

    return rootPath;
}

function loadFilesOrDirsToWatch(config, rootPath) {
    var filesOrDirs = config['fileOrDirectoriesToWatch'],
        resolvedFilesOrDirs = [];

    filesOrDirs.forEach(function(fileOrDir) {
        resolvedFilesOrDirs.push(path.resolve(rootPath, fileOrDir));
    });

    return resolvedFilesOrDirs;
}