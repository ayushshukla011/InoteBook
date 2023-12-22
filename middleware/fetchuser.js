const jwt = require("jsonwebtoken");
const Jwt_secret = "ayushddhdia";

const fetchuser = (req,res,next) => {
  //Get the user from the jst token and add id to req object
  const token = req.header("auth-token");

  if (!token) {
    res.status(401).send({ error: "please authenticate using a valid token" });
  }

  try {
    const data = jwt.verify(token, Jwt_secret);
    // console.log(data);data ko hi ham pass kar rahe the jwt me isliye data hi wapis milega uske andar user name ka ek object hai.
    req.user = data.user;
    // console.log(data.user);
    next();
  } catch (error) {
    res.status(401).send({ error: "please authenticate useing a valid token" });
  }
};

module.exports = fetchuser;
