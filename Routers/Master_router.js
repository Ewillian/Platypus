const router = require('express').Router()
const auth_router = require('./SubRouters/AuthRouter.js')

router.use('/auth', auth_router)

module.exports = router;