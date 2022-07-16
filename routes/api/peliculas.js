const express = require('express');
const router = express.Router();
const moviesController = require('../../controllers/moviesController')

//Creacion
router.post('/', moviesController.store);

//Lectura
router.get('/', moviesController.list);

//Detalle
router.get('/:id', moviesController.show);

//Actualizacion
router.get('/editar/:id', moviesController.editar);
router.post('/editar/:id', moviesController.actualizar);

//Buscar
router.get('/search', moviesController.search);

//Borrado
router.delete('/:id', moviesController.delete);

module.exports = router;