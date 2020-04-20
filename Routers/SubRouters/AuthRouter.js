const router = require('express').Router()
const bodyparser = require('body-parser')
var methodOverride = require('method-override')

router.use(methodOverride('_method', {
    methods: ['GET', 'POST']
}))

router.use(bodyparser.json())
router.use(bodyparser.urlencoded({
        extended: true
}))

let logger = function (req, res, next){
    console.log("method: ",req.method," \n url ", req.url)
    next()
}
router.use(logger)

module.exports = router