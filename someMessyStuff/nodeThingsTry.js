/* process.stdout - is a writable stream to stdout */
/* Pass stream from one thing to node script thru pipe $> cat someJson.json | node nodeThingsTry.js */
// process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
    const chunk = process.stdin.read();
    if (chunk !== null) {
        console.log('Got some data!');
        process.stdout.write(`DATA: ${chunk}`)
    }
});

process.stdin.on('end', () => {
    process.stdout.write(`\n Reading DONE`)
});
