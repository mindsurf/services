module.exports = function(sql){
    //model
    this.userModel = require('../model/userModel');

    /**
     * @method selectUser
     * @param email
     * @param callback(userModel)
     **/
    this.selectUser = function(email,callback)
    {
        sql.query('CALL mindsurf.SELECT_USER("'+email+'")', function(err, rows, fields)
        {
              if (err) throw err;
              else callback(rows[0][0]);
        });
    }

    /**
     * @method insertUser
     * @param email
     * @param callback(userModel)
     **/
    this.insertUser = function(email,callback)
    {
        var query= "CALL mindsurf.INSERT_USER(\""+email+"\")";

        sql.query(query, function(err, rows, fields)
        {
            if (err) throw err;
            else callback(rows[0][0]);
        });
    }

    /**
     * @method activateUser
     * @param id
     * @param authorname
     * @param callback(userModel)
     **/
    this.activateUser = function(id,authorname,callback)
    {
        var query= "CALL mindsurf.ACTIVATE_USER(\""+id+"\",\""+authorname+"\")";

        sql.query(query, function(err, rows, fields)
        {
            if (err) throw err;
            else callback(rows[0][0]);
        });
    }

    return this;
}
