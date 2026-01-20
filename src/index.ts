import express, {Express, Request, Response} from "express"
import { UserModel, LinkModel, ContentModel, TagsModel } from "./db"
import mongoose from "mongoose"
import {JWT_KEY, ResponseCodes} from "./env"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { AuthMiddleware } from "./middleware"

interface SignBodyType {
    username: string,
    password: string
}
export interface AuthJWTPayload {
    username: string
}
interface ContentBodyType{
    link:string,
    type:string,
    title:string,
    tags:string[],
    userId: string
}


const app: Express = express()

app.use(express.json())

app.post("/api/v1/signup", async (req : Request<{},{},SignBodyType>,res : Response) => {
    const username = req.body.username;
    const password = req.body.password;
    
    const checker = await UserModel.findOne({username:username});
    if(checker){
        return res.status(ResponseCodes.BadRequest).json({msg:"The user already exist, please sign in"});
    }

    const hashed = await bcrypt.hash(password,7);

    try{
        await UserModel.create({
            username:username,
            password:hashed
        })
        res.json({
            message:`User Signed Up Successfully! Welcome, ${username}`
        })
    }catch(err){
        res.status(ResponseCodes.InternalError).json({msg:"some error occured: ",err});
    }
});

app.post("/api/v1/signin",async (req: Request<{},{},SignBodyType>, res: Response) =>{
    
    try{
        const username = req.body.username;
        const password = req.body.password;

        const check = await UserModel.findOne({username:username});
        if(!check){
        return res.status(ResponseCodes.NotFound).json({msg:"User not found"});
        }

        const compare = await bcrypt.compare(password,check.password);
        if(!compare){
            return res.status(ResponseCodes.BadRequest).json({msg:"Username or Password entered is incorrect"});
        }
        const token = jwt.sign({username:username} as AuthJWTPayload,JWT_KEY,{expiresIn:"1h"});
        
        res.status(ResponseCodes.Success).json({msg:"Successfully Signed in.",token});
    }catch(err){
        res.status(ResponseCodes.InternalError).json({msg:"Some error occured",err});
    }

});

app.post("/api/v1/content",AuthMiddleware, (req:Request<{},{},ContentBodyType>, res:Response) =>{
    const username = req.user!.username;
    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;
    
});

app.get("/api/v1/content",(req: Request, res : Response) =>{

})

app.delete("/api/v1/content",(req: Request, res:Response) =>{

})

app.post("/api/v1/brain/share",(req:Request, res:Response) =>{

})

app.get("/api/v1/brain/:shareLink",(req:Request,res:Response) =>{

})

app.listen(3000, async () => {
    await mongoose.connect("mongodb+srv://abhirajgautam:abhirajgautam@cluster0.atdkzuw.mongodb.net/brainly");
    console.log("Connected to DB");
    console.log("Server is running on port 3000");
})