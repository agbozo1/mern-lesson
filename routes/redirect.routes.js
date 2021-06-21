const {Router} = require('express')
const Link = require ('../models/Link')
const router = Router() //router object

//get method - get dynamic code
//users can see only the lists they created
router.get('/:code', async(req, res) => {

    try {
        const link = await Link.findOne({ code: req.params.code})

        if(link){
            link.clicks++
            await link.save()
            return res.redirect(link.from)
        }

        res.status(404).json('Link Not Found')
    } catch (e) {
        res.status(500).json({message:'Error With URL Generation'})
    }
})

module.exports = router
