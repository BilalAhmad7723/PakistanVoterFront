let express = require('express');
let router = express.Router();

let userSchema = require('./user_schema');

router.route('/get-account').get((req, res, next) => {
  userSchema.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.set('Access-Control-Allow-Origin', '*');
        res.json(data)
      }
    })
})

router.route('/get-auth').post((req, res, next) => {
  const {email,password} = req.body;
  userSchema.findOne({'email': email},(error, data) => {
      if (error) {
        return next(error)
      } else {
        if(email === data.email && password === data.password)
        {
          res.set('Access-Control-Allow-Origin', '*');
         res.json({
          message: "Login Successfuly!",
          status: 200,
          data:data
         }) 
        }
        else {
          res.set('Access-Control-Allow-Origin', '*');
          res.json({
            message: "Wrong email & password!",
            status: 205,
            data:data
          })
        }
      }
    })
    
})



router.route('/add-account').post((req, res, next) => { //Add Member
  // const { email, password } = req.body;
  // const oldUser = await userSchema.findOne({ email });

  // if (oldUser) {
  //   return res.status(409).send("User Already Exist. Please Login");
  // }
  userSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.set('Access-Control-Allow-Origin', '*');
      res.status(200).json({
        message: "Cheers!! You Are Register Member!",
        status: 200,
        data:data
      });
    }
  })
});


router.route('/edit-account/:id').get((req, res, next) => {
  userSchema.findById(req.params.id, (error, data) => {
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

router.route('/update-account/:id').put((req, res, next) => {
  userSchema.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      res.status(404).json({
        message: "Sorry your todo list cannot be added",
        error: err.message,
      });
      return next(error);
    } else {
      res.set('Access-Control-Allow-Origin', '*');
      res.status(200).json({
        message: "Cheers!! You have successfully Update Account",
        data,
      });
    }
  })
})

router.route('/delete-account/:id').delete((req, res, next) => {
  userSchema.findByIdAndRemove(req.params.id, (error, data) => {
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