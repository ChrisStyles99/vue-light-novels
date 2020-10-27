const authMiddleware = (req, res, next) => {
  if(req.isAuthenticated()) {
    next();
  } else {
    res.json({authError: true, msg: 'You are not logged in'});
  }
};

module.exports = authMiddleware;