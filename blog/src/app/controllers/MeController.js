import Course from '../../models/Course.js';
import User from '../../models/Users.js';

class MeController {
    //GET /me/stored/courses
    storedCourses(req, res, next) {
        Promise.all([Course.find().lean(),Course.countDocumentsWithDeleted({deleted: true}).lean()])
        .then(([course,deleteCourse])=> {
            res.render('me/stored-courses', {course,deleteCourse});
        }) 
        .catch((err) => {
            next(err);
        })
        
    }
    //[GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findWithDeleted({deleted:true}).lean()
        .then((course)=>{
            res.render('me/trash-courses', {course});
        })
        .catch(next);
    }
    //[GET] /me/prfile
    
    profileMe(req, res, next ) {
        const userEmail = req.user.email;
        if(!req.user|| !req.user.email) {
            return res.status(401).send(' user not authenticated');// chưa được conform
        }
        User.findOne({email:userEmail}).lean()
        .then((user) => {
            if(!user) {
                return res.status(404).send(' user not found');// user không có
            }
            res.render('me/show-profile', {user});
        })
        .catch(next);
    }
    //POST /me/profile/numberphone
    profileNumberPhone(req, res, next) {
        const { phoneNumber} = req.body;

        if(!phoneNumber) {
           return res.status(400).send('Please enter a phone number');
        }

        User.updateOne({ email: req.user.email },{phoneNumber})
        .then( ()=> {
            res.redirect('back');
        })
        .catch(next);
    }

}   

export default new MeController();