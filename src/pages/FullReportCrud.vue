<script>
import Layout from '../components/Layout.vue';
import { useAlertStore } from '../stores';
import { fetchWrapper } from '../helpers/fetch-wrapper';
import Label from '../subcomponents/Label.vue';
import Select from '../subcomponents/Select.vue';
import List from '../subcomponents/fullreportcrud/List.vue';
import Pagination from '../subcomponents/Pagination.vue';
import SearchBox from '../subcomponents/SearchBox.vue';
import Input from '../subcomponents/Input.vue';
import DeleteModel from '../subcomponents/DeleteModel.vue';


const baseUrl = `${import.meta.env.VITE_API_URL}`;

export default {
    components: {
        Layout,
        Label,
        Select,
        List,
        SearchBox,
        Pagination,
        Input,
        DeleteModel
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
            totalPage: "",
            limit: "10",
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
            isdeleteReceipt: false,
            receiptId: "",
            sortByTicketNumber: "",
            sortByVehicleNumber: "",
            sortByAmount: "",
            sortByCreatedAt: "",
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
        handleTicketTypeInput(event) {
            const inputValue = event.target.value.trim();
            clearTimeout(this.reportTicketTypeTimeout);
            this.reportTicketTypeTimeout = setTimeout(() => {
                this.reportTicketType = String(inputValue);
                this.fullReport();
            }, 1000);
        },

        handleStartDateInput(event) {
            this.reportStartDate = event.target.value;
            this.fullReport();
        },

        handleEndDateInput(event) {
            this.reportEndDate = event.target.value;
            this.fullReport();
        },

        handleLimitChange() {
            this.fullReport();
        },

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
            if (option) {
                this.reportTollPlaza = option.t_id
            }
            else {
                this.reportTollPlaza = ""
            }
            this.tollSelected = option.t_name
            this.fullReport();
        },

        getLane(option) {
            if (option) {
                this.reportLane = option.l_id
            } else {
                this.reportLane = ""
            }
            this.laneSelected = option.l_name
            this.fullReport();
        },

        getShift(option) {
            if (option) {
                this.reportShift = option.s_id
            } else {
                this.reportShift = ""
            }
            this.shiftSelected = option.s_name
            this.fullReport();
        },

        getUser(option) {
            if (option) {
                this.reportUser = option.user_id
            } else {
                this.reportUser = ""
            }
            this.setUser = option.user_name
            this.fullReport();
        },

        getVehicle(option) {
            if (option) {
                this.reportVehicleType = option.v_id
            } else {
                this.reportVehicleType = ""
            }
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

            vehicle_data.append("sort_by_ticket_number", this.sortByTicketNumber);
            vehicle_data.append("sort_by_vehicle_number", this.sortByVehicleNumber);
            vehicle_data.append("sort_by_amount", this.sortByAmount);
            vehicle_data.append("sort_by_created_at", this.sortByCreatedAt);

            try {
                const response = await fetchWrapper.post(`${baseUrl}/admin/full-report`, vehicle_data);

                if (response.success === 1) {

                    this.fullreportArray = response.data
                    this.totalPage = response.total_pages
                } else {
                    const alertStore = useAlertStore()
                    alertStore.error(response.message)
                }

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }

        },

        getReceiptId(id) {
            this.isdeleteReceipt = true
            this.receiptId = id
        },

        async deleteReceipt() {
            var delete_receipt = new FormData();

            delete_receipt.append("r_id", this.receiptId);
            this.isdeleteReceipt = false

            try {
                const data = await fetchWrapper.post(`${baseUrl}/admin/remove-receipt`, delete_receipt);

                if (data.success === 1) {
                    this.fullReport();
                }


            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }
        },

        changeSort(columnType) {
            if (columnType !== "#") {
                this.sortByTicketNumber = "";
                this.sortByVehicleNumber = "";
                this.sortByAmount = "";
                this.sortByCreatedAt = "";

                if (columnType === "ticket_number") {
                    this.sortByTicketNumber = "ticket_number";
                } else if (columnType === "vehicle") {
                    this.sortByVehicleNumber = "vehicle";
                } else if (columnType === "amount") {
                    this.sortByAmount = "amount";
                } else if (columnType === "created_at") {
                    this.sortByCreatedAt = "created_at";
                }

                this.sort = this.sort === 'desc' ? 'asc' : 'desc';
            } else {
                this.sortByTicketNumber = "";
                this.sortByVehicleNumber = "";
                this.sortByAmount = "";
                this.sortByCreatedAt = "";
                this.sort = 'desc';
            }

            this.fullReport();
        },

        async UpdateIsCancelStatus(id, status_id) {
            var status_up = new FormData();

            status_up.append("r_id", id);
            status_up.append("r_iscancel", status_id);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/admin/report-cancel`, status_up);

                if (data.success === 1) {
                    this.fullReport();
                }

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
            </div>



            <div class="padding-y_24px padding-x_32px mobile-body">
                <div class="grid grid-cols-3 gap-3 ">
                    <div class="space-y-8px">
                        <Label label="Toll Plaza" />
                        <Select :options="tollArray" @option-selected="getTollPlaza" :value="searchToll"
                            @input="searchTollFun" />
                    </div>

                    <div class="space-y-8px">
                        <Label label="Lane" />
                        <Select :options="tollLaneArray" @option-selected="getLane" :value="searchLane"
                            @input="searchLaneFun" />
                    </div>

                    <div class="space-y-8px">
                        <Label label="Shift" />
                        <Select :options="shiftArray" @option-selected="getShift" :value="searchShift"
                            @input="searchShiftFun" />
                    </div>

                    <div class="space-y-8px">
                        <Label label="User" />
                        <Select :options="userArray" @option-selected="getUser" :value="searchUser"
                            @input="searchUserFun" />
                    </div>

                    <div class="space-y-8px">
                        <Label label="Vehicle Type" />
                        <Select :options="vehicleArray" @option-selected="getVehicle" :value="searchVehicle"
                            @input="searchVehicleFun" />
                    </div>
                    <div class="space-y-8px">
                        <Label label="Ticket Type" />
                        <Input type="text" placeholder="Ticket Type" id="Ticket Type" :value="reportTicketType"
                            @input="handleTicketTypeInput" />
                    </div>
                    <div class="space-y-8px">
                        <Label label="Start Date" />
                        <Input type="date" placeholder="Ex. 160Rs." id="Start Date" :value="reportStartDate"
                            @input="handleStartDateInput" />
                    </div>
                    <div class="space-y-8px">
                        <Label label="End Date" />
                        <Input type="date" placeholder="Ex. 160Rs." id="End Date" :value="reportEndDate"
                            @input="handleEndDateInput" />
                    </div>

                </div>
            </div>

        </div>

        <div class="table-content mt-6">
            <div class="table-header">
                <div class="flex gap-2">
                    <p>Show</p>
                    <select v-model="limit" @change="handleLimitChange" name="" id=""
                        class="text-large_semibold color-Grey_90 cursor-pointer border bg-gray-200 rounded-md">
                        <option value="10" selected>10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                    </select>
                    <p>entries</p>
                </div>
                <div class="flex items-center gap-2">
                    <p>Search:</p>
                    <div class="border rounded-lg">
                        <SearchBox placeholder="Serch Something" :value="reportSearch" @input="searchTextFun" />
                    </div>
                </div>
            </div>

            <div class="main-table full-report">
                <table class="w-100">
                    <tbody>
                        <tr class="font-semibold">
                            <td class="cursor-pointer id" @click="changeSort('#')">#</td>
                            <td class="cursor-pointer ticket-number flex items-center gap-1"
                                @click="changeSort('ticket_number')">
                                <span class="line-clamp-1">Ticket No.</span>
                                <span class="block">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.5 16.5L7.5 19.5L4.5 16.5" stroke="#191C1F" stroke-width="1.5"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M7.5 4.5V19.5" stroke="#191C1F" stroke-width="1.5"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M13.5 7.5L16.5 4.5L19.5 7.5" stroke="#191C1F" stroke-width="1.5"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M16.5 19.5V4.5" stroke="#191C1F" stroke-width="1.5"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </span>
                            </td>
                            <td class="user pl-1">User</td>
                            <td class="shift">Shift</td>
                            <td class="lane">Lane</td>
                            <td class="vehical">Type</td>
                            <td class="ticket">cket Type</td>
                            <td class="cursor-pointer number flex items-center gap-1" @click="changeSort('vehicle')">
                                Vehicle
                                <span>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.5 16.5L7.5 19.5L4.5 16.5" stroke="#191C1F" stroke-width="1.5"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M7.5 4.5V19.5" stroke="#191C1F" stroke-width="1.5"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M13.5 7.5L16.5 4.5L19.5 7.5" stroke="#191C1F" stroke-width="1.5"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M16.5 19.5V4.5" stroke="#191C1F" stroke-width="1.5"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </span>
                            </td>
                            <td class="qty">Qty</td>
                            <td class="cursor-pointer price flex items-center gap-1" @click="changeSort('amount')">
                                Amount
                                <span>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.5 16.5L7.5 19.5L4.5 16.5" stroke="#191C1F" stroke-width="1.5"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M7.5 4.5V19.5" stroke="#191C1F" stroke-width="1.5"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M13.5 7.5L16.5 4.5L19.5 7.5" stroke="#191C1F" stroke-width="1.5"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M16.5 19.5V4.5" stroke="#191C1F" stroke-width="1.5"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </span>
                            </td>
                            <td class="cursor-pointer created flex items-center gap-1"
                                @click="changeSort('created_at')">Created At
                                <span>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.5 16.5L7.5 19.5L4.5 16.5" stroke="#191C1F" stroke-width="1.5"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M7.5 4.5V19.5" stroke="#191C1F" stroke-width="1.5"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M13.5 7.5L16.5 4.5L19.5 7.5" stroke="#191C1F" stroke-width="1.5"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M16.5 19.5V4.5" stroke="#191C1F" stroke-width="1.5"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </span>
                            </td>
                            <td class="action">Action</td>
                        </tr>
                        <List :list="fullreportArray" @delete_lane="getReceiptId" @edit_status="UpdateIsCancelStatus" />
                    </tbody>
                </table>
            </div>

            <div class="stable-footer">
                <Pagination :currentPage="currentPage" :totalPages="totalPage" @update-page="updatePage" />
            </div>
        </div>

    </Layout>
    <DeleteModel model_title="Delete Receipt" model_subtitle="Are you sure you want to delete this Receipt?"
        v-if="isdeleteReceipt" @close_model="isdeleteReceipt = false" @delete_item="deleteReceipt()" />
</template>