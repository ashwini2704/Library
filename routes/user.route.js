const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {UserModel} = require('../models/user.model.js');
const {BookModel} = require('../models/book.model.js');

const userRouter = express.Router();

userRouter.post("/register", async(req,res) => {
      const {name,email, password} = req.body;
      try {
         const user = await UserModel.find({email});
         if(user.length>0) {
          res.status(200).send({"msg" : "User is already present, Please Login"})
      }
      else{
          bcrypt.hash(password, 5, async (err, hash) =>{
              if(err) {
                  res.status(200).send({"msg" : err})
  
              }else{
                  const newUser = new UserModel({name,email, password:hash});
                  await newUser.save();
                  res.status(200).send({"msg" : "New User has been successfully added"})
              }               
          });
         }
      } catch (error) {
          res.status(400).send({"error": error})
      }
})

userRouter.post("/login", async (req,res) => {
      const {email, password} = req.body;

      try {
            const user = await UserModel.find({email});
            if(user.length < 0) {
                  res.status(200).send({"msg" : "user not found"})
            }else{
                  bcrypt.compare(myPlaintextPassword, hash, async (err, result) => {
                        if(err) {
                              res.status(200).status({"Error" : err.message});
                        }else{
                              const token = jwt.sign({userID : user_id}, process.env.SECRET_KEY);
                              res.status(200).send({"msg" : "Successfully logged in", "token" : token})
                        }
                  });
            }
      } catch (error) {
            res.status(400).send({"Error" : error.message})
      }
})

module.exports = {
      userRouter
}