module.exports = function(dataLayer,server){
    server.use(function (req, res, next)
    {
        if(!req.session.mode)
            req.session= new dataLayer.sessionModel(false,"visitor");
        next();
    });

    /**
     * @method /user/register
     * @uses post
     **/
    server.route('/user/register')
      .post(function(req, res)
      {
        if(!req.session.user.email)
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
                if(userObj.id)
                {
                    if(!req.session.user.id || req.session.user.id!=userObj.id)
                        redir= "/";
                }
                else
                {
                    if(!req.session.user.email || req.session.user.email!==userObj.email)
                        redir= "/register";
                }

                req.session.user= userObj;
                req.session.mode= userObj.id ? "user":"visitor";

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
        var redir= req.session.user.email ? "/overview" : false;
        req.session.mode= "visitor";
        dataLayer.userBo.reset(req.session.user);
        res.json({ success: true , redir:redir , session:req.session });
      });

    return this;
}
