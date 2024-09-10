
import { request } from 'express';
import course from '../../models/Course.js';
const Course = course;

class CourseController {
    //[GET] /courses/create
    show(req, res, next) { 
        Course.findOne({ slug: req.params.slug}).lean()
        .then(course => {
            res.render('courses/show', {course});
        })
        .catch(next);
    }
    //[GET] /courses/create

    create(req, res, next) {
        res.render('courses/create');
    }
    //[POST] /courses/store
    async store(req, res, next) {
        //create new course before saving it to database
        const course = new Course(req.body);
        await course.save()
            .then(() => {
                res.redirect('/');
            })
            .catch(err => {
                next(err);
            });
    }
    //[GET] courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id).lean()
            .then(course => {
                res.render('courses/edit', {course})
            })
            .catch(next);
    }
    //[PUT] courses/:id/
    update(req, res, next) {
        Course.updateOne({_id:req.params.id},req.body).lean()
            .then(course => {
                res.redirect('/me/stored/courses')
            })
            .catch(next);
    }
    //[DELETE] courses/:id/
    delete(req, res, next) {
        Course.delete({_id: req.params.id}).lean()
        .then(()=> {
            res.redirect('back');
        })
        .catch(next); 
    }
    //[PATCH] courses/:id/restore

    restore(req, res,next) {
        Course.restore({_id:req.params.id})
        .then(()=> {
            
            res.redirect('back');
        })
        .catch(next);
    }
    //[DELETE] courses/:id/force
    forceDelete(req, res, next) {
        Course.deleteOne({_id:req.params.id})
        .then(()=> {
            res.redirect('back');
        })
        .catch(next);
    }
    //[POST] courses/handleFormAction
    handleFormAction(req, res, next) {
        switch(req.body.action) {
            case 'delete':
                // toán tử $in use timf các document có value cụ thể of array và nó dùng để
                // thao tác nhiều data cùng lúc
                Course.delete({_id: {$in:req.body.courseIds}})
                .then(()=> {
                    res.redirect('back');
                })
                .catch(next);
                break;

            // default:
            //     res.json(req.body);
        }
    }
}

export default new CourseController();