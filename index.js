const app = require('express')()
const router = require('./Routers/Master_router')
const methodOverride = require('method-override')

//Test Connection à la base de données
app.use(router)
app.set('views', './Views') 
app.set('view engine', 'pug')

app.use(methodOverride('_method'))

// app.use(function(req, res) {
//     res.redirect('/games/');
// });

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