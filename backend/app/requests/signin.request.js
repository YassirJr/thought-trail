const {z} = require("zod")

const signInSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8 , 'Password must be at least 8'),
});


function signInRequest(req, res, next) {
    try {
        signInSchema.parse(req.body);
        next();
    } catch ({errors}) {
        res.status(400).json({ errors });
    }
}

module.exports = {signInRequest}