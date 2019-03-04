const fs = require('fs');
const path = require('path');

const walkSync = function(dir, filelist = [], directoryToSkip = []) {
    const files = fs.readdirSync(dir)
    files.forEach(function(file) {
        const isDirr = fs.statSync(path.join(dir, file)).isDirectory()
        const shouldBeExcluded =
            (Array.isArray(directoryToSkip) && directoryToSkip.includes(file)) ||
            (typeof directoryToSkip === 'string' && file.includes(directoryToSkip)) ||
            (directoryToSkip instanceof RegExp && file.match(directoryToSkip))

        if(shouldBeExcluded) {return }

        if(isDirr) {
            filelist = walkSync(path.join(dir, file), filelist, directoryToSkip)
        } else {
            filelist.push(path.join(dir, file))
        }
    })
    return filelist
};

const getRunCommand = (file, conf = path.resolve(process.cwd(), './protractor.conf.js')) => {
    return `${path.resolve(process.cwd(), './node_modules/.bin/protractor')} ${conf} --specs ${file}`
};

const getPollTime = (timeVal) => {
    if(typeof timeVal !== 'number') {
        return isNaN(Number(timeVal)) ? 1000 : Number(timeVal)
    }
    return timeVal
};

const sleep = (time) => new Promise((res) => setTimeout(res, time))

module.exports = {
    walkSync,
    getRunCommand,
    getPollTime,
    sleep,
};
