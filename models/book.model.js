const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
      title : String,
      author : String,
      ISBN : Number,
      description : String,
      published_date : String
},
{
      versionKey : false
})

const BookModel = mongoose.model('book', bookSchema);

module.exports = {
      BookModel
}