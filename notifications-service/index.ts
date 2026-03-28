import express, { urlencoded } from 'express';
import cors from 'cors';
import dotenv from 'dotenv' ;
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.json({message:"hello"});
})

app.listen(process.env.PORT,()=>{
    console.log(`notifications service sur port ${process.env.PORT}`);
});