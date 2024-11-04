/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

// Remember to *always lazy load controllers*, otherwise hot module reload won't work
const DrawsController = () => import('#controllers/draws_controller')
const ColorsController = () => import('#controllers/colors_controller')

// Colors
router.get('/colors.css', [ColorsController])

// Home
router.get('/', [DrawsController, 'index'])
router.get('/create', [DrawsController, 'create'])
router.post('/create', [DrawsController, 'store'])
router.get('/draws/:idPin', [DrawsController, 'show'])
