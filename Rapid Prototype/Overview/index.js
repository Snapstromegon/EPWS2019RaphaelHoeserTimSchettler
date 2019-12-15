import express from 'express';
import nunjucks from 'nunjucks';
import adminRouter from './routers/admin.js';
import userRouter from './routers/user.js';
import { dirname, join as pathJoin } from 'path';
import { fileURLToPath } from 'url';

const app = express();

const moduleDir = dirname(fileURLToPath(import.meta.url));

// init rendering engine nunjucks
// see https://mozilla.github.io/nunjucks/ for help
nunjucks.configure(pathJoin(moduleDir, 'views'), {
  autoescape: true,
  express: app
});

app.use('/static', express.static(pathJoin(moduleDir, './static')));
app.use('/admin', adminRouter);
app.use('/user', userRouter);

app.listen(88, console.error);

export default app;
