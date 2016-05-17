module.exports = function(dataLayer,server){
    server.use(function (req, res, next)
    {
        if(!req.session.state)
            req.session= new dataLayer.userModel();
        next();
    });

    /**
     * @method /user/register
     * @uses post
     **/
    server.route('/user/register')
      .post(function(req, res)
      {
        if(!req.session.email)
        {
            res.json({ success: false , message: "Error: Please authenticate" });
        }
        else dataLayer.userBo.register(req.session.user.email,req.body.authorname,
            function(userObj){
                req.session.mode= "user";
                req.session.user= userObj;
                res.json({ success: true, redir:"/" });
            },
            function(error_message){
                res.json({ success: false , message: error_message });
            });
      });

    /**
     * @method /user/verify
     * @uses post
     **/
    server.route('/user/verify')
      .post(function(req, res)
      {
        dataLayer.userBo.verify(req.body.assertion,
            function(userObj){
                var redir= false;

                if(!req.session.id || req.session.id!=userObj.id)
                  switch(userObj.state)
                  {
                    case 'V':
                      redir="/register";
                    break;

                    case 'U':
                      redir="/";
                    break;

                    //default: resolve?
                  }

                req.session= userObj;
                res.json({ success: true , redir:redir , session:req.session });
            },
            function(error_message){
                res.json({ success: false , message: error_message });
            });
      });

    /**
     * @method /user/logout
     * @uses post
     **/
    server.route('/user/logout')
      .post(function(req, res)
      {
        var redir= req.session.email ? "/" : false;
        req.session= new dataLayer.userModel();
        res.json({ success: true , redir:redir , session:req.session });
      });

    return this;
}
