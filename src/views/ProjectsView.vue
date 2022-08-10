<style>
.doShow {                  
    opacity: 1;            
    animation-name: show;  
    animation-duration: 1s;
}                          
</style>
<template>
    <section>
        <v-container fluid>
            <v-row justify="center" class="doShow" style="padding-top: 20px;
            margin-right: 5%; margin-left: 5%">
                <v-col :cols="$vuetify.breakpoint.smAndDown ? 12 : 9">
                    <v-slide-group
                        show-arrows
                    >
                        <v-slide-item>
                            <v-btn
                                :large="!$vuetify.breakpoint.smAndDown"
                                :small="$vuetify.breakpoint.smAndDown"
                                :color="selectedPage != 0 ? 'grey' : 'primary'"
                                @click="selectPage(0)"
                                style="margin: 10px"
                                outlined
                            >
                                ALL
                            </v-btn>
                        </v-slide-item>
                        <v-slide-item
                            v-for="(language, i) in languages" :key="i"
                        >
                            <v-btn
                                :large="!$vuetify.breakpoint.smAndDown"
                                :small="$vuetify.breakpoint.smAndDown"
                                :color="selectedPage != i+1 ? 'grey' : 'primary'"
                                outlined
                                @click="selectPage(i+1)"
                                style="margin: 10px"
                            >
                                {{ language }}
                            </v-btn>
                        </v-slide-item>
                    </v-slide-group>
                </v-col>
                <v-col :cols="$vuetify.breakpoint.smAndDown ? 12 : 3">
                    <v-text-field
                        label="Search"
                        outlined
                        clearable
                        v-model="search"
                        @input="searchProjects"
                        append-icon="mdi-magnify"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row justify="center" class="doShow" v-if="showProjects.length > 0" no-gutters >
                    <v-col cols="12" style="padding: 0; margin: 0">
                        <v-data-iterator
                            sort-by="date"
                            :sort-desc="true"
                            :items-per-page="$vuetify.breakpoint.mdAndDown ? 12 : 25"
                            :items="showProjects"
                            style="padding: 0; margin: 0"
                            :page.sync="page"
                            :footer-props="{
                                itemsPerPageText: $vuetify.breakpoint.smAndDown ? 'Show' : 'Projects per page',
                                itemsPerPageOptions: $vuetify.breakpoint.mdAndDown ?  [12,24,-1] : [25, 50, -1],
                                showCurrentPage: true,
                                showFirstLastPage: $vuetify.breakpoint.smAndDown ? false : true,
                                disableItemsPerPage: $vuetify.breakpoint.smAndDown,
                            }"
                        >
                            <template v-slot:default="props">
                                <v-container style="padding-bottom: 40px; margin: 0" fluid>
                                    <v-row justify="center" style="margin-left: 10%;
                                    margin-right: 10%">
                                        <v-col v-for="(item, i) in props.items" :key="i"
                                        cols="auto" md="4" style="max-width: 260px"> 
                                            <projectView 
                                                style="height: 100%"
                                                :project="item"
                                                class="doShow"></projectView>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </template>
                        </v-data-iterator>
                    </v-col>
            </v-row>
        </v-container>
    </section>
</template>

<script>
/* eslint-disable no-unused-vars */
import { getProjects } from '../firebase.js';
import projectView from '../components/projectView.vue';

export default {
    name: 'ProjectsView',
    components: { projectView },
    data() {
        return {
            page: 1,
            search: "",
            allProjects: [],
            showProjects: [],
            selectedPage: 0,
            languages: [],
        }
    },
    
    computed: {
        projectNames() {
            return this.allProjects.map((p) => {
                return p.language.toLowerCase() + ' ' + p.name.toLowerCase();
            });
        },

        sortedProjects() {
            let sorted = new Map();
            for (let i = 0; i < this.languages.length; i++) {
                sorted.set(this.languages[i],[]);
            }
            for (let j = 0; j < this.allProjects.length; j++) {
                for (let k = 0; k < this.allProjects[j].language.split(", ").length; k++) {
                    let arr = sorted.get(this.allProjects[j].language.split(", ")[k].toLowerCase());
                    arr.push(this.allProjects[j]);
                    sorted.set(this.allProjects[j].language.split(", ")[k].toLowerCase(),arr);
                }
            }
            return sorted;
        },
    },

    methods: {
        searchProjects() {
            this.selectPage(0);
            let matches = this.projectNames.map((p,i) => {
                if (p.includes(this.search.toLowerCase())) {
                    return i;
                }
            });
            this.showProjects = this.allProjects.filter((p,i) => {
                return matches.indexOf(i) > -1;
            });
        },
        selectPage(i) {
            this.page = 1;
            this.selectedPage = i;
            if (i == 0) {
                this.showProjects = this.allProjects;
            } else {
                this.showProjects = this.sortedProjects.get(this.languages[i-1]);
            }
        },

    },

    async mounted() {
        this.allProjects = await getProjects();
        for (let i = 0; i < this.allProjects.length; i++) {
            for (let j = 0; j < this.allProjects[i].language.split(", ").length; j++) {
                let lang = this.allProjects[i].language.split(", ")[j];
                if (!this.languages.includes(lang.toLowerCase())) {
                    this.languages.push(lang.toLowerCase());
                }
            }
        }
        this.selectPage(0);
    }
    
}
/* eslint-disable no-unused-vars */
</script>
