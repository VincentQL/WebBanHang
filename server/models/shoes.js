const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var mongoose_delete = require('mongoose-delete');


const slug = require('mongoose-slug-generator');
mongoose.plugin(slug)



const Shoes = new Schema({
    name: {
        type: String,
        require: true
    },
    type: {
        type: String
    },
    status: {
        type: Boolean,
    },
    price: {
        type: String,
    },
    sale: {
        type: String
    },
    img: {
        type: String
    },
    currentQuantity: {
        type: Number
    },
    currentSold: {
        type: Number
    },

    size: {
        type: String
    },
    color: {
        type: String
    },
    date: {
        type: String
    },
    updateDate: {
        type: String
    }



}, {

    timestamps: true
});




var mongoose_delete = require('mongoose-delete');
Shoes.plugin(mongoose_delete);
Shoes.plugin(mongoose_delete, { overrideMethods: 'all' });

module.exports = mongoose.model('Shoes', Shoes, 'shoes');