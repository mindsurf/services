module.exports = function(sql,request){
    //dao
    var userDao = require('../dao/userDao')(sql);
    //model
    this.userModel = userDao.userModel;

    /**
     * @method reset
     * @param user
     **/
    this.reset = function (user)
    {
        user.id = undefined;
        user.email = undefined;
        user.authorname = undefined;
        user.state = undefined;
    }

    /**
     * @method activate
     * @param id
     * @param authorname
     * @param success_callback(userModel)
     * @param err_callback(message)
     **/
    this.activate = function (id,authorname,success_callback,err_callback)
    {
        try
        {
            userDao.activateUser(authorname, function(userObj)
            {
                success_callback(userObj);
            });
        }
        catch (e)
        {
            err_callback("Error: Unexpected error");
        }
    }

    /**
     * @method assertion
     * @param success_callback(userModel)
     * @param err_callback(message)
     **/
    this.verify = function (assertion,success_callback,err_callback)
    {
        try
        {
            request.post(
                {
                    url: 'https://verifier.login.persona.org/verify',
                    json:
                    {
                        assertion: assertion,
                        audience: APP_AUDIENCE
                    }
                },
                function(e, r, body)
                {
                    if(body && body.email)
                    {
                        userDao.selectUser(body.email, function(userObj)
                        {
                            if(userObj)
                                success_callback(userObj);
                            else
                            userDao.insertUser(body.email, function(userObj)
                            {
                                success_callback(userObj);
                            });
                        });
                    }
                    else
                    {
                      err_callback("Error: Authentication failed");
                    }
                });
        }
        catch (e)
        {
            err_callback("Error: Unexpected error");
        }
    }

    return this;
}
