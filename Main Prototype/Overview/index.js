import express from 'express';
import passport from 'passport';
import nunjucks from 'nunjucks';
import dashboardRouter from './routers/dashboard.js';
import { dirname, join as pathJoin } from 'path';
import { fileURLToPath } from 'url';
import config from '../config.js';
import session from 'express-session';
import router from '../../Rapid Prototype/Overview/routers/admin.js';

const app = express();

const moduleDir = dirname(fileURLToPath(import.meta.url));

// init rendering engine nunjucks
// see https://mozilla.github.io/nunjucks/ for help
nunjucks.configure(pathJoin(moduleDir, 'views'), {
  autoescape: true,
  express: app,
  noCache: true
});

app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: config.Dashboard.secrets.cookie.secret
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/static', express.static(pathJoin(moduleDir, './static')));
app.use('/', dashboardRouter);
app.all('*', (req, res) => {
  res.render('pages/404.njk');
})

app.listen(config.Dashboard.webserver.port, console.error);

export default app;
