import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  fullname: {
    type: String,
    required: [true, "Fullname is required"],
    minLength: [6, "Fullname must be at least 6 characters long"],
    maxLength: [16, "Fullname must be at most 16 characters long"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+\@.+\..+/, "Email must be a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
  },
});

const User = models.User || model("User", userSchema);

export default User;
