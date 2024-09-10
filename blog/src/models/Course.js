import Mongoose from "mongoose";
import slug from "mongoose-slug-updater";

import  MongooseDelete from 'mongoose-delete';

const Schema = Mongoose.Schema;


const Course = new Schema({
  name: {type: String, required: true },
  description: {type: String, required: true },
  img: {type: String },
  slug: {type: String, slug: 'name', unique:true },
  videoid: {type: String }
}, {timestamps: true});

//add plugins
Mongoose.plugin(slug);
Course.plugin(MongooseDelete,{
   overrideMethods: 'all',
   deletedAt: true,
   });

const course = Mongoose.model('Course', Course);
export default course;