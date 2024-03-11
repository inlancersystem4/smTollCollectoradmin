<script>

import { useAuthStore, useAlertStore } from '../stores'
import { fetchWrapper } from '../helpers/fetch-wrapper'

import axios from 'axios';

import Layout from '../components/Layout.vue';
import OverLaye from '../subcomponents/OverLaye.vue';
import SearchBox from '../subcomponents/SearchBox.vue';
import List from '../subcomponents/usercrud/List.vue';
import Pagination from '../subcomponents/Pagination.vue';
import Model from '../subcomponents/Model.vue';
import Input from '../subcomponents/Input.vue';
import Label from '../subcomponents/Label.vue';
import TextArea from '../subcomponents/TextArea.vue';
import DeleteModel from '../subcomponents/DeleteModel.vue';
import Drawer from '../subcomponents/Drawer.vue';
import Select from '../subcomponents/Select.vue';


const baseUrl = `${import.meta.env.VITE_API_URL}`;

export default {
    components: { Layout, SearchBox, List, OverLaye, Pagination, Model, Input, Label, TextArea, DeleteModel, Drawer, Select },
    data() {
        return {
            list: [],
            tollArray: [],
            tollLaneArray: [],
            shiftArray: [],
            searchText: "",
            sort: "asc",
            pagination: "",
            currentPage: 1,
            totalPages: 1,
            gridView: true,
            listView: false,
            userId: "",
            deleteuser: false,
            addUserModal: false,
            typePassword: true,
            typePassword2: true,
            userName: "",
            userNameEdit: "",
            userNumber: "",
            userNumberEdit: "",
            userPass: "",
            userCoPass: "",
            tollSelected: "",
            tollSelectedEdit: "",
            laneSelected: "",
            laneSelectedEdit: "",
            shiftSelected: "",
            shiftSelectedEdit: "",
            profilePic: "",
            selectedImg: "",
            passwordNotMatch: false,
            editUserDrawer: false,
            searchToll: "",
            searchLane: "",
            searchShift: "",
        }
    },
    created() {
        this.userData();
        this.tollData();
        this.laneData();
        this.shiftData();
    },
    computed: {
        modelSubmitBtn() {
            return (
                !this.userName.trim() ||
                !this.userNumber.trim() ||
                !this.userPass ||
                !this.userCoPass ||
                this.userPass !== this.userCoPass ||
                !this.tollSelected.trim() ||
                !this.laneSelected.trim() ||
                !this.shiftSelected.trim()
            );
        },
    },
    methods: {

        updatePage(Number) {
            this.currentPage = Number
            this.userData();
        },

        chnageSort() {
            this.sort = this.sort === 'desc' ? 'asc' : 'desc';
            this.userData();
        },

        searchTextFun(event) {
            this.searchText = event.target.value.trim();
            this.userData();
        },

        searchTollFun(event) {
            this.searchToll = event.target.value.trim();
            this.tollData();
        },

        searchLaneFun(event) {
            this.searchLane = event.target.value.trim();
            this.laneData();
        },

        searchShiftFun(event) {
            this.searchShift = event.target.value.trim();
            this.shiftData();
        },

        async userData() {
            var user_data = new FormData();
            user_data.append("user_id", "");
            user_data.append("sort", this.sort);
            user_data.append("search", this.searchText);
            user_data.append("page", this.currentPage);

            try {
                const response = await fetchWrapper.post(`${baseUrl}/admin/users-list`, user_data);

                this.list = response.data

                this.totalPages = response.total_pages;

            } catch (error) {
                console.log(error);
            }

        },

        async statusUpdate(id) {
            var status_up = new FormData();

            status_up.append("user_id", id);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/admin/user-status`, status_up);

                if (data.success === 1) {
                    this.userData();
                }

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }
        },

        getUserId(id) {
            this.deleteuser = true
            this.userId = id
        },


        async deleteUser() {
            var delete_user = new FormData();

            delete_user.append("user_id", this.userId);

            this.deleteuser = false

            try {
                const data = await fetchWrapper.post(`${baseUrl}/admin/remove-user`, delete_user);

                if (data.success === 1) {
                    this.userData();
                }

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }
        },


        async tollData() {
            var toll_data = new FormData();
            toll_data.append("t_id", "");
            toll_data.append("sort", this.sort);
            toll_data.append("search", this.searchToll);
            toll_data.append("page", this.currentPage);

            try {
                const response = await fetchWrapper.post(`${baseUrl}/admin/toll-plaza-list`, toll_data);
                this.tollArray = response.data;

            } catch (error) {
                console.log(error);
            }

        },


        async laneData() {
            var toll_data = new FormData();
            toll_data.append("l_id", "");
            toll_data.append("sort", this.sort);
            toll_data.append("search", this.searchLane);
            toll_data.append("page", this.currentPage);

            try {
                const response = await fetchWrapper.post(`${baseUrl}/admin/lane-list`, toll_data);

                this.tollLaneArray = response.data

            } catch (error) {
                console.log(error);
            }

        },


        async shiftData() {
            var shift_data = new FormData();
            shift_data.append("s_id", "");
            shift_data.append("sort", this.sort);
            shift_data.append("search", this.searchShift);
            shift_data.append("page", this.currentPage);

            try {
                const response = await fetchWrapper.post(`${baseUrl}/admin/shift-list`, shift_data);

                this.shiftArray = response.data

            } catch (error) {
                console.log(error);
            }

        },

        checkPasswords() {
            if (this.userPass && this.userCoPass && this.userPass === this.userCoPass) {

                this.passwordNotMatch = false

            } else {

                this.passwordNotMatch = true

            }
        },

        getTollPlaza(option) {
            this.tollSelected = option.t_name
            this.tollSelectedEdit = option.t_name
        },

        getLane(option) {
            this.laneSelected = option.l_name
            this.laneSelectedEdit = option.l_name
        },

        getShift(option) {
            this.shiftSelected = option.s_name
            this.shiftSelectedEdit = option.s_name
        },

        selectPofilePic(event) {
            const selectedFile = event.target.files[0]

            if (selectedFile.type === "image/png") {

                this.profilePic = selectedFile

                this.selectedImg = URL.createObjectURL(selectedFile)

            }

            if (selectedFile.type === "image/gif", selectedFile.type === "video/mp4", selectedFile.type === "audio/mpeg") {
                console.log("not ok")
            }

        },


        async userAdd() {
            var user_data = new FormData();
            user_data.append("user_id", "");
            user_data.append("user_name", this.userName);
            user_data.append("user_phone_number", this.userNumber);
            user_data.append("user_password", this.userPass);
            user_data.append("confirm_password", this.userCoPass);
            user_data.append("user_toll_plaza", this.tollSelected);
            user_data.append("user_lane_select", this.laneSelected);
            user_data.append("user_shift_select", this.shiftSelected);
            user_data.append("user_profile_pic", this.profilePic);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/admin/add-or-edit-user`, user_data);

                this.addUserModal = false

                if (data.success === 1) {
                    this.userData();
                }

            } catch (error) {
                console.log(error);
            }

        },

        editUserData(id) {
            this.editUserDrawer = true
            this.userId = id
            this.getUserdata();
        },

        async getUserdata() {
            var user_data = new FormData();
            user_data.append("user_id", this.userId);

            try {
                const response = await fetchWrapper.post(`${baseUrl}/admin/users-list`, user_data);


                this.userNameEdit = response.data.user_name
                this.userNumberEdit = response.data.user_phone_number
                this.tollSelectedEdit = response.data.user_toll_plaza
                this.laneSelectedEdit = response.data.user_lane_select
                this.shiftSelectedEdit = response.data.user_shift_select

            } catch (error) {
                console.log(error);
            }

        },


        async editUser() {
            var user_data = new FormData();
            user_data.append("user_id", this.userId);
            user_data.append("user_name", this.userNameEdit);
            user_data.append("user_phone_number", this.userNumberEdit);
            user_data.append("user_toll_plaza", this.tollSelectedEdit);
            user_data.append("user_lane_select", this.laneSelectedEdit);
            user_data.append("user_shift_select", this.shiftSelectedEdit);
            user_data.append("user_profile_pic", this.profilePic);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/admin/add-or-edit-user`, user_data);


                if (data.success === 1) {
                    this.editUserDrawer = false
                    this.userData();
                }

            } catch (error) {
                console.log(error);
            }

        },


    },
}

</script>


<template>
    <Layout>

        <div class="table-content">

            <div class="table-header display-flex-wrap">

                <div class="display-flex align-center gap-16px w-100">
                    <p class="text-large_semibold color-Grey_90 cursor-pointer">User Crud</p>
                </div>

                <div
                    class="w-100 display-flex align-center justify-between gap-8px margin-top_16px Md_flex-column Md_align-end">

                    <div class="display-flex align-stretch gap-8px">

                        <button class="btn-regular display-flex align-center gap-8px" @click="chnageSort()">
                            <img src="../assets/img/icons/adjustments.svg">
                            <span v-if="sort === 'asc'">Newest</span>
                            <span v-if="sort === 'desc'">Oddest</span>
                        </button>
                        <button class="icon-btn icon-btn_32px Mobile_display-none"
                            @click="gridView = false, listView = true" :class="{ 'bg-Grey_5': listView }">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M19.5 13.5H4.5C4.08579 13.5 3.75 13.8358 3.75 14.25V18C3.75 18.4142 4.08579 18.75 4.5 18.75H19.5C19.9142 18.75 20.25 18.4142 20.25 18V14.25C20.25 13.8358 19.9142 13.5 19.5 13.5Z"
                                    stroke="#191C1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path
                                    d="M19.5 5.25H4.5C4.08579 5.25 3.75 5.58579 3.75 6V9.75C3.75 10.1642 4.08579 10.5 4.5 10.5H19.5C19.9142 10.5 20.25 10.1642 20.25 9.75V6C20.25 5.58579 19.9142 5.25 19.5 5.25Z"
                                    stroke="#191C1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                        <button class="icon-btn icon-btn_32px Mobile_display-none"
                            @click="gridView = true, listView = false" :class="{ 'bg-Grey_5': gridView }">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M10.5 4.5H4.5V10.5H10.5V4.5Z" stroke="#191C1F" stroke-width="1.5"
                                    stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M19.5 4.5H13.5V10.5H19.5V4.5Z" stroke="#191C1F" stroke-width="1.5"
                                    stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M10.5 13.5H4.5V19.5H10.5V13.5Z" stroke="#191C1F" stroke-width="1.5"
                                    stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M19.5 13.5H13.5V19.5H19.5V13.5Z" stroke="#191C1F" stroke-width="1.5"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>

                    </div>



                    <div class="display-flex align-center gap-8px Md_flex-wrap-reverse Md_align-end Md_justify-end">


                        <SearchBox placeholder="Serch Something" :value="searchText" @input="searchTextFun" />


                        <button class="btn-regular display-flex align-center  gap-8px text-no-wrap"
                            @click="addUserModal = true">
                            <img src="../assets/img/icons/plus-3.svg">
                            New User</button>

                    </div>

                </div>


            </div>

            <div class="padding-y_24px padding-x_32px mobile-body">

                <div class="no_data_section" v-if="!list">
                    <img src="../assets/img/oops_icon.png">
                </div>

                <ul class="list" :class="{ 'list-row': listView }">

                    <List :list="list" @delete_user="getUserId" @edit_user="editUserData" @edit_status="statusUpdate" />

                </ul>

            </div>

            <div class="border-t border-solid border-Grey_20">
                <Pagination :currentPage="currentPage" :totalPages="totalPages" @update-page="updatePage" />
            </div>

        </div>

    </Layout>


    <OverLaye v-if="overalye" />

    <DeleteModel model_title="Delete User" model_subtitle="Are you sure you want to delete this User?" v-if="deleteuser"
        @close_model="deleteuser = false" @delete_item="deleteUser()" />


    <Model model_title="Add User" Btn_text="Add User" @modelbtn_clicked="userAdd" :isButtonDisabled="modelSubmitBtn"
        v-if="addUserModal" @model_close="addUserModal = false">


        <div class="address-form">
            <div class="space-y-8px">
                <Label label="Enter User Name" />
                <Input placeholder="Enter User Name" id="Enter User Name" :value="userName"
                    @input="event => userName = event.target.value" />
            </div>


            <div class="user_pic">
                <input type="file" @change="selectPofilePic">
                <img :src="this.selectedImg">
            </div>

            <div class="space-y-8px">
                <Label label="User Number" />
                <Input type="number" placeholder="Enter User Number" id="User Number" :value="userNumber"
                    @input="event => userNumber = event.target.value" />
            </div>

            <div class="space-y-8px">
                <Label label="Add Toll Plaza" />
                <Select :options="tollArray" @option-selected="getTollPlaza" :value="searchToll" @input="searchTollFun" />
            </div>

            <div class="space-y-8px">
                <Label label="User Password" />
                <div class="search-wrraper w-100 border-Grey_20" :class="{ 'input_error': passwordNotMatch }">
                    <input class="w-100" :type="typePassword ? 'password' : 'text'" placeholder="Enter User Password"
                        id="User Password" @input="event => { userPass = event.target.value; checkPasswords(); }"
                        v-model="userPass">
                    <div class="icon togglePassword">
                        <span v-if="typePassword" @click="typePassword = false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M12 4.25C4.5 4.25 1.5 12 1.5 12C1.5 12 4.5 19.75 12 19.75C19.5 19.75 22.5 12 22.5 12C22.5 12 19.5 4.25 12 4.25Z"
                                    stroke="#191C1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path
                                    d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                                    stroke="#191C1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </span>
                        <span v-if="!typePassword" @click="typePassword = true">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M4.5 3.75L19.5 20.25" stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M14.522 14.7766C13.8338 15.407 12.9334 15.7551 12.0001 15.7516C11.2432 15.7515 10.5041 15.5224 9.87984 15.0944C9.25561 14.6663 8.77551 14.0594 8.50265 13.3535C8.22979 12.6475 8.17695 11.8754 8.35107 11.1389C8.52519 10.4023 8.91812 9.73564 9.47821 9.22656"
                                    stroke="#191C1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path
                                    d="M6.9375 6.42969C3.1125 8.36094 1.5 11.9984 1.5 11.9984C1.5 11.9984 4.5 18.7484 12 18.7484C13.7574 18.7628 15.4929 18.3578 17.0625 17.5672"
                                    stroke="#191C1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path
                                    d="M19.5564 15.8531C21.6002 14.025 22.5002 12 22.5002 12C22.5002 12 19.5002 5.25002 12.0002 5.25002C11.35 5.24874 10.7008 5.30205 10.0596 5.4094"
                                    stroke="#191C1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path
                                    d="M12.7031 8.31641C13.5006 8.46751 14.2273 8.8739 14.7735 9.47426C15.3198 10.0746 15.6559 10.8364 15.7313 11.6445"
                                    stroke="#191C1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>

            <div class="space-y-8px">
                <Label label="Correct Password" />
                <div class="search-wrraper w-100 border-Grey_20" :class="{ 'input_error': passwordNotMatch }">
                    <input class="w-100" :type="typePassword2 ? 'password' : 'text'"
                        placeholder="Enter User Correct Password" id="Correct Password"
                        @input="event => { userCoPass = event.target.value; checkPasswords(); }" v-model="userCoPass">
                    <div class="icon togglePassword">
                        <span v-if="typePassword2" @click="typePassword2 = false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M12 4.25C4.5 4.25 1.5 12 1.5 12C1.5 12 4.5 19.75 12 19.75C19.5 19.75 22.5 12 22.5 12C22.5 12 19.5 4.25 12 4.25Z"
                                    stroke="#191C1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path
                                    d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                                    stroke="#191C1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </span>
                        <span v-if="!typePassword2" @click="typePassword2 = true">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M4.5 3.75L19.5 20.25" stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M14.522 14.7766C13.8338 15.407 12.9334 15.7551 12.0001 15.7516C11.2432 15.7515 10.5041 15.5224 9.87984 15.0944C9.25561 14.6663 8.77551 14.0594 8.50265 13.3535C8.22979 12.6475 8.17695 11.8754 8.35107 11.1389C8.52519 10.4023 8.91812 9.73564 9.47821 9.22656"
                                    stroke="#191C1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path
                                    d="M6.9375 6.42969C3.1125 8.36094 1.5 11.9984 1.5 11.9984C1.5 11.9984 4.5 18.7484 12 18.7484C13.7574 18.7628 15.4929 18.3578 17.0625 17.5672"
                                    stroke="#191C1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path
                                    d="M19.5564 15.8531C21.6002 14.025 22.5002 12 22.5002 12C22.5002 12 19.5002 5.25002 12.0002 5.25002C11.35 5.24874 10.7008 5.30205 10.0596 5.4094"
                                    stroke="#191C1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path
                                    d="M12.7031 8.31641C13.5006 8.46751 14.2273 8.8739 14.7735 9.47426C15.3198 10.0746 15.6559 10.8364 15.7313 11.6445"
                                    stroke="#191C1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>

            <div class="space-y-8px">
                <Label label="Add Toll Lane" />
                <Select :options="tollLaneArray" @option-selected="getLane" :value="searchLane" @input="searchLaneFun" />
            </div>

            <div class="space-y-8px">
                <Label label="Add Shift" />
                <Select :options="shiftArray" @option-selected="getShift" :value="searchShift" @input="searchShiftFun" />
            </div>

        </div>
    </Model>


    <Drawer drawer_title="Edit User" v-if="editUserDrawer" @close_drawer="editUserDrawer = false"
        @drawebtn_clicked="editUser()">

        <div class="space-y-24px ">
            <div class="space-y-8px">
                <Label label="Enter User Name" />
                <Input placeholder="Enter User Name" id="Enter User Name" :value="userNameEdit"
                    @input="event => userNameEdit = event.target.value" />
            </div>

            <div class=""></div>

            <div class="space-y-8px">
                <Label label="User Number" />
                <Input type="number" placeholder="Enter User Number" id="User Number" :value="userNumberEdit"
                    @input="event => userNumberEdit = event.target.value" required />
            </div>

            <div class="space-y-8px">
                <Label label="Add Toll Plaza" />
                <Select :options="tollArray" @option-selected="getTollPlaza" :responseData="tollSelectedEdit"
                    :value="searchToll" @input="searchTollFun" />
            </div>


            <div class="space-y-8px">
                <Label label="Add Toll Lane" />
                <Select :options="tollLaneArray" @option-selected="getLane" :responseData="laneSelectedEdit"
                    :value="searchLane" @input="searchLaneFun" />
            </div>

            <div class="space-y-8px">
                <Label label="Add Shift" />
                <Select :options="shiftArray" @option-selected="getShift" :responseData="shiftSelectedEdit"
                    :value="searchShift" @input="searchShiftFun" />
            </div>

        </div>


    </Drawer>
</template>



<style scoped>
.list {
    display: grid;
    gap: 12px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
}

@media (max-width:768px) {
    .list {
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }

    .mobile-body {
        padding: 16px 22px;
    }

}

.list-row {
    grid-template-columns: repeat(1, minmax(0, 1fr));
}

.no_data_section {
    display: flex;
    align-items: center;
    justify-content: center;
}

.no_data_section img {
    width: 224px;
    height: auto;
}

.space-y-8px .search-wrraper input {
    font-size: 14px;
    line-height: 24px;
    color: var(--Grey-90);
    font-family: 'Quicksand', sans-serif;
}

.space-y-8px .search-wrraper span {
    height: 100%;
    min-width: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.space-y-8px .search-wrraper span svg {
    width: 20px;
    height: 20px;
}

.user_pic {
    width: 100%;
    width: 120px;
    height: 120px;
    margin-left: auto;
    border: 2px dashed var(--Grey-20);
    border-radius: 999px;
    position: relative;
    margin-bottom: 24px;
}

.user_pic input {
    position: absolute;
    opacity: 0;
    inset: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    z-index: 9;
}

.user_pic img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 999px;
}
</style>