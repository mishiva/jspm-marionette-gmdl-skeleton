Backbone = require 'backbone'


class AppView extends Marionette.LayoutView
  template: require './AppView.jade!'
  el: "#app-viewport"

  ui:
    rContent: '.r-content'

  regions:
    content: '@ui.rContent'


module.exports = { AppView }
