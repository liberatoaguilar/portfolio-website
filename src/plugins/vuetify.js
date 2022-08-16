import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        options: { customProperties: true },
        themes: {
            dark: {
                "secondary":"#272727","title":"#FFFFFF","primary":"#1976D2","icon":"#BCBCBC","v-card":"#1E1E1E","btnText":"#FFFFFF","v-cardText":"#BCBCBC","imgBorder":"#959595","background":"#121212","notSelected":"#959595","textColor":"#FFFFFF","projectsBtn": "#1976D2",
            },
            light: {
                "v-cardText":"#666666","btnText":"#FFFFFF","v-card":"#FFFFFF","imgBorder":"#636363","notSelected":"#999999","background":"#FFFFFF","icon":"#444444","primary":"#B8B8B8","secondary":"#094077","title":"#FFFFFF","textColor":"#444444","projectsBtn": "#094077",
            },
        }
    }
});
