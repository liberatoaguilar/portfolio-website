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
                </v-slide-group>
            </v-row>
        </v-container>
    </v-app-bar>
    <v-main>
      <router-view/>
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
                    this.$router.push("resume");
                    break;
                case 1:
                    this.$router.push("about");
                    break;
                case 2:
                    this.$router.replace("/");
                    break;
                case 3:
                    this.$router.push("projects");
                    break;
                case 4:
                    this.$router.push("contact");
                    break;
            }
        },
    },
  },
  methods: {
  },
  mounted() {
  }
};
</script>
