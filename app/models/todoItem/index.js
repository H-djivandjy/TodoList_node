const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const TodoList = require('../todoList');

const TodoItem = sequelize.define('TodoItem', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    task: {
        type: DataTypes.STRING,
        allowNull: false
    },
    completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
    },
    todoListId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: TodoList,
          key: 'id'
        }
    }
}, { timestamps: true });


// function associate(models) {
//     TodoItem.belongsTo(models.TodoList, { foreignKey: 'todoListId' });
// }

// TodoList.associate = associate;

module.exports = TodoItem;
