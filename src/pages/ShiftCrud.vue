<script>

import { useAuthStore, useAlertStore } from '../stores'
import { fetchWrapper } from '../helpers/fetch-wrapper'

import axios from 'axios';

import Layout from '../components/Layout.vue';
import OverLaye from '../subcomponents/OverLaye.vue';
import SearchBox from '../subcomponents/SearchBox.vue';
import List from '../subcomponents/shiftcrud/List.vue';
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
            searchText: "",
            sort: "asc",
            pagination: "",
            gridView: true,
            listView: false,
            currentPage: 1,
            totalPages: 1,
            shiftName: "",
            shiftName1: "",
            shiftFromTime: "",
            shiftFromTime1: "",
            shiftToTime: "",
            shiftToTime1: "",
            addShiftModal: false,
            selectedImg1: "",
            deleteshiftModel: false,
            shiftId: "",
            editshift: false
        }
    },
    computed: {
        modelSubmitBtn() {
            return !this.shiftName.trim() || !this.shiftFromTime.trim() || this.shiftToTime === '' || !this.shiftToTime;
        },
    },
    created() {
        this.shiftData();
    },
    methods: {

        searchTextFun(event) {
            this.searchText = event.target.value.trim();
            this.shiftData();
        },

        async shiftData() {
            var shift_data = new FormData();
            shift_data.append("s_id", "");
            shift_data.append("sort", this.sort);
            shift_data.append("search", this.searchText);
            shift_data.append("page", this.currentPage);

            try {
                const response = await fetchWrapper.post(`${baseUrl}/admin/shift-list`, shift_data);

                this.list = response.data

                this.totalPages = response.total_pages;

            } catch (error) {
                console.log(error);
            }

        },

        updatePage(Number) {
            this.currentPage = Number
            this.shiftData();
        },

        chnageSort() {
            this.sort = this.sort === 'desc' ? 'asc' : 'desc';
            this.shiftData();
        },



        async addShift() {

            var add_shift = new FormData();
            add_shift.append("s_id", "");
            add_shift.append("s_name", this.shiftName);
            add_shift.append("from_time", this.shiftFromTime);
            add_shift.append("to_time", this.shiftToTime);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/admin/add-or-edit-shift`, add_shift);

                if (data.success === 1) {
                    this.addShiftModal = false
                    this.shiftData();
                }

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }
        },

        deleteshift(id) {
            this.deleteshiftModel = true
            this.shiftId = id
        },

        editshiftOpen(id) {
            this.editshift = true
            this.shiftId = id
            this.getshiftData()
        },

        async statusUpdate(id) {
            var status_up = new FormData();

            status_up.append("s_id", id);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/admin/shift-status`, status_up);

                if (data.success === 1) {
                    this.shiftData();
                }

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }
        },

        async deletShift() {
            var delete_vehicle = new FormData();

            delete_vehicle.append("s_id", this.shiftId);

            this.deleteshiftModel = false

            try {
                const data = await fetchWrapper.post(`${baseUrl}/admin/remove-shift`, delete_vehicle);

                if (data.success === 1) {
                    this.shiftData();
                }

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }
        },


        async getshiftData() {
            var shift_data = new FormData();

            shift_data.append("s_id", this.shiftId);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/admin/shift-list`, shift_data);

                this.shiftName1 = data.data.s_name
                this.shiftFromTime1 = data.data.s_from_time
                this.shiftToTime1 = data.data.s_to_time

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }
        },


        async editshiftData() {
            var edit_shift = new FormData();

            edit_shift.append("s_id", this.shiftId);
            edit_shift.append("s_name", this.shiftName1);
            edit_shift.append("from_time", this.shiftFromTime1);
            edit_shift.append("to_time", this.shiftToTime1);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/admin/add-or-edit-shift`, edit_shift);

                if (data.success === 1) {
                    this.editshift = false
                    this.shiftData();
                }

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
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
                    <p class="text-large_semibold color-Grey_90 cursor-pointer">Shift List</p>
                </div>

                <div
                    class="w-100 display-flex align-center justify-between gap-8px margin-top_16px Md_flex-column Md_align-end">

                    <div class="display-flex align-stretch gap-8px">

                        <button class="btn-regular display-flex align-center gap-8px" @click="chnageSort()">
                            <img src="../assets/img/icons/adjustments.svg">
                            <span v-if="sort === 'asc'">Newest</span>
                            <span v-if="sort === 'desc'">Oldest</span>
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
                            @click="addShiftModal = true">
                            <img src="../assets/img/icons/plus-3.svg">
                            New Shift</button>

                    </div>

                </div>


            </div>

            <div class="padding-y_24px padding-x_32px mobile-body">

                <div class="no_data_section" v-if="!list">
                    <img src="../assets/img/oops_icon.png">
                </div>

                <ul class="list" :class="{ 'list-row': listView }">

                    <List :list="list" @delete_shift="deleteshift" @edit_shift="editshiftOpen"
                        @edit_status="statusUpdate" />

                </ul>

            </div>

            <div class="border-t border-solid border-Grey_20">
                <Pagination :currentPage="currentPage" :totalPages="totalPages" @update-page="updatePage" />
            </div>

        </div>

    </Layout>


    <OverLaye v-if="overalye" />


    <Model model_title="Add Shift" Btn_text="Add Shift" @modelbtn_clicked="addShift()" :isButtonDisabled="modelSubmitBtn"
        v-if="addShiftModal" @model_close="addShiftModal = false">
        <div class="space-y-24px">
            <div class="address-form">
                <div class="space-y-8px">
                    <Label label="Shift Name" />
                    <Input placeholder="Ex. Truck" id="Shift Name" :value="shiftName"
                        @input="event => shiftName = event.target.value" />
                </div>
            </div>
            <div class="address-form">
                <div class="space-y-8px">
                    <Label label="Shift From Time" />
                    <Input type="time" placeholder="Ex. 160Rs." id="Shift From Time" :value="shiftFromTime"
                        @input="event => shiftFromTime = event.target.value" />
                </div>
                <div class="space-y-8px">
                    <Label label="Shift To Time" />
                    <Input type="time" placeholder="Ex. 160Rs." id="Shift To Time" :value="shiftToTime"
                        @input="event => shiftToTime = event.target.value" />
                </div>
            </div>
        </div>
    </Model>


    <DeleteModel model_title="Delete Shift" model_subtitle="Are you sure you want to delete this Shift?"
        v-if="deleteshiftModel" @close_model="deleteshiftModel = false" @delete_item="deletShift()" />


    <Drawer drawer_title="Edit Shift" v-if="editshift" @close_drawer="editshift = false"
        @drawebtn_clicked="editshiftData()">
        <div class="space-y-24px">
            <div class="space-y-8px">
                <Label label="Shift Name" />
                <Input placeholder="Ex. Truck" id="Shift Name" :value="shiftName1"
                    @input="event => shiftName1 = event.target.value" />
            </div>
            <div class="space-y-8px">
                <Label label="Shift From Time" />
                <Input type="time" placeholder="Ex. 160Rs." id="Shift From Time" :value="shiftFromTime1"
                    @input="event => shiftFromTime1 = event.target.value" />
            </div>
            <div class="space-y-8px">
                <Label label="Shift To Time" />
                <Input type="time" placeholder="Ex. 160Rs." id="Shift To Time" :value="shiftToTime1"
                    @input="event => shiftToTime1 = event.target.value" />
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



.list-row {
    grid-template-columns: repeat(1, minmax(0, 1fr));
}



.no_data_section {
    display: flex;
    align-items: center;
    justify-content: center;
}

@media (max-width:768px) {
    .list {
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }

    .mobile-body {
        padding: 16px 22px;
    }

}


.no_data_section img {
    width: 224px;
    height: auto;
}
</style>