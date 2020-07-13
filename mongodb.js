// CRUD (create read update delete)

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;

const connectionURL = 'mongodb+srv://admin:ihpdgpcy@cluster0-udm5a.mongodb.net/<dbname>?retryWrites=true&w=majority';
const databaseName = 'task-manager';

// const id = new ObjectID();
// console.log(id.id);
// console.log(id.getTimestamp());

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!');
    }

    const db = client.db(databaseName);//不用提前创建，access的时候mongo就会自动创建名字为databaseName的collection

    db.collection('tasks').deleteOne({
        description: 'play'
    }).then(result => console.log(result))
    .catch(error => console.log(error))
    // db.collection('users').deleteMany({
    //     age: 100
    // }).then((result) => {
    //     console.log(result)
    // }).catch(error => console.log(error))
    // db.collection('tasks').updateMany(
    //     {
    //         completed: false
    //     },
    //     {
    //         $set: {
    //             completed: true
    //         }
    //     }).then((result) => console.log(result))
    //     .catch(err => console.log(err))
    // db.collection('users').updateOne(
    //     { 
    //     _id: new ObjectID('5f0410b8ba84745a26a9cb11') 
    //     },
    //     {
    //         // $set: {
    //         //     name: 'Mike'
    //         // }
    //         $inc: {
    //             age: 2
    //         }
    //     }).then((result) => {
    //         console.log(result)
    //     }).catch((error)=>console.log(error))

    // db.collection('users').findOne({ _id: new ObjectID('5f041338590bcc5cd88118ac') }, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch!');
    //     }

    //     console.log(user);
    // });

    // db.collection('users').find({ age: 100 }).toArray((error, users) => {
    //     console.log(users);
    // });

    // db.collection('users').find({ age: 100 }).count((error, count) => {
    //     console.log(count);
    // });


    // db.collection('tasks').findOne({ _id: new ObjectID('5f0415c646669a5d6aa1a919')}, (error, task) => {
    //     if (error) {
    //         return console.log('Unable to fetch!');
    //     }

    //     console.log(task);
    // });

    // db.collection('tasks').find({ completed: false }).toArray((error, task) => {
    //     if (error) {
    //         return console.log('Unable to fetch!');
    //     }

    //     console.log(task);
    // })
    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'QingQing',
    //     age: 20
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user');
    //     }
    //     console.log(result.ops);
    // });
    // db.collection('users').insertMany([
    //     {
    //         name: 'Qi',
    //         age: 22
    //     },
    //     {
    //         name: 'Wang',
    //         age: 28
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert documents!');
    //     }

    //     console.log(result.ops);
    // });

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'study',
    //         completed: true
    //     },
    //     {
    //         description: 'play',
    //         completed: false
    //     },
    //     {
    //         description: 'sleep',
    //         completed: false
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert tasks!');
    //     }

    //     console.log(result.ops);
    // })
})