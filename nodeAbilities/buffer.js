const fs = require('fs');

function readFile(filePath, encode) {
    const buff = fs.readFileSync(filePath);
    return (encode) ? Buffer.from(buff, encode) : Buffer.from(buff)
}

function encode() {
    const userPass = `User:Pass`;
    const base64Auth = Buffer.from(userPass).toString('base64');
    console.log(base64Auth);
}

function makeCopy(filepath, whereTo) {
    const buffer = readFile(filepath);
    fs.writeFile(whereTo, buffer, 'ascii', (error, data) => {
        error && process.exit(1);
    })
}

makeCopy('./data/text.txt', `./data/text2${Math.random()}.txt`);
