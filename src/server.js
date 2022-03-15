const express = require('express');
require('./db/connection')
const app = express();
const port = process.env.PORT || 9000
const Product = require('./model/product')

app.use(express.json())

// DISPLAY ALL DOUCMENTS IN COLLECTIONS
app.get('/', async (req, res) => {
    let data = await Product.find();
    res.send({ success: true, data: data })
})

// 1. SINGLE MONGODB QUERY TO GET COUNT OF TAG SPECIAL AND MAXIMUM RATING OF PRODUCT WHERE TAG SPECIAL HAVE TRUE 
app.post('/firstApi', async (req, res) => {
    let id = req.body.productID;
    let data = await Product
        .find({ $and: [{ _id: { $nin: [id] } }, { TagSpecial: true }] })
        .sort({ Rating: +1 })
    res.status(200).send({ success: true, data: data, count_of_tagspecial_true_is: data.length, max_rating_product_name: data[data.length - 1].Name })
})

// 2. MONGODB QUERYTO UPDATE THE TAGGING OF GIVE PRODUCTID
app.post('/secondApi', async (req, res) => {
    let id = req.body.productID;
    let year = req.body.year;

    let data = await Product
        .updateOne({ _id: id }, { $set: { Tagging: { year: year } } })
    res.status(200).send({ success: true, data: data })
})

// 3. MONGODB QUERY TO REMOVE TAGGING WHICH IS GREATER THAN THE GIVEN YEAR
app.post('/thirdApi', async (req, res) => {
    let id = req.body.productID;
    let year = req.body.year;
    let data = await Product
        .find({ _id: id })
        .select({ _id: 0, Tagging: 1 })
    let yearArray = data[0].Tagging[0].year;
    let sortYearArray = yearArray.sort((a, b) => a - b);
    let newArray = []
    for (let x of sortYearArray) {
        if (x > year) {
            newArray.push(x)
        }
    }
    if (newArray.length == 0) {
        res.status(200).send({ success: true, message: "Nothing to change" })
    } else {
        let updateYear = await Product
            .updateOne({ _id: id }, { $set: { Tagging: { year: newArray } } })
        res.status(200).send({ success: true, message: "Db Tagging Year Updated" })
    }

})


app.listen(port, (err) => {
    if (err) return console.log(`>>> Server Error >>>`, err)
    console.log(`>>>> Server is Running at http://127.0.0.1:${port}`)
})