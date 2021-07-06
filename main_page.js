//  Isso não está completo
//  Isso verifica um input submit, e se estiver tudo ok, vai para outra página para mostrar casas de acordo
//  com o pesquisado.
function make_input_dict(inputs, opitional, info_dict={}){
    inputs.forEach((i) => {
        var have_to_has = true
        if (i.className in opitional){
            have_to_has = false
        }
        info_dict[i.className] = {element: i, obrigatory: have_to_has}
    })
    return info_dict
}

function keyboardhandle(event, elmt_dict, button_class) {
    var key = event.key
    var keys = {
        Enter(){
            
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
}




var inputs_data = make_input_dict(document.querySelectorAll('input'), ('house', 'street'))
var send_button = document.querySelector('.state')
document.addEventListener('keydown', (event) => {keyboardhandle(event, inputs_data, 'state')})
send_button.addEventListener('click', () => {

})