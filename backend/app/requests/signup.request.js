const {z} = require("zod")

const signUpSchema = z.object({
    fname: z.string().min(5 , 'First name must be at least 3 chars'),
    lname: z.string().min(5 , 'Last name must be at least 3 chars'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8 , 'Password must be at least 8 chars'),
});


function signUpRequest(req, res, next) {
    try {
        signUpSchema.parse(req.body);
        next();
    } catch ({errors}) {
        res.status(400).json({ errors });
    }
}

module.exports = {signUpRequest}