<style>
.borderImg {
    border: 1px solid var(--v-imgBorder-base);
    border-radius: 5px;
    padding: 50px;
}

@keyframes show {      
    from { opacity: 0 }
    to { opacity: 1 }  
}                      

.dontShow {
    opacity: 0;
}

.doShow {
    opacity: 1;
    animation-name: show;
    animation-duration: 1s;
}

</style>
<template>
    <section>
        <v-container>
            <v-row justify="center" :class="beforeLoadClass" style="padding-top: 30px">
                <v-col cols="12" md="2" class="text-center">
                    <v-btn
                        outlined
                        color="primary"
                        @click="open(pdfURL)"
                    >DOWNLOAD <v-icon style="padding-left: 5px">mdi-arrow-down-box</v-icon></v-btn>
                </v-col>
                <v-col cols="auto" :style="$vuetify.breakpoint.smAndDown ? '' : 'margin-left: 20px'">
                    <v-img
                        :src="pictureURL"
                        class="borderImg"
                        @load="beforeLoadClass = 'doShow'"
                    ></v-img>
                </v-col>
                <v-col cols="0" md="2">
                </v-col>
            </v-row>
        </v-container>
    </section>
</template>

<script>
import { getPageInfo } from '../firebase.js';

export default {
    name: 'resumeView',
    components: { },
    data() {
        return {
            pdfURL: "",
            pictureURL: "",
            beforeLoadClass: "dontShow",
        };
    },

    methods: {
        open(link) {
            window.open(link,'_blank');
        },
    },

    async mounted() {
        if (!localStorage.getItem("pageInfo")) {
            let pageInfo = await getPageInfo();
            this.pictureURL = pageInfo[0].resumePictureURL;
            this.pdfURL = pageInfo[0].resumePDFURL;
        } else {
            let pageInfo = JSON.parse(localStorage.getItem("pageInfo"));
            this.pictureURL = pageInfo.resumePictureURL;
            this.pdfURL = pageInfo.resumePDFURL;
        }
    }
}
</script>
