var child_process = require('child_process')

module.exports = {
    running: false,
    run: function(commandArguments) {
        var self = this;

        if (self.running == true) {
            return;
        }

        self.running = true;

        var phpunit = child_process.spawn(
            'phpunit', 
            commandArguments
        );

        phpunit.stdout.on('data', function (data) {
            process.stdout.write(data.toString('utf8'))
        });

        phpunit.on('exit', function (code) {
            self.running = false;
        });
    }
}