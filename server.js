const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const mongodb = require('./data/database');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.json());
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']}))
app.use(cors({origin:'*'}))
app.use('/', require('./routes'));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    //User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(null, profile);
    //});
  }
));

passport.serializeUser((user, done)=>{
    done(null, user)
});
passport.deserializeUser((user, done)=>{
    done(null, user)
});

app.get('/', (req, res)=>{res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : 'Logged out')})

app.get('/github/callback', passport.authenticate('github',{
    failureRedirect: '/api-docs', session:false}),
    (req,res)=>{
        req.session.user = req.user;
        res.redirect('/');
    }
)

mongodb.initDb((err=>{
    if(err){
        console.log(err);
    }else{
        app.listen(port, ()=>{
            console.log(`Running on port ${port}`);
        });
    };
}));