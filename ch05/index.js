import { createServer } from 'http';
import data from './data.js';
import { getList } from "./list.js";
import { deleteAddress } from "./delete.js";

createServer((req, res) => {
  let responseBody;
  const parts = req.url.split('/');
  if(parts.includes('delete')) {
    data.addresses = deleteAddress(data.addresses, parts[2]);
    redirect(res, '/');
  } else {
    res.writeHead(200, {'content-type': 'text/html'})
    responseBody = getList(data.addresses);
    res.end(responseBody);
  }
}).listen(8080, () => {
  console.log(`Address book reachable via localhost:8080`);
})

function redirect(res, to) {
  res.writeHead(302, { location: to, 'content-type': 'text/plain'})
  res.end('302 Redirecting to /');
}
