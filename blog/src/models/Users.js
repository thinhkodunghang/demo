import Mongoose from "mongoose";

const schema = Mongoose.Schema;

const userSchema = new schema({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    email: {type: String, required: true, unique: true}, 
    phoneNumber: {type: String, required: true},
    gender: {type: String, required: true},
    password: {type: String, required: true}
});
const User = Mongoose.model('User', userSchema);
export default User;
