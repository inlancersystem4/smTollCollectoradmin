<script>
import Layout from '../components/Layout.vue';
import { useAlertStore } from '../stores';
import { fetchWrapper } from '../helpers/fetch-wrapper';
import Label from '../subcomponents/Label.vue';
import Select from '../subcomponents/Select.vue';
import List from '../subcomponents/fullreportcrud/List.vue';
import Pagination from '../subcomponents/Pagination.vue';
import SearchBox from '../subcomponents/SearchBox.vue';


const baseUrl = `${import.meta.env.VITE_API_URL}`;

export default {
    components: {
        Layout,
        Label,
        Select,
        List,
        SearchBox,
        Pagination
    },
    data() {
        return {
            tollArray: [],
            tollLaneArray: [],
            shiftArray: [],
            userArray: [],
            vehicleArray: [],
            fullreportArray: [],
            searchToll: "",
            searchLane: "",
            searchShift: "",
            searchUser: "",
            searchVehicle: "",
            currentPage: 1,
            totalPages: "",
            limit: 20,
            sort: "desc",
            reportSearch: "",
            reportTollPlaza: "",
            reportShift: "",
            reportLane: "",
            reportUser: "",
            reportVehicleType: "",
            reportTicketType: "",
            reportStartDate: "",
            reportEndDate: "",

        }
    },
    created() {
        this.tollData();
        this.laneData();
        this.shiftData();
        this.userData();
        this.vehicleData();
        this.fullReport();
    },
    methods: {
        searchTextFun(event) {
            this.reportSearch = event.target.value.trim();
            this.fullReport();
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

        searchUserFun(event) {
            this.searchUser = event.target.value.trim();
            this.userData();
        },

        searchVehicleFun(event) {
            this.searchVehicle = event.target.value.trim();
            this.vehicleData();
        },

        getTollPlaza(option) {
            this.reportTollPlaza = option.t_id
            this.tollSelected = option.t_name
            this.fullReport();
        },

        getLane(option) {
            this.reportLane = option.l_id
            this.laneSelected = option.l_name
            this.fullReport();
        },

        getShift(option) {
            this.reportShift = option.s_id
            this.shiftSelected = option.s_name
            this.fullReport();
        },

        getUser(option) {
            this.reportUser = option.user_id
            this.setUser = option.user_name
            this.fullReport();
        },

        getVehicle(option) {
            this.reportVehicleType = option.v_id
            this.setVehicle = option.v_name
            this.fullReport();
        },

        updatePage(Number) {
            this.currentPage = Number
            this.fullReport();
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
                const alertStore = useAlertStore();
                alertStore.error(error)
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
                const alertStore = useAlertStore()
                alertStore.error(error)
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
                const alertStore = useAlertStore()
                alertStore.error(error)
            }

        },

        async userData() {
            var user_data = new FormData();
            user_data.append("user_id", "");
            user_data.append("sort", this.sort);
            user_data.append("search", this.searchUser);
            user_data.append("page", "1");

            try {
                const response = await fetchWrapper.post(`${baseUrl}/admin/users-list`, user_data);

                this.userArray = response.data

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }

        },

        async vehicleData() {
            var vehicle_data = new FormData();
            vehicle_data.append("v_id", "");
            vehicle_data.append("sort", this.sort);
            vehicle_data.append("search", this.searchVehicle);
            vehicle_data.append("page", "1");

            try {
                const response = await fetchWrapper.post(`${baseUrl}/admin/vehical-list`, vehicle_data);

                this.vehicleArray = response.data

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }

        },

        async fullReport() {
            var vehicle_data = new FormData();
            vehicle_data.append("sort", this.sort);
            vehicle_data.append("page", this.currentPage);
            vehicle_data.append("limit", this.limit);
            vehicle_data.append("search", this.reportSearch);
            vehicle_data.append("toll_plaza", this.reportTollPlaza);
            vehicle_data.append("shift", this.reportShift);
            vehicle_data.append("lane", this.reportLane);
            vehicle_data.append("user", this.reportUser);
            vehicle_data.append("vehicle_type", this.reportVehicleType);
            vehicle_data.append("ticket_type", this.reportTicketType);
            vehicle_data.append("start_date", this.reportStartDate);
            vehicle_data.append("end_date", this.reportEndDate);

            try {
                const response = await fetchWrapper.post(`${baseUrl}/admin/full-report`, vehicle_data);

                this.fullreportArray = response.data
                this.totalPages = response.data.total_pages

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }

        },
    }
}
</script>

<template>
    <Layout>
        <div class="table-content">

            <div class="table-header display-flex-wrap">

                <div class="display-flex align-center gap-16px w-100">
                    <p class="text-large_semibold color-Grey_90 cursor-pointer">Full Report</p>
                </div>

                <div class="display-flex align-center gap-8px Md_flex-wrap-reverse Md_align-end Md_justify-end">

                    <SearchBox placeholder="Serch Something" :value="reportSearch" @input="searchTextFun" />

                </div>

            </div>


        </div>

        <div class="padding-y_24px padding-x_32px mobile-body">
            <div class="space-y-8px">
                <Label label="Add Toll Plaza" />
                <Select :options="tollArray" @option-selected="getTollPlaza" :value="searchToll"
                    @input="searchTollFun" />
            </div>

            <div class="space-y-8px">
                <Label label="Add Toll Lane" />
                <Select :options="tollLaneArray" @option-selected="getLane" :value="searchLane"
                    @input="searchLaneFun" />
            </div>

            <div class="space-y-8px">
                <Label label="Add Shift" />
                <Select :options="shiftArray" @option-selected="getShift" :value="searchShift"
                    @input="searchShiftFun" />
            </div>

            <div class="space-y-8px">
                <Label label="Select User" />
                <Select :options="userArray" @option-selected="getUser" :value="searchUser" @input="searchUserFun" />
            </div>

            <div class="space-y-8px">
                <Label label="Select Vehicle" />
                <Select :options="vehicleArray" @option-selected="getVehicle" :value="searchVehicle"
                    @input="searchVehicleFun" />
            </div>

            <!-- <div class="no_data_section" v-if="!list">
                <img src="../assets/img/oops_icon.png">
            </div> -->

            <ul class="list" :class="{ 'list-row': listView }">

                <List :list="fullreportArray" @delete_lane="getLaneId" @edit_lane="editLaneOpen"
                    @edit_status="statusUpdate" />

            </ul>

        </div>

        <div class="border-t border-solid border-Grey_20">
            <Pagination :currentPage="currentPage" :totalPages="totalPages" @update-page="updatePage" />
        </div>

    </Layout>
</template>