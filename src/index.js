import 'dotenv/config';
import connectDB from './db/index.js';
import {app} from './app.js'

// whenever a async function is called it automatically returns a promise
connectDB()
.then(() =>{
    app.listen(process.env.PORT || 8000 , () => {
        console.log(`Server is running on port ${process.env.PORT || 8000}`);
    } ) 
})
.catch((error) => {
    console.log("MongoDB connection failed " + error);
})