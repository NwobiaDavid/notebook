// GET homepage
exports.homepage = async (req,res)=>{
    const locals ={
        title:"NoteBook",
        description: "A NodeJs Note App"
    }

    res.render('index', locals);
};


//GET about
exports.about = async (req,res)=>{
    const locals ={
        title:"About - NoteBook",
        description: "A NodeJs Note App"
    } 

    res.render('about', locals);
};