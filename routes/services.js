const router = require('express').Router()
const utils = require('../functions/utils')
const services = require('./../functions/services')
const sessions = require('../functions/sessions')


router.get('/', (request, response, next) => {
    let order
    let asc = "ASC"
    return sessions.getSessionByToken(request.cookies.AccessToken)
    .then((values)=>{
        if(request.query.order && request.query.asc == "ASC"){
            order = request.query.order
            asc = "DESC"
            return services.getAllByUserWithOrder(values.userID, request.query.order, request.query.asc)
        }else if(request.query.order && request.query.asc == "DESC"){
            order = request.query.order
            asc = "ASC"
            return services.getAllByUserWithOrder(values.userID, request.query.order, request.query.asc)
        }else{
            return  services.getAllByUser(values.userID)
        }
    }).then((values)=>{
        response.format({
            text: function(){
                response.send(JSON.stringify(values));
            },
          
            html: function(){
                response.render('index',{
                    services: values,
                    order: order,
                    url: "/services",
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
    response.render('services/edit',{ 
        methode : 'POST'
    })
})


router.get('/:serviceID/edit', (request, response, next)=>{
    return services.getService(request.params.serviceID)
    .then((values)=>{
        response.render('services/edit',{
            method : 'PATCH',
            service: values
        })
    }).catch((error)=>{
        response.status(500).send(error)
    })
})


router.get('/:serviceID', (request, response, next) => {
    return services.getService(request.params.serviceID)
    .then((values)=>{
        response.format({
            text: function(){
                response.send(JSON.stringify(values));
            },
          
            html: function(){
                response.render('services/show',{
                    service: values
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
    return services.postService(request.body.title, request.body.city, request.body.message, Boolean(request.body.completion), date, values.userID)
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


router.patch('/:serviceID', (request, response, next)=>{
    let date = utils.getDate()
    return services.patchService(request.params.serviceID, request.body.title, request.body.city, request.body.message, request.body.completion, date)
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


router.delete('/:serviceID', (request, response, next) => {
    return services.deleteService(request.params.serviceID)
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