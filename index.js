const express = require('express');

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
  res.redirect('/blog/js/challenges');
});

app.get('/course/promotions', (req, res, next) => {
  res.render('promotions');
});

app.get('/testimonial', (req, res) => {
  res.render('testimonials');
});

const crypto = require('crypto');

const secret = '-__MY_PASSION__-';

app.get('/blog/js/challenges', (req, res, next) => {
  const page = +req.query.page || 1;
  const data = require('./data/data.json');
  const totalItems = data.length;
  const LIMIT = 5;
  const lastPage = Math.ceil(totalItems / LIMIT);
  if (page < 1 || page > lastPage) {
    return res.redirect('/sorry');
  }
  const spliced = data.slice((page - 1) * LIMIT, page * LIMIT);

  const disqus_URL = `http://www.programmingwithsakib.com/blog/js/challenges`;
  const disqus_IDENTIFIER = crypto
    .createHmac('sha256', secret)
    .update(disqus_URL)
    .digest('hex');

  res.render('index', {
    data: spliced,
    currentPage: page,
    hasNextPage: page * LIMIT < totalItems,
    hasPreviousPage: page > 1,
    nextPage: page + 1,
    previousPage: page - 1,
    lastPage: Math.ceil(totalItems / LIMIT),
    limit: LIMIT,
    url: '/blog/js/challenges',
    disqus_URL,
    disqus_IDENTIFIER,
  });
});

app.get('/blog/js/when-you-should-not-use-arrow-function', (req, res, next) => {
  const disqus_URL = `http://www.programmingwithsakib.com/blog/js/when-you-should-not-use-arrow-function`;
  const disqus_IDENTIFIER = crypto
    .createHmac('sha256', secret)
    .update(disqus_URL)
    .digest('hex');
  res.render('noArrowFunction', {
    disqus_URL,
    disqus_IDENTIFIER,
  });
});

app.use((req, res, next) => {
  res.render('suggestBlog');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`App listening on port ${PORT}!`));
