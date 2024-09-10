import newsRouter from './news.js';
import siteRouter from './site.js';
import coursesRouter from './courses.js';
import MeRouter from './me.js';
import authRouter from './auth.js';

function route(app) {
  app.use('/news', newsRouter);
  app.use('/courses', coursesRouter);
  //action --> dispatcher --> func handler
  app.use('/me',MeRouter);
  app.use('/auth', authRouter);
  app.use('/', siteRouter);
  app.use('/search', siteRouter);
  app.use('/courses/create', coursesRouter);
  app.use('/courses/edit',coursesRouter);
  // app.use('/search', (req,res) => {
  //     res.render('search');
  // } );
}

export default route;
