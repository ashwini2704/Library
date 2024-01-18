const express = require('express');
const {BookModel} = require('../models/book.model.js');

const bookRouter = express.Router();

bookRouter.get("/", async(req,res) => {
      const {query} = req.query;
      const page = req.query.page || 1;
          
      try {
            if(query) {
                  const books = await BookModel.find({
                        $or: [
                          { title: { $regex: query, $options: 'i' } },
                          { author: { $regex: query, $options: 'i' } },
                        ],
                  })
                  .skip((page - 1) * 6)
                  .limit(6);
                  res.status(200).send({"data" : books})
            }else{
                 const books = await BookModel.find();
                 if(books.length == 0) {
                       res.status(200).send({"message" : "No book found"})
                 }else {
                       res.status(200).send({"data" : books})
                 }
            }
      } catch (error) {
            res.status(400).send({"Error" : error.message})
      }
})
bookRouter.get("/single/:id", async(req,res) => {
      const {id} = req.params;
      try {
            const book = await BookModel.findById({_id : id});
            if(!book) {
                  res.status(200).send({"message" : "No book found"})
            }else {
                  res.status(200).send({"data" : book})
            }
      } catch (error) {
            res.status(400).send({"Error" : error.message})
      }
})

bookRouter.post("/add", async(req,res) => {
      
      try {
            const newBook = new BookModel(req.body);
            await newBook.save();
            res.status(200).send({"message" : "New book has been successfully added"})
      } catch (error) {
            res.status(400).send({"Error" : error.message})  
      }
})

bookRouter.patch("/update/:id", async(req,res) => {
      const {id} = req.params;
      try {
           const book = await BookModel.findByIdAndUpdate({_id : id}, req.body);
           res.status(200).send({"message" : "Book has been successfully updated"})
      } catch (error) {
            res.status(400).send({"Error" : error.message}) 
      }
})
bookRouter.patch("/delete/:id", async(req,res) => {
      const {id} = req.params;
      try {
           const book = await BookModel.findByIdAndDelete({_id : id});
           res.status(200).send({"message" : "Book has been successfully updated"})
      } catch (error) {
            res.status(400).send({"Error" : error.message}) 
      }
})

module.exports = {
      bookRouter
}