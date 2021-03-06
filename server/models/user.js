// Load required packages
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// Define our User schema
var UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, index:{unique: true}},
  password: { type: String, required: true },
  mobilePhone: { type: String, required: true },
  card:{
  	number:{type: Number},
  	holderName:{type:String},
  	ExpireDate:{type:String}
  },
  address:{
  	streetAddress:{type:String},
  	city:{type:String},
  	state:{type:String},
  	zipcode:{type:Number}
  },

  dateCreated: { type: Date, default: Date.now }
});


UserSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);
