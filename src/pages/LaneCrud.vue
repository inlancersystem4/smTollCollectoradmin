<script>

import { useAlertStore } from '../stores'
import { fetchWrapper } from '../helpers/fetch-wrapper'

import Layout from '../components/Layout.vue';
import OverLaye from '../subcomponents/OverLaye.vue';
import SearchBox from '../subcomponents/SearchBox.vue';
import List from '../subcomponents/lanecrud/List.vue';
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
            searchText: "",
            gridView: true,
            listView: false,
            sort: "asc",
            pagination: "",
            currentPage: 1,
            totalPages: 1,
            laneNumber: "",
            laneName: "",
            tollSelected: "",
            addlaneModal: false,
            deletelane: false,
            editLaneModel: false,
            laneNumber1: "",
            laneName2: "",
            laneId: "",
            laneTollPlaza: "",
            searchToll: "",
            isLoading: false,
        }
    },

    computed: {
        modelSubmitBtn() {
            return !this.laneNumber.trim() || !this.laneName.trim() || this.tollSelected === '' || !this.tollSelected;
        },
    },

    created() {
        this.laneData();
        this.tollData();
    },
    methods: {

        searchTextFun(event) {
            this.searchText = event.target.value.trim();
            this.laneData();
        },

        onOptionSelected(option) {
            this.tollSelected = option.t_name
            this.laneTollPlaza = option.t_name
        },

        async laneData() {
            var lane_data = new FormData();
            lane_data.append("l_id", "");
            lane_data.append("sort", this.sort);
            lane_data.append("search", this.searchText);
            lane_data.append("page", this.currentPage);

            try {
                const response = await fetchWrapper.post(`${baseUrl}/admin/lane-list`, lane_data);

                this.list = response.data

                this.totalPages = response.total_pages;

            } catch (error) {
                console.log(error);
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

        searchTollFun(event) {
            this.searchToll = event.target.value.trim();
            this.tollData();
        },

        updatePage(Number) {
            this.currentPage = Number
            this.laneData();
        },

        chnageSort() {
            this.sort = this.sort === 'desc' ? 'asc' : 'desc';
            this.laneData();
        },


        async addLane() {
            this.isLoading = true;
            var add_lane = new FormData();
            add_lane.append("l_id", "");
            add_lane.append("l_name", this.laneName);
            add_lane.append("l_number", this.laneNumber);
            add_lane.append("l_toll_plaza", this.tollSelected);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/admin/add-or-edit-lane`, add_lane);

                if (data.success === 1) {
                    this.isLoading = false;
                    this.addlaneModal = false;
                    this.laneData();
                    this.laneName = ""
                    this.laneNumber = ""
                    this.tollSelected = ""
                } else {
                    this.isLoading = false;
                    const alertStore = useAlertStore()
                    alertStore.error(data.message)
                }

            } catch (error) {
                this.isLoading = false;
                const alertStore = useAlertStore()
                alertStore.error(error)
            }
        },

        getLaneId(id) {
            this.deletelane = true
            this.laneId = id
        },

        editLaneOpen(id) {
            this.laneId = id
            this.editLaneModel = true
            this.getLaneData();
        },

        async getLaneData() {
            var lane_data = new FormData();
            lane_data.append("l_id", this.laneId);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/admin/lane-list`, lane_data);

                this.laneNumber1 = data.data.l_number
                this.laneName2 = data.data.l_name
                this.laneTollPlaza = data.data.l_toll_plaza


            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }
        },

        async deletTollPlaza() {
            var delete_lane = new FormData();

            delete_lane.append("l_id", this.laneId);
            this.deletelane = false

            try {
                const data = await fetchWrapper.post(`${baseUrl}/admin/remove-lane`, delete_lane);

                if (data.success === 1) {
                    this.laneData();
                } else {
                    const alertStore = useAlertStore()
                    alertStore.error(data.message)
                }

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }
        },

        async statusUpdate(id) {
            var status_up = new FormData();

            status_up.append("l_id", id);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/admin/lane-status`, status_up);

                if (data.success === 1) {
                    this.laneData();
                }

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }
        },

        async editLane() {
            this.isLoading = true;
            var edit_lane = new FormData();
            edit_lane.append("l_id", this.laneId);
            edit_lane.append("l_name", this.laneName2);
            edit_lane.append("l_number", this.laneNumber1);
            edit_lane.append("l_toll_plaza", this.laneTollPlaza);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/admin/add-or-edit-lane`, edit_lane);
                if (data.success === 1) {
                    this.isLoading = false;
                    this.editLaneModel = false;
                    this.laneData();
                } else {
                    this.isLoading = false;
                    const alertStore = useAlertStore()
                    alertStore.error(data.message)
                }

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }
        }

    },
}
</script>

<template>
    <Layout >

        <div class="table-content">

            <div class="table-header display-flex-wrap">

                <div class="display-flex align-center gap-16px w-100">
                    <p class="text-large_semibold color-Grey_90 cursor-pointer">Lane List</p>
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                fill="none">
                                <path
                                    d="M19.5 13.5H4.5C4.08579 13.5 3.75 13.8358 3.75 14.25V18C3.75 18.4142 4.08579 18.75 4.5 18.75H19.5C19.9142 18.75 20.25 18.4142 20.25 18V14.25C20.25 13.8358 19.9142 13.5 19.5 13.5Z"
                                    stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M19.5 5.25H4.5C4.08579 5.25 3.75 5.58579 3.75 6V9.75C3.75 10.1642 4.08579 10.5 4.5 10.5H19.5C19.9142 10.5 20.25 10.1642 20.25 9.75V6C20.25 5.58579 19.9142 5.25 19.5 5.25Z"
                                    stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </button>
                        <button class="icon-btn icon-btn_32px Mobile_display-none"
                            @click="gridView = true, listView = false" :class="{ 'bg-Grey_5': gridView }">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                fill="none">
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
                            @click="addlaneModal = true">
                            <img src="../assets/img/icons/plus-3.svg">
                            New Lane</button>

                    </div>

                </div>


            </div>

            <div class="padding-y_24px padding-x_32px mobile-body">

                <div class="no_data_section" v-if="!list">
                    <img src="../assets/img/oops_icon.png">
                </div>

                <ul class="list" :class="{ 'list-row': listView }">

                    <List :list="list" @delete_lane="getLaneId" @edit_lane="editLaneOpen" @edit_status="statusUpdate" />

                </ul>

            </div>

            <div class="border-t border-solid border-Grey_20">
                <Pagination :currentPage="currentPage" :totalPages="totalPages" @update-page="updatePage" />
            </div>

        </div>

    </Layout>


    <OverLaye v-if="overalye" />


    <Drawer drawer_title="Add Lane" Btn_text="Add Lane" @drawebtn_clicked="addLane()" :isButtonDisabled="modelSubmitBtn"
        v-if="addlaneModal" @close_drawer="addlaneModal = false" :loading="isLoading" >
        <div class="space-y-24px">
            <div class="">
                <div class="space-y-8px">
                    <Label label="Lane number" />
                    <Input placeholder="Enter Lane number" id="Plaza Name" :value="laneNumber"
                        @input="event => laneNumber = event.target.value" />
                </div>
            </div>
            <div class="space-y-8px">
                <Label label="Lane Name" />
                <Input placeholder="Enter Lane Name" id="Plaza Address" :value="laneName"
                    @input="event => laneName = event.target.value" />
            </div>
            <div class="space-y-8px">
                <Label label="Lane Toll" />
                <Select :options="tollArray" @option-selected="onOptionSelected" :value="searchToll"
                    @input="searchTollFun" />
            </div>
        </div>
    </Drawer>


    <DeleteModel model_title="Delete Lane" model_subtitle="Are you sure you want to delete this Lane?" v-if="deletelane"
        @close_model="deletelane = false" @delete_item="deletTollPlaza()" />


    <Drawer drawer_title="Edit Lane" Btn_text="Edit Lane" v-if="editLaneModel" @close_drawer="editLaneModel = false"
        @drawebtn_clicked="editLane()" :loading="isLoading">
        <div class="space-y-24px">
            <div class="space-y-8px">
                <Label label="Lane number" />
                <Input placeholder="Enter Plazz Name" id="Plaza Name" :value="laneNumber1"
                    @input="event => laneNumber1 = event.target.value" />
            </div>
            <div class="space-y-8px">
                <Label label="Lane Name" />
                <Input placeholder="Enter Plazz Address" id="Plaza Address" :value="laneName2"
                    @input="event => laneName2 = event.target.value" />
            </div>
            <div class="space-y-8px">
                <Label label="Lane Toll" />
                <Select :options="tollArray" @option-selected="onOptionSelected" :responseData="laneTollPlaza"
                    :value="searchToll" @input="searchTollFun" />
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


@media (max-width:768px) {
    .list {
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }

    .mobile-body {
        padding: 16px 22px;
    }

}
</style>