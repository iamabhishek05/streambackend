import mongoose , {Schema} from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';


const videoSchema = new Schema( {

    // jo jo files hai jaise ki thumbnail , videoFile , avatar insabko hum cloudinary pe store karenge aur uska URL dedege

    videoFile : {
        type: String, // cloudinary URL
        required: true
    },

    thumbnail: {
        type: String, // cloudinary URL
        required: true
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    duration: {
        type: Number,
        required: true
    },

    views: {
        type: Number,
        default: 0
    },

    isPublished: {
        type: Boolean,
        default: true
    },

    // ObjectId is a special type used by MongoDB to uniquely identify documents. It is a 12-byte identifier typically used for primary keys in MongoDB collections.
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },


} , {timestamps: true} );

// injeting mongoose aggregation pipeline for writing queries 
videoSchema.plugin(mongooseAggregatePaginate)



export const Video = mongoose.model('Video' , videoSchema)