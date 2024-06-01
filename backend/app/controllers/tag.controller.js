const {genAI} = require("../config/gemini.config");
const Tag = require('../models/tag.model')

const guessTag = async (content) => {
    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    const model = genAI.getGenerativeModel({model: "gemini-1.5-flash-latest"});

    const prompt =
        "Guess a tag (topics) from this story content: " +
        content +
        ". Give me only the tag for the main technology like: web development, HTML, CSS in one word without any description or explanation.";


    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text()
}

const index = async (req, res) => {
    const tags = await Tag.find({name: {$regex: /\w/}});
    return res.status(200)
        .json(
            {
                success: true,
                data: tags
            }
        )
}

const store = async (names) => {
    if (!Array.isArray(names)) {
        names = [names];
    }

    const existingTags = await Tag.find({name: {$in: names}});
    const existingNames = existingTags.map(tag => tag.name.trim());

    const newNames = names.filter(name => !existingNames.includes(name.trim()) && /\w/.test(name.trim()));
    const newTags = await Promise.all(newNames.map(name => new Tag({name}).save()));

    return [...newTags.map(e => e?._id)];
};


module.exports = {
    guessTag,
    store ,
    index
}

