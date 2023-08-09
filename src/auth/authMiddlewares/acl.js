// module.exports = (allowedRole)=> {

//     return (req, res, next) => {
//     console.log('allowed role :::::::::::::::::::::::::',allowedRole)
//       try {
//         if (req.user.role === allowedRole) {
//           next();
//         }
//         else {
//           next('Access Denied');
//         }
//       } catch (e) {
//         next('Invalid Login');
//       }
  
//     }
  
//   }
