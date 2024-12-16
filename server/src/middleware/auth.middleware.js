import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt; //jwt is the name of the cookie that save jwt token

    if (!token) {
      return res
        .status(401)
        .json({ messasge: "Unauthorized - No token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ messasge: "Unauthorized - Token Invalid" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ messasge: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware", error.messasge);
    res.status(500).json({ messasge: "Internal Server Error" });
  }
};
