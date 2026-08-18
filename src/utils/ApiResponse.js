class ApiResponse {
    constructor(
        statusCode,
        message="success handle apiresponse weenie",
        data={}
    ){
        this.statusCode=statusCode
        this.message=message
        this.success=statusCode>=200 && statusCode<300
        this.data=data

    }
}
export default ApiResponse