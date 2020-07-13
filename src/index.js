const express = require('express');

require('./db/mongoose');// We don't want to grab anything from that file, we just want mongoose.js to run and connect to the DB

const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT;


// const multer = require('multer');
// const upload = multer({
//     dest: 'images',//会自动在项目路径下创建images的文件夹
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb) {
//         //if (!file.originalname.endsWith('.pdf')) {
//         if (!file.originalname.match(/\.(doc|docx)$/)) {
//             return cb(new Error('Please upload a Word document!'))
//         }

//         cb(undefined, true);
//     }
// });
// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send();
// }, (error, req, res, next) => { //Error-handling middleware always takes four arguments
//     res.status(400).send({error: error.message});
// });

// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET method is disabled.')
//     } else {
//         next();
//     }
    
// });

// app.use((req, res, next) => {
//     res.status(503).send('The server is under maintenance.');
// })

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});