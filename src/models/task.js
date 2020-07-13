const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
}); 

// taskSchema.pre('save', async function (next) {
//     if (this.isModified('password')) {
//         this.password = bcrypt(this.password, 8);
//     }

//     next();
// })

// Collection name seems to be derived from the model name. Model Task can generate a collection called 'tasks'.
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;