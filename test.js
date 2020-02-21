const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');
mongoose.connect('mongodb://localhost/my_database',{useNewUrlParser:true});

/*BlogPost.create({
    title: "Min bog",
    body: 'Jeg elsker fire emblem'}
    ,(error,blogpost)=>{
    console.log(error,blogpost)
});

BlogPost.find({},(error, blogspot)=>{
    console.log(error, blogspot)
});

BlogPost.find({
    title:"Min bog"}, (error,blogpost)=>{
    console.log(error,blogpost)
});

BlogPost.find({
    title:/The/}, (error,blogspot)=>{
    console.log(error,blogspot)
});
*/
var id = "5e4afafa80cc732c2c04f135";

BlogPost.findById(id, (error,blogspot) =>{
    console.log(error,blogspot)
});


BlogPost.findByIdAndDelete(id,(error,blogspot)=>{
    console.log(error,blogspot)
});