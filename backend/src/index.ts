import express, {Express, Request, Response} from "express"
import { UserModel, LinkModel, ContentModel, TagsModel } from "./db"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { AuthMiddleware } from "./middleware"
import { ResponseCodes, ShareType, SignBodyType, ShareLinkType, ContentBodyType, JWTType, DelContentType } from "./utils"
import cors from "cors"; 
require("dotenv").config();

// Admin Admining

const app: Express = express(); 

app.use(cors());
app.use(express.json())

app.post("/api/v1/signup", async (req : Request<{},{},SignBodyType>,res : Response) => {
    const username = req.body.username;
    const password = req.body.password;
    
    console.log(username);
    console.log(password);

    const checker = await UserModel.findOne({username:username});
    if(checker){
        console.log("User already exists");
        return res.status(ResponseCodes.BadRequest).json({msg:"The user already exist, please sign in"});
    }

    const hashed = await bcrypt.hash(password,7);

    try{
        await UserModel.create({
            username:username,
            password:hashed
        })
        res.json({
            msg:`User Signed Up Successfully! Welcome, ${username}`
        })
    }catch(err){
        console.log("Some error occured");
        res.status(ResponseCodes.InternalError).json({msg:"some error occured: ",err});
    }
});


app.post("/api/v1/signin",async (req: Request<{},{},SignBodyType>, res: Response) =>{
    
    try{
        const username = req.body.username;
        const password = req.body.password;

        console.log(username);
        console.log(password);

        const check = await UserModel.findOne({username:username});
        if(!check){
            console.log("User not found");
        return res.status(ResponseCodes.NotFound).json({msg:"User not found"});
        }

        const compare = await bcrypt.compare(password,check.password);
        if(!compare){
            console.log("Credentials are incorrect");
            return res.status(ResponseCodes.BadRequest).json({msg:"Username or Password entered is incorrect"});
        }
        const token = jwt.sign({id:check._id.toString()} as JWTType ,process.env.JWT_KEY!,{expiresIn:"1h"});
        
        res.status(ResponseCodes.Success).json({msg:"Successfully Signed in.",token});
    }catch(err){
        console.log("Some error occured");
        res.status(ResponseCodes.InternalError).json({msg:"Some error occured",err});
    }

});


app.post("/api/v1/content",AuthMiddleware, async (req:Request<{},{},ContentBodyType>, res:Response) =>{
    const userId = req.user!.id;
    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;
    
    try{
    if(!title){
        return res.status(ResponseCodes.BadRequest).json({msg:"Please enter a title"});
    }

    await ContentModel.create({
        link:link,
        type:type,
        title:title,
        tags:[],
        userId:userId
    })

    res.json({msg:"Content added successfully!"})
    }catch(err: unknown){
        if(err instanceof Error){
            res.status(ResponseCodes.BadRequest).json({msg:"An error occured. Retry later."});
            console.log(err);
        }else{
            res.status(ResponseCodes.InternalError).json({msg:"Fatal error occured."});
            console.log(err);
        }
    }
});


app.get("/api/v1/content", AuthMiddleware , async (req: Request, res : Response) =>{
    const userId = req.user!.id;
    const data = await ContentModel.find({userId:userId}).populate("userId","username");

    if(data.length == 0){
        return res.json({msg:"No content has been added. Begin your Second Brain!"});
    }
    console.log(data);
    return res.status(ResponseCodes.Success).json(data);

});


app.delete("/api/v1/content/:contentId", AuthMiddleware, async (req: Request<DelContentType>, res:Response) =>{
    const contentId = req.params.contentId;
    console.log(contentId);
    if(!contentId){
        return res.status(ResponseCodes.BadRequest).json({msg:"Specify the content to be deleted"})
    }
    try{
        const delContent = await ContentModel.findOneAndDelete({_id:contentId,userId:req.user!.id});
        console.log(delContent);
        if(!delContent){
            return res.status(ResponseCodes.BadRequest).json({msg:"Invalid contentId provided"});
        }
        res.status(ResponseCodes.Success).json({msg:"Specified content has been deleted"});
    
    }catch(err: unknown){
        if(err instanceof Error){
            res.status(ResponseCodes.BadRequest).json({msg:"An error occured. Retry later."});
            console.log(err);
        }else{
            res.status(ResponseCodes.InternalError).json({msg:"Fatal error occured."});
            console.log(err);
        }
    }
    
});


app.post("/api/v1/brain/share", AuthMiddleware , async(req:Request<{},{},ShareType>, res:Response) =>{
    const toggleShare = req.body.share;
    const userId = req.user!.id;
    try{
        if(toggleShare){
            const current = await LinkModel.findOne({userId});
            if(!current){
                const hash = await bcrypt.hash(userId,1);
                await LinkModel.create({hash,userId});
                return res.json({msg: "Your shareable link has been created", link: hash});
            }
            return res.json({msg: "Your shareable link already exists", link: current.hash});
        }else{
            await LinkModel.deleteOne({userId});
            return res.json({msg:"Sharing turned off"});
        }
    }catch(err: unknown){
        if(err instanceof Error){
            res.status(ResponseCodes.BadRequest).json({msg:"An error occured. Retry later."});
            console.log(err);
        }else{
            res.status(ResponseCodes.InternalError).json({msg:"Fatal error occured."});
            console.log(err);
        }
    }
});


app.get("/api/v1/brain/",async (req:Request<ShareLinkType>,res:Response) =>{
    const hash = req.query.shareLink;
    console.log(hash);
    if(!hash){
        return res.status(ResponseCodes.BadRequest).json({msg:"Enter a shareable link to continue"});
    }
    try{
        const user = await LinkModel.findOne({hash});
        if(!user){
            return res.status(ResponseCodes.Forbidden).json({msg:"Invalid link entered"});
        }
        const userId = user.userId;

        const content = await ContentModel.find({userId}).populate("userId","username");
        return res.json(content);
    }catch(err: unknown){
        if(err instanceof Error){
            res.status(ResponseCodes.BadRequest).json({msg:"An error occured. Retry later."});
            console.log(err);
        }else{
            res.status(ResponseCodes.InternalError).json({msg:"Fatal error occured."});
            console.log(err);
        }
    }
});

app.listen(process.env.PORT || 3000, async () => {
    try{
        await mongoose.connect(process.env.mongo_uri!);

    }catch{
        console.log("Error connecting to DB");
        process.exit(1);
    }
    console.log("Connected to DB");
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
})