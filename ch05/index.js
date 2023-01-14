import { createServer } from 'http';

createServer((req, res) => {
  res.writeHead(200, {'content-type': 'text/html'})
  const responseBody = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
        <title>Address Book</title> 
    </head>
     <body>
       <h1>Address book</h1>
    </body>
  </html>
  `;
  res.end(responseBody);
}).listen(8080, () => {
  console.log(`Address book reachable via localhost:8080`);
})
