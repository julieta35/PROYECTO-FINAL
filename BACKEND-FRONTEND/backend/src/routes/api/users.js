const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer")
const keys = require("../../config/keys");
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const User = require("../../models/User");

const async = require("async")

router.get("/all", (req, res) => {
  User.find()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(e => console.log(e))
})

router.get("/one/:_id", (req, res) => {
  User.findOne({ _id: req.query._id })
  .then(users => {
    res.status(200).json(users)
  })
  .catch(e => console.log(e))
})

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });
    // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    User.findOne({ email }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }
    // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.name,
            role: user.role
          };
        // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
});


router.post('/verifyRol/:_id', (req, res) => {
  async.waterfall([
    (done) => {
        User.findOne({ _id: req.params._id })
        .then(user => done(null, user))
        .catch(e => console.log(e.message))
    },
    (user, done) => {
      var smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'heiderzapa78@gmail.com',
          pass: 'shinobu2018'
        }
      });
      var mailOptions = {
          to: 'julietadimalik@gmail.com',
          from: user.email,
          subject: 'Cambiar Rol Usuario',
          text: `este usuario desea cambiar su rol para hacerlo posible darle click al enlace de abajo 
          http://localhost:5000/changeRole/${user._id}`
      };
      smtpTransport.sendMail(mailOptions, function(err) {
          done(err);
      });
    }
  ], (err) => {
    if(err) throw err;
    res.status(200).json({ message: 'Un adminsitrador verificará la información' })
  })

})

router.get("/changeRole/:_id", (req, res) => {
  User.findOneAndUpdate({ _id: req.query._id }, { $set: { "role" : "vendedor"} }, { new: true })
  .then(users => {
    res.status(200).redirect('/')
  })
  .catch(e => console.log(e))
})

module.exports = router;