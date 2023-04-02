import mongoose from "mongoose";

const userSchema = mongoose.Schema({
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
        type:String
    },
    cart:[{
        phoneId:{
            type:String
        },
        name:{
            type:String
        },
        company:{
            type:String
        },
        RAM:{
            type:Number
        },
        storage:{
            type:Number
        },
        camera:{
            type:Number
        },
        imageFile:{
            type:String
        },
        price:{
            type:Number
        },
        quantity:{
            type:Number
        },
        amount:{
            type:Number
        }
    }],
    id:{
        type: String
    }
})
const UserModel = mongoose.model('Users',userSchema);
export default UserModel;