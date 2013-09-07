var fs = require('fs'),
    path = require('path');

module.exports = {
    config: null,
    pathToConfigFile: null,

    load: function(pathToConfigFile) {
        pathToConfigFile = path.resolve(pathToConfigFile);
        var data = fs.readFileSync(pathToConfigFile);
        this.pathToConfigFile = pathToConfigFile;
        this.config = JSON.parse(data.toString('utf8'));
    },

    fileOrDirectoriesToWatch: function() {
        var rootPath = this.rootPath(),
            filesOrDirs = this.config['fileOrDirectoriesToWatch'],
            fileOrDirResolved = [];

        filesOrDirs.forEach(function(fileOrDir) {
            fileOrDirResolved.push(path.resolve(rootPath, fileOrDir));
        });

        return fileOrDirResolved;
    },

    rootPath: function() {
        return path.resolve(path.dirname(this.pathToConfigFile), this.config['rootPath']);
    },

    commandArguments: function() {
        return this.config['commandArguments'] || [];
    }
}