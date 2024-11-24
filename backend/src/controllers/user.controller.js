import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User} from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { Account } from "../models/account.model.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";








const generateAccessAndRefereshTokens = async(userId) =>{
  try {
      const user = await User.findById(userId)
      const accessToken = user.generateAccessToken()
      const refreshToken = user.generateRefreshToken()

      user.refreshToken = refreshToken
      await user.save({ validateBeforeSave: false })

      return {accessToken, refreshToken}


  } catch (error) {
      throw new ApiError(500, "Something went wrong while generating referesh and access token")
  }
}

const registerUser = asyncHandler( async (req, res) => {
   
  
    const existingUser = await User.findOne({
      username: req.body.username,
    });
  
    if (existingUser) {
      return res.status(411).json({
        message: "Email already taken",
      });
    }
  
    const { username, fullName, password } = req.body;


    if (
      [fullName,  username, password].some((field) => field?.trim() === "")
  ) {
      throw new ApiError(400, "All fields are required")
  }

  const existedUser = await User.findOne({
      $or: [{ username }]
  })

  if (existedUser) {
      throw new ApiError(409, "User with email or username already exists")
  }
  
  
    const user = await User.create({
      username,
      fullName,
      password
    });



    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
  )

  if (!createdUser) {
      throw new ApiError(500, "Something went wrong while registering the user")
  }
    const userId = user._id;
  
    // ----- Create new account ------
  
    await Account.create({
      userId,
      balance: parseInt(Math.random() * 10000),
    });
  
    // -----  -----
  
  
    return res.status(201).json(
      new ApiResponse(200, createdUser, "User registered Successfully")
  )

    
    
})



const loginUser = asyncHandler(async (req, res) =>{
  const {email, username, password} = req.body
  console.log(email);

  if (!username && !email) {
      throw new ApiError(400, "username or email is required")
  }

  const user = await User.findOne({
    $or: [{username}, {email}]
})

if (!user) {
    throw new ApiError(404, "User does not exist")
}

const isPasswordValid = await user.isPasswordCorrect(password)

   if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }




    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )
}
);


const getCurrentUser = asyncHandler(async(req, res) => {
  return res
  .status(200)
  .json(new ApiResponse(
      200,
      req.user,
      "User fetched successfully"
  ))
})







export {
  registerUser,
  loginUser,
  getCurrentUser

}