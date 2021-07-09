var user_data = location.search
var desformattedText = user_data.split('=')[1]
var finalText = decodeURIComponent(desformattedText)

function create_space(element, class_name, thing_to_add){
    var one_house = document.createElement(element)
    one_house.setAttribute('class', class_name)
    thing_to_add.appendChild(one_house)
    return one_house
}

var data = JSON.parse(finalText)
if (Object.keys(data).length == 2){
    Object.keys(data['district']).forEach((i) => {
        if (i != 'Name'){
            console.log(i)
            Object.keys(data['district'][i]).forEach((j) => {
                console.log(j)
                if (j != 'Name'){
                    var houseInfo = data.district[i][j]
                    var houseData = {city: data.city, district: data.district.Name, street: i, house: houseInfo}
                    console.log(houseData)
                    var housesSpace = create_space('section', 'user_local', document.body)
                    housesSpace.style.display = 'flex'
                    var house_image = document.createElement('img')
                    house_image.src = houseInfo.MainImage
                    house_image.setAttribute('class', 'main_image')
                    housesSpace.appendChild(house_image)
                    var house_number = create_space('a', 'hn', housesSpace)
                    house_number.href = 'http://localhost:8080/show_house.html?data=' + JSON.stringify(houseData)
                    house_number.innerHTML = houseInfo.Name
                    var enter = document.createElement('br')
                    housesSpace.appendChild(enter)
                    var house_type = create_space('p', 'house_type', housesSpace)
                    house_type.innerHTML = houseInfo.Type
                    var price_space = create_space('p', 'price_local', housesSpace)
                    var price = document.createElement('p')
                    price.innerHTML = `Preço: ${houseInfo.Price}`
                    ps = price.style
                    ps.fontWeight = 'bolder'
                    ps.color = 'rgb(108, 141, 241)'
                    price_space.appendChild(price)
                }
            })
        }
    })
}
else if (Object.keys(data).length == 3){
    Object.keys(data['street']).forEach((i) => {
        if (i != 'Name'){
            var houseInfo = data.street[i]
            var houseData = {city: data.city, district: data.district, street: data.street.Name, house: houseInfo}
            var housesSpace = create_space('section', 'user_local', document.body)
            housesSpace.style.display = 'flex'
            var house_image = document.createElement('img')
            house_image.src = houseInfo.MainImage
            house_image.setAttribute('class', 'main_image')
            housesSpace.appendChild(house_image)
            var house_number = create_space('a', 'hn', housesSpace)
            house_number.href = 'http://localhost:8080/show_house.html?data=' + JSON.stringify(houseData)
            house_number.innerHTML = 'Casa ' + houseInfo.Name
            var enter = document.createElement('br')
            housesSpace.appendChild(enter)
            var house_type = create_space('p', 'house_type', housesSpace)
            house_type.innerHTML = houseInfo.Type
            var price_space = create_space('p', 'price_local', housesSpace)
            var price = document.createElement('p')
            price.innerHTML = `Preço: ${houseInfo.Price}`
            ps = price.style
            ps.fontWeight = 'bolder'
            ps.color = 'rgb(108, 141, 241)'
            price_space.appendChild(price)
        }
    })
}
else if (Object.keys(data).length == 4){
    var houseInfo = data['house']
    var housesSpace = create_space('section', 'user_local', document.body)
    housesSpace.style.display = 'flex'
    var house_image = document.createElement('img')
    house_image.src = houseInfo.MainImage
    house_image.setAttribute('class', 'main_image')
    housesSpace.appendChild(house_image)
    var house_number = create_space('a', 'hn', housesSpace)
    house_number.href = 'http://localhost:8080/show_house.html?data=' + JSON.stringify(data)
    house_number.innerHTML = 'Casa ' + houseInfo.Name
    var enter = document.createElement('br')
    housesSpace.appendChild(enter)
    var house_type = create_space('p', 'house_type', housesSpace)
    house_type.innerHTML = houseInfo.Type
    var price_space = create_space('p', 'price_local', housesSpace)
    var price = document.createElement('p')
    price.innerHTML = `Preço: ${houseInfo.Price}`
    ps = price.style
    ps.fontWeight = 'bolder'
    ps.color = 'rgb(108, 141, 241)'
    price_space.appendChild(price)
}