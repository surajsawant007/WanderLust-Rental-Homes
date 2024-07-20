if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// console.log(process.env.RAZORPAY_ID_KEY);
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')
const ExpressError = require('./utils/ExpressError.js')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/user.js')

// const GoogleStrategy = require('passport-google-oauth20').Strategy;

// const googleRoute = require('./routes/google.js');

const listingRouter = require('./routes/listing.js')
const reviewRouter = require('./routes/review.js')
const userRouter = require('./routes/user.js')
// const paymentRoute = require('./routes/paymentRoute.js');
const { isLoggedIn, validateReview } = require('./middleware.js')

//const dbUrl = process.env.ATLASDB_URL;
const sampleMongo = 'mongodb://localhost:27017/wanderlust'
const dbUrl = process.env.ATLASDB_URL
console.log(process.env.ATLASDB_URL)
main()
  .then(() => {
    console.log('Connected to MongoDB Atlas')
  })
  .catch(err => {
    console.log(err)
  })

async function main () {
  await mongoose.connect(dbUrl)
}

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.engine('ejs', ejsMate)
app.use(express.static(path.join(__dirname, '/public')))

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET
  },
  touchAfter: 24 * 3600
})

store.on('error', err => {
  console.log('ERROR in MONGO SESSION STORE', err)
})

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true
  }
}

app.use(session(sessionOptions))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())


passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: process.env.GOOGLE_CALLBACK_URL
// },
// async (accessToken, refreshToken, profile, done) => {
//   try {
//     // Check if user already exists in our db
//     const existingUser = await User.findOne({ providerId: profile.id });
//     if (existingUser) {
//       return done(null, existingUser);
//     }

//     // If not, create a new user
//     const newUser = new User({
//       providerId: profile.id,
//       provider: 'google',
//       email: profile._json.email,
//       username: profile._json.given_name.toLowerCase() + Math.floor(Math.random() * 1000)
//     });

//     await newUser.save();
//     done(null, newUser);
//   } catch (err) {
//     console.error(err);
//     done(err, null);
//   }
// }
// ));

app.get('/', (req, res) => {
  res.redirect('/listings')
})

app.use((req, res, next) => {
  res.locals.success = req.flash('success')
  res.locals.error = req.flash('error')
  res.locals.update = req.flash('update')
  res.locals.destroy = req.flash('destroy')
  res.locals.currUser = req.user
  next()
})

// app.get('/auth/google', passport.authenticate('google', {
//   scope: ['profile', 'email']
// }));

// app.get('/auth/google/callback', passport.authenticate('google', {
//   failureRedirect: '/login'
// }), (req, res) => {
//   res.redirect('/');
// });

// app.get('/logout', (req, res) => {
//   req.logout();
//   res.redirect('/');
// });

// app.get('/', (req, res) => {
//   res.send(req.isAuthenticated() ? `Hello ${req.user.username}` : 'Not authenticated');
// });

// Middleware to set local variables

app.use('/listings', listingRouter)
app.use('/listings/:id/reviews', reviewRouter)
app.use('/', userRouter)
// Use the payment route
// app.use('/payment', paymentRoute);

app.all('*', (req, res, next) => {
  next(new ExpressError(404, 'Page not found!'))
})

app.use((err, req, res, next) => {
  let { statusCode = 500, message = 'Something went wrong!' } = err
  res.status(statusCode).render('error.ejs', { message })
})

app.listen(8080, () => {
  console.log(`Server is listening to port 8080`)
})
