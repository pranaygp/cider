let Course = require('./models/Course');
let mongoose = require('mongoose');
let Profile = require('./models/Profile');
let express = require('express');
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

// Default testing route
router.get('/', (req, res) => {
    res.json({ message: 'wrong place bud' });
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

        course.save( (err) => {
            if(err)
                res.send(err);

            res.json({ message: 'Made a new course!'});
        });
    });

router.route('/courses/:course_id')
    .get( (req, res) => {
        Course.findById(req.params.course_id, (err, course) => {
            if (err)
                res.send(err);

            res.json(course);
        });
    })

    .put( (req, res) => {
        Course.findById(req.params.course_id, (err, course) => {
            if (err)
                res.send(err);

            course.name = req.body.name;
            course.code = req.body.code;

            course.save( (err) => {
                if(err)
                    res.send(err);

                res.json({ message: 'Course info updated!'});
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

app.use('/api', router);
app.listen(port);
console.log('API running on port ' + port);
