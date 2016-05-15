module.exports = function(mysql,request){

    //my sql connection
    this.sql = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'toor'
    });

    sql.connect();

    //model
    this.sessionModel = require('./model/sessionModel');

    //bussiness objects
    this.userBo = require('./bo/userBo')(sql,request);
    this.tagBo = require('./bo/tagBo')(sql);
    this.ideaBo = require('./bo/ideaBo')(sql);

    console.log("Data Layer Up");
    return this;
}
