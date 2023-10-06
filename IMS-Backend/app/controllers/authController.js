const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Login = require("../Models/loginModel");
const SchoolOwner = require("../Models/SchoolOwnerModel");
const Permission = require("../Models/permissionModel");
const UserData = require("../Models/userDataModel");

//*-------------------------------------------------------------------------------------//
//@Login User Controller
//*-------------------------------------------------------------------------------------//
const loginUser = async (req, res) => {
  const {  email: userEmail, password } = req.body;
  // Convert email to lowercase
  const email = userEmail.toLowerCase();
  

  // Check if the user exists
  const login = await Login.findOne({ email });
  if (!login) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Compare the provided password with the stored hash
  const passwordMatch = await bcrypt.compare(password, login.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Get User Data from UserData
  const userData = await UserData.findOne({ login:login._id });


  //get Permission by Role Id
  const permissions = await Permission.find(
    { role: userData.role },
    { isView: 1, isAdd: 1, isEdit: 1, isDelete: 1, _id: 0 }
  ).populate({
    path: "moduleType",
    select: "name prefix -_id",
  });


  const tokenData = {
    userId: userData.user,
    roleId: userData.role,
    userType: userData.userType,
  };

  // Generate a JWT token
  const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ token, permissions });
};

//*-------------------------------------------------------------------------------------//
//@ SignUp School Owner Controller
//*-------------------------------------------------------------------------------------//
const signupSchoolOwner = async (req, res, next) => {
  const {  email: userEmail, password } = req.body;
  // Convert email to lowercase
  const email = userEmail.toLowerCase();
  
  // Check if the user already exists
  const existingUser = await Login.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "Email already registered" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create login
  const login = await Login.create({
    password: hashedPassword,
    email,
  });

  // Create Owner
  const owner = await SchoolOwner.create({
    email: login.email,
  });

  // Create UserData
  const userData = await UserData.create({
    login: login._id,
    role: "649f1ac62c2e94b9a2903654",
    user: owner._id,
    userType: "owner",
  });

  // Generate JWT token
  const token = jwt.sign({ userId: userData.user }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.status(201).json({ token });
};

// const signupSchoolOwner = async (req, res, next) => {
//   const { email, password } = req.body;

//   // Check if the user already exists
//   const existingUser = await Login.findOne({ email });
//   console.log(existingUser);
//   if (existingUser) {
//     return res.status(409).json({ message: "Already Register" });
//   }

//   // Hash the password
//   const hashedPassword = await bcrypt.hash(password, 10);

//   // SingUp SuperAdmin and Also Create Admin with condition isSuperAdmin = True
//   Login.create({
//     password: hashedPassword,
//     email,
//   })
//     .then(async (login) => {

//       //then Create Owner
//       const owner = await SchoolOwner.create({
//         email: login.email,
//       });
//       return await UserData.create({
//         login: login._id,
//         role: "649f1ac62c2e94b9a2903654",
//         user: owner._id,
//         userType: "owner",
//       });

//     })
//     .then((userData) => {
//       const token = jwt.sign(
//         { userId: userData.user },
//         process.env.JWT_SECRET,
//         {
//           expiresIn: "1h",
//         }
//       );
//       res.status(201).json({ token });
//     })
//     .catch(next);
// };

module.exports = {
  loginUser,
  signupSchoolOwner,
};
