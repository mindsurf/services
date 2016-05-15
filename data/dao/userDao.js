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
     * @param authorname
     * @param callback(userModel)
     **/
    this.insertUser = function(email,authorname,callback)
    {
        var query= "CALL mindsurf.INSERT_USER(\""+email+"\",\""+authorname+"\")";

        sql.query(query, function(err, rows, fields)
        {
            if (err) throw err;
            else callback(rows[0][0]);
        });
    }

    return this;
}
