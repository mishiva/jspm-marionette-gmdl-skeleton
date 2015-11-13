{ AbstractPageView } = require './AbstractPageView.coffee!'
Backbone = require 'backbone'


class IndexPageView extends AbstractPageView
  className:  'p-index ' + AbstractPageView::className
  template: require './IndexPageView.jade!'


module.exports = { IndexPageView }
