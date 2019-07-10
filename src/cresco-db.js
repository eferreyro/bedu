const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/cresco-db', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
.then(db => console.log('Sistema CRESCO conectado a la BD'))
.catch(err => console.error(err));
