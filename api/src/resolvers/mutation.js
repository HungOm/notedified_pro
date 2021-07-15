const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')

const {
  AuthenticationError,
  ForbiddenError
} = require('apollo-server-express');
require('dotenv').config();
const gravater = require('../util/gravatar');
// const { model } = require('../models/note');
module.exports = {
  newNote: async (parent, args, { models, user }) => {
      console.log(user)

            if (!user){
                throw new AuthenticationError("You must be signed in to create a note")
            }
    
            return await models.Note.create({
            content: args.content,
            author: mongoose.Types.ObjectId(user.id)
    });
  },
  deleteNote: async (parent, { id }, { models,user }) => {

    if(!user){
        throw new AuthenticationError("You must be signed in to delete a note")
    }
    const note = await models.Note.findById(id)
    if(note && String(note.author)!==user.id){
        throw new ForbiddenError("You don't have permission to delete this note")
    }
    try {
      await models.Note.emove();
      return true;
    } catch (err) {
      return false;
    }
  },
  updateNote: async (parent, { content, id }, { models, user }) => {

    if(!user){
        throw new AuthenticationError("You must be signed in to update a note")
    }
    const note = await models.Note.findById(id)
    if(note && String(note.author)!==user.id){
        throw new ForbiddenError("You don't have permission to update  the note");
    }
    return await models.Note.findOneAndUpdate(
      {
        _id: id
      },
      {
        $set: {
          content
        }
      },
      {
        new: true
      }
    );
  },
  signUp: async (parent, { username, email, password }, { models }) => {
    email = email.trim().toLowerCase();
    const hashed = await bcrypt.hash(password, 10);
    const avater = gravater(email);
    try {
      const user = await models.User.create({
        username,
        email,
        avater,
        password: hashed
      });
      return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    } catch (err) {
      console.log(err);
      throw new Error('Error creating account');
    }
  },
  signIn: async (parent, { username, email, password }, { models }) => {
    if (email) {
      // normalize email address
      email = email.trim().toLowerCase();
    }
    const user = await models.User.findOne({
      $or: [{ email }, { username }]
    });
    // if no user is found, throw an authentication error
    if (!user) {
      throw new AuthenticationError('Error signing in');
    }
    // if the passwords don't match, throw an authentication error
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new AuthenticationError('Error signing in');
    }
    // create and return the json web token
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  },
  toggleFavorite: async (parent,{id},{models,user})=>{

    // if no user context is passed throw auth error 
    if(!user){
      throw new AuthenticationError();
    }

    // check to see if use has favorted the note 
    let noCheck = await models.Note.findById(id);
    const hasUser = noCheck.favoritedBy.indexOf(user.id)

    //if user  exist in the list 
    //pull them from the list and reduce the favorite count by 1
    if(hasUser>=0){
      return await models.Note.findByIdAndUpdate(
        id,
        {
          $pull:{
            favoritedBy:mongoose.Types.ObjectId(user.id)
          },
          $inc:{
            favoriteCount:-1
          }
        },
        {
          // set new to true to return the update doc 
          new:true
        }
      );
    }else{
      //if user doesnt exist in the list
      // add them to the list and increment the favoriteCount by 1 
      return await models.Note.findByIdAndUpdate(
        id,
        {$push: {
          favoritedBy: mongoose.Types.ObjectId(user.id)
        },
        $inc:{
          favoriteCount:1
        }
      },
      {
        new: true
      }
      )

    }


  }
};
