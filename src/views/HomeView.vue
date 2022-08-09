<style>
#gradient {
    background-image: linear-gradient(to left, rgba(18,18,18,1) 0%, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0) 80%,  rgba(18,18,18,1) 100%);                  
    background-size: cover;
    z-index: 11;
    width: 73%;
    transform: translateX(-2px);
    position: absolute;
    pointer-events: none;
}

.adminButton {
    opacity: 0;
}

.adminButton:hover {
    opacity: 100;
    transition: .5s ease;
}

.image {
    border: 2px solid grey;
    border-radius: 15px;
    transition: .5s ease;
}

.image:hover {
    border: 5px solid grey;
}

.largeText {
    padding-right: 5%;
    margin-left: 5%;
    font-size: 16pt;
}

.smallText {
    margin-right: 10%;
    margin-left: 5%;
    font-size: 12pt;

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


.animateSlide {                                
    animation: slide 15s linear infinite;      
}                                              

.smallPadding {
    padding-bottom: 0%;
}

.largePadding {
    padding-bottom: 2.5%;
}
</style>

<template>
    <section>
        <v-container fluid>
            <v-row justify="center" :class="beforeLoadClass">
                <v-col cols="12">
                    <v-container style="padding-left: 7%; padding-top: 2%; padding-right: 7%" fluid
                        :class="$vuetify.breakpoint.smAndDown ? 'smallPadding' : 'largePadding'"
                    >
                        <v-row justify="center" 
                            :class="$vuetify.breakpoint.smAndDown ? 'smallPadding' : 'largePadding'"
                        >
                            <v-col cols="6" md="auto" order="1" order-md="1"
                                style="padding-bottom: 0; padding-left: 0"
                            >
                                <v-list
                                    color="#121212"
                                >
                                    <v-list-item                                                         
                                        v-for="(item, i) in socials"                                     
                                        :key="i"                                                         
                                        @click="open(item.link)"                                         
                                    >                                                                    
                                        <v-list-item-content
                                        >       
                                            <b><v-list-item-title>{{ item.name }}</v-list-item-title></b>
                                        </v-list-item-content>                                           
                                        <v-list-item-icon>                     
                                            <v-icon v-text="item.icon"
                                                color="grey"
                                            ></v-icon>                         
                                        </v-list-item-icon>                                              
                                    </v-list-item>                                                       
                                </v-list>                                                                
                            </v-col>
                            <v-col cols="auto" md="6"
                                :class="$vuetify.breakpoint.smAndDown ? 'smallText' : 'largeText'"
                                order="3" 
                                order-md="2"
                                :style="$vuetify.breakpoint.smAndDown ? 'padding-top: 0' : 'padding-top: 32px'"
                            >
                                <h1 style="margin-bottom: 10px">{{ this.title }}</h1>
                                <p>{{ this.description }}</p>
                            </v-col>
                            <v-col cols="6" md="2" order="2" order-md="3"
                                style="padding-bottom: 0; padding-left: 0"
                            >
                                <v-avatar
                                    :size="$vuetify.breakpoint.smAndDown ? 150 : 250"
                                    :class="beforeLoadClass"
                                >
                                    <v-img
                                        eager
                                        @loadstart="imgLoaded"
                                        :src="pictureURL"
                                    ></v-img>
                                </v-avatar>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-col>
            </v-row>
            <v-row justify="center" style="margin-left: 13%; margin-right: 13%"
            class="flex-nowrap overflow-hidden">
                <div id="gradient" :style="'height: '+gradientHeight+'px'"
                :class="beforeLoadClass"></div>                           
                <v-col cols="auto" v-for="i in (projects.length)*3"
                    :key="i"
                    class="animateSlide"
                    id="slide"
                    style="z-index: 10"
                >
                    <projectView :project="projects[i%projects.length]" style="height: 100%"
                        :class="beforeLoadClass"
                    ></projectView>
                </v-col>
            </v-row>
        </v-container>
        <v-footer app padless color="#121212">
            <v-container fluid>
                <v-row justify="center" :class="beforeLoadClass">
                    <v-spacer/>
                    <v-col cols="auto" v-if="!$vuetify.breakpoint.smAndDown">
                        <v-btn
                            text
                            class="adminButton"
                            @click.prevent="adminClick"
                        >
                        ADMIN
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-footer>
        <v-dialog
            v-model="admin"
            max-width="500px"
        >
            <v-card> 
                <v-card-title class="adminButton">
                    Admin
                </v-card-title>
                <v-card-text>
                    <v-form ref="adminEnterForm" @submit.prevent="signIn">
                        <v-container>
                            <v-row dense>
                                <v-col>
                                    <v-text-field
                                        label="Username"
                                        v-model="username"
                                        outlined
                                    >
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row dense>
                                <v-col>
                                    <v-text-field
                                        label="Password"
                                        type="password"
                                        v-model="password"
                                        outlined
                                    >
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row dense justify="end">
                                <v-col cols="auto">
                                    <v-btn
                                        text
                                        @click="signIn"
                                        type="submit"
                                    >
                                    Sign In
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-card-text>
            </v-card> 
        </v-dialog>
        <v-snackbar
            color="error"
            v-model="snackbar"
            timeout="2000"
            top
            right
            max-width="168"
            min-width="168"
        >
            <b>Invalid Credentials</b>
        </v-snackbar>
    </section>
</template>

<script>
/* eslint-disable no-unused-vars */
import { getPageInfo, getSocials, getFeaturedProjects } from '../firebase.js';
import projectView from '../components/projectView.vue';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

export default {
    name: 'homeView',
    components: { projectView },
    data() {
        return {
            password: "",
            username: "",
            socials: [],
            title: "",
            description: "",
            pictureURL: "",
            projects: [],
            beforeLoadClass: "doShow",
            admin: false,
            snackbar: false,
        }
    },

    computed: {
        gradientHeight() {                          
            switch (this.$vuetify.breakpoint.name) {
                case 'xs': return 270               
                case 'sm': return 250               
                case 'md': return 230               
                case 'lg': return 230               
                case 'xl': return 230               
            }                                       
            return 40                               
        }                                           
    },

    methods: {
        adminClick() {
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    this.$router.replace("/admin/"+0);
                } else {
                    this.admin = true;
                }
            });
        },
        async signIn() {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, this.username, this.password)
                .then((userCred) => {
                    userCred.user.getIdToken(true)
                        .then((idToken) => {
                            this.$router.replace("/admin/"+idToken);
                            return;
                    });
                })
                .catch(() => { 
                    this.snackbar = true;
                });
        },
        open(link) {
            window.open(link,'_blank');
        },
        imgLoaded() {
            this.beforeLoadClass = "doShow";
        }
    },

    async mounted() {
        if (localStorage.getItem("pageInfo")) {
            let homeInfo = JSON.parse(localStorage.getItem("pageInfo"));
            this.title = homeInfo.homeTitle;
            this.description = homeInfo.homeDescription;
            this.pictureURL = homeInfo.homePictureURL;

            let img = document.createElement("link");
            img.href = homeInfo.homePictureURL;
            img.rel = "preload";                    
            img.as = "image";                        
            document.head.appendChild(img);          
        } else {
            let homeInfo = await getPageInfo();

            this.title = homeInfo[0].homeTitle;
            this.description = homeInfo[0].homeDescription;
            this.pictureURL = homeInfo[0].homePictureURL;

            localStorage.setItem("pageInfo",JSON.stringify(homeInfo[0]));
        }

        if (localStorage.getItem("socials")) {
            this.socials = JSON.parse(localStorage.getItem("socials"));
        } else {
            let socialInfo = await getSocials();
            this.socials = socialInfo;
            localStorage.setItem("socials",JSON.stringify(socialInfo));
        }

        this.projects = await getFeaturedProjects();

        let socialInfo = await getSocials();
        localStorage.setItem("socials",JSON.stringify(socialInfo));

        let slide = document.getElementById("slide");
        let px = slide.clientWidth*5;
        let anim = document.createElement("style");
        anim.textContent = `
            @keyframes slide {                             
                0% {                                       
                transform: translate3d(0,0,0);         
                }                                          

                100% {                                     
                    transform:
                    translate3d(-${px}px, 0, 0); 
                }                                          
            }                                              
        `;
        document.body.appendChild(anim);

        let homeInfo = await getPageInfo();
        localStorage.setItem("pageInfo",JSON.stringify(homeInfo[0]));

        let resumeImg = document.createElement("link");
        resumeImg.href = homeInfo[0].resumePictureURL;
        resumeImg.rel = "prefetch";                    
        resumeImg.as = "image";                        
        document.head.appendChild(resumeImg);          
    }
}
/* eslint-disable no-unused-vars */
</script>
