const organController = require('../controllers/organController');

const routes = [
    {
        method:'POST',
        url:'/organs',
        handler:organController.postOrgan
    },
    {
        method:'GET',
        url:'/organ/:id',
        handler:organController.getOrgbyId
    }
]

module.exports = routes;