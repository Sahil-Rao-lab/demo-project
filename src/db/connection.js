const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/demo-project").then(() => {
    console.log(`>>>> DB Connect Success <<<<`)
}).catch(err => console.log('>>> DB Connect Error >>>>', err))