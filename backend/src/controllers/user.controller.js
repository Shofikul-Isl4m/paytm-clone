import { asyncHandler } from "../utils/asynHandler.js";

const registerUser = asyncHandler( async (req, res) => {
    const { success } = signupBody.safeParse(req.body);
    if (!success) {
      return res.status(411).json({
        message: "Incorrect inputs",
      });
    }
  
    const existingUser = await User.findOne({
      username: req.body.username,
    });
  
    if (existingUser) {
      return res.status(411).json({
        message: "Email already taken",
      });
    }
  
    const { username, firstName, lastName, password } = req.body;
  
  
    const newUser = await User.create({
      username,
      firstName,
      lastName,
      password: hashedPassword,
    });
    const userId = newUser._id;
  
    // ----- Create new account ------
  
    await Account.create({
      userId,
      balance: parseInt(Math.random() * 10000),
    });
  
    // -----  -----
  
    const token = jwt.sign(
      {
        userId,
      },
      process.env.JWT_SECRET
    );
  
    res.status(200).json({
      message: "User created successfully",
      token: token,
    });
    
    
})




export {registerUser}