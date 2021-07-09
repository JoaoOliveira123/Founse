var inputs = document.querySelectorAll('input')
var send_button = ''
let inputs_datas = {}
inputs.forEach((e) => {
    var have_to_has = true
    if (e.className == 'house' || e.className == 'street'){
        have_to_has = false
    }
    if (e.className == 'state'){
        send_button = document.querySelector(`.${e.className}`)
    }
    inputs_datas[e.className] = {element: e, obrigatory: have_to_has}
})

document.addEventListener('keydown', (event) => {keyboardhandle(event, inputs_datas, 'state')})
send_button.addEventListener('click', () => {button_click(inputs_datas, 'state')})

function last_item(array){
    var li = ''
    array.forEach((i) => {
        li = i
    })
    return li
}

function verify_elements(elements_dict){
    var send = true

    Object.keys(elements_dict).forEach((className) => {
        var element_data = elements_dict[className]
        if (element_data.obrigatory && element_data.element.value == ''){
            send = false
        }

    })
    return send
}

function send_data_to_another_page(url, data){
    location.href = url + '?data=' + encodeURIComponent(JSON.stringify(data))
}

function button_click(dict_element, button_class){
    var send = verify_send(dict_element)
    if (send){
        var button = dict_element[button_class].element
        button.style.backgroundColor = '#ccc'
        button.style.borderRadius = '5px'
        var data = {}
        data.city = dict_element['city'].element.value
        data.district = dict_element['district'].element.value
        if (dict_element['street'].element.value != ''){
            data.street = dict_element['street'].element.value
        }
        if (dict_element['house'].element.value != ''){
            data.house = dict_element['house'].element.value
        }
        console.log(data)
        send_data_to_another_page('http://localhost:8080/houses.html',data)
    }
}

function verify_send(elmt_dict){
    var send = verify_elements(elmt_dict)
    if (send){
        return true
    }
    else{
        return false
    }
}

function keyboardhandle(event, elmt_dict, button_class) {
    var key = event.key
    var keys = {
        Enter(){
            button_click(elmt_dict, button_class)
        }
    }
    var func = keys[key]
    if (func){
        func()
    }
}