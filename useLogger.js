const fs = require('fs'),
    yaml = require('js-yaml'),
    { logger, LEVELS } = require('./logger');

let rootLogger = new logger({ root: 'driver' });

rootLogger.log({ message: 'starting the app' });

rootLogger.log('an error occurred', LEVELS.ERROR);

//transport is an overridable method that outputs the log.  By default it just logs to the console.
//In this instance it is being used to write to a file based on the current level being logged.
const fileLogger = new logger({
    transport(level, message) {
        fs.appendFile(`out/${level}.log`, message + '\n', err => {
            if (err) throw err;
        });
    }
});

fileLogger.log({ cwd: __dirname }, LEVELS.DEBUG);

//format is an overridable function that takes an object and returns a string that will get written.
//By default it jsonifies the passed in object.  In this case it outputs yaml string.
const yamlLogger = new logger({
    format(logObj) {
        return yaml.safeDump(logObj);
    }
});

yamlLogger.log('This is some yaml');
