module.exports = {
    index: async (req, res) => {
try {
    res.render('index', {
        title: 'budiman express'
    })
} catch (error) {
    console.log(error)
}
    }
}