import PhoneModel from "../model/phone.js";
import mongoose from "mongoose";

export const addphone = async (req, res) => {
    const phone = req.body;
    const newPhone = new PhoneModel({
        ...phone,
        addedBy: req.dealerId
    });
    try {
        await newPhone.save();
        res.status(201).json(newPhone);
    } catch (error) {
        res.status(404).json({ message: "Something Went Wrong." })
    }
}

export const getphones = async (req, res) => {
    try {
        const phones = await PhoneModel.find();
        res.status(201).json(phones);
    } catch (err) {
        res.status(404).json({ message: "Something went wrong." })
    }
}

export const dealersphone = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: `No Phone with dealer Id: ${id}` })

        const dealerPhones = await PhoneModel.find({ addedBy: id });
        res.status(201).json(dealerPhones)
    } catch (error) {
        res.status(404).json({ message: "Something Went Wrong." })
    }
}

export const updatephone = async(req,res)=>{
    const {id} = req.params
    const {price,stock} = req.body;
    try{
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message:`No Phone with Id: ${id}`})

        const updatedPhone = {price,stock}
        await PhoneModel.findByIdAndUpdate(id,updatedPhone,{new:true})
        res.status(201).json(updatedPhone);
    }catch(error){
        res.status(404).json({message:"Something Went Wrong."})
    }
}

export const deletephone = async(req,res)=>{
    const {id} = req.params;
    try{
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message:`No Phone with Id: ${id}`})

        await PhoneModel.findByIdAndRemove(id);
        res.status(201).json({message:"Phone deleted Successfully"})
    }catch(error){
        res.status(404).json({message:"Something Went Wrong."});
    }
}
export const getphone = async(req,res)=>{
    const {id} = req.params;
    try{
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message:`No Phone exist with Id: ${id}`})
        const phone = await PhoneModel.findById(id);
        res.status(201).json(phone);
    }catch(error){
        res.status(404).json({message:"Something went wrong."})
    }
}

export const search = async(req,res)=>{
    const {q} = req.query;
    try{
        const company = new RegExp(q,"i")
        const phones = await PhoneModel.find({company});
        res.status(201).json(phones);
    }catch(error){
        res.status(404).json({message:"Something went wrong."})
    }
}