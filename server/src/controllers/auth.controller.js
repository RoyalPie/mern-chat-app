import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcript from "bcryptjs";
import validator from "validator"
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ messasge: "Fill all the field" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ messasge: "Password must be at least 6 characters!" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ messasge: "Invalid email format" });
    }
    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ messasge: "Email already exists" });
    
    //hash password
    const salt = await bcript.genSalt(10);
    const hashedPassword = await bcript.hash(password, salt);

    const newUser = new User({
      fullName: fullName,
      email: email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ messasge: "Invalid User data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.messasge);
    res.status(500).json({ messasge: "Internal Server Error" });
  }
};
export const login = (req, res) => {
  res.send("login route");
};
export const logout = (req, res) => {
  res.send("logout route");
};
