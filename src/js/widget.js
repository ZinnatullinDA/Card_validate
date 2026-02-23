import { isValidLuhn } from './luhn.js'
import { detectPaymentSystem } from './paymentSystem.js'

export class CardWidget {
  constructor(rootEl, assets) {
    this.rootEl = rootEl
    this.assets = assets

    this.brandsEl = this.rootEl.querySelector('#brands')
    this.inputEl = this.rootEl.querySelector('#card-number')
    this.btnEl = this.rootEl.querySelector('#validate-btn')
    this.resultEl = this.rootEl.querySelector('#result')

    this.onInput = this.onInput.bind(this)
    this.onValidate = this.onValidate.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
  }

  init() {
    const imgs = Array.from(this.brandsEl.querySelectorAll('img[data-brand]'))
    imgs.forEach((img) => {
      const brand = img.dataset.brand
      if (this.assets[brand])
        img.src = this.assets[brand]
    })

    this.inputEl.addEventListener('input', this.onInput)
    this.btnEl.addEventListener('click', this.onValidate)
    this.inputEl.addEventListener('keydown', this.onKeyDown)

    this.renderBrand(null)
    this.renderResult(null)
  }

  destroy() {
    this.inputEl.removeEventListener('input', this.onInput)
    this.btnEl.removeEventListener('click', this.onValidate)
    this.inputEl.removeEventListener('keydown', this.onKeyDown)
  }

  onInput() {
    const brand = detectPaymentSystem(this.inputEl.value)
    this.renderBrand(brand)
    this.renderResult(null)
  }

  onKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      this.onValidate()
    }
  }

  onValidate() {
    const ok = isValidLuhn(this.inputEl.value)
    this.renderResult(ok)
  }

  renderBrand(activeBrand) {
    const imgs = Array.from(this.brandsEl.querySelectorAll('img[data-brand]'))
    imgs.forEach((img) => {
      const brand = img.dataset.brand
      img.classList.toggle('active', Boolean(activeBrand) && brand === activeBrand)
    })
  }

  renderResult(ok) {
    this.resultEl.classList.remove('ok', 'bad')

    if (ok === null) {
      this.resultEl.textContent = ''
      return
    }

    if (ok) {
      const brand = detectPaymentSystem(this.inputEl.value)
      this.resultEl.textContent = `✅ Номер карты валиден ${brand}.`
      this.resultEl.classList.add('ok')
    }
    else {
      this.resultEl.textContent = '❌ Номер карты невалиден.'
      this.resultEl.classList.add('bad')
    }
  }
}
