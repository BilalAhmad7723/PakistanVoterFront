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

// router.route('/get-auth').post((req, res, next) => {
//   const {cnic,password} = req.body;
//   console.log("Cnic"+ cnic + "PAss" + password);
//   userSchema.findOne({'cnic': cnic},(error, data) => {
//       if (error) {
//         return next(error)
//       } else {
//         console.log("Table Date"+ data);
//         if(cnic === data.cnic && password === data.password)
//         {
//           res.set('Access-Control-Allow-Origin', '*');
//          res.json({
//           message: "Login Successfuly!",
//           status: 200,
//           data:data
//          }) 
//         }
//         else {
//           res.set('Access-Control-Allow-Origin', '*');
//           res.json({
//             message: "Wrong CNIC & password!",
//             status: 205,
//             data:data
//           })
//         }
//       }
//     })
    
// })

router.route('/get-auth').post(async (req, res, next) => {
  try {
    const { cnic, password } = req.body;
    const wrong = { message: 'Wrong CNIC & password!', status: 205, data: null };

    if (typeof cnic !== 'string' || typeof password !== 'string') {
      return res.json(wrong);
    }
    const user = await userSchema.findOne({ cnic }).lean();
    if (!user || user.password !== password) {
      return res.json(wrong);
    }
    delete user.password;
    return res.json({ message: 'Login Successfuly!', status: 200, data: user });
  } catch (err) {
    next(err);
  }
});



// router.route('/add-account').post((req, res, next) => { //Add Member
//   // const { email, password } = req.body;
//   // const oldUser = await userSchema.findOne({ email });

//   // if (oldUser) {
//   //   return res.status(409).send("User Already Exist. Please Login");
//   // }
//   userSchema.create(req.body, (error, data) => {
//     if (error) {
//       return next(error)
//     } else {
//       res.set('Access-Control-Allow-Origin', '*');
//       res.status(200).json({
//         message: "Cheers!! You Are Register Member!",
//         status: 200,
//         data:data
//       });
//     }
//   })
// });

router.route('/add-account').post(async (req, res, next) => {
  try {
    const { name, father, email, cnic, password, gender, religion, constituency,
            city, fullAddress, phone, occupation, feeCollection, RefMemberID,
            dateOFJoin } = req.body;

    if ([cnic, email, password].some(v => typeof v !== 'string' || !v)) {
      return res.json({ message: 'CNIC, email and password are required', status: 400 });
    }
    const exists = await userSchema.findOne({ $or: [{ cnic }, { email }] }).lean();
    if (exists) {
      return res.json({ message: 'This CNIC or email is already registered', status: 409 });
    }
    await userSchema.create({ name, father, email, cnic, password, gender, religion,
      constituency, city, fullAddress, phone, occupation, feeCollection, RefMemberID,
      dateOFJoin });
    return res.json({ message: 'Cheers!! You Are Register Member!', status: 200 });
  } catch (err) {
    next(err);
  }
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

router.route('/change-password').post(async (req, res, next) => {
  try {
    const { cnic, oldPassword, newPassword } = req.body;
    const fail = (message, status) => res.json({ message, status, data: null });

    if ([cnic, oldPassword, newPassword].some(v => typeof v !== 'string' || !v)) {
      return fail('CNIC, current password and new password are required', 400);
    }
    if (newPassword.length < 6 || newPassword.length > 64) {
      return fail('New password must be between 6 and 64 characters', 400);
    }

    const user = await userSchema.findOne({ cnic }).lean();
    if (!user || user.password !== oldPassword) {
      return fail('Current password is incorrect', 205);
    }
    if (newPassword === oldPassword) {
      return fail('New password must be different from the current one', 400);
    }

    await userSchema.updateOne({ _id: user._id }, { $set: { password: newPassword } });
    return res.json({ message: 'Password changed successfully!', status: 200, data: null });
  } catch (err) {
    next(err);
  }
});

module.exports = router;