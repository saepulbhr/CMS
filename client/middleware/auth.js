exports.isLoggedIn = (req, res, next) => {
    if(localStorage.getItem('token')){
        next()
    }
    else{
        res.redirect('/login')
    }
}