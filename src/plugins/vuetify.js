import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: true,
        options: { customProperties: true },
        themes: {
            dark: {
                primary: '#1976D2',
                secondary: '#272727',
                notSelected: '#626262',
                background: '#121212',
                imgBorder: '#626262',
            },
            light: {
                background: '#ffffff',
                secondary: '#272727',
            }
        }
    }
});
