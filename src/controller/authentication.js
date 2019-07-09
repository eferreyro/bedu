const authentication = {};

authentication.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'No está registrado');
  res.redirect('/users/signin');
};

module.exports = authentication;
