const {logger, LEVELS} = require('./logger');
const fs = require('fs');

describe('Logger', function() {
    let testLogger =  new logger({root: 'Test'});

    it('Logs Info level message', () => {
        let output = {"root":"Test","message":"First Test","level":"info"};
        testLogger.log({message:'First Test'});
        console.log(output);
    })

    it('Logs Error level message', () => {
        let output = {"root":"Test","message":"Second Test","level":"error"};
        testLogger.log('Second Test', LEVELS.ERROR);
        console.log(output);
    })

    it('Logs Yaml Format', () => {
        const yamlLogger = new logger({
            format(logObj) {
                return logObj;
            }
        });

        yamlLogger.log('This is Yaml Test');

        expect(yamlLogger.root).toBe('root');
        expect(yamlLogger.data).toBe('This is Yaml Test');
    })

    it('File logger logs file to directory', () => {
        const fileLogger = new logger({
            transport(level, message) {
                fs.appendFile(`out/${level}.log`, message + '\n', err => {
                    if (err) throw err;
                });
            }
        });

        fileLogger.log({ cwd: __dirname }, LEVELS.DEBUG);

        let dir = 'C:\\Users\\vnanu\\Documents\\NM-Test\\coding-test-master'

        expect(fileLogger.data.cwd).toBe(dir);
        expect(fileLogger.level).toBe('debug');

    })
});
