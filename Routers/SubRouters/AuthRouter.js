const router = require('express').Router()
const bodyparser = require('body-parser')
var methodOverride = require('method-override')
const sqlite3 = require('sqlite3').verbose()

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

let db = new sqlite3.Database('./Database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the local database.');
})

//GET all users
router.get('/all', function(req, res, next) {
    //Appel du modèle mongoose (ExportModel)
    db.serialize(() => {
        db.each(`SELECT id, * FROM users`, (err, row) => {
          if (err) {
            console.error(err.message);
          }
          console.log(row);
        })
      })
      
      db.close((err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Close the database connection.');
      })
})

router.use(logger)

module.exports = router