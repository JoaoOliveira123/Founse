// Isso não está completo
// Isso verifica um input submit, e se estiver tudo ok, vai para outra página para mostrar casas de acordo
// com o pesquisado.

function it_exists(array, arg){
    array.forEach((i) => {
        if (i == arg){
            return true
        }
    })
    return false
}

function make_input_dict(inputs, opitional, info_dict={}){
    inputs.forEach((i) => {
        var have_to_has = true
        if (it_exists(opitional, i.className)){
            have_to_has = false
        }
        info_dict[i.className] = {element: i, obrigatory: have_to_has}
    })
    return info_dict
}

function keyboardhandle(event, be) {
    var key = event.key
    var keys = {
        Enter(){
            be.click()
        }
    }
    var func = keys[key]
    if (func){
        func()
    }
}

function make_a_houseinfo_dict_and_verify(elmt_dict, bc){
    var hid = {}
    Object.keys(elmt_dict).forEach((key) => {
        if (key != bc){
            var atual = elmt_dict[key]
            var elmnt_value = atual.element.value
            if (atual.obrigatory && elmnt_value == ''){
                return false
            }
            hid[key] = elmnt_value
        }
    })
    return hid
}

function button_click(elmt_dict, button_class, button_element){
    button_element.style.backgroundColor = '#ccc'
    button_element.style.borderRadius = '5px'
    var user_data = make_a_houseinfo_dict_and_verify(elmt_dict, button_class)
    if (user_data != false){
        $.post('http://localhost:1060', JSON.stringify(user_data), (res) => {
            location.href = 'http://localhost:8080/houses.html?data=' + JSON.stringify(res)
        })
    }
}


var inputs_data = make_input_dict(document.querySelectorAll('input'), ['house', 'street'])
var send_button = document.querySelector('.state')
document.addEventListener('keydown', (event) => {keyboardhandle(event, send_button)})
send_button.addEventListener('click', () => {
    button_click(inputs_data, 'state', send_button)
})