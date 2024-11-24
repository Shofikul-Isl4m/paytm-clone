import { asyncHandler } from "../utils/asyncHandler.js";

const express = require("express");
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Account } from "../models/account.model.js";
const mongoose = require("mongoose");



const balance =  asyncHandler( async (req, res) => {
  const account = await Account.findOne({
    userId: req.user?._id,
  });

  return res
  .status(200)
  .json(new ApiResponse(
      200,
      account.balance,
      "User fetched successfully"
  ))
});

const transfer =  asyncHandler( async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const { amount, to } = req.body;

  // Don't allow transfer to oneself
  if (to === req.user?._id) {
    await session.abortTransaction();
    throw new ApiError(401, "Cannot transfer to yourself")
   
  }

  // Fetch the accounts within transaction
  const account = await Account.findOne({
    userId: req.user?._id,
  }).session(session);

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    throw new ApiError(401, "Insufficient balance");
    
  }

  // Fetch the accounts within transaction
  const toAccount = await Account.findOne({
    userId: to,
  }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    throw new ApiError(400, "Invalid account");
  }

  // Perform the transfer within transaction
  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);
  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);

  // Commit Transaction
  await session.commitTransaction();

  res.json({
    message: "Transfer successful",
  });
});




export  {
    balance,
    transfer,


}




 


