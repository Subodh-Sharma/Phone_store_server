import mongoose from "mongoose";

const dealerSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    contact:{
        type: Number,
        minLength: 10,
        maxLength: 10,
        required: true
    },
    type:{
        type: String
    },
    id:{
        type: String
    }
})
const DealerModel = mongoose.model('Dealers',dealerSchema);
export default DealerModel;
