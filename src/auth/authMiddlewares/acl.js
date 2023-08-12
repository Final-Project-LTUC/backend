module.exports = (allowedRole)=> {
    return (req, res, next) => {
      try {
        if (req.user.role === allowedRole) {
          next();
        }
        else {
          next('Access Denied');
        }
      } catch (e) {
        next(e);
      }
  
    }
  
  }
