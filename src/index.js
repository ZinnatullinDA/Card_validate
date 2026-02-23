import amex from './assets/amex.png'
import diners from './assets/diners.png'
import mastercard from './assets/mastercard.png'
import mir from './assets/mir.png'
import visa from './assets/visa.png'
import { CardWidget } from './js/widget.js'
import './css/style.css'

const root = document.getElementById('card-widget')

const widget = new CardWidget(root, {
  visa,
  mastercard,
  amex,
  diners,
  mir,
})

widget.init()
