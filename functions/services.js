const database = require('sqlite')

module.exports = {
    getAll(){
        return database.all('SELECT * FROM services')
    },
    getAllByUser(userID){
        return database.all('SELECT * FROM services WHERE user_id = ?', userID)
    },
    getAllByUserWithOrder(userID, order, asc){
        return database.all(`SELECT * FROM services WHERE user_id = ? ORDER BY ${order} ${asc}`, userID)
    },
    getService(id){
        return database.get('SELECT * FROM services WHERE id = ?;', id)
    },
    postService(title, message, completion, date, userID){
        return database.run('INSERT INTO services (title, message, completion, created_at, update_at, user_id) VALUES (?, ?, ?, ?, ?, ?);'
        , title, message, completion, date, date, userID)
    },
    patchService(id, title, message, completion, date){
        return database.run('UPDATE services SET title = ?, message = ?, completion = ? , update_at = ? WHERE id = ?;'
        , title, message, completion, date, id)
    },
    deleteService(id){
        return database.run('DELETE FROM services WHERE id = ?;', id)    
    }
  }