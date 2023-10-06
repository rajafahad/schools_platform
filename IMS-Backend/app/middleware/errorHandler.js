const mongoose = require("mongoose");

module.exports = errorhandler = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    const errors = {};
    
    // Handle Yup validation errors
    if (err.inner) {
      err.inner.forEach((validationError) => {
        const { path, message } = validationError;
        errors[path] = message;
      });
    }

    // Handle Mongoose validation errors
    if (err.errors) {
      for (let field in err.errors) {
        const error = err.errors[field];
        if (error instanceof mongoose.CastError) {
          const path = error.path;
          const kind = error.kind;
          errors[field] = `${path} must be ${kind}`;
        } else {
          errors[field] = error.message;
        }
      }
    }

    return res.status(422).json({ errors });
  }

  // Handle other generic errors
  res.status(err.status || 500);
  res.json(err.message);
};

// module.exports = errorhandler = (error, req, res, next) => {
//   res.status(error.status || 500)
//   res.json(error.message)

//   // res.json({
//   //   status: error.status,
//   //   message: error.message,
//   //   // stack: error.stack,
//   // })
// }
