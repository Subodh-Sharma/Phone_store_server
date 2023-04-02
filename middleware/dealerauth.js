import jwt from "jsonwebtoken";

const secret = process.env.DEALER_SECRET;

const dealerauth = async(req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        if(token){
            const decodedData = jwt.verify(token,secret);
            req.dealerId = decodedData?.id;
        }
        next();
    }catch(err){
        console.log(err)
    }
}


export default dealerauth;