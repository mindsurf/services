module.exports = function(sql){
    //model
    this.tagModel = require('../model/tagModel');
    
    /**
     * @method selectTags
     * @param user_id
     * @param callback(tagModel[])
     **/
    this.selectTags = function(user_id,callback)
    {
        sql.query('CALL mindsurf.SELECT_TAGS("'+user_id+'")', function(err, rows, fields)
        {
            if (err) throw err;
            else callback(rows[0]);
        });
    }
    
    /**
     * @method insertTag
     * @param user_id
     * @param color
     * @param tag
     * @param callback()
     **/
    this.insertTag = function(user_id,color,tag,callback)
    {
        sql.query('CALL mindsurf.INSERT_TAG("'+user_id+'","'+color+'","'+tag+'")', function(err, rows, fields)
        {
            if (err) throw err;
            else callback();
        });
    }
    
    /**
     * @method deleteTag
     * @param user_id
     * @param id
     * @param callback()
     **/
    this.deleteTag = function(user_id,id,callback)
    {
        sql.query('CALL mindsurf.DELETE_TAG("'+user_id+'","'+id+'")', function(err, rows, fields)
        {
            if (err) throw err;
            else callback();
        });
    }
    
    /**
     * @method updateTag
     * @param user_id
     * @param id
     * @param color
     * @param tag
     * @param callback()
     **/
    this.updateTag = function(user_id,id,color,tag,callback)
    {
        sql.query('CALL mindsurf.UPDATE_TAG("'+user_id+'","'+id+'","'+color+'","'+tag+'")', function(err, rows, fields)
        {
            if (err) throw err;
            else callback();
        });
    }
    
    return this;
}
