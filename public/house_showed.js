var server_data = location.search
var desformattedText = server_data.split('=')[1]
var finalText = decodeURIComponent(desformattedText)
var data = JSON.parse(finalText)

var ul = document.querySelector('.user_local')
var image = document.createElement('img')
var price = document.createElement('p')
var line = document.createElement('hr')
var city = document.createElement('p')
var district = document.createElement('p')
var street = document.createElement('p')
var number = document.createElement('p')

ul.style.textAlign = 'left'
image.src = data.house.MainImage
image.setAttribute('class', 'the_one_main_image')
price.style.fontWeight = 'bold'
price.style.marginTop = '-30px'
price.innerHTML = `Preço: ${data.house.Price}`
line.style.backgroundColor = '#cfcfcf'
line.style.marginTop = '-30px'
city.innerHTML = `Cidade ${data.city}`
city.style.marginTop = '-5px'
district.innerHTML = `Bairro: ${data.district}`
district.style.marginTop = '-50px'
street.innerHTML = `Rua: ${data.street}`
street.style.marginTop = '-50px'
number.innerHTML = `Nº da casa: ${data.house.Name}`
number.style.marginTop = '-50px'

ul.appendChild(image)
ul.appendChild(price)
ul.appendChild(line)
ul.appendChild(city)
ul.appendChild(district)
ul.appendChild(street)
ul.appendChild(number)