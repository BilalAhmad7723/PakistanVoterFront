let express = require('express');
let router = express.Router();

let canidateSchema = require('./candidate_schema');

router.route('/get_candidates').get((req, res, next) => {
    canidateSchema.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.set('Access-Control-Allow-Origin', '*');
        res.json(data);
      }
    })
})


router.route('/add-candidates').post((req, res, next) => {
  canidateSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.set('Access-Control-Allow-Origin', '*');
      res.status(200).json({
        message: "Candidate Add for Suggestion Wait for Admin Approvel!!",
      });
    }
  })
});


router.route('/edit-candidates/:id').get((req, res, next) => {
    canidateSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.set('Access-Control-Allow-Origin', '*');
      res.status(200).json({
        message: "Cheers!! here is id",
        data,
      });
    }
  })
})

router.route('/search-active').get((req, res, next) => {
    canidateSchema.find({ status: true } , (error, data) => {
  if (error) {
    return next(error)
  } else {
    res.set('Access-Control-Allow-Origin', '*');
    res.json(data)
  }
})
})
router.route('/update-candidates/:id').put((req, res, next) => {
    canidateSchema.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      res.status(404).json({
        message: "Sorry your Canidate does not updated yet!",
        error: err.message,
      });
      return next(error);
    } else {
      res.set('Access-Control-Allow-Origin', '*');
      res.status(200).json({
        message: "Cheers!! You have successfully Update Candidate",
        data,
      });
    }
  })
})

router.route('/delete-candidates/:id').delete((req, res, next) => {
    canidateSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.set('Access-Control-Allow-Origin', '*');
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = router;