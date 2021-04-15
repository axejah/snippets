const jwt = require("jsonwebtoken");

async function auth(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const validatedUser = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = validatedUser.id;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = auth;
