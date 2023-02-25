const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            unique: true,
        },
        role: {
            type: String,
            enum: ['admin', 'boss', 'regular'],
            required: [true, 'Role is required'],
        },
        subordinates: {
            type: Array,
        }
    },
    {
        versionKey: false,
        timestamps: false,
    }
);

const User = model('user', userSchema);

module.exports = { User };