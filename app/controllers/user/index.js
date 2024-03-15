const User = require('../../models/user');
const uuidv4 = require('uuid').v4;
const {hashPassword} = require("../../utils/bcrypt");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getUserById = async (req, res) => {
    const { uuid } = req.params;
    try {
        const user = await User.findByPk(uuid);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const createUser = async (req, res) => {
    const { email, password, firstName, lastName, pseudo } = req.body;
    try {
        const user = await User.create({ email, password: hashPassword(password), firstName, lastName, pseudo, token: uuidv4() });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    const { uuid } = req.params;
    const { email, password, firstName, lastName, pseudo } = req.body;
    try {
        const user = await User.findByPk(uuid);
        if (user) {
            await user.update({ email, password: hashPassword(password), firstName, lastName, pseudo });
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    const { uuid } = req.params;
    try {
        const user = await User.findByPk(uuid);
        if (user) {
            await user.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
