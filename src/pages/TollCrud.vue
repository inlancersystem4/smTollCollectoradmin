<script>

import { useAuthStore, useAlertStore } from '../stores'
import { fetchWrapper } from '../helpers/fetch-wrapper'

import axios from 'axios';

import Layout from '../components/Layout.vue';
import OverLaye from '../subcomponents/OverLaye.vue';
import SearchBox from '../subcomponents/SearchBox.vue';
import List from '../subcomponents/tollPlaza/List.vue';
import Pagination from '../subcomponents/Pagination.vue';
import Model from '../subcomponents/Model.vue';
import Input from '../subcomponents/Input.vue';
import Label from '../subcomponents/Label.vue';
import Textarea from '../../../vuejsProject/vuedashboard/src/subcomponents/Textarea.vue';
import DeleteModel from '../subcomponents/DeleteModel.vue';
import Drawer from '../subcomponents/Drawer.vue';

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export default {
    components: { Layout, SearchBox, List, OverLaye, Pagination, Model, Input, Label, Textarea, DeleteModel, Drawer, useAuthStore },
    data() {
        return {
            list: [],
            searchText: "",
            gridView: true,
            listView: false,
            sort: "asc",
            pagination: "",
            currentPage: 1,
            totalPages: 1,
            plazzName: "",
            plazzName1: "",
            plazzAddress: "",
            plazzAddress1: "",
            addPlazaModal: false,
            deleteToll: false,
            trollId: "",
            editTollPlaza: false,
        };
    },
    created() {
        this.tollData();
    },
    computed: {
        modelSubmitBtn() {
            return !this.plazzName.trim() || !this.plazzAddress.trim();
        },
    },
    methods: {

        searchTextFun(event) {
            this.searchText = event.target.value.trim();
            this.tollData();
        },

        async tollData() {
            var toll_data = new FormData();
            toll_data.append("t_id", "");
            toll_data.append("sort", this.sort);
            toll_data.append("search", this.searchText);
            toll_data.append("page", this.currentPage);

            try {
                const response = await fetchWrapper.post(`${baseUrl}/admin/toll-plaza-list`, toll_data);
                this.list = response.data;
                this.totalPages = response.total_pages;


            } catch (error) {
                console.log(error);
            }

        },


        updatePage(Number) {
            this.currentPage = Number
            this.tollData();
        },
        chnageSort() {
            this.sort = this.sort === 'desc' ? 'asc' : 'desc';
            this.tollData();
        },


        async addTollPlaza() {

            var Add_toll_data = new FormData();

            Add_toll_data.append("t_id", "");
            Add_toll_data.append("t_name", this.plazzName);
            Add_toll_data.append("t_address", this.plazzAddress);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/admin/add-or-edit-toll-plaza`, Add_toll_data);

                this.addPlazaModal = false;
                this.tollData();

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }
        },

        getTollplazaId(id) {
            this.deleteToll = true
            this.trollId = id
        },

        editTollOpen(id) {
            this.editTollPlaza = true
            this.trollId = id
            this.getTollPlazadata();
        },

        async statusUpdate(id) {
            var status_up = new FormData();

            status_up.append("t_id", id);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/admin/toll-plaza-status`, status_up);

                if (data.success === 1) {
                    this.tollData();
                }

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }
        },

        async deletTollPlaza() {
            var Delete_Toll = new FormData();

            Delete_Toll.append("t_id", this.trollId);
            this.deleteToll = false

            try {
                const data = await fetchWrapper.post(`${baseUrl}/admin/remove-toll-plaza`, Delete_Toll);

                if (data.success === 1) {
                    this.tollData();
                    this.successModal = true
                    this.sucMessage = data.message
                }
                else {
                    this.errorModal = true
                    this.errorMessage = data.message
                }


            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }
        },
        async getTollPlazadata() {
            var toll_data = new FormData();
            toll_data.append("t_id", this.trollId);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/admin/toll-plaza-list`, toll_data);

                this.plazzName1 = data.data.t_name
                this.plazzAddress1 = data.data.t_address

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }
        },
        async editToll() {
            var Add_toll_data = new FormData();

            Add_toll_data.append("t_id", this.trollId);
            Add_toll_data.append("t_name", this.plazzName1);
            Add_toll_data.append("t_address", this.plazzAddress1);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/admin/add-or-edit-toll-plaza`, Add_toll_data);
                console.log(data)

                this.editTollPlaza = false;
                this.tollData();

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }
        }
    },
}
</script>


<template>
    <Layout>

        <div class="table-content">

            <div class="table-header display-flex-wrap">

                <div class="display-flex align-center gap-16px w-100">
                    <p class="text-large_semibold color-Grey_90 cursor-pointer">Toll Plaza Crud</p>
                </div>

                <div
                    class="w-100 display-flex align-center justify-between gap-8px margin-top_16px Md_flex-column Md_align-end">

                    <div class="display-flex align-stretch gap-8px">

                        <button class="btn-regular display-flex align-center gap-8px" @click="chnageSort()">
                            <img src="../assets/img/icons/adjustments.svg">
                            Filter
                        </button>
                        <button class="icon-btn icon-btn_32px " @click="gridView = false, listView = true"
                            :class="{ 'bg-Grey_5': listView }">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M19.5 13.5H4.5C4.08579 13.5 3.75 13.8358 3.75 14.25V18C3.75 18.4142 4.08579 18.75 4.5 18.75H19.5C19.9142 18.75 20.25 18.4142 20.25 18V14.25C20.25 13.8358 19.9142 13.5 19.5 13.5Z"
                                    stroke="#191C1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path
                                    d="M19.5 5.25H4.5C4.08579 5.25 3.75 5.58579 3.75 6V9.75C3.75 10.1642 4.08579 10.5 4.5 10.5H19.5C19.9142 10.5 20.25 10.1642 20.25 9.75V6C20.25 5.58579 19.9142 5.25 19.5 5.25Z"
                                    stroke="#191C1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                        <button class="icon-btn icon-btn_32px " @click="gridView = true, listView = false"
                            :class="{ 'bg-Grey_5': gridView }">
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
                            @click="addPlazaModal = true">
                            <img src="../assets/img/icons/plus-3.svg">
                            New Toll Plaza</button>

                    </div>

                </div>


            </div>

            <div class="padding-y_24px padding-x_32px">

                <div class="no_data_section" v-if="!list">
                    <img src="../assets/img/oops_icon.png">
                </div>

                <ul class="list" :class="{ 'list-row': listView }">

                    <List :list="list" @delete_toll_plaza="getTollplazaId" @edit_toll_plaza="editTollOpen"
                        @edit_status="statusUpdate" />

                </ul>

            </div>

            <div class="border-t border-solid border-Grey_20">
                <Pagination :currentPage="currentPage" :totalPages="totalPages" @update-page="updatePage" />
            </div>

        </div>

    </Layout>


    <OverLaye v-if="overalye" />


    <Model model_title="Add Toll Plaza" Btn_text="Add Toll Plaza" @modelbtn_clicked="addTollPlaza"
        :isButtonDisabled="modelSubmitBtn" v-if="addPlazaModal" @model_close="addPlazaModal = false">
        <div class="space-y-24px">
            <div class="space-y-8px">
                <Label label="Plaza Name" />
                <Input placeholder="Enter Plazz Name" id="Plaza Name" :value="plazzName"
                    @input="event => plazzName = event.target.value" />

            </div>
            <div class="space-y-8px">
                <Label label="Plaza Address" />
                <Textarea placeholder="Enter Plazz Address" id="Plaza Address" :value="plazzAddress"
                    @input="event => plazzAddress = event.target.value" />
            </div>
        </div>
    </Model>

    <DeleteModel model_title="Delete Toll Plaza" model_subtitle="Are you sure you want to delete this Toll Plaza?"
        v-if="deleteToll" @close_model="deleteToll = false" @delete_item="deletTollPlaza()" />


    <Drawer drawer_title="Edit Toll Plaza" v-if="editTollPlaza" @close_drawer="editTollPlaza = false"
        @drawebtn_clicked="editToll()">
        <div class="space-y-24px">
            <div class="space-y-8px">
                <Label label="Plaza Name" />
                <Input placeholder="Enter Plazz Name" id="Plaza Name" :value="plazzName1"
                    @input="event => plazzName1 = event.target.value" />

            </div>
            <div class="space-y-8px">
                <Label label="Plaza Address" />
                <Textarea placeholder="Enter Plazz Address" id="Plaza Address" :value="plazzAddress1"
                    @input="event => plazzAddress1 = event.target.value" />
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

.no_data_section img {
    width: 224px;
    height: auto;
}
</style>