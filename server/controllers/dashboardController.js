const Note = require('../models/Notes');
const mongoose = require('mongoose');


// GET dashboard
exports.dashboard = async (req,res)=>{

const locals ={
        title:"Dashboard",
        description: "A NodeJs Note App"
    }

   
    // Note.insertMany([
    //     {user:"64483f507e47be1286906b38" , title:"test 1", body:"some random text i'm randomly typing", createdAt: '2023-04-25T21:00:00.088+00:00'},
    //     {user:"64483f507e47be1286906b38" , title:"test 2", body:"another random text i'm randomly typing", createdAt: '2023-04-25T21:00:00.088+00:00'}
    // ])
    // .then(()=>{console.log('successfully inserted');})
    // .catch(err=>{console.log(err);});

    try {
       const notes = await Note.find();
       
 res.render('dashboard/index', {
        userName: req.user.firstName,
        image: req.user.profileImage,
        locals,
        notes,
        layout: '../views/layouts/dashboard'
    });
   

    } catch (error) {
        console.log(err);
    }
    
};
