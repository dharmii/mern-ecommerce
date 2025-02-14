import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from 'validator';

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Route for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } =await req.body;
    console.log(email,password);
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User doesnot exist" });
    }
    const isMatch =await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id);
      return res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Route for user Registration

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // console.log(name,email,password);

    //  checking user already exists or not
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    //validating email format & strong password
    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter a strong password" });
    }

    // hashing user password
    // const salt = bcrypt.genSalt(10);
    const salt=10;
    const hashedPassword =await bcrypt.hash(password, salt);

    const newUser = userModel({
      name,
      email,
      password: hashedPassword,
    });
    const user =await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Route for admin login

const adminLogin = async (req, res) => {
  try {
    const {email, password} = req.body;
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
      const token=jwt.sign(email+password,process.env.JWT_SECRET)
      res.json({ success: true,token})
    }
  } catch (error) {
    // console.log(error);
    res.json({ success: false, message: "Invalid Credentials"});
  }
};

export { loginUser, registerUser, adminLogin };
