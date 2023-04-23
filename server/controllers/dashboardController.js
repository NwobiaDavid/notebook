// GET dashboard
exports.dashboard = async (req,res)=>{
    const locals ={
        title:"Dashboard",
        description: "A NodeJs Note App"
    }

    res.render('dashboard/index', {
        locals,
        layout: '../views/layouts/dashboard'
    });
};
