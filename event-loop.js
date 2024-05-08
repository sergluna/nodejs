const fs = require('fs');
const crypto = require('crypto');

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 4; // sets the number of threads to compute password encryption

setTimeout(() => console.log('Timer 1 finished'), 0);
setImmediate(() => console.log('Immediate 1 finished'));

fs.readFile('test-file.txt', () => {
  console.log('I/O finished');
  console.log('----------------');

  setTimeout(() => console.log('Timer 2 finished'), 0);
  setTimeout(() => console.log('Timer 3 finished'), 3000);
  setImmediate(() => console.log('Immediate 2 finished'));

  process.nextTick(() => console.log('Process.nextTick'));

  // Example of how event loop, thread pool and code blocking in action
  //
  // Example of how Sync functions work even with thread pool size greater than 1

  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
  console.log(Date.now() - start, 'Password Encrypted');

  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
  console.log(Date.now() - start, 'Password Encrypted');

  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
  console.log(Date.now() - start, 'Password Encrypted');

  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
  console.log(Date.now() - start, 'Password Encrypted');

  // Example of asyn functions and how changing thread pool size alters the speed at which they are completed

  //   crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
  //     console.log(Date.now() - start, 'Password Encrypted');
  //   });
  //   crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
  //     console.log(Date.now() - start, 'Password Encrypted');
  //   });
  //   crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
  //     console.log(Date.now() - start, 'Password Encrypted');
  //   });
  //   crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
  //     console.log(Date.now() - start, 'Password Encrypted');
  //   });
});

console.log('Hello from the top-level code');
