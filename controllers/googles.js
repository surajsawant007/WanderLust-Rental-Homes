// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const User = require('../models/user.js');

// const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
// const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
// const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: GOOGLE_CLIENT_ID,
//       clientSecret: GOOGLE_CLIENT_SECRET,
//       callbackURL: GOOGLE_CALLBACK_URL,
//     },
//     async (accessToken, refreshToken, profile, cb) => {
//       try {
//         let existingUser = await User.findOne({ providerId: profile.id });
//         if (existingUser) {
//           return cb(null, existingUser);
//         } else {
//           const newUser = new User({
//             providerId: profile.id,
//             provider: 'google',
//             email: profile._json.email || `google${Math.floor(Math.random() * 501) + 500}@example.com`,
//             username: profile._json.given_name.toLowerCase() + Math.floor(Math.random() * 501 + 500),
//           });
//           let googleUser = await newUser.save();
//           return cb(null, googleUser);
//         }
//       } catch (err) {
//         return cb(err, null);
//       }
//     }
//   )
// );

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id, (err, user) => {
//     done(err, user);
//   });
// });

// module.exports = passport;
