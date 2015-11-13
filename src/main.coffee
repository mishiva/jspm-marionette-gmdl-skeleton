#require 'material-design-lite/material.css!'
require 'jquery'

{ Application } = require 'Application/Application.coffee!'

$ -> (window.app = new Application).start()
