<style>
.largeFont {
    word-break: break-word;
    font-size: 17px;
}

.smallFont {
    word-break: break-word;
    font-size: 15px;
}

.cardGrow {                         
    transition: all .2s ease-in-out;
}                                   

.cardGrow:hover {                   
    transform: scale(1.05);         
}                                   

</style>

<template>
    <section>
        <v-card height="100%" class="cardGrow">
            <v-card-text class="text-center">
                <v-container fluid style="padding: 0">
                    <v-row justify="center">
                        <v-col cols="auto" style="padding: 0">
                            <v-img
                                :src="project.pictures[0]"
                                eager
                                :width="250"
                                :height="120"
                            ></v-img> 
                        </v-col>
                    </v-row>
                    <v-row justify="center" style="padding-top: 5px; margin-left: 0;
                    margin-right: 0">
                        <v-col cols="auto" :class="$vuetify.breakpoint.smAndDown ?
                        'smallFont' : 'largeFont'">
                            <b>{{ project.name }}</b>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
        </v-card>
    </section>
</template>

<script>
/* eslint-disable no-unused-vars */
export default {
    name: 'projectView',
    components: { },
    props: ['project'],
    data() {
        return {
        }
    },

    methods: {
    },

    async mounted() {
        let img0 = document.createElement("link");
        img0.href = this.project.pictures[0];       
        img0.rel = "preload";                     
        img0.as = "image";                        
        document.head.appendChild(img0);
    }
}
/* eslint-disable no-unused-vars */
</script>
