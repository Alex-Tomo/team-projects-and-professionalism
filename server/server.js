/**
 * Entry point for the server. Express server currently on port 8080
 * but will be chnged to 80 when deployed.
 * Instantiates the auth and user routes in order to keep the main server file
 * tidy.
 *
 * This should not realistically be touched untill deployment.
 *
 * @author Jordan Short
 */
 const express = require('express')
 const cors = require('cors')
 const db = require('./schema')
 
 const app = express()
 
 const optionsCors = {
   origin: 'http://localhost:8081'
 }
 
 db.sequelize.sync()
 
 app.use(cors(optionsCors))
 
 app.use(express.json())
 
 app.use(express.urlencoded({ extended: true }))
 
 require('./routes/auth.routes')(app)
 require('./routes/user.routes')(app)
 
 const PORT = process.env.PORT || 8080
 app.listen(PORT, () => {
   console.log(`Server running on port: ${PORT}`)
 }) 