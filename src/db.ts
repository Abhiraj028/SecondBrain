import mongoose, {model, Schema} from "mongoose"


const UserSchema = new Schema({
    username: {type:String, unique: true},
    password: {type: String, required: true} 
})

const ContentSchema = new Schema({
    link : String,
    type: String,
    title: String,
    tags: [{type: mongoose.Schema.Types.ObjectId, ref: "Tags"}],
    userId:{type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
})

const TagsSchema = new Schema({
    title : {type: String, required: true, unique:true}
})

const LinkSchema = new Schema({
    hash : {type:String, required:true},
    userId: {type: mongoose.Schema.Types.ObjectId,required:true, ref:"User"}
})

export const ContentModel = model("Content",ContentSchema);
export const UserModel = model("User",UserSchema);
export const TagsModel = model("Tags",TagsSchema);
export const LinkModel = model("link",LinkSchema);
