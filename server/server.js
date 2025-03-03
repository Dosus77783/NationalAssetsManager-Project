import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import dbConnect from './config/mongoose.config.js' 
import countryRouter from './routes/country.routes.js'
import userRouter from './routes/user.routes.js'
import { notFoundError, normalizeErrors } from './util/errorhandling.js'
import { restartJobs } from './util/cycleReproduction.js'

const app = express();
app.use( express.json(), cors() )
app.use( "/country/api", countryRouter)
app.use( "/user/api", userRouter)
app.use( notFoundError );
app.use( normalizeErrors );
dotenv.config()
const PORT = process.env.PORT

dbConnect()
// restartJobs();

app.listen(PORT, () =>{
    console.log(`Simulation Nation Project, Port: ${PORT}`)
})