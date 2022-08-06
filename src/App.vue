<template>
  <v-app>
    <v-app-bar app :height="$vuetify.breakpoint.smAndDown ? '160%' : '200%'" dense>
        <v-container style="padding: 0">
            <v-row justify="center">
                <v-col cols="auto">
                    <h1 :class="$vuetify.breakpoint.smAndDown ? 'text-h4 text-center' : 'text-h2 text-center'"
                    >Liberato Aguilar</h1>
                </v-col>
            </v-row>
            <v-row justify="center">
                <v-slide-group
                    show-arrows
                    center-active
                    mandatory
                    v-model="page"
                    :style="$vuetify.breakpoint.smAndDown ? 'width: 100%' : 'width: 80%'"
                >
                    <v-col cols="auto">
                        <v-slide-item v-slot="{ active, toggle }">
                            <v-btn
                                :outlined="!active"
                                :color="active ? 'primary' : 'grey'"
                                style="margin: 10px"
                                @click="toggle"
                                :large="!$vuetify.breakpoint.smAndDown"
                                :small="$vuetify.breakpoint.smAndDown"
                            >RESUME</v-btn>
                        </v-slide-item>
                    </v-col>
                    <v-spacer/>
                    <v-col cols="auto">
                        <v-slide-item v-slot="{ active, toggle }">
                            <v-btn
                                :outlined="!active"
                                :color="active ? 'primary' : 'grey'"
                                style="margin: 10px"
                                @click="toggle"
                                :large="!$vuetify.breakpoint.smAndDown"
                                :small="$vuetify.breakpoint.smAndDown"
                            >ABOUT</v-btn>
                        </v-slide-item>
                    </v-col>
                    <v-spacer/>
                    <v-col cols="auto">
                        <v-slide-item v-slot="{ active, toggle }">
                            <v-btn
                                :outlined="!active"
                                :color="active ? 'primary' : 'grey'"
                                style="margin: 10px"
                                @click="toggle"
                                :large="!$vuetify.breakpoint.smAndDown"
                                :small="$vuetify.breakpoint.smAndDown"
                            >HOME</v-btn>
                        </v-slide-item>
                    </v-col>
                    <v-spacer/>
                    <v-col cols="auto">
                        <v-slide-item v-slot="{ active, toggle }">
                            <v-btn
                                :outlined="!active"
                                :color="active ? 'primary' : 'grey'"
                                style="margin: 10px"
                                @click="toggle"
                                :large="!$vuetify.breakpoint.smAndDown"
                                :small="$vuetify.breakpoint.smAndDown"
                            >PROJECTS</v-btn>
                        </v-slide-item>
                    </v-col>
                    <v-spacer/>
                    <v-col cols="auto">
                        <v-slide-item v-slot="{ active, toggle }">
                            <v-btn
                                :outlined="!active"
                                :color="active ? 'primary' : 'grey'"
                                style="margin: 10px"
                                @click="toggle"
                                :large="!$vuetify.breakpoint.smAndDown"
                                :small="$vuetify.breakpoint.smAndDown"
                            >CONTACT</v-btn>
                        </v-slide-item>
                    </v-col>
                    <v-slide-item
                        style="opacity: 0"
                    >
                    </v-slide-item>
                </v-slide-group>
            </v-row>
        </v-container>
    </v-app-bar>
    <v-main>
      <router-view @changeRoute="page = 5"></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
      page: 2,
  }),
  watch: {
    page: {
        handler() {
            switch (this.page) {
                case 0:
                    this.$router.replace("/resume");
                    break;
                case 1:
                    this.$router.replace("/about");
                    break;
                case 2:
                    this.$router.replace("/");
                    break;
                case 3:
                    this.$router.replace("/projects");
                    break;
                case 4:
                    this.$router.replace("/contact");
                    break;
            }
        },
    },
  },
  methods: {
  },
  mounted() {
    switch(this.$route.name) {
        case 'resume':
            this.page = 0;
            break;
        case 'about':
            this.page = 1;
            break;
        case '/':
            this.page = 2;
            break;
        case 'projects':
            this.page = 3;
            break;
        case 'contact':
            this.page = 4;
            break;
    }
  }
};
</script>
