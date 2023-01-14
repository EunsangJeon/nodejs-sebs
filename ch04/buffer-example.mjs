import { readFile } from 'fs';

readFile('./hello.txt', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(data);
  console.log(data.byteLength);
  console.log(data.toString());
});
