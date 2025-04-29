const express = require("express");

const routes = express.Router();

const {bookModel} = require("../models/BookModel");

routes.get("/",async(req,res)=>{
    try {
        const books = await bookModel.find();
        return res.status(200).send({message:"Book got successfully",books});
    } catch (error) {
        return res.status(500).send({message:"Something went wrong"});
    }
})

routes.post("/",async(req,res)=>{
    try {
        const{title,author,genre,publishedYear,availableCopies,borrowedBy}=req.body
        if(!title || !author || !genre || !publishedYear || !availableCopies ||!borrowedBy){
            return res.status(400).send({message:"Please fill all details"})
        }
        const newBook = new bookModel({
            title,author,genre,publishedYear,availableCopies,borrowedBy
        })
        await newBook.save();
        return res.status(201).send({message:"New Book created",createdBook:newBook})
    } catch (error) {
        console.log(error)
        return res.status(500).send({message:"Something went wrong"});
    }
})

routes.put("/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).send({message:"book not found"});
        }
        const{title,author,genre,publishedYear,availableCopies,borrowedBy}=req.body
        if(!title || !author || !genre || !publishedYear || !availableCopies ||!borrowedBy){
            return res.status(400).send({message:"Please fill all details"});
        }
        const updatedBook = await bookModel.findByIdAndUpdate({_id:id},{title,author,genre,publishedYear,availableCopies,borrowedBy})
        if(!updatedBook){
            return res.status(404).send({message:"Not found"});
        }
        return res.status(200).send({message:"Book updated Successully"});
    } catch (error) {
        return res.status(500).send({message:"Something went wrong"});
    }
})

routes.delete("/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).send({message:"book not found"});
        }
        const deletedBook = await bookModel.findByIdAndDelete({_id:id});
        if(!deletedBook){
            return res.status(404).send({message:"Not found"});
        }
        return res.status(200).send({message:"Deleted successfully"});
    } catch (error) {
        return res.status(500).send({message:"Something went wrong"});
    }
})


module.exports = routes;