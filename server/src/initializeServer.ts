import express from "express"
import cors from "cors"
import compression from "compression"
import morgan from "morgan"

export default function initializeServer() {
  const app = express()

  if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

  app.use(express.urlencoded({extended: true}))
  app.use(express.json())
  app.use(cors())
  app.use(compression)

  return app
}