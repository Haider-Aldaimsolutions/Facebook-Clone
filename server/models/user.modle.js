import mongoose from 'mongoose';
// const postsSchema=
const User =  mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        bio: { type: String},
        profilePicture:{ type: String},
        coverPicture:{ type: String},
        gender:{ type: String}
    },
    { collection: 'Memories-Auth' }

)
const Model = mongoose.model('Memories-Auth', User)
export default Model
