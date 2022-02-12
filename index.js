
let countValue = 1
const postData = {
    count: countValue,
    mount: 'gold'
}
const btnValue = document.querySelector('.counter_value')
btnValue.innerText = countValue
const buttonInc = document.getElementById('itemplus')
const buttonDec = document.getElementById('itemminus')
const amountValue = document.querySelector('.amount_value')
let price = 275
const gameContainer = document.querySelector('.game_container')

function changeCountValue(step) {
    if(step == '-'){
        gameContainer.lastElementChild.remove()
        countValue -= 1
        if(countValue == 1) {
            this.setAttribute('disabled', 'disabled')
            btnValue.innerText = countValue
        } else {
            this.removeAttribute('disabled')
            buttonInc.removeAttribute('disabled')
            
        }
        btnValue.innerText = countValue
    } else if(step == '+') {
        countValue += 1
        if(countValue > 1) buttonDec.removeAttribute('disabled')
        if (countValue == 10) {
            this.setAttribute('disabled', 'disabled')
        }
        btnValue.innerText = countValue
        gameContainer.insertAdjacentHTML('afterbegin', `<img src="./img/game.svg" alt="" class="game_img">`)

    }
    if(countValue >= 4) {
        document.querySelectorAll('.game_img').forEach(e => {
            e.classList.add('game_img_many')
        })
        price=250
        amountValue.innerText = countValue*price
        amountValue.nextElementSibling.style.color = 'rgb(45, 205, 116)'
        amountValue.style.color = 'rgb(45, 205, 116)'
        
    } else {
        document.querySelectorAll('.game_img').forEach(e => {
            e.classList.remove('game_img_many')
        })
        price=275
        amountValue.innerText = countValue*price
        amountValue.nextElementSibling.style.color = 'inherit'
        amountValue.style.color = 'inherit'
    }
    postData.count = countValue
}

const goldOne = document.getElementById('gold')
const silverOne = document.getElementById('silver')
const allMounts = document.querySelectorAll('.mountItem')
let mount = 'gold'
allMounts.forEach(e => {
    e.addEventListener('click', () => {
        allMounts.forEach(e => {
            e.classList.remove('active_mount')
        })
        e.classList.add('active_mount')
        mount = e.id
        postData.mount = mount
    })
})
// const submitButton = document.querySelector("button[type='submit']")
const submitButton = document.createElement('button')
const btnContainer = document.querySelector('.button_container')

let showButton = true
const form = document.querySelector('form')
form.addEventListener('input', function(e){
        if(!e.target.validity.valid) {
            e.target.classList.add('invalid_input')
        } else {
            e.target.classList.remove('invalid_input')
        }
        postData[e.target.name] = e.target.value
    if (this.checkValidity()) {
        btnContainer.innerHTML = `                <div class="spinner" >
        <img src="./img/game.svg" alt="" class="game_img ">
        <div class="load_text" style="position: absolute;">загрузка...</div>
    </div>`

        const {count, mount, city, warehouse, phone, firstName, lastName} = postData
        fetch(`https://liqpayvasya.herokuapp.com/pay/${count}/${mount}/${city}/${warehouse}/${firstName}/${lastName}/${phone}`)
        .then(res => {
            return res.text()
        })
        .then(res => {
            btnContainer.innerHTML = res
        })
        .catch(err => console.log(err))
    } else btnContainer.innerHTML = '<button type="submit" style="width: 150px; height: 50px; margin-top:30px" disabled>Купить!</button>'
})

form.addEventListener('submit', e => {
    e.preventDefault()

})
function showAbout() {
    this.nextElementSibling.classList.toggle('show_terms')
    window.location.href = '#aboutus'
}

function showTerms() {
    this.nextElementSibling.classList.toggle('show_terms')
    window.location.href = '#termsandreturn'
}