export const formValidation = (controls) => {
    let isValid = true;
    let isRulesAccepted = true;

    controls.forEach(el => {

        if(el.getAttribute('type') === 'text') {
            el.value.trim().length > 0 ? isValid : isValid = false;
        }

        if(el.getAttribute('type') === 'checkbox') {
            el.checked ? isRulesAccepted : isRulesAccepted = false;
        }
    });

    if(isValid && isRulesAccepted) {
        return true
    } else {
        return false
    }
}