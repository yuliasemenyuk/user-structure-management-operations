const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        role: {
            type: String,
            enum: ['admin', 'boss', 'regular'],
            required: [true, 'Role is required'],
        },
        subordinates: {
            type: Array,
        },
        boss: {
            type: Schema.Types.ObjectId,
            ref: "user",
        },
        token: {
            type: String,
        },
    },
    {
        versionKey: false,
        timestamps: false,
    }
);

const User = model('user', userSchema);

module.exports = { User };