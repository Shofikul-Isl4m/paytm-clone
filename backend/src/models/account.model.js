import mongoose, { Schema } from "mongoose";


const accountSchema = new Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to User model
      ref: "User",
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
  },
{
    timestamps : true
}
);

   export const Account = mongoose.model("Account", accountSchema);