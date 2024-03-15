const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const TodoItem = require('../todoItem');

const TodoList = sequelize.define('TodoList', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, { timestamps: true });

// TodoList.hasMany(TodoItem, { as: 'items', foreignKey: 'list_id' });

module.exports = TodoList;
