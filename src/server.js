import express from 'express';
import personRouter from './modules/person/routes.js';

const routes = [
  {
    name: '/person',
    router: personRouter,
  },
];

const app = express();

for (const { name, router } of routes) {
  app.use(name, router);
}

/**
 * Feel free to modify or remove this.
 */
app.get('/', (req, res) => {
  res.send('Hello world!');
});

export default app;
