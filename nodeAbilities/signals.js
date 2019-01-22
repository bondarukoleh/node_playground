/* Begin reading from stdin so the process does not exit untill killed or Ctrl+C pressed */
process.stdin.resume();
process.on('SIGNUP', () => {
  console.log(`I've got "SIGNUP" sighnal, yeah baby.`);
});
console.log(`PID:`, process.pid);  

process.kill(process.pid, 'SIGNUP');
process.kill(process.pid);
