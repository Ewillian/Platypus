const app = require('express')()
const router = require('./Routers/Master_router')
const methodOverride = require('method-override')
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});

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