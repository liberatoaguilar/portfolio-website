<style>
.borderImg {
    border: 1px solid var(--v-imgBorder-base);
    border-radius: 5px;
    padding: 50px;
}

.doShow {
    opacity: 1;
    animation-name: show;
    animation-duration: 1s;
}

</style>
<template>
    <section>
        <v-container fluid> 
        <template v-if="loggedIn">
                <v-row justify="center" class="doShow" style="padding-top:
                70px; margin-right: 10%; margin-left: 10%">
                    <v-col cols="12">
                        <v-data-table
                            fixed-header
                            loading=true
                            loading-text="Loading Projects"
                            no-results-text="No Projects Found"
                            no-data-text="No Projects Found"
                            sort-by="projectID"
                            :sort-desc="false"
                            :headers="headers"
                            :items="projects"
                            show-select
                            v-model="selected"
                            :search="search"
                            item-key="projectID"
                            :footer-props="{
                                itemsPerPageText: 'Projects per page',
                                itemsPerPageOptions: [25, 50, 100, -1],
                                showFirstLastPage: true,
                                showCurrentPage: true,
                            }"
                        >
                            <template slot="top">
                                <v-container>
                                    <v-row justify="space-around">
                                        <v-col cols="4">
                                            <v-text-field
                                                label="Search"
                                                outlined
                                                clearable
                                                v-model="search"
                                                append-icon="mdi-magnify"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="8">
                                            <v-container>
                                                <v-row justify="end">
                                                    <v-col cols="auto"
                                                    v-if="featureChanged">
                                                        <v-btn
                                                            color="success"
                                                            @click="saveAll"
                                                        >Save All</v-btn>
                                                    </v-col>
                                                    <v-col cols="auto" v-if="selected.length > 0">
                                                        <v-btn
                                                            color="error"
                                                            @click="clickEraseMultiple"
                                                        >Erase Selected</v-btn>
                                                    </v-col>
                                                    <v-col cols="auto">
                                                        <v-btn
                                                            color="primary"
                                                            @click="newItem"
                                                        >New Project</v-btn>
                                                    </v-col>
                                                </v-row>
                                            </v-container>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </template>
                            <template slot="item" slot-scope="scope">
                                <tr>
                                    <td> 
                                        <v-checkbox
                                            v-model="scope.isSelected"
                                            @change="scope.select"
                                        ></v-checkbox>
                                    </td>
                                    <td> {{ scope.item.projectID }} </td>
                                    <td> {{ scope.item.name }}</td>
                                    <td> {{ scope.item.language }} </td>
                                    <td> {{ scope.item.date }} </td>
                                    <td>
                                        <v-switch
                                            v-model="scope.item.featured"
                                            @change="changeFeatured(scope.item.projectID)"
                                            color="orange"
                                        ></v-switch>
                                    </td>
                                    <td>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on }">
                                                <v-btn icon @click="editItem(scope.item)"
                                                v-on="on">
                                                <v-icon>mdi-pencil</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>Edit</span>
                                        </v-tooltip>
                                    </td>
                                    <td>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on }">
                                                <v-btn icon v-on="on"
                                                @click="clickErase(scope.item.projectID)">
                                                <v-icon color="error">mdi-delete</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>Erase</span>
                                        </v-tooltip>
                                    </td>
                                </tr>
                            </template>
                        </v-data-table>
                    </v-col>
                </v-row> 
                <v-row justify="center" class="doShow">
                    <v-col cols="auto">
                    </v-col>
                </v-row> 
            </template>
            <template v-else>
                <v-row justify="center" class="doShow" style="padding-top: 100px">
                    <v-col cols="auto" :style="'font-size: '+notLoggedFont+'px'">
                        Not Logged In
                    </v-col>
                </v-row>
            </template>
        </v-container>
        <v-footer app padless color="background" v-if="loggedIn">
            <v-container fluid>
                <v-row justify="center">
                    <v-col cols="auto">
                        <v-menu offset-x>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    color="warning"
                                    text
                                    v-on="on"
                                    v-bind="attrs"
                                >Backup</v-btn>
                            </template>
                            <v-list>
                                <v-list-item 
                                    @click="saveBackup"
                                >
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            Save Backup
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item
                                style="color: #ff5252 !important"
                                @click="loadBackupClick">
                                    <v-list-item-content>
                                        <b><v-list-item-title>
                                            Load Backup
                                        </v-list-item-title></b>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn
                            :large="!$vuetify.breakpoint.smAndDown"
                            :small="$vuetify.breakpoint.smAndDown"
                            text
                            @click="loginInfo = true"
                        >
                            LOGIN INFO
                        </v-btn>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn
                            :large="!$vuetify.breakpoint.smAndDown"
                            :small="$vuetify.breakpoint.smAndDown"
                            text
                            @click="pageInfoDialog = true"
                        >
                            PAGE INFO
                        </v-btn>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn
                            :large="!$vuetify.breakpoint.smAndDown"
                            :small="$vuetify.breakpoint.smAndDown"
                            text
                            @click="socialInfo = true"
                        >
                            SOCIAL INFO
                        </v-btn>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn
                            :large="!$vuetify.breakpoint.smAndDown"
                            :small="$vuetify.breakpoint.smAndDown"
                            text
                            @click="theme = true"
                        >
                            THEME
                        </v-btn>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn
                            :large="!$vuetify.breakpoint.smAndDown"
                            :small="$vuetify.breakpoint.smAndDown"
                            color="error"
                            text
                            @click.prevent="logOutClick"
                        >
                            LOG OUT
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-footer>

        <v-snackbar
            color="error"
            v-model="snackbar"
            timeout="2000"
            top
            right
            max-width="168"
            min-width="168"
        >
            <b>Error: {{ snackbarErrorMsg }}</b>
        </v-snackbar>
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
        <v-snackbar
            color="warning"
            v-model="warningSnackbar"
            timeout="2000"
            top
            right
            max-width="168"
            min-width="168"
        >
            <b>Recommended 5 Featured</b>
        </v-snackbar>
        <v-snackbar
            color="warning"
            v-model="uploadingSnackbar"
            timeout="2000"
            top
            right
            max-width="168"
            min-width="168"
        >
            <b>Uploading</b>
        </v-snackbar>

        
        <v-dialog
            v-model="addSocial"
            max-width="500px"
            persistent
        >
            <v-card> 
                <v-card-title>
                    Add New Social
                </v-card-title>
                <v-card-text>
                    <v-form ref="newSocialForm">
                        <v-container>
                            <v-row dense>
                                <v-col>
                                    <v-text-field
                                        label="Name"
                                        v-model="newSocialName"
                                        :rules="[() => !!newSocialName || 'Required Field']"
                                        outlined
                                    >
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row dense>
                                <v-col>
                                    <v-text-field
                                        label="Icon"
                                        v-model="newSocialIcon"
                                        :rules="[() => !!newSocialIcon || 'Required Field']"
                                        hint="MDI Icon"
                                        outlined
                                    >
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row dense>
                                <v-col>
                                    <v-text-field
                                        label="URL"
                                        v-model="newSocialURL"
                                        :rules="[() => !!newSocialURL || 'Required Field']"
                                        outlined
                                    >
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row dense justify="space-between">
                                <v-col cols="auto">
                                    <v-btn
                                        text
                                        color="error"
                                        @click="cancelNewSocial"
                                    >
                                    Cancel
                                    </v-btn>
                                </v-col>
                                <v-col cols="auto">
                                    <v-btn
                                        text
                                        @click="addNewSocial"
                                    >
                                    Save
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-card-text>
            </v-card> 
        </v-dialog>
        <v-dialog
            v-model="socialInfo"
            max-width="500px"
        >
            <v-card> 
                <v-card-title>
                    Edit Social Info
                </v-card-title>
                <v-card-text>
                    <v-form ref="socialForm">
                        <v-container>
                            <v-row dense v-for="(social,i) in socials" :key="i">
                                <v-col>
                                    <v-text-field
                                        :label="social.name+' URL'"
                                        v-model="socials[i].link"
                                        :rules="[() => !!socials[i].link || 'Required Field']"
                                        outlined
                                    >
                                    </v-text-field>
                                </v-col>
                                <v-col cols="auto">
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on }">
                                            <v-btn icon v-on="on"
                                            @click="eraseSocialClick(i)">
                                            <v-icon color="error">mdi-delete</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Erase</span>
                                    </v-tooltip>
                                </v-col>
                            </v-row>
                            <v-row dense justify="space-between">
                                <v-col cols="auto">
                                    <v-btn
                                        text
                                        @click="addSocial = true"
                                    >
                                    Add
                                    </v-btn>
                                </v-col>
                                <v-col cols="auto">
                                    <v-btn
                                        text
                                        @click="saveSocialInfo"
                                    >
                                    Save
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-card-text>
            </v-card> 
        </v-dialog>
        <v-dialog
            v-model="projectDialog"
            max-width="750px"
            persistent
        >
            <v-card>
                <v-card-title>
                    {{ cardTitle }}
                </v-card-title>
                <v-card-text>
                    <v-form ref="projectForm">
                        <v-container>
                            <v-row justify="center" dense>
                                <v-col cols="6">
                                    <v-text-field
                                        :rules="[() => !!editProject.name || 'Required Field']"
                                        label="Name"
                                        v-model="editProject.name"
                                        outlined
                                    >
                                    </v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-menu
                                        ref="menu"
                                        v-model="menu"
                                        :close-on-content-click="false"
                                        :return-value.sync="editProject.date"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="auto"
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                                v-model="editProject.date"
                                                label="Date"
                                                :rules="[() => !!editProject.date || 'Required Field']"
                                                append-icon="mdi-calendar"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                                outlined
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker
                                            v-model="editProject.date"
                                            no-title
                                            scrollable
                                        >
                                            <v-spacer/>
                                            <v-btn
                                                text
                                                color="primary"
                                                @click="menu = false"
                                            >Cancel</v-btn>
                                            <v-btn
                                                text
                                                color="primary"
                                                @click="$refs.menu.save(editProject.date)"
                                            >Save</v-btn>
                                        </v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field
                                        :rules="[() => !!editProject.language || 'Required Field']"
                                        label="Language"
                                        v-model="editProject.language"
                                        outlined
                                    >
                                    </v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field
                                        label="Code URL"
                                        v-model="editProject.linkCode"
                                        outlined
                                    >
                                    </v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-textarea
                                        :rules="[() => !!editProject.description || 'Required Field']"
                                        label="Description"
                                        v-model="editProject.description"
                                        outlined
                                    >
                                    </v-textarea>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field
                                        label="Project URL"
                                        v-model="editProject.linkProject"
                                        outlined
                                    >
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row dense justify="center">
                                <template v-if="editProject.pictures.length > 0">
                                    <v-col v-for="(pic,i) in editProject.pictures" :key="i"
                                    cols="auto" style="padding-right: 20px">
                                        <v-hover>
                                            <template v-slot:default="{ hover }">
                                                <v-badge
                                                    :value="hover"
                                                    color="error"
                                                    content="X"
                                                    right
                                                >
                                                    <v-img
                                                        class="borderImg"
                                                        style="cursor: pointer"
                                                        @click="clickPicture(i)"
                                                        contain
                                                        :src="pic"
                                                        :width="70"
                                                    ></v-img>
                                                </v-badge>
                                            </template>
                                        </v-hover>
                                    </v-col>
                                </template>
                                <v-col v-if="editProject.pictures.length < 5"
                                style="padding-left: 20px" cols="auto">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        ref="uploadPicture"
                                        @change="uploadImage($event)"
                                        v-show="false"
                                    />
                                    <v-btn
                                        outlined
                                        @click="uploadClick"
                                        v-if="showAddPicture"
                                    >ADD PICTURE</v-btn>
                                </v-col>
                            </v-row>
                            <v-row dense justify="end">
                                <v-col cols="auto">
                                    <v-btn
                                        v-if="editedIndex == -1"
                                        color="error"
                                        @click="cancel"
                                    >
                                    Cancel
                                    </v-btn>
                                </v-col>
                                <v-col cols="auto">
                                    <v-btn
                                        color="primary"
                                        @click="saveProject"
                                    >
                                    Save
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="confirmDialog"
            persistent
            max-width="400px"
        >
            <v-card>
                <v-card-title>{{ deleteTitle }}</v-card-title>
                <v-card-text>
                    {{ deleteText }} 
                </v-card-text>
                <v-card-actions>         
                    <v-btn
                        text
                        @click="confirmDialog = false"
                    >Cancel</v-btn>
                    <v-btn
                        text
                        color="error"
                        @click="confirmDeleteMethod"
                    >Confirm</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="loginInfo"
            max-width="500px"
        >
            <v-card> 
                <v-card-title>
                    Edit Login Info
                </v-card-title>
                <v-card-text>
                    <v-form ref="passwordForm">
                        <v-container>
                            <v-row dense>
                                <v-col>
                                    <v-text-field
                                        label="Username"
                                        v-model="newUsername"
                                        outlined
                                        :rules="[validateEmail]"
                                    >
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row dense>
                                <v-col>
                                    <v-text-field
                                        label="New Password"
                                        type="password"
                                        v-model="newPassword"
                                        :rules="[() => newPassword.length > 5 || 'Password must be 6 characters']"
                                        outlined
                                    >
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row dense>
                                <v-col>
                                    <v-text-field
                                        label="Confirm Password"
                                        type="password"
                                        v-model="newPasswordConfirm"
                                        :rules="[() => newPassword === newPasswordConfirm || 'Passwords don\'t match']"
                                        outlined
                                    >
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row dense justify="end">
                                <v-col cols="auto">
                                    <v-btn
                                        text
                                        @click="saveLoginInfo"
                                    >
                                    Save
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-card-text>
            </v-card> 
        </v-dialog>
        <v-dialog
            v-model="pageInfoDialog"
            max-width="750px"
            scrollable
            persistent
        >
            <v-card> 
                <v-card-title>
                    Edit Page Info
                </v-card-title>
                <v-card-text>
                    <v-form ref="pageInfoForm">
                        <v-container>
                            <v-row dense justify="center">
                                <v-col cols="6">
                                    <v-text-field
                                        label="Home Title"
                                        v-model="pageInfo.homeTitle"
                                        outlined
                                        :rules="[() => !!pageInfo.homeTitle || 'Required Field']"
                                    > </v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field
                                        label="About Title"
                                        v-model="pageInfo.aboutTitle"
                                        outlined
                                        :rules="[() => !!pageInfo.aboutTitle || 'Required Field']"
                                    > </v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-textarea
                                        label="Home Description"
                                        v-model="pageInfo.homeDescription"
                                        outlined
                                        :rules="[() => !!pageInfo.homeDescription || 'Required Field']"
                                    > </v-textarea>
                                </v-col>
                                <v-col cols="6">
                                    <v-textarea
                                        label="About Description"
                                        v-model="pageInfo.aboutDescription"
                                        outlined
                                        :rules="[() => !!pageInfo.aboutDescription || 'Required Field']"
                                    > </v-textarea>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field
                                        label="Contact Title"
                                        v-model="pageInfo.contactTitle"
                                        outlined
                                        :rules="[() => !!pageInfo.contactTitle || 'Required Field']"
                                    > </v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field
                                        label="Contact Email"
                                        v-model="pageInfo.contactEmail"
                                        outlined
                                        :rules="[validateEmail]"
                                    > </v-text-field>
                                </v-col>
                                <v-col cols="auto">
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        ref="uploadPDF"
                                        @change="uploadImagePath($event,'resumePDF')"
                                        v-show="false"
                                    />
                                    <v-btn
                                        outlined
                                        @click="uploadClickResumePDF"
                                        v-if="pageInfo.resumePDF && showAddAboutPicture"
                                    >{{ this.pageInfo.resumePDF }}</v-btn>
                                    <v-btn
                                        outlined
                                        @click="uploadClickResumePDF"
                                        v-if="!pageInfo.resumePDF && showAddAboutPicture"
                                    >ADD RESUME</v-btn>
                                </v-col>
                            </v-row>
                            <v-row justify="center" dense style="padding-top: 20px">
                                <v-col class="borderImg text-center" cols="auto">
                                    <p>Home Picture</p>
                                    <v-hover v-if="pageInfo.homePictureURL">
                                        <template v-slot:default="{ hover }">
                                            <v-badge
                                                :value="hover"
                                                color="error"
                                                content="X"
                                                right
                                            >
                                                <v-img
                                                    class="borderImg"
                                                    style="cursor: pointer"
                                                    @click="clickPicturePath('home',-1)"
                                                    contain
                                                    :src="pageInfo.homePictureURL"
                                                    :width="70"
                                                ></v-img>
                                            </v-badge>
                                        </template>
                                    </v-hover>
                                    <template v-if="!pageInfo.homePictureURL">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            ref="uploadPictureHome"
                                            @change="uploadImagePath($event,'home')"
                                            v-show="false"
                                        />
                                        <v-btn
                                            outlined
                                            @click="uploadClickHome"
                                            v-if="showAddAboutPicture"
                                        >ADD</v-btn>
                                    </template>
                                </v-col>
                                <v-col class="borderImg text-center" cols="auto" style="margin-left: 5px">
                                    <p>About Pictures</p>
                                    <template v-if="pageInfo.aboutPictures.length > 0">
                                        <v-hover v-for="(pic, i) in pageInfo.aboutPictures"
                                        :key="i" :style="i != 0 ? 'margin-left: 2px' : ''">
                                            <template v-slot:default="{ hover }">
                                                <v-badge
                                                    :value="hover"
                                                    color="error"
                                                    content="X"
                                                    right
                                                >
                                                    <v-img
                                                        class="borderImg"
                                                        style="cursor: pointer;"
                                                        @click="clickPicturePath('about',i)"
                                                        contain
                                                        :src="pageInfo.aboutPictures[i]"
                                                        :width="70"
                                                    ></v-img>
                                                </v-badge>
                                            </template>
                                        </v-hover>
                                    </template>
                                    <template v-if="pageInfo.aboutPictures.length < 3">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            ref="uploadPictureAbout"
                                            @change="uploadImagePath($event,'about')"
                                            v-show="false"
                                        />
                                        <v-btn
                                            outlined
                                            @click="uploadClickAbout"
                                            v-if="showAddAboutPicture"
                                            :style="pageInfo.aboutPictures.length > 0 ?  'margin-left: 5px' : ''"
                                        >ADD</v-btn>
                                    </template>
                                </v-col>
                                <v-col class="borderImg text-center" cols="auto" style="margin-left: 5px">
                                    <p>Resume Picture</p>
                                    <v-hover v-if="pageInfo.resumePictureURL">
                                        <template v-slot:default="{ hover }">
                                            <v-badge
                                                :value="hover"
                                                color="error"
                                                content="X"
                                                right
                                            >
                                                <v-img
                                                    class="borderImg"
                                                    style="cursor: pointer"
                                                    @click="clickPicturePath('resume',-1)"
                                                    contain
                                                    :src="pageInfo.resumePictureURL"
                                                    :width="70"
                                                ></v-img>
                                            </v-badge>
                                        </template>
                                    </v-hover>
                                    <template v-if="!pageInfo.resumePictureURL">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            ref="uploadPictureResume"
                                            @change="uploadImagePath($event,'resume')"
                                            v-show="false"
                                        />
                                        <v-btn
                                            outlined
                                            @click="uploadClickResume"
                                            v-if="showAddAboutPicture"
                                        >ADD</v-btn>
                                    </template>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn
                        text
                        @click="savePageInfo"
                    >
                    Save
                    </v-btn>
                </v-card-actions>
            </v-card> 
        </v-dialog>
        <v-dialog
            v-model="theme"
            max-width="500px"
            scrollable
        >
            <v-card> 
                <v-card-title>
                    Edit Theme
                </v-card-title>
                <v-card-text>
                    <v-form ref="themeForm">
                        <v-container>
                            <v-row dense align="center">
                                <v-col cols="auto">
                                    <v-switch
                                        label="Dark Theme"
                                        v-model="themes[0].chosen"
                                        @change="currentTheme = themes[0].chosen ?  themes[0] : themes[1]"
                                    ></v-switch>
                                </v-col>
                            </v-row>
                            <v-row dense>
                                <v-col>
                                    <template 
                                        v-for="(t, i) in Object.keys(currentTheme).sort()"
                                    >
                                        <v-menu
                                            v-if="t != 'chosen'"
                                            :key="i"
                                            :close-on-content-click="false"
                                            :return-value="currentTheme[t]"
                                            transition="scale-transition"
                                            offset-y
                                            min-width="auto"
                                            ref="menu2"
                                        >
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field
                                                    v-model="currentTheme[t]"
                                                    :label="t.toUpperCase()"
                                                    :rules="[() => !!currentTheme[t]|| 'Required Field']"
                                                    readonly
                                                    v-bind="attrs"
                                                    v-on="on"
                                                    outlined
                                                    :color="currentTheme[t]"
                                                >
                                                    <template v-slot:append>
                                                        <v-icon
                                                        style="border: 1px solid grey;
                                                        border-radius: 5px; padding: 0;
                                                        margin: 0"
                                                        :color="currentTheme[t]">mdi-square-rounded</v-icon>
                                                    </template>
                                                </v-text-field>
                                            </template>
                                            <v-color-picker
                                                hide-mode-switch
                                                v-model="currentTheme[t]"
                                                mode="hexa"
                                            >
                                            </v-color-picker>
                                        </v-menu>
                                    </template>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn
                        text
                        @click="saveTheme"
                    >
                    Save
                    </v-btn>
                </v-card-actions>
                </v-card> 
        </v-dialog>
    </section>
</template>

<script>
/* eslint-disable no-unused-vars */
import { getProjects, deletePicture, addProject, deleteProjects, getProjectsBackup,
saveProjectsBackup, saveAllProjects, getSocials, setSocial, eraseSocials, setPageInfo,
getPageInfo, getThemes, setTheme } from '../firebase.js';
import { getAuth, onAuthStateChanged, signOut, updateEmail, updatePassword } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
export default {
    name: 'adminView',
    components: { },
    data() {
        return {
            theme: false,
            themes: [],
            currentTheme: null,
            showAddAboutPicture: true,
            validateEmail: (value) => {
                    const pattern =
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Invaid email'
            },
            newUsername: "",
            newPassword: "",
            newPasswordConfirm: "",
            loginInfo: false,
            socialInfo: false,
            pageInfoDialog: false,
            pageInfo: {},
            deleteTitle: "",
            deleteText: "",
            confirmDialog: false,
            imgIndex: -1,
            confirmDeleteMethod: null,
            snackbar: false,
            snackbarErrorMsg: "",
            snackbarSuccess: false,
            warningSnackbar: false,
            uploadingSnackbar: false,
            showAddPicture: true,
            menu: false,
            colorPickerMenu: false,
            projects: [],
            search: "",
            nextProjectID: -1,
            featureChanged: false,
            editedIndex: -1,
            selected: [],
            loggedIn: false,
            headers: [
                {
                    text: "Project ID",
                    align: "start",
                    sortable: true,
                    value: "projectID"
                },
                {
                    text: "Name",
                    align: "start",
                    sortable: false,
                    value: "name"
                },
                {
                    text: "Language",
                    align: "start",
                    sortable: false,
                    value: "Language"
                },
                {
                    text: "Date",
                    align: "start",
                    sortable: true,
                    value: "date"
                },
                {
                    text: "Featured",
                    align: "start",
                    sortable: false,
                    value: "featured"
                },
                { text: "", sortable: false },
                { text: "", sortable: false },
            ],
            featured: [],
            editProject: {
                date: "",
                description: "",
                featured: "",
                language: "",
                linkCode: "",
                linkProject: "",
                name: "",
                pictures: [],
                projectID: -1,
            },
            defaultProject: {
                date: "",
                description: "",
                featured: "",
                language: "",
                linkCode: "",
                linkProject: "",
                name: "",
                pictures: [],
                projectID: -1,
            },
            projectDialog: false,
            socials: [],
            addSocial: false,
            newSocialName: "",
            newSocialIcon: "",
            newSocialURL: "",
            eraseSocialIndex: -1,
            imgIndexAbout: -1,
            imgPath: "",
        }
    },

    computed: {
        cardTitle() {
            return this.editedIndex == -1 ? "New Project" : "Edit Project";
        },
        notLoggedFont() {
            switch (this.$vuetify.breakpoint.name) {
                case 'xs': return 30
                case 'sm': return 30
                case 'md': return 80
                case 'lg': return 80
                case 'xl': return 80
            }
            return 80
        },
    },

    methods: {
        async saveTheme() {
            this.theme = false;
            this.snackbarSuccess = true;
            this.$vuetify.theme.dark = this.themes[0].chosen;
            let keys = Object.keys(this.themes[0]);
            for (let i = 0; i < keys.length; i++) {
                if (keys[i] != "chosen") {
                    this.$vuetify.theme.themes.dark[keys[i]] = this.themes[0][keys[i]];
                    this.$vuetify.theme.themes.light[keys[i]] = this.themes[1][keys[i]];
                }
            }
            await setTheme(this.themes[0],"dark");
            await setTheme(this.themes[1],"light");
            localStorage.setItem("themes",JSON.stringify(this.themes));
        },
        uploadClickResumePDF() {
            this.$refs.uploadPDF.click();
        },
        uploadClickHome() {
            this.$refs.uploadPictureHome.click();
        },
        uploadClickResume() {
            this.$refs.uploadPictureResume.click();
        },
        uploadClickAbout() {
            this.$refs.uploadPictureAbout.click();
        },
        clickPicturePath(path,index) {
            this.deleteTitle = "Delete Picture?";
            this.deleteText = "";
            this.confirmDialog = true;
            this.confirmDeleteMethod = this.deletePicturePath;
            this.imgIndexAbout = index;
            this.imgPath = path;
        },
        async deletePicturePath() {
            switch(this.imgPath) {
                case 'resume':
                    await deletePicture(this.pageInfo.resumePictureURL);
                    this.pageInfo.resumePictureURL = "";
                    break;
                case 'home':
                    await deletePicture(this.pageInfo.homePictureURL);
                    this.pageInfo.homePictureURL = "";
                    break;
                case 'about':
                    await deletePicture(this.pageInfo.aboutPictures[this.imgIndexAbout]);
                    this.pageInfo.aboutPictures.splice(this.imgIndexAbout,1);
                    break;
            }
            this.deleteTitle = "";
            this.deleteText = "";
            this.confirmDialog = false;
            this.imgIndexAbout = -1;
            this.imgPath = ""
            this.confirmDeleteMethod = null;
            this.snackbarSuccess = true;
            await setPageInfo(this.pageInfo);
        },
        uploadImagePath(ev,path) {
            this.uploadingSnackbar = true;
            this.showAddAboutPicture = false;
            const storage = getStorage();
            const storageRef = ref(storage, path+'/'+ev.target.files[0].name);
            uploadBytes(storageRef, ev.target.files[0]).then(() => {
                getDownloadURL(storageRef).then(async (url) => {
                    switch (path) {
                        case 'resume':
                            if (this.pageInfo.resumePictureURL.split("?alt=media&token=")[0]
                                != url.split("?alt=media&token=")[0]) {
                                this.uploadingSnackbar = false;
                                this.snackbarSuccess = true;
                                this.pageInfo.resumePictureURL = url; 
                                this.showAddAboutPicture = true;
                            } else {
                                this.uploadingSnackbar = false;
                                this.snackbarErrorMsg = "Duplicate";
                                this.snackbar = true;
                                this.showAddAboutPicture = true;
                            }
                            break;
                        case 'resumePDF':
                            if (this.pageInfo.resumePDFURL.split("?alt=media&token=")[0]
                                != url.split("?alt=media&token=")[0]) {
                                const storage = getStorage();
                                try {
                                    const storageRef = ref(storage, 'resumePDF/'+this.pageInfo.resumePDF);
                                    await deleteObject(storageRef).then(() => {

                                    });
                                } catch {
                                    console.log("");
                                }
                                this.uploadingSnackbar = false;
                                this.snackbarSuccess = true;
                                this.pageInfo.resumePDFURL = url; 
                                this.pageInfo.resumePDF = ev.target.files[0].name;
                                this.showAddAboutPicture = true;
                            } else {
                                this.uploadingSnackbar = false;
                                this.snackbarErrorMsg = "Same Resume";
                                this.snackbar = true;
                                this.showAddAboutPicture = true;
                            }
                            break;
                        case 'about':
                            if (this.pageInfo.aboutPictures.map((pic) => {
                                return pic.split("?alt=media&token=")[0];
                            }).indexOf(url.split("?alt=media&token=")[0]) == -1) {
                                this.uploadingSnackbar = false;
                                this.snackbarSuccess = true;
                                this.pageInfo.aboutPictures.push(url); 
                                this.showAddAboutPicture = true;
                            } else {
                                this.snackbar = true;
                                this.snackbarErrorMsg = "Duplicate";
                                this.showAddAboutPicture = true;
                            }
                            break;
                        case 'home':
                            if (this.pageInfo.homePictureURL.split("?alt=media&token=")[0]
                                != url.split("?alt=media&token=")[0]) {
                                this.uploadingSnackbar = false;
                                this.snackbarSuccess = true;
                                this.pageInfo.homePictureURL = url; 
                                this.showAddAboutPicture = true;
                            } else {
                                this.uploadingSnackbar = false;
                                this.snackbarErrorMsg = "Duplicate";
                                this.snackbar = true;
                                this.showAddAboutPicture = true;
                            }
                            break;
                    }
                });
            });
            this.snackbarErrorMsg = "";
        },
        async savePageInfo() {
            if (this.$refs.pageInfoForm.validate()) {
                if (this.pageInfo.aboutPictures.length < 1
                    || this.pageInfo.homePictureURL == ""
                    || this.pageInfo.resumePictureURL == ""
                    || this.pageInfo.resumePDF == "") {
                    this.snackbarErrorMsg = "Missing picture/pdf";
                    this.snackbar = true;
                } else {
                    this.snackbarSuccess = true;
                    this.pageInfoDialog = false;
                    await setPageInfo(this.pageInfo);
                    let page = await getPageInfo();
                    this.pageInfo = page[0];
                    this.snackbarMsg = "";
                    this.snackbarErrorMsg = "";
                }
            } else {
                this.snackbar = true;
                this.snackbarErrorMsg = "Fill in fields correctly";
            }
        },
        cancelNewSocial() {
            this.addSocial = false;
            this.newSocialName = "";
            this.newSocialIcon = "";
            this.newSocialURL = "";
            this.$refs.newSocialForm.resetValidation();
        },
        async addNewSocial() {
            if (this.$refs.newSocialForm.validate()) {
                this.addSocial = false;
                this.socials.push({
                    name: this.newSocialName,
                    icon: this.newSocialIcon,
                    link: this.newSocialURL,
                    id: this.newSocialName.toLowerCase(),
                });
                this.newSocialName = "";
                this.newSocialIcon = "";
                this.newSocialURL = "";
                await this.saveSocialInfo();
                this.socials = await getSocials();
            } else {
                this.snackbar = true;
                this.snackbarErrorMsg = "Fill in fields correctly";
            }
        },
        eraseSocialClick(i) {
            this.deleteTitle = "Delete Social?";
            this.deleteText = "";
            this.confirmDialog = true;
            this.confirmDeleteMethod = this.eraseSocial;
            this.eraseSocialIndex = i;
        },
        async eraseSocial() {
            this.snackbarSuccess = true;
            this.confirmDialog = false;
            await eraseSocials([this.socials[this.eraseSocialIndex].id]);
            this.socials.splice(this.eraseSocialIndex,1);
            this.socials = await getSocials();
            this.deleteTitle = "";
            this.deleteText = "";
            this.confirmDeleteMethod = null;
            this.eraseSocialIndex = -1;
        },
        async saveSocialInfo() {
            if (this.$refs.socialForm.validate()) {
                this.socialInfo = false;
                this.snackbarSuccess = true;
                await eraseSocials(this.socials.map((s) => {
                    return s.id;
                }));
                for (let i = 0; i < this.socials.length; i++) {
                    setSocial(this.socials[i].id, this.socials[i]);
                }
                this.socials = await getSocials();
                this.snackbarErrorMsg = "";
            } else {
                this.snackbar = true;
                this.snackbarErrorMsg = "Fill in fields correctly";
            }
        },
        async saveLoginInfo() {
            if (this.$refs.passwordForm.validate()) {
                const auth = getAuth();
                updateEmail(auth.currentUser, this.newUsername).then(() => {
                    updatePassword(auth.currentUser, this.newPassword).then(() => {
                        this.snackbarSuccess = true;
                        this.loginInfo = false;
                        this.newUsername = "";
                        this.newPassword = "";
                        this.newPasswordConfirm = "";
                        this.snackbarErrorMsg = "";
                    }).catch(() => {
                        this.snackbar = true;
                        this.snackbarErrorMsg = "Requires Recent Login";
                    });
                }).catch(() => {
                    this.snackbar = true;
                    this.snackbarErrorMsg = "Requires Recent Login";
                });
            } else {
                this.snackbar = true;
                this.snackbarErrorMsg = "Fill in fields correctly";
            }
        },
        async saveBackup() {
            this.snackbarSuccess = true;
            await saveProjectsBackup(this.projects);
        },
        async loadBackup() {
            this.snackbarSuccess = true;
            this.confirmDialog = false;
            this.confirmDeleteMethod = null;
            this.deleteTitle = "";
            this.deleteText = "";
            let backupProjects = await getProjectsBackup();
            this.projects.forEach(async (project) => {
                if (backupProjects.map((p) => {
                    return Number(p.projectID);
                }).indexOf(Number(project.projectID)) == -1) {
                    for (let i = 0; i < project.pictures.length; i++) {
                        deletePicture(project.pictures[i]);
                    }
                    await deleteProjects([project.projectID]);
                }
            });
            this.projects = backupProjects;
            await saveAllProjects(this.projects);
            this.nextProjectID = -1;
            for (let i = 0; i < this.projects.length; i++) {
                if (Number(this.projects[i].projectID) > this.nextProjectID) {
                    this.nextProjectID = Number(this.projects[i].projectID);
                }
            }
            this.nextProjectID = Number(this.nextProjectID) + 1;
        },
        loadBackupClick() {
            this.deleteTitle = "Load Backup?";
            this.deleteText = "Deleted watch pictures must be reuploaded";
            this.confirmDialog = true;
            this.confirmDeleteMethod = this.loadBackup;
        },
        logOutClick() {
            this.deleteTitle = "Log Out?";
            this.deleteText = "";
            this.confirmDialog = true;
            this.confirmDeleteMethod = this.logOut;
        },
        logOut() {
            this.confirmDialog = false;
            this.confirmDeleteMethod = null;
            this.deleteTitle = "";
            this.deleteText = "";
            const auth = getAuth();
            signOut(auth).then(() => {
                this.$router.replace("/"); 
            }).catch(() => {
                this.$router.replace("/"); 
            })
        },
        async saveAll() {
            this.featureChanged = false;
            this.snackbarSuccess = true;
            for (let i = 0; i < this.featured.length; i++) {
                let index = this.projects.map((w) => { return Number(w.projectID);
                }).indexOf(Number(this.featured[i]));
                await addProject(this.projects[index],this.featured[i]);
            }
        },
        clickErase(num) {
            this.deleteTitle = "Delete Project?";
            this.deleteText = "";
            this.confirmDialog = true;
            this.confirmDeleteMethod = this.eraseProject;
            this.projectIDErase = num;
        },
        clickEraseMultiple() {
            this.deleteTitle = "Delete Projects?";
            this.deleteText = "";
            this.confirmDialog = true;
            this.confirmDeleteMethod = this.eraseMultipleProjects;
        },
        async eraseProject() {
            this.snackbarSuccess = true;
            this.confirmDialog = false
            const index = this.projects.map((project) => {
                return Number(project.projectID);
            }).indexOf(Number(this.projectIDErase));
            for (let i = 0; i < this.projects[index].pictures.length; i++) {
                deletePicture(this.projects[index].pictures[i]);
            }
            await deleteProjects([this.projectIDErase]);
            this.projects = await getProjects();
            this.deleteTitle = "";
            this.deleteText = "";
            this.confirmDeleteMethod = null;
            this.nextProjectID = -1;
            for (let i = 0; i < this.projects.length; i++) {
                if (Number(this.projects[i].projectID) > this.nextProjectID) {
                    this.nextProjectID = Number(this.projects[i].projectID);
                }
            }
            this.nextProjectID = Number(this.nextProjectID) + 1;
        },
        async eraseMultipleProjects() {
            this.snackbarSuccess = true;
            this.confirmDialog = false
            for (let j = 0; j < this.selected.length; j++) {
                for (let i = 0; i < this.selected[j].pictures.length; i++) {
                    deletePicture(this.selected[j].pictures[i]);
                }
            }
            await deleteProjects(this.selected.map((project) => {
                return project.projectID;
            }));
            this.projects = await getProjects();
            this.selected = []; 
            this.deleteTitle = "";
            this.deleteText = "";
            this.confirmDeleteMethod = null;
            this.nextProjectID = -1;
            for (let i = 0; i < this.projects.length; i++) {
                if (Number(this.projects[i].projectID) > this.nextProjectID) {
                    this.nextProjectID = Number(this.projects[i].projectID);
                }
            }
            this.nextProjectID = Number(this.nextProjectID) + 1;
        },
        clickPicture(index) {
            this.deleteTitle = "Delete Picture?";
            this.deleteText = "";
            this.confirmDialog = true;
            this.confirmDeleteMethod = this.confirmDeletePicture;
            this.imgIndex = index;
        },
        async confirmDeletePicture() {
            await deletePicture(this.editProject.pictures[this.imgIndex]);
            this.editProject.pictures.splice(this.imgIndex, 1);
            this.deleteTitle = "";
            this.deleteText = "";
            this.confirmDialog = false;
            this.imgIndex = -1;
            this.confirmDeleteMethod = null;
            this.snackbarSuccess = true;
        },
        async saveProject() {
            if (this.$refs.projectForm.validate()) {
                if (this.editProject.pictures.length < 1) {
                    this.snackbar = true;
                    this.snackbarErrorMsg = "Must add a picture";
                } else {
                    this.snackbarSuccess = true;
                    this.projectDialog = false;
                    if (this.editedIndex > -1) {
                        await addProject(this.editProject, this.editProject.projectID);
                        this.projects = await getProjects();
                    } else {
                        this.editProject.projectID = Number(this.nextProjectID);
                        await addProject(this.editProject, this.nextProjectID);
                        this.projects = await getProjects();
                    }
                    this.nextProjectID = -1;
                    for (let i = 0; i < this.projects.length; i++) {
                        if (Number(this.projects[i].projectID) > this.nextProjectID) {
                            this.nextProjectID = Number(this.projects[i].projectID);
                        }
                    }
                    this.nextProjectID = Number(this.nextProjectID) + 1;
                    this.editProject = Object.assign({}, this.defaultProject);
                    this.editProject.pictures =
                    this.editProject.pictures.splice(0,this.editProject.pictures.length);
                    this.snackbarMsg = "";
                    this.snackbarErrorMsg = "";
                }
            } else {
                this.snackbar = true;
                this.snackbarErrorMsg = "Fill in fields correctly";
            }
        },
        async cancel() {
            this.showAddPicture = true;
            this.projectDialog = false;
            if (this.editedIndex == -1) {
                for (let i = 0; i < this.editProject.pictures.length; i++) {
                    deletePicture(this.editProject.pictures[i]);
                }
                this.editProject = Object.assign({}, this.defaultProject);
                this.editProject.pictures =
                this.editProject.pictures.splice(0,this.editProject.pictures.length);
            } 
        },
        uploadClick() {
            this.$refs.uploadPicture.click();
        },
        uploadImage(ev) {
            this.uploadingSnackbar = true;
            this.showAddPicture = false;
            if (this.editedIndex > -1) {
                const storage = getStorage();
                const storageRef = ref(storage, String(this.editProject.projectID)+'/'+ev.target.files[0].name);
                uploadBytes(storageRef, ev.target.files[0]).then(() => {
                    getDownloadURL(storageRef).then((url) => {
                        if (this.editProject.pictures.map((pic) => {
                            return pic.split("?alt=media&token=")[0];
                        }).indexOf(url.split("?alt=media&token=")[0]) == -1) {
                            this.uploadingSnackbar = false;
                            this.snackbarSuccess = true;
                            this.editProject.pictures.push(url); 
                            this.showAddPicture = true;
                        } else {
                            this.uploadingSnackbar = false;
                            this.snackbarErrorMsg = "Duplicate";
                            this.showAddPicture = true;
                            this.snackbar = true;
                        }
                    });
                });
                this.snackbarErrorMsg = "";
            } else {
                const storage = getStorage();
                const storageRef = ref(storage, this.nextProjectID+'/'+ev.target.files[0].name)
                uploadBytes(storageRef, ev.target.files[0]).then(() => {
                    getDownloadURL(storageRef).then((url) => {
                        if (this.editProject.pictures.map((pic) => {
                            return pic.split("?alt=media&token=")[0];
                        }).indexOf(url.split("?alt=media&token=")[0]) == -1) {
                            this.uploadingSnackbar = false;
                            this.snackbarSuccess = true;
                            this.editProject.pictures.push(url); 
                            this.showAddPicture = true;
                        } else {
                            this.snackbar = true;
                            this.snackbarErrorMsg = "Duplicate";
                            this.showAddPicture = true;
                        }
                    });
                });
                this.snackbarErrorMsg = "";
            }
        },
        changeFeatured(projectID) {
            let found = false;
            for (let i = 0; i < this.featured.length; i++) {
                if (Number(this.featured[i]) == Number(projectID)) {
                    this.featured.splice(i,1);
                    found = true;
                    break;
                }
            }
            if (!found) {
                this.featured.push(Number(projectID));
            }
            //this.warningSnackbar = true;
            this.featureChanged = true;
        },
        newItem() {
            this.editedIndex = -1;
            this.editProject = Object.assign({}, this.defaultProject);
            this.editProject.pictures = this.editProject.pictures.splice(0,this.editProject.pictures.length);
            this.projectDialog = true;
            this.$refs.projectForm.resetValidation();
        },
        editItem(item) {
            this.editedIndex = this.projects.indexOf(item);
            this.editProject = Object.assign({}, item);
            this.projectDialog = true;
        },
    },

    async mounted() {
        this.$emit("changeRoute");
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                this.loggedIn = true;
                this.projects = await getProjects();
                this.nextProjectID = -1;
                for (let i = 0; i < this.projects.length; i++) {
                    if (Number(this.projects[i].projectID) > this.nextProjectID) {
                        this.nextProjectID = Number(this.projects[i].projectID);
                    }
                }
                this.nextProjectID = Number(this.nextProjectID) + 1;
                this.socials = await getSocials();
                let page =  await getPageInfo();
                this.pageInfo = page[0];
                this.themes = await getThemes();
                this.currentTheme = this.themes[0].chosen ? this.themes[0] : this.themes[1];
            } else {
                this.loggedIn = false;
            }
        });
    }
}
/* eslint-disable no-unused-vars */
</script>
