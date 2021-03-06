const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
  }
);

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;