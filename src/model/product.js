const mongoose = require('mongoose');

// SCHEMA HERE
const taggingSchema = new mongoose.Schema({
    year: [Number]
})

const productSchema = new mongoose.Schema({
    Name: String,
    Description: String,
    TagSpecial: Boolean,
    Rating: Number,
    Tagging: [taggingSchema]
})

// PRODUCT MODEL HERE
const Product = new mongoose.model('Product', productSchema);


// ADDING DOUCMENTS TO PRODUCT COLLECTION HERE
const addData = async () => {
    try {
        const product1 = new Product({
            Name: "car",
            Description: "here is some description",
            TagSpecial: true,
            Rating: 5,
            Tagging: [{
                year: [2001, 2002, 2003, 2004, 2005, 2010, 2011],
            }]
        });
        const product2 = new Product({
            Name: "bike",
            Description: "here is some description",
            TagSpecial: false,
            Rating: 3,
            Tagging: [{
                year: [2001, 2002, 2003, 2004, 2005, 2010, 2011],
            }]
        });
        const product3 = new Product({
            Name: "cycle",
            Description: "here is some description",
            TagSpecial: true,
            Rating: 7,
            Tagging: [{
                year: [2001, 2002, 2003, 2004, 2005, 2010, 2011],
            }]
        });
        const product4 = new Product({
            Name: "bus",
            Description: "here is some description",
            TagSpecial: true,
            Rating: 10,
            Tagging: [{
                year: [2001, 2002, 2003, 2004, 2005, 2010, 2011],
            }]
        });

        await Product.insertMany([product1, product2, product3, product4]);
    } catch (error) {
        console.log('>>>> Error In Adding Data >>>>>', error)
    }
}
addData();

module.exports = Product;