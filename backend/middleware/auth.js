import jwt from "jsonwebtoken";
const authUser = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, message: "Not authorized Login Again" });
  }
  try {
    // console.log(token);
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("dharmikaaaaaaaaaaaa")
    console.log(token_decode.id);
    req.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;
