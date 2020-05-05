const mongoose = require('mongoose');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://donald:donaldvoting@voting-6ftuk.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
.then( () => console.log('mongodb is connected') )
.catch(err => console.log(err));