import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import createError from "../utils/createError.js";

// verify using access token and and JWT
export const deleteUser = async (req, res, next) => {
  // find the user
  const user = await User.findById(req.params.id);
  // check first is the owner  ?
  // check user is logged in ?

  // if user has token check

  if (req.userId !== user._id.toString()) {
    return next(createError(403, "You can delete only your account"));
  }
  await User.findByIdAndDelete(req.params.id);
  res.status(200).send("Deleted");
};

export const getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).send(user);
};
