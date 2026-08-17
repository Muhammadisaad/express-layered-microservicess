class ApiResponse {
    constructor(
        statusCode,
        message="success handle apiresponse weenie",
    ){
        this.statusCode=statusCode
        this.message=message
        this.success=statusCode>=200 && statusCode<300

    }
}