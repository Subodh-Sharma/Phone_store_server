import 'dotenv/config';
import Express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from "cors";
import path from "path";
import fileUpload from 'express-fileupload';

const app = Express();
import userRouter from "./router/user.js"
import dealerRouter from "./router/dealer.js"
import phoneRouter from "./router/phone.js"

app.use(Express.json({limit:"30mb",extended:true}));
app.use(Express.urlencoded({limit:"30mb",extended: true}));
app.use(morgan("dev"));
app.use(cors());
app.use(fileUpload({
    useTempFiles:true
}))

app.use("/dealer",dealerRouter);
app.use("/user",userRouter);
app.use("/phone",phoneRouter);
//-------------------Deployment code---------------------//

// const __dirname1 = path.resolve();
//  console.log(__dirname1);
// if (process.env.NODE_ENV === "production") {
//   app.use(Express.static(path.join(__dirname1, "/build")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname1, "build", "index.html"));
//   });
// } else {
  app.get("/", (req, res) => {
    res.send("Hello world");
  });
// }

//-------------------Deployment code---------------------//
// const port = process.env.PORT;
const port = 8000;
const url = process.env.DBURL;
mongoose.set("strictQuery", true);
mongoose.connect(url,).then(()=>{
    app.listen(port,()=>{
        console.log(`Listening at port ${port}`);
    })
}).catch((err)=>{
    console.log(err)
})



