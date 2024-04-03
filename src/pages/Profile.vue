<script>
import { useAuthStore, useAlertStore } from '../stores'
import { useProfileImgStore } from '../stores/profileImg'
import { fetchWrapper } from '../helpers/fetch-wrapper'

import Layout from '../components/Layout.vue';
import Input from '../subcomponents/Input.vue';
import Label from '../subcomponents/Label.vue';
import TextArea from '../subcomponents/TextArea.vue';
import Drawer from '../subcomponents/Drawer.vue';


const baseUrl = `${import.meta.env.VITE_API_URL}`;

export default {
    components: { Layout, Input, Label, TextArea, useAuthStore, Drawer },
    data() {
        return {
            adminData: "",
            editProfileModel: false,
            changePasswordModel: false,
            number: "",
            name: "",
            email: "",
            typePassword: true,
            oldPassword: "",
            typePassword2: true,
            typePassword3: true,
            userNewPass: "",
            userCoPass: "",
            passwordNotMatch: false,
            profilePic: "",
            selectedImg: "",
            bgCover: "https://www.motorbeam.com/wp-content/uploads/Toll-Plaza-Traffic.jpg",
            isLoading: false,
        }
    },
    created() {
        this.profileData();
    },
    methods: {
        async profileData() {
            var data = new FormData();

            try {
                const response = await fetchWrapper.post(`${baseUrl}/admin/details`, data);

                this.adminData = response.data
                const profileStore = useProfileImgStore();
                profileStore.setProfilePic(response.data.profile_pic);
                localStorage.setItem('profile_img', response.data.profile_pic)

                this.name = response.data.user_name
                this.email = response.data.user_email
                this.number = response.data.user_phone_number
                this.profilePic = response.data.profile_pic

            } catch (error) {
                console.log(error);
            }

        },
        async editProfile() {
            this.isLoading = true
            var chnage_password = new FormData();
            chnage_password.append("user_name", this.name)
            chnage_password.append("user_email", this.email)
            chnage_password.append("user_phone_number", this.number)
            chnage_password.append("user_profile_pic", this.profilePic)

            try {
                const data = await fetchWrapper.post(`${baseUrl}/admin/profile`, chnage_password);

                if (data.success === 1) {
                    this.isLoading = false;
                    this.editProfileModel = false;
                    this.profileData();
                } else {
                    this.isLoading = false;
                    const alertStore = useAlertStore();
                    alertStore.error(data.message);
                }
            } catch (error) {
                this.isLoading = false;
                const alertStore = useAlertStore();
                alertStore.error(error);
            }

        },
        checkPasswords() {
            if (this.userNewPass && this.userCoPass && this.userNewPass === this.userCoPass) {

                this.passwordNotMatch = false

            } else {

                this.passwordNotMatch = true

            }
        },
        async changePassword() {
            this.isLoading = true
            var profile_data = new FormData();
            profile_data.append("old_password", this.oldPassword)
            profile_data.append("new_password", this.userNewPass)
            profile_data.append("confirm_password", this.userCoPass)

            try {
                const data = await fetchWrapper.post(`${baseUrl}/admin/change-password`, profile_data);

                if (data.success === 1) {
                    this.isLoading = false;
                    this.changePasswordModel = false;
                    this.profileData();
                    this.oldPassword = ""
                    this.userNewPass = ""
                    this.userCoPass = ""
                } else {
                    this.isLoading = false;
                    const alertStore = useAlertStore();
                    alertStore.error(data.message)
                }
            } catch (error) {
                this.isLoading = false;
                const alertStore = useAlertStore();
                alertStore.error(error)
            }

        },

        selectPofilePic(event) {
            const selectedFile = event.target.files[0]
            this.profilePic = selectedFile
            this.selectedImg = URL.createObjectURL(selectedFile)
        },
    },
}
</script>


<template>
    <Layout>

        <div class="w-100 border border-solid border-Grey_20 bg-white rounded-regualr padding-18px">

            <div class="profile-banner" :style="{ backgroundImage: `url(${bgCover})` }"></div>
            <div class="profile-details">

                <div class="profile-img">
                    <img :src="adminData.profile_pic">
                </div>

                <ul class="list">

                    <li>
                        <p class="data-title">name</p>
                        <h6 class="data text-capitalize">{{ adminData.user_name }}</h6>
                    </li>

                    <li>
                        <p class="data-title">email</p>
                        <h6 class="data">{{ adminData.user_email }}</h6>
                    </li>

                    <li>
                        <p class="data-title">number</p>
                        <h6 class="data">{{ adminData.user_phone_number }}</h6>
                    </li>

                </ul>


                <div class="options">
                    <div class="icon-btn icon-btn_32px  custom-dropdown">
                        <img src="../assets/img/icons/dots-icon.svg">
                        <ul class="custom-dropdown-list leftside icon-dropdown">
                            <li class="dropdown-item" @click="editProfileModel = !editProfileModel">
                                <div class="dropdown-link">
                                    <img src="../assets/img/icons/edit.svg">
                                    <p class="dropdown-link-title"> Edit Profile </p>
                                </div>
                            </li>
                            <li class="dropdown-item" @click="changePasswordModel = !changePasswordModel">
                                <div class="dropdown-link">
                                    <img src="../assets/img/password.svg">
                                    <p class="dropdown-link-title"> Change Password </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>

        </div>

    </Layout>


    <Drawer drawer_title="Edit Profile" v-if="editProfileModel" @close_drawer="editProfileModel = false"
        @drawebtn_clicked="editProfile()" :loading="isLoading">
        <div class="space-y-24px">
            <div class="space-y-8px">
                <div class="gap-4px display-flex justify-between w-100 align-end">
                    <Label label="Admin Img" />
                    <img v-if="this.selectedImg" :src="this.selectedImg" width="32" height="32" class="object-contain">
                    <img v-if="this.profilePic && !this.selectedImg" :src="this.profilePic" width="32" height="32"
                        class="object-contain">
                </div>
                <Input type="file" id="Admin Img" @change="selectPofilePic" />
            </div>
            <div class="space-y-8px">
                <Label label="Admin Name" />
                <Input placeholder="Enter Name" id="Admin Name" :value="name"
                    @input="event => name = event.target.value" />
            </div>
            <div class="space-y-8px">
                <Label label="Admin Email" />
                <Input placeholder="Enter Admin Email" id="Admin Email" :value="email"
                    @input="event => email = event.target.value" disabled />
            </div>
            <div class="space-y-8px">
                <Label label="Admin number" />
                <Input placeholder="Enter Admin Number" id="Admin number" :value="number"
                    @input="event => number = event.target.value" />
            </div>
        </div>
    </Drawer>


    <Drawer drawer_title="Change Password" v-if="changePasswordModel" @close_drawer="changePasswordModel = false"
        @drawebtn_clicked="changePassword()" :loading="isLoading">
        <div class="space-y-24px">
            <div class="space-y-8px">
                <Label label="Old Password" />
                <div class="search-wrraper w-100 border-Grey_20">
                    <input class="w-100" :type="typePassword ? 'password' : 'text'" placeholder="Enter User Password"
                        id="Old Password" @input="event => oldPassword = event.target.value" v-model="oldPassword">
                    <div class="icon togglePassword">
                        <span v-if="typePassword" @click="typePassword = false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none">
                                <path
                                    d="M12 4.25C4.5 4.25 1.5 12 1.5 12C1.5 12 4.5 19.75 12 19.75C19.5 19.75 22.5 12 22.5 12C22.5 12 19.5 4.25 12 4.25Z"
                                    stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                                    stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </span>
                        <span v-if="!typePassword" @click="typePassword = true">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none">
                                <path d="M4.5 3.75L19.5 20.25" stroke="#191C1F" stroke-width="1.5"
                                    stroke-linecap="round" stroke-linejoin="round" />
                                <path
                                    d="M14.522 14.7766C13.8338 15.407 12.9334 15.7551 12.0001 15.7516C11.2432 15.7515 10.5041 15.5224 9.87984 15.0944C9.25561 14.6663 8.77551 14.0594 8.50265 13.3535C8.22979 12.6475 8.17695 11.8754 8.35107 11.1389C8.52519 10.4023 8.91812 9.73564 9.47821 9.22656"
                                    stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M6.9375 6.42969C3.1125 8.36094 1.5 11.9984 1.5 11.9984C1.5 11.9984 4.5 18.7484 12 18.7484C13.7574 18.7628 15.4929 18.3578 17.0625 17.5672"
                                    stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M19.5564 15.8531C21.6002 14.025 22.5002 12 22.5002 12C22.5002 12 19.5002 5.25002 12.0002 5.25002C11.35 5.24874 10.7008 5.30205 10.0596 5.4094"
                                    stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M12.7031 8.31641C13.5006 8.46751 14.2273 8.8739 14.7735 9.47426C15.3198 10.0746 15.6559 10.8364 15.7313 11.6445"
                                    stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
            <div class="space-y-8px">
                <Label label="Enter New Password" />
                <div class="search-wrraper w-100 border-Grey_20" :class="{ 'input_error': passwordNotMatch }">
                    <input class="w-100" :type="typePassword2 ? 'password' : 'text'" placeholder="Enter New Password"
                        id="Enter New Password"
                        @input="event => { userNewPass = event.target.value; checkPasswords(); }" v-model="userNewPass">
                    <div class="icon togglePassword">
                        <span v-if="typePassword2" @click="typePassword2 = false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none">
                                <path
                                    d="M12 4.25C4.5 4.25 1.5 12 1.5 12C1.5 12 4.5 19.75 12 19.75C19.5 19.75 22.5 12 22.5 12C22.5 12 19.5 4.25 12 4.25Z"
                                    stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                                    stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </span>
                        <span v-if="!typePassword2" @click="typePassword2 = true">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none">
                                <path d="M4.5 3.75L19.5 20.25" stroke="#191C1F" stroke-width="1.5"
                                    stroke-linecap="round" stroke-linejoin="round" />
                                <path
                                    d="M14.522 14.7766C13.8338 15.407 12.9334 15.7551 12.0001 15.7516C11.2432 15.7515 10.5041 15.5224 9.87984 15.0944C9.25561 14.6663 8.77551 14.0594 8.50265 13.3535C8.22979 12.6475 8.17695 11.8754 8.35107 11.1389C8.52519 10.4023 8.91812 9.73564 9.47821 9.22656"
                                    stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M6.9375 6.42969C3.1125 8.36094 1.5 11.9984 1.5 11.9984C1.5 11.9984 4.5 18.7484 12 18.7484C13.7574 18.7628 15.4929 18.3578 17.0625 17.5672"
                                    stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M19.5564 15.8531C21.6002 14.025 22.5002 12 22.5002 12C22.5002 12 19.5002 5.25002 12.0002 5.25002C11.35 5.24874 10.7008 5.30205 10.0596 5.4094"
                                    stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M12.7031 8.31641C13.5006 8.46751 14.2273 8.8739 14.7735 9.47426C15.3198 10.0746 15.6559 10.8364 15.7313 11.6445"
                                    stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
            <div class="space-y-8px">
                <Label label="Enter Confirm Password" />
                <div class="search-wrraper w-100 border-Grey_20" :class="{ 'input_error': passwordNotMatch }">
                    <input class="w-100" :type="typePassword3 ? 'password' : 'text'"
                        placeholder="Enter  Confirm Password" id="Enter Confirm Password"
                        @input="event => { userCoPass = event.target.value; checkPasswords(); }" v-model="userCoPass">
                    <div class="icon togglePassword">
                        <span v-if="typePassword3" @click="typePassword3 = false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none">
                                <path
                                    d="M12 4.25C4.5 4.25 1.5 12 1.5 12C1.5 12 4.5 19.75 12 19.75C19.5 19.75 22.5 12 22.5 12C22.5 12 19.5 4.25 12 4.25Z"
                                    stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                                    stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </span>
                        <span v-if="!typePassword3" @click="typePassword3 = true">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none">
                                <path d="M4.5 3.75L19.5 20.25" stroke="#191C1F" stroke-width="1.5"
                                    stroke-linecap="round" stroke-linejoin="round" />
                                <path
                                    d="M14.522 14.7766C13.8338 15.407 12.9334 15.7551 12.0001 15.7516C11.2432 15.7515 10.5041 15.5224 9.87984 15.0944C9.25561 14.6663 8.77551 14.0594 8.50265 13.3535C8.22979 12.6475 8.17695 11.8754 8.35107 11.1389C8.52519 10.4023 8.91812 9.73564 9.47821 9.22656"
                                    stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M6.9375 6.42969C3.1125 8.36094 1.5 11.9984 1.5 11.9984C1.5 11.9984 4.5 18.7484 12 18.7484C13.7574 18.7628 15.4929 18.3578 17.0625 17.5672"
                                    stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M19.5564 15.8531C21.6002 14.025 22.5002 12 22.5002 12C22.5002 12 19.5002 5.25002 12.0002 5.25002C11.35 5.24874 10.7008 5.30205 10.0596 5.4094"
                                    stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M12.7031 8.31641C13.5006 8.46751 14.2273 8.8739 14.7735 9.47426C15.3198 10.0746 15.6559 10.8364 15.7313 11.6445"
                                    stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </Drawer>
</template>

<style scoped>
.profile-banner {
    height: 220px;
    border-radius: 8px;
    overflow: hidden;
    background-size: cover;
    background-position: center center;
}

.profile-details {
    display: flex;
    align-items: flex-start;
    gap: 24px;
    position: relative;
    width: 100%;
    padding: 10px 24px;
}

.profile-img {
    width: 108px;
    height: 108px;
    background-color: white;
    border-radius: 999px;
    padding: 4px;
    margin-top: -3rem;
}

.profile-img img {
    width: 100%;
    height: 100%;
    border-radius: 999px;
    object-fit: cover;
}

.list {
    display: flex;
    align-items: flex-start;
    gap: 4rem;
}

.list li {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.list li .data-title {
    font-size: 14px;
    text-transform: capitalize;
    color: var(--Grey-50);
}

.list li .data {
    font-size: 16px;
    color: var(--Grey-90);
}

.profile-details .options {
    position: absolute;
    right: 4px;
    top: 4px;
}

.options .custom-dropdown:hover .custom-dropdown-list {
    display: block;
    top: 90%;
}

.search-wrraper .icon svg {
    width: 24px;
    height: 24px;
}

.search-wrraper input {
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
    color: var(--Grey-90);
    font-family: 'Quicksand', sans-serif;
}

@media (max-width:650px) {

    .profile-details {
        flex-direction: column;
    }

    .list {
        width: 100%;
        flex-wrap: wrap;
        row-gap: 16px;
    }
}
</style>