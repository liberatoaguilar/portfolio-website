<style>
.doShow {
    opacity: 1;
    animation-name: show;
    animation-duration: 1s;
}
</style>
<template>
    <section>
        <v-container class="doShow">
            <v-form ref="emailForm">
                <v-row justify="center" dense style="padding-top: 20px; padding-bottom: 10px">
                    <v-col cols="10" md="4">
                        <h1 class="text-center">{{ title }}</h1>
                    </v-col>
                </v-row>
                <v-row justify="center" dense>
                    <v-col cols="10" md="4">
                        <v-text-field outlined
                            label="Email"
                            :rules="[validateEmail]"
                            v-model="enterEmail"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row justify="center" dense>
                    <v-col cols="10" md="4">
                        <v-text-field
                            outlined
                            label="Subject"
                            v-model="enterSubject"
                            :rules="[() => !!enterSubject || 'Required Field']"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row justify="center" dense>
                    <v-col cols="10" md="4">
                        <v-textarea
                            outlined
                            label="Message"
                            v-model="enterMessage"
                            :rules="[() => !!enterMessage || 'Required Field']"
                        ></v-textarea>
                    </v-col>
                </v-row>
                <v-row justify="center" dense>
                    <v-col cols="auto">
                        <v-btn
                            color="primary"
                            @click="send"
                        >Send</v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-container>
        <v-snackbar
            color="success"
            v-model="snackbarSuccess"
            timeout="2000"
            top
            right
            max-width="168"
            min-width="168"
        >
            <b>Success</b>
        </v-snackbar>
    </section>
</template>

<script>
import { getPageInfo } from '../firebase.js';

export default {
    name: 'ContactView',
    components: { },
    data() {
        return {
            snackbarSuccess: false,
            title: "",
            email: "",
            validateEmail: (value) => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return pattern.test(value) || 'Invaid email';
            },
            enterEmail: "",
            enterSubject: "",
            enterMessage: "",
        };
    },
    
    methods: {
        send() {
            if (this.$refs.emailForm.validate()) {
               this.snackbarSuccess = true;

               window.location.href = `
                    mailto:${this.email}?subject=<${this.enterEmail}> ${this.enterSubject}&body=${this.enterMessage}
               `; 

               this.enterEmail = "";
               this.enterSubject = "";
               this.enterMessage = "";
               this.$refs.emailForm.resetValidation();
            }
        }
    },

    async mounted() {
        if (!localStorage.getItem("pageInfo")) {
            let pageInfo = await getPageInfo();
            this.title = pageInfo[0].contactTitle;
            this.email = pageInfo[0].contactEmail;
        } else {
            let pageInfo = JSON.parse(localStorage.getItem("pageInfo"));
            this.title = pageInfo.contactTitle;
            this.email = pageInfo.contactEmail;
        }
    }
}
</script>
