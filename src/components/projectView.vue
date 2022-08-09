<style>
.largeFont {
    word-break: break-word;
    font-size: 17px;
}

.smallFont {
    word-break: break-word;
    font-size: 14px;
}

.wordBreak {
    word-break: break-word;
    font-size: 17px;
}

.cardGrow {                         
    transition: all .2s ease-in-out;
}                                   

.cardGrow:hover {                   
    transform: scale(1.05);         
}                                   

.borderImg {
    border: 1px solid grey;
    border-radius: 5px;
    padding: 50px;
}

</style>

<template>
    <section>
        <v-card height="100%" class="cardGrow" @click="projectInfo = true">
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
        <v-dialog
            scrollable
            v-model="projectInfo"
            max-width="1000px"
        >
            <v-card>
                <v-container style="margin: 0; padding: 0;">
                    <v-row style="margin: 0; padding: 0" justify="start">
                        <v-col cols="auto" style="margin-bottom: 0; padding-bottom: 0">
                            <v-card-title :style="'font-size: '+projectInfoTitle+'px; word-break: break-word'">
                                {{ project.name }}
                            </v-card-title>
                        </v-col>
                    </v-row>
                </v-container>
                <v-card-text>
                    <v-container :style="'padding-top: 0; margin-top: 0;'+($vuetify.breakpoint.smAndDown ? 'padding: 0px' : '')">
                        <v-row align="center">
                            <v-col :cols="$vuetify.breakpoint.smAndDown ? 12 : 8">
                                <v-container>
                                    <template v-if="!$vuetify.breakpoint.smAndDown">
                                        <v-row justify="start" align="center"
                                        class="felx-nowrap">
                                            <v-col cols="auto">
                                                <v-container>
                                                    <v-row v-for="(pic, i) in project.pictures" :key="i">
                                                        <v-col>
                                                            <v-img
                                                               class="borderImg"
                                                               style="cursor: pointer"
                                                               contain
                                                               :src="pic"
                                                               @click="selectPic(i)"
                                                               @mouseover="selectPic(i)"
                                                               :width="70" 
                                                            >
                                                            </v-img>
                                                        </v-col>
                                                    </v-row>
                                                </v-container>
                                            </v-col>
                                            <v-col cols="auto" style="padding-left: 30px">
                                                <v-img
                                                   contain
                                                   @click="zoomedPic = true"
                                                   style="cursor: pointer"
                                                   max-width="400px"
                                                   :src="project.pictures[currentPic]"
                                                >
                                                </v-img>
                                            </v-col>
                                        </v-row>
                                    </template>
                                    <template v-else>
                                        <v-row justify="center" dense>
                                            <v-col cols="auto" v-for="(pic,
                                            i) in project.pictures" :key="i">
                                                <v-img
                                                   class="borderImg"
                                                   style="cursor: pointer; padding: 0px;"
                                                   contain
                                                   :src="pic"
                                                   @click="selectPic(i)"
                                                   @mouseover="selectPic(i)"
                                                   :width="65"
                                                   :height="65"
                                                >
                                                </v-img>
                                            </v-col>
                                        </v-row>
                                        <v-row justify="center">
                                            <v-col cols="auto">
                                                <v-img
                                                   contain
                                                   max-width="300px"
                                                   style="cursor: pointer;"
                                                   :src="project.pictures[currentPic]"
                                                   @click="zoomedPic = true"
                                                >
                                                </v-img>
                                            </v-col>
                                        </v-row>
                                    </template>
                                </v-container>
                            </v-col>
                            <v-col :cols="$vuetify.breakpoint.smAndDown ? 12 : 4">
                                <v-container>
                                    <v-row  dense :class="$vuetify.breakpoint.smAndDown ? 'smallFont' : 'wordBreak'">
                                        <v-col cols="6" style="padding-right: 20px">
                                            <b>Date: </b>
                                        </v-col>
                                        <v-col>
                                            {{ project.date }}
                                        </v-col>
                                    </v-row>
                                    <v-row dense :class="$vuetify.breakpoint.smAndDown ? 'smallFont' : 'wordBreak'">
                                        <v-col cols="6" style="padding-right: 20px">
                                            <b>Language: </b>
                                        </v-col>
                                        <v-col>
                                            {{ project.language }}
                                        </v-col>
                                    </v-row>
                                    <v-row dense :class="$vuetify.breakpoint.smAndDown ? 'smallFont' : 'wordBreak'">
                                        <v-col cols="6" style="padding-right: 20px">
                                            <b>Description: </b>
                                        </v-col>
                                    </v-row>
                                    <v-row dense :class="$vuetify.breakpoint.smAndDown ? 'smallFont' : 'wordBreak'">
                                        <v-col cols="12" style="padding-left: 20px">
                                            {{ project.description }}
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                   <v-btn
                    :large="!$vuetify.breakpoint.smAndDown"
                    :small="$vuetify.breakpoint.smAndDown"
                    color="error"
                    style="margin: 10px"
                    text
                    @click.prevent="projectInfo = false"
                   >
                    CLOSE
                   </v-btn> 
                    <v-spacer></v-spacer>
                   <v-btn
                    :large="!$vuetify.breakpoint.smAndDown"
                    :small="$vuetify.breakpoint.smAndDown"
                    outlined
                    style="margin: 10px"
                    @click.prevent="openSource"
                    v-if="project.linkCode"
                   >
                    SOURCE
                   </v-btn> 
                   <v-btn
                    :large="!$vuetify.breakpoint.smAndDown"
                    :small="$vuetify.breakpoint.smAndDown"
                    outlined
                    style="margin: 10px"
                    @click.prevent="openProject"
                    v-if="project.linkProject"
                   >
                    PROJECT
                   </v-btn> 
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="zoomedPic"
            :width="$vuetify.breakpoint.smAndDown ? '100%' : '50%'"
            :height="$vuetify.breakpoint.smAndDown ? '100%' : '50%'"
        >
            <v-container>
                <v-row>
                    <v-spacer/>
                    <v-col cols="auto">
                        <v-btn
                            large
                            icon
                            @click="zoomedPic = false"
                            color="error"
                        ><v-icon>mdi-close</v-icon></v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-img
                           :src="project.pictures[currentPic]"
                           width="100%"
                        >
                        </v-img>
                    </v-col>
                </v-row>
            </v-container>
        </v-dialog>
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
            zoomedPic: false,
            projectInfo: false,
            currentPic: 0,
        }
    },

    computed: {
        projectInfoTitle() {
            switch (this.$vuetify.breakpoint.name) {
                case 'xs': return 20
                case 'sm': return 20
                case 'md': return 30
                case 'lg': return 30
                case 'xl': return 30
            }
            return 30
        },
    },

    methods: {
        selectPic(i) {
            this.currentPic = i;
        },
        openSource() {
            window.open(this.project.linkCode,'_blank');
        },
        openProject() {
            window.open(this.project.linkProject,'_blank');
        },
    },

    async mounted() {
        let img0 = document.createElement("link");
        img0.href = this.project.pictures[0];       
        img0.rel = "preload";                     
        img0.as = "image";                        
        document.head.appendChild(img0);
        if (this.project.pictures[1]) {
            let img = document.createElement("link");
            img.href = this.project.pictures[1];
            img.rel = "prefetch";
            img.as = "image";
        }
        if (this.project.pictures[2]) {
            let img = document.createElement("link");
            img.href = this.project.pictures[2];
            img.rel = "prefetch";
            img.as = "image";
        }
        if (this.project.pictures[3]) {
            let img = document.createElement("link");
            img.href = this.project.pictures[3];
            img.rel = "prefetch";
            img.as = "image";
        }
        if (this.project.pictures[4]) {
            let img = document.createElement("link");
            img.href = this.project.pictures[4];
            img.rel = "prefetch";
            img.as = "image";
        }
    }
}
/* eslint-disable no-unused-vars */
</script>
