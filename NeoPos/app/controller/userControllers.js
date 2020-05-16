let user={
     new: (req,res)=>{
          res.render('user')
     },
     newadmin: (req,res)=>{
          res.render('useradmin')
     },
}

module.exports= user;