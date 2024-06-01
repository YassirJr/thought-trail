import nlp from 'compromise'
export const getFirstNameCharAndLastNameChar = user => user?.fname.at(0) + user?.lname.at(0)
export const getUserFullName = user => `${user?.fname} ${user?.lname}`
export const getStoryAuthorFullName = story => `${story?.user?.fname} ${story?.user?.lname}`

export const calculateReadingTime = (text) => {
    const wordsPerMinute = 100; // Average reading speed
    const words = text.split(/\s+/).length; // Split the text by whitespace to get word count
    return Math.ceil(words / wordsPerMinute);
};




