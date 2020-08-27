const jwt = require("jsonwebtoken");

const authRequired = (req, res, next) => {
  // GET TOKEN FROM REQUEST HEADER
  const token = req.headers['authorization'];
  console.log(req.headers)
  console.log('Verify Token ---> ', token);

  // VERIFY TOKEN
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
    if (err || !decodedUser) {
      return res.status(401).json({
        message: 'You are not authorized. Please login and try again'
      });
    }

    // ADD PAYLOAD TO REQ OBJECT
    req.currentUser = decodedUser;

    next();
  });
}

module.exports = authRequired;

// const authRequired = (req, res, next) => {
//   const token = req.headers['authorization'];
//   console.log(`re.headers in verify: `, req.headers)
//   console.log('Verify Token ---> ', token);

//   // verify auth
//   jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
//     if (err || !decodedUser) {
//       return res.status(401).json({
//         message: 'You are not authorized. Please login and try again'
//       });
//     }

//     // add payload to req object
//     req.currentUser = decodedUser;
//     const payload = {id: foundUser._id};
//     const secret = process.env.JWT_SECRET;
//     const expiration = {expiresIn: "1h"};
//     // const token = await jwt.sign(payload, secret, expiration);
//     // success
//     res.status(200).json({user: decodedUser});

//     next();
//   });
// }

// app.use(authRequired);
