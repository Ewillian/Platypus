const router = require('express').Router()
const utils = require('../functions/utils')
const demands = require('../functions/demands')
const sessions = require('../functions/sessions')


router.get('/list', (request, response, next) => {
    let order
    let asc = "ASC"
    return sessions.getSessionByToken(request.cookies.AccessToken)
    .then((values)=>{
        if(request.query.order && request.query.asc == "ASC"){
            order = request.query.order
            asc = "DESC"
            return demands.getAllByUserWithOrder(values.userID, request.query.order, request.query.asc)
        }else if(request.query.order && request.query.asc == "DESC"){
            order = request.query.order
            asc = "ASC"
            return demands.getAllByUserWithOrder(values.userID, request.query.order, request.query.asc)
        }else{
            return  demands.getAllByUser(values.userID)
        }
    }).then((values)=>{
        response.format({
            text: function(){
                response.send(JSON.stringify(values));
            },
          
            html: function(){
                response.render('index',{
                    demands: values,
                    order: order,
                    url: "/demands",
                    asc: asc
                })
            },
          
            json: function(){
                response.json(values);
            }
        })
    }).catch((error)=>{
        console.log(error)
        response.status(500).send(error)
    })
})


router.get('/add', (request, response, next)=>{
    response.render('demands/edit',{ 
        methode : 'POST'
    })
})


router.get('/:demandID/edit', (request, response, next)=>{
    return demands.getDemand(request.params.demandID)
    .then((values)=>{
        response.render('demands/edit',{
            method : 'PATCH',
            demand: values
        })
    }).catch((error)=>{
        response.status(500).send(error)
    })
})


router.get('/:demandID', (request, response, next) => {
    return demands.getDemand(request.params.demandID)
    .then((values)=>{
        response.format({
            text: function(){
                response.send(JSON.stringify(values));
            },
          
            html: function(){
                response.render('demands/show',{
                    demand: values
                })
            },
          
            json: function(){
                response.json(values);
            }
        })
    }).catch((error)=>{
        response.status(500).send(error)
    })
})


router.post('/', (request, response, next) => {
    let date = utils.getDate()
    return sessions.getSessionByToken(request.cookies.AccessToken)
    .then((values)=>{
    return demands.postDemand(request.body.title, request.body.city, request.body.message, Boolean(request.body.completion), date, values.userID)
    }).then((values)=>{
        response.format({
            text: function(){
                response.send(JSON.stringify(values));
            },
          
            html: function(){
                response.redirect('/')
            },
          
            json: function(){
                response.json(values);
            }
        })
    }).catch((error)=>{
        response.status(500).send(error)
    })
})


router.patch('/:demandID', (request, response, next)=>{
    let date = utils.getDate()
    return demands.patchDemand(request.params.demandID, request.body.title, request.body.city, request.body.message, request.body.completion, date)
    .then((values)=>{
        response.format({
            text: function(){
                response.send(JSON.stringify(values));
            },
          
            html: function(){
                response.redirect('/')
            },
          
            json: function(){
                response.json(values);
            }
        })
    }).catch((error)=>{
        response.status(500).send(error)
    })
})


router.delete('/:demandID', (request, response, next) => {
    return demands.deleteDemand(request.params.demandID)
    .then((values)=>{
        response.format({
            text: function(){
                response.send(JSON.stringify(values));
            },
          
            html: function(){
                response.redirect('/')
            },
          
            json: function(){
                response.json(values);
            }
        })
    }).catch((error)=>{
        response.status(500).send(error)
    })
})


module.exports = router