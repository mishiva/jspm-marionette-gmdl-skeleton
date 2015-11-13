{ AbstractPageView } = require './AbstractPageView.coffee!'

class AboutPageView extends AbstractPageView
  className:  'p-about ' + AbstractPageView::className
  template: require './AboutPageView.jade!'


module.exports = { AboutPageView }
