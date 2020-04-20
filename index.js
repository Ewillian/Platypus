const app = require('express')()
const router = require('./Routers/Master_router')
const methodOverride = require('method-override')
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./Database.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Local Database is up.');
    return Promise.all([
        db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname VARCHAR(50), lastname VARCHAR(50), username VARCHAR(50), password VARCHAR(50), email VARCHAR(50), createdAt VARCHAR(50), updatedAt VARCHAR(50))")
        ]).then(() => {
            console.log("Database ready")
        }).catch(() => {
            console.log("Une erreur s'est produite :", err)
    })
})
db.close();

//Test Connection à la base de données
app.use(router)
app.set('views', './Views') 
app.set('view engine', 'pug')

app.use(methodOverride('_method'))

// Erreur 404
app.all('*', (req, res) => {
    res.status(404);
    res.format({
        'application/json': function(){
            res.send(JSON.stringify("{status : 404 not found}"))
        },
        'text/html': function(){
            res.render('404', {        
            })
        }
    })
})

app.listen(3000, () => console.log('server started')) 