import mongoose from 'mongoose'
import { connectOptions} from '../config/mongoDB'
require('dotenv').config()

const uri: any = process.env.MONGO_DB_URI

mongoose.connect(uri, connectOptions, () => {
  console.log('MongoDB connected')
})