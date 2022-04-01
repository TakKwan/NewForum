const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    content: { type: String, required: true, index: 'text' },
    date: { type: Date, required: true }
  },
  { timestamps: { createdAt: false, updatedAt: true } }
)

module.exports = PostSchema
