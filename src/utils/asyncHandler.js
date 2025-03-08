
// An async handler wrapper is a higher-order function that simplifies handling asynchronous functions in Node.js, especially in Express.js. It is used to catch and handle errors automatically, so we don't have to write repetitive try-catch blocks in every route handler.


const asyncHandler = (fn) => async (req,res,next) => {

    try {
        await fn(req,res,next)
    }

    catch(error){
        res.status(error.code || 500).json({
            success : false,
            message : error.message || 'Internal Server Error'
        })
    }
}

export { asyncHandler}