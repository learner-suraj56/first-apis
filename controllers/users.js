import User from "../models/users.js";
import Joi from "joi";

const createUserSchema = Joi.object({
    firstname: Joi.string().min(2).max(30).required(),
    lastname: Joi.string().min(2).max(30).required(),
    age: Joi.number().integer().min(1).max(120).required(),
  });
  
  const updateUserSchema = Joi.object({
    firstname: Joi.string().min(2).max(30),
    lastname: Joi.string().min(2).max(30),
    age: Joi.number().integer().min(1).max(120),
  }).min(1);

export const getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
}

export const createUser = async (req, res) => {
    const { error} = createUserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
}

export const getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
}

export const updateUser = async (req, res) => {
    const { error} = updateUserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    res.json(user);
}

export const deleteUser = async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(204).json(user);
}
