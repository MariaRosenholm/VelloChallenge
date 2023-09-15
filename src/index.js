import server from './server.js';

const port = 3030;

server.listen(port, () => {
  console.log('Listening on port', port, `http://localhost:${port}`);
});
