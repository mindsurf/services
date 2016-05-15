module.exports = function(sql){
    //model
    this.ideaModel = require('../model/ideaModel');
    
    /**
     * @method selectIdeasBellow
     * @param user_id
     * @param n Number of ideas to be selected
     * @param before_id If null, takes the last ideas
     * @param callback(ideaModel[])
     **/
    this.selectIdeasBellow = function(user_id,n,bellow_of_id,callback)
    {
        sql.query('CALL mindsurf.SELECT_IDEAS_BELLOW('+user_id+','+n+','+bellow_of_id+')', function(err, rows, fields)
        {
            if (err) throw err;
            else callback(rows[0]);
        });
    }
    
    /**
     * @method selectIdeasOntop
     * @param user_id
     * @param ontop_of_id
     * @param callback(ideaModel[])
     **/
    this.selectIdeasOntop = function(user_id,ontop_of_id,callback)
    {
        sql.query('CALL mindsurf.SELECT_IDEAS_ONTOP('+user_id+','+ontop_of_id+')', function(err, rows, fields)
        {
            if (err) throw err;
            else callback(rows[0]);
        });
    }
    
    /**
     * @method insertIdea
     * @param user_id
     * @param idea
     * @param reference
     * @param tag_id
     * @param callback()
     **/
    this.insertIdea = function(user_id,idea,reference,tag_id,callback)
    {
        sql.query('CALL mindsurf.INSERT_IDEA('+user_id+',"'+idea+'","'+reference+'",'+tag_id+')', function(err, rows, fields)
        {
            if (err) throw err;
            else callback();
        });
    }
    
    return this;
}
