module.exports = {
    register: (req, res, next) =>{
        res.status(200).json({
            name: 'Suoi Nguon',
            price: 200
        })
    }
}