const jwt = require('jsonwebtoken')
const { User } = require('../models/index.js')

const checkuserauth = async(req,res,next)=>{
    const {token} = req.cookies
    // console.log(token)
    if (!token) {
        req.flash('error','UnAuthorized user, Please Login')
        res.redirect('/')
    } else {
        const verify_token = jwt.verify(token,'sourabh@123345566')
        // console.log(verify_token)
        const data = await User.findOne({_id:verify_token.ID})
        req.data1= data
        next()
    }
}

module.exports = checkuserauth
