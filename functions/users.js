const database = require('sqlite')
const sql = require('sql-template-strings')

module.exports = {
    getAll(){
        return database.all(`SELECT * FROM users;`)
    },
    getUser(id){
        return database.get('SELECT * FROM users WHERE id = ?;', id)
    },
    getUserbyUsername(username){
        return database.get('SELECT * FROM users WHERE username = ?;', username)
    },
    getUserServices(id, order, asc){
        let query = sql`SELECT * FROM users LEFT OUTER JOIN services ON services.user_id=users.id WHERE users.id = ${id}`
        if(order && asc){
            order = "services."+order
            query.append(sql` ORDER BY `).append(order).append(" ").append(asc)
            console.log(query)
        }
        return database.all(query)
    },
    getUserDemands(id, order, asc){
        let query = sql`SELECT * FROM users LEFT OUTER JOIN demands ON demands.user_id=users.id WHERE users.id = ${id}`
        if(order && asc){
            order = "demands."+order
            query.append(sql` ORDER BY `).append(order).append(" ").append(asc)
            console.log(query)
        }
        return database.all(query)
    },
    postUser(firstname, lastname, username, password, email, date){
        return database.run('INSERT INTO users (firstname, lastname, username, password, email, created_at, update_at) VALUES (?, ?, ?, ?, ?, ?, ?);'
            , firstname, lastname, username, password, email, date, date)
    },
    patchUser(id, firstname, lastname, username, email, password, date){
        return database.run('UPDATE users SET firstname = ?, lastname = ?, username = ?, email = ?, password = ?, update_at = ? WHERE id = ?'
        , firstname, lastname, username, email, password, date, id)
    },
    deleteUser(id){
        return database.run('DELETE FROM users WHERE id = ?;', id)
    }
  }