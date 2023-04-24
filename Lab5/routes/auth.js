const GoogleStrategy = require('passport-google-oidc');

/* GET google login */
Router.get('/login/federated/google', passport.authenticate('google'));