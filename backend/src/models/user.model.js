import mongoose, { Schema } from "mongoose";
import jwt from  "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchema = new Schema({
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minLength: 3,
      maxLength: 30,
    },
    password: {
      type: String,
      required: [true, 'password is required'],
      minLength: 6,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 50,
    },
    
    refreshToken: {
      type: String
  }
   
  }
,{
    timestamps: true 
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
 
  this.password = await bcrypt.hash(this.password, 10)
  next()
  
})

userSchema.methods.isPasswordCorrect = async function (password){
return await bcrypt.compare(password,this.password);
}
userSchema.methods.generateAccessToken = function(){
  return jwt.sign(
      {
          _id: this._id,
          username: this.username,
          fullName: this.fullName
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      }
  )
}
userSchema.methods.generateRefreshToken = function(){
  return jwt.sign(
      {
          _id: this._id,
          
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY
      }
  )
}

   export const User = mongoose.model("User", userSchema);