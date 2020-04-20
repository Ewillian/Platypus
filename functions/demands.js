const database = require('sqlite')

module.exports = {
    getAll(){
        return database.all('SELECT * FROM demands')
    },
    getAllByUser(userID){
        return database.all('SELECT * FROM demands WHERE user_id = ?', userID)
    },
    getAllByUserWithOrder(userID, order, asc){
        return database.all(`SELECT * FROM demands WHERE user_id = ? ORDER BY ${order} ${asc}`, userID)
    },
    getDemand(id){
        return database.get('SELECT * FROM demands WHERE id = ?;', id)
    },
    postDemand(title, city, message, completion, date, userID){
        return database.run('INSERT INTO demands (title, city, message, completion, created_at, update_at, user_id) VALUES (?, ?, ?, ?, ?, ?, ?);'
        , title, city, message, completion, date, date, userID)
    },
    patchDemand(id, title, city, message, completion, date){
        return database.run('UPDATE demands SET title = ?, city = ?, message = ?, completion = ? , update_at = ? WHERE id = ?;'
        , title, city, message, completion, date, id)
    },
    deleteDemand(id){
        return database.run('DELETE FROM demands WHERE id = ?;', id)    
    }
  }