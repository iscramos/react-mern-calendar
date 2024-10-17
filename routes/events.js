
/*
    Rutas de eventos 
    host + /api/events
*/

const { Router } = require("express");
const { validarJWT } = require('../middlewares/validar-jwt')
const { obtenerEventos, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/events");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require("../helpers/isDate");
const router = Router();

// todas tienen que pasar por la validación del token
router.use( validarJWT );

// obtener eventos
router.get('/', obtenerEventos)

// crear evento
router.post(
    '/', 
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ],
    crearEvento)

// crear evento
router.put('/:id', actualizarEvento)

// crear evento
router.delete('/:id', eliminarEvento)

module.exports = router;