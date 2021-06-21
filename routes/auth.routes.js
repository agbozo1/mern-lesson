const {Router} = require('express')
const config = require('config')

const bcrypt = require('bcryptjs') //package for hashed password
const jwt = require('jsonwebtoken') //package for tokens
const {check, validationResult} = require('express-validator') //package for validation

const User = require('../models/User') //user data
const UserLog = require('../models/UserLog') //log records - for logins
const router = Router()


//post prefix ---> /api/auth ---> /api/auth/register
router.post(
    '/register', 
    [//validation
        check('email','Wrong Email').isEmail(),
        check('password','Minimal Length: 6 Symbols').isLength({ min:6 })
    ],
    async (req, res) => {
    try { // Controller Logic...........because of async - use try 
        
        console.log('Body', req.body)

        const errors = validationResult(req)

        //if errors object is not empty then return error message
        if(!errors.isEmpty()){
            return res.status(400).status.json({
                errors: errors.array(),
                message: 'Wrong Registration Data'
            })
        }

        const {email, password} = req.body

        //check if user exists
        const candidate = await User.findOne({ email })
        if(candidate){
            return res.status(400).json({message: 'This User Already Exists'})
        }

        const hashedPassword = await bcrypt.hash(password, 12) // await cos of async
        
        //now create a new user 
        const user = new User({ email, password: hashedPassword})

        await user.save()

        

        res.status(201).json({message: 'User Created'})

    } catch (e) {
        res.status(500).json({message:'Registration Error - Try Again'})
    }
})

//post prefix ---> /api/auth ---> /api/auth/login
router.post('/login', 
[
    check('email','Enter a valid email').normalizeEmail().isEmail(),
    check('password','Enter a valid password').exists()
],
async (req, res) => {
    
try { // Controller Logic...........because of async - use try 
    
    const errors = validationResult(req)

    //if errors object is not empty then return error message
    if(!errors.isEmpty()){
        return res.status(400).status.json({
            errors: errors.array(),
            message: 'Wrong Login Data'
        })
    }

    //verify user based DB
    const {email, password} = req.body

    const user = await User.findOne({ email })

    console.log(user.email)

    if(!user){
        return res.status(400).json({message: 'User Not Found'})
    }

    //check password with DB password
    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        return res.status(400).json({message: 'User Not Found - Wrong Password'})
    }
    

    //token creation
    const token = jwt.sign(
        {userId: user.id},
        config.get('jwtSecret'),
        {expiresIn: '1h'}
    )

    //login and assign token
    res.json({token, userId: user.id})

    //record user log in database 
    const userLog = new UserLog({email})
    userLog.save()

} catch (e) {
    res.status(500).json({message:'Login Error - Try Again'})
}
})

module.exports = router