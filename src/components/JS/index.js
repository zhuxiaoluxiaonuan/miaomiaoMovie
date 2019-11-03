import Vue from 'vue'
import MessageBox from './MessageBox'
export let messageBox = (function(){
    let defaults = {
        title: '',
        content: '',
        cancel: '',
        sure: '',
        handleCancel: null,
        handleSure: null
    }
    return (options) => {
        for(let attr in options){
            defaults[attr] = options[attr];
        }
        let MessageBoxCom = Vue.extend(MessageBox);
        let vm = new MessageBoxCom({
            el: document.createElement('div'),
            data: {
                title: defaults.title,
                content: defaults.content,
                cancel: defaults.cancel,
                sure: defaults.sure
            },
            methods: {
                handleCancel(){
                    defaults.handleCancel && defaults.handleCancel.call(this);
                    document.body.removeChild(vm.$el);
                },
                handleSure(){
                    defaults.handleSure && defaults.handleSure.call(this);
                    document.body.removeChild(vm.$el);

                }
            }
        });
        document.body.appendChild(vm.$el);
    }
})();