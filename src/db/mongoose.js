const mongoose = require('mongoose');

// the srv copoied from MongoDB Atlas is as following, remember to modify the <password> and <dbname>
//'mongodb+srv://admin:<password>@cluster0-udm5a.mongodb.net/<dbname>?retryWrites=true&w=majority';
const dbURI = process.env.MONGODB_URL;

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});



// const me = new User({
//     name: 'Shuke ',
//     email: 'shukeH@126.com',
//     password: 'wedpatsword',
//     age: 1 // if you change it to '18', it also works 
// });

// me.save().then((me) => {
//     console.log(me);
// }).catch((error) => console.log(error));




// const task = new Task({
//     description: 'Sleep',
//     completed: false
// });

// task.save().then(() => console.log(task))
//     .catch(err => console.log(err));
