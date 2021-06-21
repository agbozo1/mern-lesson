const express = require('express')
const config  = require('config') //load the config folder
const path = require('path')
const mongoose = require('mongoose')


const app = express()

app.use(express.json({extended: true}))

//authorization module
app.use( '/api/auth', require('./routes/auth.routes'))
app.use( '/api/Link', require('./routes/link.routes'))
app.use( '/t', require('./routes/redirect.routes') ) //redirect for url links to open correctly

//if environment is production ... direct to static
//we can now work simultaneously with both front and backend
if(process.env.NODE_ENV === 'production'){
    app.use('/', express.static(path.join(__dirname, 'client', 'build'))) //__dirname - current directory
    
    // for any get request
    app.get('*',( req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = config.get('port') || 5000 //test for the port number

async function start(){
    try {
        await mongoose.connect(config.get('mongoURI'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}


start()