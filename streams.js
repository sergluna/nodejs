const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  // Solution 1
  //   fs.readFile('test-file.txt', (err, data) => {
  //     if (err) console.log(err);
  //     res.end(data);
  //   });

  // Solution 2 - Streams
  //   const readable = fs.createReadStream('test-file.txt');
  //   readable.on('data', (chunk) => {
  //     res.write(chunk); // reads data chunk by chunk and sends it to the client
  //   });
  //   readable.on('end', () => {
  //     res.end(); // signals that no more data will be written to writtable stream
  //   });
  //   readable.on('error', (err) => {
  //     // error for when file is not founds\
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end('File not found!');
  //   });

  // Solution 3 - Pipe Operator
  const readable = fs.createReadStream('test-file.txt');
  readable.pipe(res); // readableSource.pipe(writableDestonation) how it works
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening...');
});

// Solution 1 works for small examles locally but the problem is node needs to load the entire file. This can be a problem if the file if large and is the server is getting hit with many requests.

// Solution 2 works by reading the file chunk by chunk and when its ready it send the data to the client instead of reading the entire file and send it all at once.

// Solution 3 solves the problem know as "Back Pressure"; when the readable stream is much faster over than actaully send the result over network, this overwhelmes the response stream. It cant send the data nearly as fast as it recieves it from the file.
