Backbone = require 'backbone'
require 'marionette'

{ AppView } = require './AppView.coffee!'

PAGES =
  index:
    View: (require 'Pages/IndexPageView.coffee!').IndexPageView
  create: (id) ->
    new (PAGES[id].View)


class PagesController
  constructor: ( @app ) ->

  index: ->
    @app.showPage 'index'

  default: ->
    @app.router.navigate '',
      replace: true
      trigger: true


class Application extends Backbone.Marionette.Application
  initialize: =>
    @router = new Backbone.Marionette.AppRouter
    pagesController = new PagesController this
    @router.processAppRoutes pagesController,
      '': 'index'
      '*default': 'default'

    @on 'start', ->
      @appView = new AppView
      @appView.render()
      Backbone.history.start()

  showPage: (pageId) ->
    pv = PAGES.create(pageId)
    if pv
      @appView.getRegion('content').show pv

  showModal: (type, options={}) ->
#    if @dataModel.get('key') != 'false'
#      modalView = MODALS.create(type, options)
#      if modalView
#        @appView.getRegion('modal').show modalView
#        modalView
#    else
    false

  closeModal: ->
#    @appView.getRegion('modal').empty()

module.exports = { Application }
