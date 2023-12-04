<script>
import { useAuthStore, useAlertStore } from '../stores'
import { fetchWrapper } from '../helpers/fetch-wrapper'

import axios from 'axios';

import Layout from '../components/Layout.vue';
import OverLaye from '../subcomponents/OverLaye.vue';
import SearchBox from '../subcomponents/SearchBox.vue';
import List from '../subcomponents/receiptcrud/List.vue';
import Pagination from '../subcomponents/Pagination.vue';
import Input from '../subcomponents/Input.vue';
import Label from '../subcomponents/Label.vue';
import Textarea from '../../../vuejsProject/vuedashboard/src/subcomponents/Textarea.vue';
import DeleteModel from '../subcomponents/DeleteModel.vue';
import Drawer from '../subcomponents/Drawer.vue';
import Select from '../subcomponents/Select.vue';


const baseUrl = `${import.meta.env.VITE_API_URL}`;

export default {
    components: { Layout, SearchBox, List, OverLaye, Pagination, Input, Label, Textarea, DeleteModel, Drawer, useAuthStore, Select },
    data() {
        return {
            list: [],
            searchText: "",
            gridView: true,
            listView: false,
            sort: "desc",
            pagination: "",
            currentPage: 1,
            totalPages: 1,
            receiptId: "",
            deleteReceipt: false,
            editReceipt: false,
            tollArray: [],
            setTollPlaza: "",
            laneArray: [],
            setLane: "",
            shiftArray: [],
            setShift: "",
            userArray: [],
            setUser: "",
            vehicleArray: [],
            setVehicle: "",
            quantity: "",
            vWeight: "",
            vNumber: "",
            rtype: "",
            setVehiclePrice: "",
            searchUser: "",
            searchToll: "",
            searchLane: "",
            searchShift: "",
            searchVehicle: "",
        }
    },
    created() {
        this.receiptData();
    },
    methods: {

        async receiptData() {
            var receipt_data = new FormData();
            receipt_data.append("r_id", "");
            receipt_data.append("sort", this.sort);
            receipt_data.append("search", this.searchText);
            receipt_data.append("page", this.currentPage);

            try {
                const response = await fetchWrapper.post(`${baseUrl}/admin/receipt-list`, receipt_data);
                this.list = response.data;
                this.totalPages = response.total_pages;

            } catch (error) {
                console.log(error);
            }

        },

        updatePage(Number) {
            this.currentPage = Number
            this.receiptData();
        },

        chnageSort() {
            this.sort = this.sort === 'desc' ? 'asc' : 'desc';
            this.receiptData();
        },

        searchTextFun(event) {
            this.searchText = event.target.value.trim();
            this.receiptData();
        },

        async statusUpdate(id) {
            var status_up = new FormData();

            status_up.append("r_id", id);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/admin/receipt-status`, status_up);

                if (data.success === 1) {
                    this.receiptData();
                }

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }
        },

        getReceiptId(id) {
            this.deleteReceipt = true
            this.receiptId = id
        },

        async deletTollPlaza() {
            var delete_receipt = new FormData();

            delete_receipt.append("r_id", this.receiptId);
            this.deleteReceipt = false

            try {
                const data = await fetchWrapper.post(`${baseUrl}/admin/remove-receipt`, delete_receipt);

                if (data.success === 1) {
                    this.receiptData();
                }


            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }
        },

        editReceiptOpen(id) {
            this.editReceipt = true
            this.receiptId = id
            this.getReceipdata();
            this.tollData();
            this.laneData();
            this.shiftData();
            this.userData();
            this.vehicleData();
        },

        searchUserFun(event) {
            this.searchUser = event.target.value.trim();
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

        searchVehicleFun(event) {
            this.searchVehicle = event.target.value.trim();
            this.vehicleData();
        },

        async getReceipdata() {
            var receipt_data = new FormData();
            receipt_data.append("r_id", this.receiptId);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/admin/receipt-list`, receipt_data);

                this.setTollPlaza = data.data.r_toll_plaza
                this.setLane = data.data.r_lane_select
                this.setShift = data.data.r_shift_select
                this.setUser = data.data.r_user_job
                this.setVehicle = data.data.r_vehical_type
                this.quantity = data.data.r_qty
                this.vWeight = data.data.r_vehical_weight
                this.vNumber = data.data.r_vehical_number
                this.rtype = data.data.r_ticket_type
                this.totalPrice = data.data.r_price

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }
        },

        async tollData() {
            var toll_data = new FormData();
            toll_data.append("t_id", "");
            toll_data.append("sort", "asc");
            toll_data.append("search", this.searchToll);
            toll_data.append("page", "1");

            try {
                const response = await fetchWrapper.post(`${baseUrl}/admin/toll-plaza-list`, toll_data);
                this.tollArray = response.data;

            } catch (error) {
                console.log(error);
            }

        },

        async laneData() {
            var lane_data = new FormData();
            lane_data.append("l_id", "");
            lane_data.append("sort", "asc");
            lane_data.append("search", this.searchLane);
            lane_data.append("page", "1");

            try {
                const response = await fetchWrapper.post(`${baseUrl}/admin/lane-list`, lane_data);

                this.laneArray = response.data


            } catch (error) {
                console.log(error);
            }

        },

        async shiftData() {
            var shift_data = new FormData();
            shift_data.append("s_id", "");
            shift_data.append("sort", "asc");
            shift_data.append("search", this.searchShift);
            shift_data.append("page", "1");

            try {
                const response = await fetchWrapper.post(`${baseUrl}/admin/shift-list`, shift_data);

                this.shiftArray = response.data

            } catch (error) {
                console.log(error);
            }

        },


        async userData() {
            var user_data = new FormData();
            user_data.append("user_id", "");
            user_data.append("sort", "asc");
            user_data.append("search", this.searchUser);
            user_data.append("page", "1");

            try {
                const response = await fetchWrapper.post(`${baseUrl}/admin/users-list`, user_data);

                this.userArray = response.data

            } catch (error) {
                console.log(error);
            }

        },

        async vehicleData() {
            var vehicle_data = new FormData();
            vehicle_data.append("v_id", "");
            vehicle_data.append("sort", "asc");
            vehicle_data.append("search", this.searchVehicle);
            vehicle_data.append("page", "1");

            try {
                const response = await fetchWrapper.post(`${baseUrl}/admin/vehical-list`, vehicle_data);

                this.vehicleArray = response.data

            } catch (error) {
                console.log(error);
            }

        },

        getTollPlaza(option) {
            this.setTollPlaza = option.t_name
        },

        getLane(option) {
            this.setLane = option.l_name
        },

        getShift(option) {
            this.setShift = option.s_name
        },

        getUser(option) {
            this.setUser = option.user_name
        },

        getVehicle(option) {
            this.setVehicle = option.v_name
            this.setVehiclePrice = option.v_price
        },


        async receiptsave() {

            if (this.setVehiclePrice || this.quantity) {
                this.totalPrice = this.setVehiclePrice * this.quantity
            }

            var edit_receipt = new FormData();
            edit_receipt.append("r_id", this.receiptId);
            edit_receipt.append("r_user_job", this.setUser);
            edit_receipt.append("r_toll_plaza", this.setTollPlaza);
            edit_receipt.append("r_lane_select", this.setLane);
            edit_receipt.append("r_shift_select", this.setShift);
            edit_receipt.append("r_vehical_type", this.setVehicle);
            edit_receipt.append("r_vehical_weight", this.vWeight);
            edit_receipt.append("r_qty", this.quantity);
            edit_receipt.append("r_vehical_number", this.vNumber);
            edit_receipt.append("r_ticket_type", this.rtype);
            edit_receipt.append("r_price", this.totalPrice);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/admin/receipt-edit`, edit_receipt);

                this.editReceipt = false;
                this.receiptData();

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
                    <p class="text-large_semibold color-Grey_90 cursor-pointer">Receipt Crud</p>
                </div>

                <div
                    class="w-100 display-flex align-center justify-between gap-8px margin-top_16px Md_flex-column Md_align-end">

                    <div class="display-flex align-stretch gap-8px">

                        <button class="btn-regular display-flex align-center gap-8px" @click="chnageSort()">
                            <img src="../assets/img/icons/adjustments.svg">
                            <span v-if="sort === 'asc'">Newest</span>
                            <span v-if="sort === 'desc'">Oddest</span>
                        </button>

                    </div>



                    <div class="display-flex align-center gap-8px Md_flex-wrap-reverse Md_align-end Md_justify-end">


                        <SearchBox placeholder="Serch Something" :value="searchText" @input="searchTextFun" />

                    </div>

                </div>


            </div>

            <div class="padding-y_24px padding-x_32px mobile-body">

                <div class="no_data_section" v-if="!list">
                    <img src="../assets/img/oops_icon.png">
                </div>

                <ul class="list">

                    <List :list="list" @delete_toll_plaza="getReceiptId" @edit_toll_plaza="editReceiptOpen"
                        @edit_status="statusUpdate" />

                </ul>

            </div>

            <div class="border-t border-solid border-Grey_20">
                <Pagination :currentPage="currentPage" :totalPages="totalPages" @update-page="updatePage" />
            </div>

        </div>


    </Layout>

    <DeleteModel model_title="Delete Receipt" model_subtitle="Are you sure you want to delete this Receipt?"
        v-if="deleteReceipt" @close_model="deleteReceipt = false" @delete_item="deletTollPlaza()" />



    <Drawer drawer_title="Edit Receipt" v-if="editReceipt" @close_drawer="editReceipt = false"
        @drawebtn_clicked="receiptsave()">


        <div class="space-y-24px">

            <div class="space-y-8px">
                <Label label="Select User" />
                <Select :options="userArray" @option-selected="getUser" :responseData="setUser" :value="searchUser"
                    @input="searchUserFun" />
            </div>

            <div class="space-y-8px">
                <Label label="Select Toll" />
                <Select :options="tollArray" @option-selected="getTollPlaza" :responseData="setTollPlaza"
                    :value="searchToll" @input="searchTollFun" />
            </div>

            <div class="space-y-8px">
                <Label label="Select Lane" />
                <Select :options="laneArray" @option-selected="getLane" :responseData="setLane" :value="searchLane"
                    @input="searchLaneFun" />
            </div>

            <div class="space-y-8px">
                <Label label="Select Shift" />
                <Select :options="shiftArray" @option-selected="getShift" :responseData="setShift" :value="searchShift"
                    @input="searchShiftFun" />
            </div>

            <div class="space-y-8px">
                <Label label="Select Vehicle" />
                <Select :options="vehicleArray" @option-selected="getVehicle" :responseData="setVehicle"
                    :value="searchVehicle" @input="searchVehicleFun" />
            </div>

            <div class="space-y-8px">
                <Label label="Enter quantity" />
                <Input type="number" placeholder="Enter quantity" id="Enter quantity" :value="quantity"
                    @input="event => quantity = event.target.value" />
            </div>

            <div class="space-y-8px">
                <Label label="Vehical Weight" />
                <Input type="text" placeholder="Enter Vehical Weight" id="Vehical Weight" :value="vWeight"
                    @input="event => vWeight = event.target.value" />
            </div>

            <div class="space-y-8px">
                <Label label="Vehical No." />
                <Input type="text" placeholder="Enter Vehical No." id="Vehical No." :value="vNumber"
                    @input="event => vNumber = event.target.value" />
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