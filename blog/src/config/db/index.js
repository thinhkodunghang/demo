import Mongoose from "mongoose";
const mongoose = Mongoose;

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/thinhmomo_course_nodejs');
        console.log("connect succeeded");

    } catch (error) {
        console.log("connect failed");
    }
};


export default {connect};