const cp = require('child_process');
const path = require('path');

const pathtoFile = path.resolve(__dirname, '../data/childProcessData/testToBeRead.txt')
//type ${pathtoFile} | sort | uniq could be the comand. (in UNIX mostly)
cp.exec(`type ${pathtoFile}`, (err, stdout, stderr) => {
  console.log(`err data:`, err);
  console.log(`Stderr data:`, stderr);
  console.log(`Stdout data:`, stdout);
})

try{
  const buffer = cp.execSync(`type ${pathtoFile}`)
  console.log(Buffer.isBuffer(buffer));
} catch(e){
  console.log("ERROR");
}

