import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import App from './App.vue'
import {store} from './store'
import vueCustomElement from 'vue-custom-element'

import 'primevue/resources/themes/saga-blue/theme.css'       
import 'primevue/resources/primevue.min.css'                 
import 'primeicons/primeicons.css'     
                      
const app = createApp(App)


class CustomElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const options = typeof App === "function" ? App.options : App;
    const propsList: string[] = Array.isArray(options.props) ? options.props : Object.keys(options.props || {});

    const props: { [index: string]: string} = {};
    // Validate, if all props are present
    for (const prop of propsList) {
      const propValue = process.env.NODE_ENV === "development" ? process.env[`VUE_APP_${prop.toUpperCase()}`] : this.attributes.getNamedItem(prop)?.value;

      if (!propValue) {
        console.error(`Missing attribute ${prop}`);
        return;
      }

      props[prop] = propValue;
    }

    const app = createApp(App, props);

    const wrapper = document.createElement("div");
    app.mount(wrapper);

    this.appendChild(wrapper.children[0]);
  }
}

window.customElements.define("weather-widget", CustomElement);


app.use(vueCustomElement)
app.use(PrimeVue);
app.use(store)
app.use(ToastService);
app.mount('#app')
