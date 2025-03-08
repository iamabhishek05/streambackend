import mongoose , {Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 


const userSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
       
    },

    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true
    },

    avatar: {
        type: String,
        required : true,
    },

    coverImage: {
        type: String,
    },

    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Video'
        }
    ],

    password: {
        type: String,
        required: [true, 'Password is required']
    },

    refreshToken :{
        type: String
    }
} , 
    {
        timestamps: true
    }
)

// hashing the password using bcrypt and using the Pre middleware from mongoose before saving the password in the database


// we use function() {} because it give us the access of this keyword
userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// userSchema also give us access to object called methods , through which we can create our custom methods
// bcrypt library can encrypt our passwords as well as compare them
// when you encrypt the password it is encrypted but the password you type is not encrypted so we need to compare the two passwords

userSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password , this.password)
}

// generating JWT token

// Access token
userSchema.methods.generateAccessToken = function (){
    jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      }
    )
}

// Refresh token
userSchema.methods.generateRefreshToken = function (){

    jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
      }
    )

}

export const User = mongoose.model('User' , userSchema)