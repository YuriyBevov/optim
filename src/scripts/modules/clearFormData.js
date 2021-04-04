export const clearFormData = (form) => {
    const btn = form.querySelector('button[type="submit"]');
    const textarea = form.querySelector('textarea');
    const formControls = form.querySelectorAll('.form-control');

    formControls.forEach(control => {
        if(control.type === 'text') {
           control.value = '';
        }

        if(control.type === 'checkbox') {
            control.checked = false
        }               
    });

    if(textarea) {
        textarea.value = '';
    }

    btn.setAttribute('disabled', true);
}