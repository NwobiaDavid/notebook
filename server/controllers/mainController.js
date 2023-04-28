// GET homepage
exports.homepage = async (req,res)=>{
    const locals ={
        title:"NoteBook",
        description: "A NodeJs Note App"
    }

    res.render('index', {
        locals,
        layout: '../views/layouts/front-page.ejs'
    });
};


//GET about
exports.about = async (req,res)=>{
    const locals ={
        title:"About - NoteBook",
        description: "A NodeJs Note App"
    } 

    res.render('about', locals);
};

// GET features
exports.features = async (req,res)=>{
    const locals ={
        title:"Features - NoteBook",
        description: "A NodeJs Note App"
    } 

    res.render('features', locals);
}

// GET faq
exports.faq = async (req,res)=>{
    const locals ={
        title:"FAQ's - NoteBook",
        description: "A NodeJs Note App"
    } 

    res.render('faq', locals);
}