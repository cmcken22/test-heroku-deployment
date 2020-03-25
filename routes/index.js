const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const passport = require('passport');

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  next()
}

// API Routes
router.use("/api", apiRoutes);

const users = [];

router.get('/', (req, res) => {
  console.log('GET /');
  res.render('index.ejs', { name: 'conner' });
  // res.render('index.ejs');
})

router.get('/login', (req, res) => {
  console.log('GET /login');
  res.render('login.ejs');
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/redirect-to-react',
  failureRedirect: '/login',
  failureFlash: true
}))

router.get('/redirect-to-react', (req, res) => {
  console.log('GET /redirect-to-react');
  res.redirect('http://localhost:3000');
});

router.get('/register', checkNotAuthenticated, (req, res) => {
  console.log('GET /register');
  res.render('register.ejs');
})

router.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
});

router.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
});

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

module.exports = router;
