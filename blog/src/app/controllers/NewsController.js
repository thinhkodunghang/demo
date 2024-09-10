class NewsController {
  // [GET] /news --- contructor
  index(req, res) {
    res.render('news');
  }
  // [GET] /news/:slug
  show(req, res) {
    res.send(' news');
  }
}

export default new NewsController();
