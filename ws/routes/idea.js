module.exports = function(dataLayer,server){

    /**
     * @method /idea/last/:n
     * @uses post
     **/
    server.route('/idea/last/:n')
      .post(function(req, res)
      {
        dataLayer.ideaBo.selectIdeasBellow_(req.session.user.id,req.params.n,null,
        function(ideas){
            res.json({ success:true, ideas: ideas });
        },function(err){
            res.json({ success: false, error: err.message });
        });
      });

    /**
     * @method /idea/:n/older/than/:id
     * @uses post
     **/
    server.route('/idea/:n/older/than/:id')
      .post(function(req, res)
      {
        dataLayer.ideaBo.selectIdeasBellow_(req.session.user.id,req.params.n,req.params.id,
        function(ideas){
            res.json({ success:true, ideas: ideas });
        },function(err){
            res.json({ success: false, error: err.message });
        });
      });

    /**
     * @method /idea/top/of/:id
     * @uses post
     **/
    server.route('/idea/top/of/:id')
      .post(function(req, res)
      {
        dataLayer.ideaBo.selectIdeasOntop_(req.session.user.id,req.params.id,
        function(ideas){
            res.json({ success:true, ideas: ideas });
        },function(err){
            res.json({ success: false, error: err.message });
        });
      });

    /**
     * @method /idea/insert
     * @param body {idea,reference,tag_id,top_idea_id}
     * @uses post
     **/
    server.route('/idea/insert')
      .post(function(req, res)
      {
        dataLayer.ideaBo.insertIdea_(req.session.user.id,req.body.idea,req.body.reference,req.body.tag_id,
        function(ideas){
            if(req.body.top_idea_id)
                dataLayer.ideaBo.selectIdeasOntop_(req.session.user.id,req.body.top_idea_id,
                function(ideas){
                    res.json({ success:true, ideas: ideas });
                },function(err){
                    res.json({ success: false, error: err.message });
                });
            else
                res.json({ success:true });
        },function(err){
            res.json({ success: false, error: err.message });
        });
      });

    return this;
}
