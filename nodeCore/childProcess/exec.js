const cp = require('child_process');
const path = require('path');

const pathToFile = path.resolve(__dirname, '../data/childProcessData/textToBeRead.txt')
/* Windows
cp.exec(`type ${pathToFile}`, (err, stdout, stderr) => {
  console.log(`err data:`, err);
  console.log(`Stderr data:`, stderr);
  console.log(`Stdout data:`, stdout);
})

try{
  const buffer = cp.execSync(`type ${pathToFile}`)
  console.log(Buffer.isBuffer(buffer));
} catch(e){
  console.log("ERROR");
}*/

/* UNIX */
cp.exec(`cat ${pathToFile} | sort | uniq`, (err, stdout, stderr) => {
  console.log(`err data:`, err);
  console.log(`Stderr data:`, stderr);
  console.log(`Stdout data:`, stdout);
})
