import { reactive } from "vue"

function useAlert(){
    const alert = reactive({
        show: false,
        message: '',
        variant: 'danger'
    });
    
    const showAlert = (message, options = {variant: 'danger'}) => 
    {
        alert.show = true 
        alert.message = message,
        alert.variant = options.variant
    };
    
    return{
        alert,
        showAlert
    };
};

export { useAlert }