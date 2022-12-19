import Route from '@ioc:Adonis/Core/Route'

Route.get('/serv00.htm', async () => {
  return '120 -1 -1 -1 -1 -1 -1 -1 -1 -1'
})

Route.group(() => {
  Route.get('/', async () => ({ statusCode: 200, message: 'Apology API' }))
  Route.get('/guilds/marks', 'GuildsController.guildmarks').as('guildmarks')
  Route.any('/callback-picpay', 'DonatesController.callbackPicpay').as('callbackPicpay')
  Route.any('/callback-mercadopago', 'DonatesController.callbackMercadopago').as('callbackMercadopago')

  Route.group(() => {
    Route.get('/ranking-beta-closed', 'CharactersController.rankingBetaClosed').as(
      'ranking-beta-closed'
    )
    Route.get('/ranking-beta-opened', 'CharactersController.rankingBetaOpened').as(
      'ranking-beta-opened'
    )
    Route.get('/ranking-live', 'CharactersController.rankingLive').as('ranking-live')
    Route.get('/check-items', 'CharactersController.items').as('check-items')
  })
    .as('characters')
    .prefix('/characters')

  Route.group(() => {
    Route.group(() => {
      Route.post('/auth', 'UsersController.auth').as('auth')
      Route.post('/register', 'UsersController.register').as('register')
      Route.post('/recovery', 'UsersController.recovery').as('recovery')
      Route.patch('/recovery', 'UsersController.recoveryToken').as('recoveryToken')
    })
      .as('users')
      .prefix('/users')
      .middleware(['recaptcha'])

    Route.group(() => {
      Route.get('/all', 'NewsController.all').as('all')
      Route.get('/getBySlug/:slug', 'NewsController.getBySlug').as('getBySlug')
    })
      .as('news')
      .prefix('/news')

    Route.group(() => {
      Route.get('/all', 'PackagesController.all').as('all')
      Route.get('/getBySlug/:slug', 'PackagesController.getBySlug').as('getBySlug')
    })
      .as('packages')
      .prefix('/packages')
  }).as('guest')

  Route.group(() => {
    Route.group(() => {
      Route.put('/refresh', 'UsersController.refresh').as('refresh')
      Route.patch('/update', 'UsersController.update').as('update')
      Route.delete('/logout', 'UsersController.logout').as('logout')
      Route.post('/token', 'UsersController.token').as('token')
    })
      .as('users')
      .prefix('/users')

    Route.group(() => {
      Route.put('/guildmark', 'GuildsController.guildmark').as('guildmark')
      Route.get('/guild', 'GuildsController.guild').as('guild')
    })
      .as('guilds')
      .prefix('/guilds')

    Route.group(() => {
      Route.get('/paginate', 'DonatesController.paginate').as('paginate')
      Route.post('/create', 'DonatesController.create').as('create')
    })
      .as('donates')
      .prefix('/donates')

    Route.group(() => {
      Route.group(() => {
        Route.post('/create', 'PackagesController.create').as('create')
        Route.delete('/delete/:slug', 'PackagesController.delete').as('delete')
        Route.put('/update/:slug', 'PackagesController.update').as('update')
      })
        .as('packages')
        .prefix('/packages')

      Route.group(() => {
        Route.post('/create', 'NewsController.create').as('create')
        Route.put('/update/:slug', 'NewsController.update').as('update')
        Route.delete('/delete/:slug', 'NewsController.delete').as('delete')
      })
        .as('news')
        .prefix('/news')
    })
      .as('admin')
      .middleware(['admin'])
  })
    .as('authenticated')
    .middleware(['auth'])
}).prefix('v1')
