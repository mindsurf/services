module.exports = function(dataLayer,server){

    /**
     * @method /tag/all
     * @uses post
     **/
    server.route('/tag/all')
      .post(function(req, res)
      {
        dataLayer.tagBo.selectUserTags(req.session.user.id,
            function(tags){
                res.json({ success:true, tags: tags });
            },
            function(err){
                res.json({ success: false, error: err.message });
            });
      });

      /**
     * @method /tag/apply/actions
     * @uses post
     **/
    server.route('/tag/apply/actions')
      .post(function(req, res)
      {
        dataLayer.tagBo.applyActions(req.session.user.id,req.body.actions,
            function(tags){
                res.json({ success:true, tags: tags });
            },
            function(err){
                res.json({ success: false, error: err.message });
            });
      });

    return this;
}
