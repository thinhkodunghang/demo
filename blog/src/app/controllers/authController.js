import bcrypt from "bcrypt";
//bcrypt là thuật toán mã hóa bảo mật password
import jwt from "jsonwebtoken";
// import library jsonwebtoken để tạo và check token jwt
import User from "../../models/Users.js";

export const register = async (req, res) => {
  //get information user for body
  const { name, age, password, email, gender, phoneNumber } = req.body;
  // mã hóa password before save in database
  const hashedPassword = await bcrypt.hash(password, 10);
  //10 là số vòng băm salt rounds
  // create object user new with information mã hóa
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    age,
    gender,
    phoneNumber, // Bao gồm phoneNumber
  });

  try {
    await newUser.save();

    res.redirect("/auth/login");
  } catch (error) {
    console.log("Error during registration:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  // check email có trong database không
  const user = await User.findOne({ email: email });
  // check user và pass khớp không
  if (user && (await bcrypt.compare(password, user.password))) {
    //create token JWT with information user
    const token = jwt.sign(
      { email: user.email, name: user.name },
      "secret_key"
    );
    // save token in cookie with httpOnly option
    res.cookie("token", token, { httpOnly: true });
    // redirect về page home
    res.redirect("/");
  } else {
    res.redirect("/auth/login");
  }
};

export const logout = (req, res) => {
  // clear cookie
  res.clearCookie("token");
  res.redirect('/auth/login');
};
