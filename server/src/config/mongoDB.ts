require('dotenv').config()

const uri: any = process.env.MONGO_DB_URI

const connectOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}


export {connectOptions, uri}