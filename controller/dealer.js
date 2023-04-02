import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import DealerModel from "../model/dealer.js";

const secret = process.env.DEALER_SECRET;

export const signup = async(req,res)=>{
    const {name,email,password,cpassword,contact,type} = req.body;
    try{
        if(password!==cpassword) return res.status(400).json({message:"Password doesn't match"})
        const existingDealer = await DealerModel.findOne({email})
        if(existingDealer) return res.status(400).json({message:"This email is already taken."})
        const securePassword = await bcrypt.hash(password,12);
        const newDealer = new DealerModel({name,email,password:securePassword,contact,type})
        const token = jwt.sign({email:newDealer.email,id:newDealer._id},secret,{expiresIn:"24h"})
        await newDealer.save();
        res.status(201).json({newDealer,token});
    }catch(err){
        res.status(404).json({message:"Something went wrong"})
        console.log(err);
    }
}

export const signin = async(req,res)=>{
    const {email,password} = req.body;
    try{
        const existingDealer = await DealerModel.findOne({email})
        if(!existingDealer) return res.status(400).json({message:"This Email doesn't exist"})
        const correctPassword = await bcrypt.compare(password,existingDealer.password)
        if(!correctPassword) return res.status(400).json({message:"Invalid Credentials"})
        const token = jwt.sign({email:existingDealer.email,id:existingDealer._id},secret,{expiresIn:"24h"})
        res.status(201).json({result:existingDealer,token})
    }catch(err){
        res.status(404).json({message:"Something went wrong"})
        console.log(err);
    }
}