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

var inputs_data = make_input_dict(document.querySelectorAll('input'), ('house', 'street'))
var send_button = document.querySelector('.state')
document.addEventListener('keydown', (event) => {keyboardhandle(event, inputs_data, 'state')})