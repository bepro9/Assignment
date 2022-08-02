const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const Authorization = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : null;

    if (Authorization) {
      const verificationResponse = await jwt.verify(Authorization, "MYKEY");
      req.user = verificationResponse;
      next();
    } else {
      return res
        .status(404)
        .json({ message: "You are not authorized to access" });
    }
  } catch (Error) {
    res.status(401).json({ status: 401, error: "Invalid Token" });
  }
};

module.exports = verifyToken;
