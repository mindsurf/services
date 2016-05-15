module.exports = function(sql){
    //dao
    var tagDao = require('../dao/tagDao')(sql);
    //model
    this.tagModel = tagDao.tagModel;
    
    /**
     * @method selectUserTags
     * @param user_id
     * @param success_callback( tagModel[] ) all user tags
     * @param err_callback( err )
    **/
    this.selectUserTags = function (user_id,success_callback,err_callback)
    {
        try
        {
            tagDao.selectTags(
                user_id,
                success_callback);
        }
        catch (e)
        {
            err_callback(e);
        }
    }
    
    /**
     * possible actions:
     * <ul>
     * <li> <b>insert</b> { insert:true , color , tag } </li>
     * <li> <b>delete</b> { delete:true , id } </li>
     * <li> <b>update</b> { update:true , id , color , tag } </li>
     * </ul>
     * 
     * @method applyActions
     * @param user_id
     * @param actions
     * @param success_callback( tagModel[] ) all user tags
     * @param err_callback( err )
    **/
    this.applyActions = function(user_id,actions,success_callback,err_callback)
    {
        try
        {
            var count = actions.length;
            var callback= function(){
                count--;
                if(count<=0)
                    tagDao.selectTags(
                        user_id,
                        success_callback);
            }
            
            for(var i=0; i<actions.length; i++)
            {
                var action= actions[i];
                console.log(action)
                if(action.insert)
                {
                    tagDao.insertTag(
                        user_id,
                        action.color,
                        action.tag,
                        callback);
                }
                else if(action.delete)
                {console.log("in delete")
                    tagDao.deleteTag(
                        user_id,
                        action.id,
                        callback);
                }
                else if(action.update)
                {
                    tagDao.updateTag(
                        user_id,
                        action.id,
                        action.color,
                        action.tag,
                        callback);
                }
            }
        }
        catch (e)
        {
            err_callback(e);
        }
    }
    
    return this;
}