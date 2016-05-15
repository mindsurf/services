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
    }

    /**
     * @method register
     * @param email
     * @param authorname
     * @param success_callback(userModel)
     * @param err_callback(message)
     **/
    this.register = function (email,authorname,success_callback,err_callback)
    {
        try
        {
            userDao.selectUser(email, function(userObj)
            {
                if(userObj)
                    err_callback("Error: This user already exists");
                else userDao.insertUser(email,authorname,function(userObj)
                {
                    if(userObj)
                        success_callback(userObj);
                    else
                        err_callback("Error: Unexpected error");
                });
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
                            {
                                var user = new userDao.userModel();
                                user.email = body.email;
                                success_callback(user);
                            }
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
