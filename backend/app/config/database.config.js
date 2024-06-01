const mongoose = require('mongoose')

const connection = async () => {
    return await mongoose.connect(process.env.DB_URI , {})
}
connection().then(res => console.log('Connected to db success'))
    .catch(err => console.log(err))

