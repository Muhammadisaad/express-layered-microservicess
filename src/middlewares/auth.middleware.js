 export const validateUser = (req , res , next) =>{
    const { name, email , password } = req.body;

    if(!(name && email && password) ){
        return res.status(400).json(
            {
                success : false,
                message : "all fields are required"
            }
        );
    }
    if(password.length<8){
        return res.status(400).json(
            {
                success : false,
                message : "password must be at least 8 characters long"
            }
        )
    }
    next();
}
// export default validateUser;