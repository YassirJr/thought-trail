const {z} = require("zod")

const storySchema = z.object({
    user: z.string().min(10 , 'Invalid user id'),
    content: z.string().min(10 , 'Content must be at least 8'),
    title : z.string().min(5 , 'Title must be at least 8'),
});


function storyRequest(req, res, next) {
    try {
        storySchema.parse(req.body);
        next();
    } catch ({errors}) {
        res.status(400).json({ errors });
    }
}

module.exports = {storyRequest}