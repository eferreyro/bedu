const authentication = {};

authentication.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'No autorizado, intente acceder nuevamente por favor');
  res.redirect('/users/signin');
};

module.exports = authentication;
