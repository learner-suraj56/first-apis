import User from "../models/users.js";

export const getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
}

export const createUser = async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
}

export const getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
}

export const updateUser = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    res.json(user);
}

export const deleteUser = async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(204).json(user);
}
