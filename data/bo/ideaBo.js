module.exports = function(sql){
    //dao
    var ideaDao = require('../dao/ideaDao')(sql);
    //model
    this.ideaModel = ideaDao.ideaModel;
    
    /**
     * @method selectIdeasBellow_
     * @param user_id
     * @param n Number of ideas to be selected
     * @param bellow_of_id If null, takes the last ideas
     * @param success_callback( tagModel[] ) all user tags
     * @param err_callback( err )
    **/
    this.selectIdeasBellow_ = function (user_id,n,bellow_of_id,success_callback,err_callback)
    {
        try
        {
            ideaDao.selectIdeasBellow(
                user_id,
                n,
                bellow_of_id,
                success_callback);
        }
        catch (e)
        {
            err_callback(e);
        }
    }
    
    /**
     * @method selectIdeasOntop_
     * @param user_id
     * @param ontop_of_id If null, takes the last ideas
     * @param success_callback( tagModel[] ) all user tags
     * @param err_callback( err )
    **/
    this.selectIdeasOntop_ = function (user_id,ontop_of_id,success_callback,err_callback)
    {
        try
        {
            ideaDao.selectIdeasOntop(
                user_id,
                ontop_of_id,
                success_callback);
        }
        catch (e)
        {
            err_callback(e);
        }
    }
    
    /**
     * @method insertIdea_
     * @param user_id
     * @param idea
     * @param reference
     * @param tag_id
     * @param success_callback()
     * @param err_callback( err )
     **/
    this.insertIdea_ = function (user_id,idea,reference,tag_id,success_callback,err_callback)
    {
        try
        {
            ideaDao.insertIdea(
                user_id,
                idea,
                reference,
                tag_id,
                success_callback);
        }
        catch (e)
        {
            err_callback(e);
        }
    }
    
    return this;
}