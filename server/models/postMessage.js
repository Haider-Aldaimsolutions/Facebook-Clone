import mongoose from "mongoose";
//it is going to define the layout/schema of out data 
const postsSchema=mongoose.Schema(
    {
    title:String,
    message:String,
    creator:String,
    tags:[String],
    selectedFile:String,
    likeCount:{
        type:Number,
        default:0
    },
    createdAt:{
        type:Date,
        default:new Date()
    },
    email: { type: String, required: true}

    },
    { collection: 'Post' }
);

const PostMessage=mongoose.model('Post',postsSchema)

export default PostMessage
