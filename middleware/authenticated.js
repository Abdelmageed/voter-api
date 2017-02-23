const authenticated = (req, res, next)=> {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401);
//  consle.log('called status');
  res.end();
//  console.log('called end');

}

export default authenticated;