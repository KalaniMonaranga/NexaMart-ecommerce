const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next(); // They are admin, let them through!
  } else {
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};