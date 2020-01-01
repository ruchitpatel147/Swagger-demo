const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    address: {
      type: String,
      required: true
    }
  },
  {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
  }
);

const StudentModel = mongoose.model('Student', StudentSchema);
module.exports = StudentModel;