import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import UserModel from "../model/user.js";
const secret = process.env.USER_SECRET;

export const signup = async(req,res)=>{
    const {name,email,password,cpassword,contact,type} = req.body;
    try{
        if(password!==cpassword){
            return res.status(400).json({message:"Password doesn't match"})
        }
        const existingUser = await UserModel.findOne({email})
        if(existingUser){
            return res.status(400).json({message:"This Email already exist."})
        }
        const securePassword = await bcrypt.hash(password,12);
        const newUser = new UserModel({name,email,password:securePassword,contact,type});
        const token = jwt.sign({email:newUser.email,id:newUser._id},secret,{expiresIn:"24h"})
        await newUser.save();
        res.status(200).json({newUser,token});

    }catch(err){
        res.status(404).json({message:"Something went wrong"})
        console.log(err);
    }
}

export const signin = async(req,res)=>{
    const {email,password} = req.body;
    try{
        const existingUser = await UserModel.findOne({email});
        if(!existingUser) return res.status(400).json({message:"User doesn't exist"})
        const correctPassword = await bcrypt.compare(password,existingUser.password);
        if(!correctPassword) return res.status(400).json({message:"Invalid Credentials"})
        const token = jwt.sign({email:existingUser.email,id:existingUser._id},secret,{expiresIn:"24h"})
        res.status(201).json({result:existingUser,token});
    }catch(err){
        res.status(404).json({message:"Something went wrong"})
        console.log(err);
    }
}

export const addincart = async(req,res)=>{
    const {userId,phoneId,amount,name,company,RAM,storage,camera,imageFile,price} = req.body;
    try{
        if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).json({message:`No user with userId: ${userId}`})
        const existingPhone = await UserModel.findOne({"_id":userId,"cart.phoneId":phoneId})
        if(existingPhone){
            await UserModel.updateOne({"_id":userId,"cart.phoneId":phoneId},{$inc:{"cart.$.quantity":1,"cart.$.amount":amount}})
            const userData = await UserModel.findById(userId)
            return res.status(201).json(userData.cart)
        }
        const updatedData = {cart:{phoneId:phoneId,quantity:1,amount:amount,name:name,company:company,RAM:RAM,storage:storage,camera:camera,imageFile:imageFile,price:price}}
        await UserModel.findByIdAndUpdate(userId,{$push:updatedData})
        const userData = await UserModel.findById(userId)
        res.status(201).json(userData.cart)
    }catch(error){
        res.status(404).json({message:"Something went wrong"})
    }
}
export const removefromcart = async(req,res)=>{
    const {id} = req.params;
    const {userId} = req.body;
    try{
        if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).json({message:`No user with userId: ${userId}`})
        const removePhone = {cart:{_id:id}}
        await UserModel.findByIdAndUpdate(userId,{$pull:removePhone})
        const userData = await UserModel.findById(userId)
        res.status(201).json(userData.cart)
    }catch(error){
        res.status(404).json({message:"Something went wrong"})
    }
}
export const addonecart = async(req,res)=>{
    const {id} = req.params;
    const {userId,amount} = req.body;
    try{
        if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).json({message:`No user with userId: ${userId}`})
        await UserModel.updateOne({"_id":userId,"cart._id":id},{$inc:{"cart.$.quantity":1,"cart.$.amount":amount}})
        const userData = await UserModel.findById(userId)
        res.status(201).json(userData.cart)
    }catch(error){
        res.status(404).json({message:"Something went wrong"})
    }
}
export const removeonecart = async(req,res)=>{
    const {id} = req.params;
    const {userId,amount} = req.body;
    try{
        if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).json({message:`No user with userId: ${userId}`})
        await UserModel.updateOne({"_id":userId,"cart._id":id},{$inc:{"cart.$.quantity":-1,"cart.$.amount":-amount}})
        const userData = await UserModel.findById(userId)
        res.status(201).json(userData.cart)
    }catch(error){
        res.status(404).json({message:"Something went wrong"})
    }
}
export const emptycart = async(req,res)=>{
    const {id} = req.params;
    try{
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message:`No user with userId: ${id}`})
        await UserModel.findByIdAndUpdate({_id:id},{$unset:{cart:""}})
        const userData = await UserModel.findById(id);
        res.status(201).json(userData.cart)
    }catch(error){
        res.status(404).json({message:"Something went wrong"})
    }
}
export const getcart = async(req,res)=>{
    const {id} = req.params;
    try{
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message:`No user with userId: ${id}`})
        const userData = await UserModel.findById(id);
        res.status(201).json(userData.cart)
    }catch(error){
        res.status(404).json({message:"Something went wrong"})
    }
}