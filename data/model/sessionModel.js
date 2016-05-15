module.exports = function Model(user,visitor)
{
    this.mode = (user && user.authorname) ? "user" : "visitor";
    this.visitor = visitor;
    this.user = user;
    this.lang = undefined;
}