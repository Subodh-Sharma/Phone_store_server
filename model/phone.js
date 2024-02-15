import mongoose from "mongoose";

const phoneSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    company:{
        type: String,
        required: true
    },
    RAM:{
        type: Number,
        required: true
    },
    storage:{
        type: Number,
        required: true
    },
    camera:{
        type: Number,
        required: true
    },
    imageFile:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    dealer:{
        type: String
    },
    addedBy:{
        type: String
    },
    stock:{
        type:Number,
        required:true
    }
})
const PhoneModel = mongoose.model('Phones',phoneSchema);
export default PhoneModel;