<script>

import { useAuthStore, useAlertStore } from '../stores'
import { fetchWrapper } from '../helpers/fetch-wrapper'

import axios from 'axios';

import Layout from '../components/Layout.vue';
import OverLaye from '../subcomponents/OverLaye.vue';
import SearchBox from '../subcomponents/SearchBox.vue';
import List from '../subcomponents/vehiclecrud/List.vue';
import Pagination from '../subcomponents/Pagination.vue';
import Model from '../subcomponents/Model.vue';
import Input from '../subcomponents/Input.vue';
import Label from '../subcomponents/Label.vue';
import Textarea from '../../../vuejsProject/vuedashboard/src/subcomponents/Textarea.vue';
import DeleteModel from '../subcomponents/DeleteModel.vue';
import Drawer from '../subcomponents/Drawer.vue';
import Select from '../subcomponents/Select.vue';


const baseUrl = `${import.meta.env.VITE_API_URL}`;

export default {
    components: { Layout, SearchBox, List, OverLaye, Pagination, Model, Input, Label, Textarea, DeleteModel, Drawer, Select },
    data() {
        return {
            list: [],
            searchText: "",
            sort: "asc",
            pagination: "",
            currentPage: 1,
            totalPages: 1,
            vehicleName: "",
            vehicleName1: "",
            vehicleprice: "",
            vehicleprice1: "",
            vehicleimg: "",
            vehicleimg1: "",
            addVehicleModal: false,
            selectedImg1: "",
            deleteVehicle: false,
            vehicleId: "",
            selectedImg: "",
            editVehicle: false,
            editVehicleimg: "",
        }
    },
    computed: {
        modelSubmitBtn() {
            return !this.vehicleName.trim() || !this.vehicleprice.trim() || this.vehicleimg === '' || !this.vehicleimg;
        },
    },
    created() {
        this.vehicleData();
    },
    methods: {

        searchTextFun(event) {
            this.searchText = event.target.value.trim();
            this.vehicleData();
        },

        // onOptionSelected(option) {
        //     this.vehicleimg = option
        // },

        async vehicleData() {
            var vehicle_data = new FormData();
            vehicle_data.append("v_id", "");
            vehicle_data.append("sort", this.sort);
            vehicle_data.append("search", this.searchText);
            vehicle_data.append("page", this.currentPage);

            try {
                const response = await fetchWrapper.post(`${baseUrl}/admin/vehical-list`, vehicle_data);

                this.list = response.data

                this.totalPages = response.total_pages;

            } catch (error) {
                console.log(error);
            }

        },

        updatePage(Number) {
            this.currentPage = Number
            this.vehicleData();
        },

        chnageSort() {
            this.sort = this.sort === 'desc' ? 'asc' : 'desc';
            this.vehicleData();
        },



        async addvehicle() {

            var add_vehicle = new FormData();
            add_vehicle.append("v_id", "");
            add_vehicle.append("v_name", this.vehicleName);
            add_vehicle.append("v_price", this.vehicleprice);
            add_vehicle.append("v_image", this.vehicleimg);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/admin/add-or-edit-vehical`, add_vehicle);

                if (data.success === 1) {
                    this.addVehicleModal = false
                    this.vehicleData();
                    this.vehicleName = ""
                    this.vehicleprice = ""
                    this.vehicleimg = ""
                }

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }
        },

        deletevehicle(id) {
            this.deleteVehicle = true
            this.vehicleId = id
        },

        editVehicleOpen(id) {
            this.editVehicle = true
            this.vehicleId = id
            this.getVehicleData()
        },

        async statusUpdate(id) {
            var status_up = new FormData();

            status_up.append("v_id", id);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/admin/vehical-status`, status_up);

                if (data.success === 1) {
                    this.vehicleData();
                }

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }
        },

        async deletVehicle() {
            var delete_vehicle = new FormData();

            delete_vehicle.append("v_id", this.vehicleId);

            this.deleteVehicle = false

            try {
                const data = await fetchWrapper.post(`${baseUrl}/admin/remove-vehical`, delete_vehicle);

                if (data.success === 1) {
                    this.vehicleData();
                }

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }
        },


        async getVehicleData() {
            var vehicle_data = new FormData();

            vehicle_data.append("v_id", this.vehicleId);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/admin/vehical-list`, vehicle_data);

                this.vehicleName1 = data.data.v_name
                this.vehicleprice1 = data.data.v_price
                this.vehicleimg1 = data.data.v_image


            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }
        },


        async editVehicleData() {
            var edit_vehicle = new FormData();

            edit_vehicle.append("v_id", this.vehicleId);
            edit_vehicle.append("v_name", this.vehicleName1);
            edit_vehicle.append("v_price", this.vehicleprice1);

            if (!this.editVehicleimg) {
                edit_vehicle.append("v_image", this.vehicleimg1);
            } else {
                edit_vehicle.append("v_image", this.editVehicleimg);
            }

            try {
                const data = await fetchWrapper.post(`${baseUrl}/admin/add-or-edit-vehical`, edit_vehicle);

                if (data.success === 1) {
                    this.editVehicle = false
                    this.vehicleData();
                }

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }
        },

        selectVehicleImg(event) {
            const selectedFile = event.target.files[0]

            if (selectedFile.type === "image/png") {

                this.vehicleimg = selectedFile

                this.selectedImg = URL.createObjectURL(selectedFile)

            }

            if (selectedFile.type === "image/gif", selectedFile.type === "video/mp4", selectedFile.type === "audio/mpeg") {
                console.log("not ok")
            }

        },

        selectVehicleImg2(event) {
            const selectedFile = event.target.files[0]

            if (selectedFile.type === "image/png") {

                this.editVehicleimg = selectedFile

                this.selectedImg1 = URL.createObjectURL(selectedFile)

            }

            if (selectedFile.type === "image/gif", selectedFile.type === "video/mp4", selectedFile.type === "audio/mpeg") {
                console.log("not ok")
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
                    <p class="text-large_semibold color-Grey_90 cursor-pointer">Vehicle Crud</p>
                </div>

                <div
                    class="w-100 display-flex align-center justify-between gap-8px margin-top_16px Md_flex-column Md_align-end">

                    <div class="display-flex align-stretch gap-8px">

                        <button class="btn-regular display-flex align-center gap-8px" @click="chnageSort()">
                            <img src="../assets/img/icons/adjustments.svg">
                            Filter
                        </button>

                    </div>



                    <div class="display-flex align-center gap-8px Md_flex-wrap-reverse Md_align-end Md_justify-end">


                        <SearchBox placeholder="Serch Something" :value="searchText" @input="searchTextFun" />


                        <button class="btn-regular display-flex align-center  gap-8px text-no-wrap"
                            @click="addVehicleModal = true">
                            <img src="../assets/img/icons/plus-3.svg">
                            New Vehicle</button>

                    </div>

                </div>


            </div>

            <div class="padding-y_24px padding-x_32px">

                <div class="no_data_section" v-if="!list">
                    <img src="../assets/img/oops_icon.png">
                </div>

                <ul class="list">

                    <List :list="list" @delete_vehicle="deletevehicle" @edit_vehicle="editVehicleOpen"
                        @edit_status="statusUpdate" />

                </ul>

            </div>

            <div class="border-t border-solid border-Grey_20">
                <Pagination :currentPage="currentPage" :totalPages="totalPages" @update-page="updatePage" />
            </div>

        </div>

    </Layout>


    <OverLaye v-if="overalye" />


    <Model model_title="Add Vehicle" Btn_text="Add Vehicle" @modelbtn_clicked="addvehicle()"
        :isButtonDisabled="modelSubmitBtn" v-if="addVehicleModal" @model_close="addVehicleModal = false">
        <div class="space-y-24px">
            <div class="space-y-8px">
                <div class="display-flex align-end justify-between w-100">
                    <Label label="Vehicle Img" />
                    <img :src="this.selectedImg" :width="selectedImg ? '90' : null" :height="selectedImg ? '90' : null"
                        class="object-contain">
                </div>
                <Input type="file" placeholder="Enter vehicleprice Name" id="Vehicle Name" @change="selectVehicleImg" />

            </div>
            <div class="address-form">
                <div class="space-y-8px">
                    <Label label="Vehicle Name" />
                    <Input placeholder="Ex. Truck" id="Vehicle Name" :value="vehicleName"
                        @input="event => vehicleName = event.target.value" />
                </div>
            </div>
            <div class="space-y-8px">
                <Label label="Vehicle Price" />
                <Input type="number" placeholder="Ex. 160Rs." id="Plaza Address" :value="vehicleprice"
                    @input="event => vehicleprice = event.target.value" />
            </div>
        </div>
    </Model>


    <DeleteModel model_title="Delete Vehicle" model_subtitle="Are you sure you want to delete this Vehicle?"
        v-if="deleteVehicle" @close_model="deleteVehicle = false" @delete_item="deletVehicle()" />


    <Drawer drawer_title="Edit Vehicle" v-if="editVehicle" @close_drawer="editVehicle = false"
        @drawebtn_clicked="editVehicleData()">
        <div class="space-y-24px">
            <div class="space-y-8px">
                <div class="display-flex align-end justify-between w-100">
                    <Label label="Vehicle Img" />
                    <img :src="this.selectedImg1 || this.vehicleimg1"
                        :width="this.selectedImg1 || this.vehicleimg1 ? '90' : null"
                        :height="this.selectedImg1 || this.vehicleimg1 ? '90' : null" class="object-contain">
                </div>
                <Input type="file" placeholder="Enter vehicleprice Name" id="Vehicle Name" @change="selectVehicleImg2"
                    accept="image/*" />

            </div>
            <div class="space-y-8px">
                <Label label="Vehicle Name" />
                <Input placeholder="Ex. Truck" id="Vehicle Name" :value="vehicleName1"
                    @input="event => vehicleName1 = event.target.value" />
            </div>
            <div class="space-y-8px">
                <Label label="Vehicle Price" />
                <Input type="number" placeholder="Ex. 160Rs." id="Plaza Address" :value="vehicleprice1"
                    @input="event => vehicleprice1 = event.target.value" />
            </div>
        </div>
    </Drawer>
</template>



<style scoped>
.list {
    display: grid;
    gap: 12px;
    grid-template-columns: repeat(4, minmax(0, 1fr));
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