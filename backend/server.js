let Course = require('./models/Course');
let mongoose = require('mongoose');
let Profile = require('./models/Profile');
let express = require('express');
const cors = require('cors')
const passport = require('passport')
const { Strategy: FacebookStrategy } = require('passport-facebook')
const facebookConfig = require('./config.js')
let app        = express();
let bodyParser = require('body-parser');

mongoose.connect('mongodb://admin:admin@ds157380.mlab.com:57380/cider');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = process.env.PORT || 8080;
let router = express.Router();

router.use( (req, res, next) => {
    // Intermediary step before proceeding to next routes.
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

passport.use(new FacebookStrategy({
    clientID: facebookConfig.clientID,
    clientSecret: facebookConfig.clientSecret,
    callbackURL: `http://localhost:${port}/auth/facebook/callback`,
    profileFields: ['id', 'displayName', 'email', 'picture.type(large)', 'about', 'interested_in', 'friends']
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log("Authenticated", profile.displayName)
    // Create profile it if doesn't exist
    Profile.findOneAndUpdate({facebookId: profile.id}, { 
        name: profile.displayName,
        email: profile.emails[0].value,
        pictureURL: profile.photos[0].value,
        about: profile._json.about,
        friends: profile._json.friends.data,
        interestedIn: profile._json.interested_in
     }, (err, existingProfile) => {
        if(existingProfile){
            console.log("Found an existing profile")
            return cb(err, existingProfile);
        } else {
            const dbProfile = new Profile()
            dbProfile.facebookId = profile.id
            dbProfile.name = profile.displayName
            dbProfile.email = profile.email
            dbProfile.about = profile._json.about
            dbProfile.interestedIn = profile._json.interested_in
            dbProfile.pictureURL = profile.photos[0].value
            dbProfile.classes = []
            dbProfile.save(cb)
        }
    })
  }
));

passport.serializeUser(function(profile, cb) {
  cb(null, profile.id);
});

passport.deserializeUser(function(id, cb) {
    Profile.findOne({facebookId: id}, (err, profile) => {
        cb(err, profile)
    })
});

// Default testing route
router.get('/', (req, res) => {
    res.json({ message: 'API is running' });
});


router.route('/enrollment/:course_id').get( (req, res) => {
    let students = [];
    Profile.find( (err, profiles) => {

        profiles.forEach( (profile) => {
            if (profile.classes.some( (element, index, array) => { return element == req.params.course_id })) {
                //students.push(profile._id); // Only return the profile id's
                students.push(profile); // Return the full profiles
            }
        });

        res.json(students);
    });
});

router.route('/courses')
    .get( (req, res) => {
        Course.find( (err, courses) => {
            if(err)
                res.send(err);

            res.json(courses);
        });
    })

    .post( (req, res) => {
        let course = new Course();

        course.name = req.body.name;
        course.code = req.body.code;

        course.save( (err, course) => {
            if(err)
                res.send(err);

            // res.json({ message: 'Made a new course!'});
            res.json(course);
        });
    });

router.route('/courses/:course_id')
    .get( (req, res) => {
        Course.findById(req.params.course_id, (err, course) => {
            if (err)
                res.send(err);

            // let students = [];
            //
            // Profile.find( (err, profiles) => {
            //     profiles.forEach( (profile) => {
            //         if (profile.classes.some( (element, index, array) => { return element == req.params.course_id })) {
            //             students.push(profile._id);
            //         }
            //     });
            //
            //     res.json({
            //         course: course,
            //         students: students
            //     });
            // });

            res.json(course);
        });
    })

    .put( (req, res) => {
        Course.findById(req.params.course_id, (err, course) => {
            if (err)
                res.send(err);

            console.log(course);

            if(req.body.name) course.name = req.body.name;
            if(req.body.code) course.code = req.body.code;

            course.save( (err, course) => {
                if(err)
                    res.send(err);

                // res.json({ message: 'Course info updated!'});
                res.json(course)
            });
        });
    })

    .delete( (req, res) => {
        Course.remove({
            _id: req.params.course_id
        }, (err, course) => {
            if(err)
                res.send(err);
            res.json({ message: 'Deleted the course!'});
        })
    });

router.route('/profiles')
    .get( (req, res) => {
        Profile.find( (err, profiles) => {
            if(err)
                res.send(err);

            res.json(profiles);
        });
    })

    .post( (req, res) => {
        let profile = new Profile();

        profile.name = req.body.name;
        profile.email = req.body.email;
        profile.classes = req.body.classes;

        profile.save( (err, profile) => {
            if(err)
                res.send(err);

            // res.json({ message: 'Made a new profile!'});
            res.json(profile);
        });
    });

router.route('/profiles/:profile_id')
    .get( (req, res) => {
        Profile.findById(req.params.profile_id, (err, profile) => {
            if (err)
                res.send(err);

            res.json(profile);
        });
    })

    .put( (req, res) => {
        Profile.findById(req.params.profile_id, (err, profile) => {
            if (err)
                res.send(err);

            // Allows optional updating
            if(req.body.name) profile.name = req.body.name;
            if(req.body.email) profile.email = req.body.email;
            if(req.body.classes) profile.classes = req.body.classes;

            profile.save( (err, profile) => {
                if(err)
                    res.send(err);

                // res.json({
                //     message: 'Profile info updated!',
                //     data: profile
                // });

                res.json(profile);
            });
        });
    })

    .delete( (req, res) => {
        Profile.remove({
            _id: req.params.profile_id
        }, (err, profile) => {
            if(err)
                res.send(err);
            res.json({ message: 'Deleted the profile!'});
        })
    });

app.use(cors())
app.use('/api', router);
app.use(passport.initialize());
app.use(passport.session());
app.get('/auth/facebook',
  passport.authenticate('facebook', { authType: 'rerequest', scope: ['email', 'user_friends', 'user_about_me', 'user_relationship_details'] }));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login', scope: ['email', 'user_friends', 'user_about_me', 'user_relationship_details'] }), (req, res) =>  { res.redirect('http://localhost:3000/profile?token=' + req.user._id);});

app.listen(port);
console.log('API running on port ' + port);
