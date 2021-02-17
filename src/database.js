const mongoose = require('mongoose');
const mongodbURI = 'mongodb+srv://alberth:1234@tasks.r3uue.mongodb.net/Tasks?retryWrites=true&w=majority';

mongoose.connect(mongodbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
 .then(db => console.log("BD is connected"))
 .catch(err => console.log("Error  connect to BD"));