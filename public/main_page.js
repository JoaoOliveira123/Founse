// Isso não está completo
// Isso verifica um input submit, e se estiver tudo ok, vai para outra página para mostrar casas de acordo
// com o pesquisado.

function it_exists(array, arg){
    if (array.indexOf(arg) > -1){
        return true
    }
    else{
        return false
    }
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
    var ar = true
    var hid = {}
    Object.keys(elmt_dict).forEach((key) => {
        if (key != bc){
            var atual = elmt_dict[key]
            var elmnt_value = atual.element.value
            if (atual.obrigatory && elmnt_value == ''){
                ar = false
                return false
            }
            hid[key] = elmnt_value
        }
    })
    if (ar){
    return hid
    }
    else{
        return false
    }
}

function button_click(elmt_dict, button_class, button_element, super_input_class){
    button_element.style.backgroundColor = '#ccc'
    button_element.style.borderRadius = '5px'
    var user_data = make_a_houseinfo_dict_and_verify(elmt_dict, button_class)
    console.log(user_data)
    if (user_data != false){
        $.post('http://localhost:1060', JSON.stringify(user_data), (res) => {
            location.href = 'http://localhost:8080/houses.html?data=' + encodeURIComponent(JSON.stringify(res))
        })
        .fail(() => {
            location.href = 'http://localhost:8080/houses.html?data=' + encodeURIComponent('O endereço digitado é inválido')})
    }
    else{
        console.log('ujddj')
        var error_message = document.createElement('p')
        error_message.setAttribute('class', 'didntfill')
        error_message.innerHTML = 'Erro: Preencha todos os campos obrigatórios!'
        super_input_class.appendChild(error_message)
    }
}


var inputs_data = make_input_dict(document.querySelectorAll('input'), ['house', 'street'])
var send_button = document.querySelector('.state')
document.addEventListener('keydown', (event) => {keyboardhandle(event, send_button)})
var sic = document.querySelector('.user_local')
send_button.addEventListener('click', () => {
    button_click(inputs_data, 'state', send_button, sic)
})
console.log(inputs_data)