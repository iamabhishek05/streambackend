
// This is a custom API response class to standardise our API responses 

class ApiResponse {

constructor(
    statusCode ,
    data,
    message = "Success"
){
    this.statusCode = statusCode
    this.data = data
    this.message = message
    this.success = statusCode < 400
}
} 

export { ApiResponse } 