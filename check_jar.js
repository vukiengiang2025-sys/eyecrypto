
import fs from 'fs';
const buffer = Buffer.alloc(4);
const fd = fs.openSync('android/gradle/wrapper/gradle-wrapper.jar', 'r');
fs.readSync(fd, buffer, 0, 4, 0);
fs.closeSync(fd);
console.log('Header:', buffer.toString('hex'));
