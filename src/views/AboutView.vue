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


.largeText {
    font-size: 16pt;
}

.smallText {
    margin-right: 10%;
    margin-left: 10%;
    font-size: 12pt;

}
</style>
<template>
    <section>
        <v-container fluid style="padding-left: 10%; padding-right: 10%">
            <v-row justify="center" style="padding-top: 30px" dense align="center"
            class="doShow">
                <v-col cols="auto" v-if="$vuetify.breakpoint.smAndDown" order="0"
                class="textColor--text">
                    <h1 style="font-size: 23pt">{{ title }}</h1>
                </v-col>
                <v-col cols="auto" md="4" order="2" order-md="1" class="textColor--text">
                    <h1 style="padding-bottom: 10px; font-size: 23pt; padding-left: 10%"
                    v-if="!$vuetify.breakpoint.smAndDown">{{ title }}</h1>
                    <p v-html="description" 
                        :class="$vuetify.breakpoint.smAndDown ? 'smallText text-justify'
                        : 'largeText text-justify'"
                    ></p>
                </v-col>
                <v-col cols="1" order-md="2" v-if="!$vuetify.breakpoint.smAndDown">
                </v-col>
                <v-col cols="auto" order="1" order-md="3">
                    <v-container>
                        <v-row v-for="(pic, i) in pictures" :key="i" dense
                        justify="center">
                            <v-col cols="auto">
                                <v-img
                                    class="borderImg"
                                    :src="pic"
                                    :width="i % 2 == 0 ? 300 : 400"
                                    :aspect-ratio="18/5"
                                ></v-img>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-col>
            </v-row>
        </v-container>
    </section>
</template>

<script>
import { getPageInfo } from '../firebase.js';

export default {
    name: 'AboutView',
    components: { },
    data() {
        return {
            title: "",
            description: "",
            pictures: [],
        };
    },

    async mounted() {
        if (!localStorage.getItem("pageInfo")) {
            let pageInfo = await getPageInfo();
            this.title = pageInfo[0].aboutTitle;
            this.description = pageInfo[0].aboutDescription.replace("\n","<br/><br/>");
            this.pictures = pageInfo[0].aboutPictures;
        } else {
            let pageInfo = JSON.parse(localStorage.getItem("pageInfo"));
            this.title = pageInfo.aboutTitle;
            this.description = pageInfo.aboutDescription.replace("\n","<br/><br/>");
            this.pictures = pageInfo.aboutPictures;
        }
    }
}
</script>
