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
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "please authenticate useing a valid token" });
  }
};

module.exports = fetchuser;
