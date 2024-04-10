<script>
import Layout from '../components/Layout.vue';
import { useAlertStore } from '../stores';
import { fetchWrapper } from '../helpers/fetch-wrapper';
import Label from '../subcomponents/Label.vue';
import Select from '../subcomponents/Select.vue';
import Input from '../subcomponents/Input.vue';

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export default {
    components: { Layout, Label, Select, Input },
    data() {
        return {
            tollArray: [],
            shiftArray: [],
            tollLaneArray: [],
            LaneReportArray: [],
            sort: "asc",
            currentPage: 1,
            searchToll: "",
            tollSelected: "",
            reportTollPlaza: "",
            reportStartDate: "",
            searchShift: "",
            shiftSelected: "",
            reportShift: "",
            searchLane: "",
            reportLane: "",
            laneSelected: "",
            manualTicket: "",
            ticketCounts: "",
            AmountTotal: "",
            cancelTicketCounts: "",
            cancelTicketAmountTotal: "",
            manualTickets: "",
            manualTicketsAmount: "",
            totalTicket: "",
            totalAmount: "",
            manualArray: []
        }
    },
    created() {
        this.tollData();
        this.shiftData();
        this.laneData();
    },
    methods: {
        handleStartDateInput(event) {
            this.reportStartDate = event.target.value;
        },

        searchTollFun(event) {
            this.searchToll = event.target.value.trim();
            this.tollData();
        },

        searchShiftFun(event) {
            this.searchShift = event.target.value.trim();
            this.shiftData();
        },

        searchLaneFun(event) {
            this.searchLane = event.target.value.trim();
            this.laneData();
        },

        getTollPlaza(option) {
            if (option) {
                this.reportTollPlaza = option.t_id
            }
            else {
                this.reportTollPlaza = ""
            }
            this.tollSelected = option.t_name
        },

        getShift(option) {
            if (option) {
                this.reportShift = option.s_id
            } else {
                this.reportShift = ""
            }
            this.shiftSelected = option.s_name
        },

        getLane(option) {
            if (option) {
                this.reportLane = option.l_id
            } else {
                this.reportLane = ""
            }
            this.laneSelected = option.l_name
        },


        getManualTicket(e, index, item) {
            const manualObj = {
                value: parseInt(e.target.value),
                index: index,
                key: item
            };

            const existingIndex = this.manualArray.findIndex(obj => obj.index === index);

            if (existingIndex !== -1) {
                this.manualArray.splice(existingIndex, 1, manualObj);
            } else {
                this.manualArray.push(manualObj);
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
                const alertStore = useAlertStore();
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

        addManualData() {
            if (this.manualArray && this.manualArray.length > 0) {
                this.laneReport();
            }
        },

        async laneReport() {
            if (this.reportTollPlaza && this.reportStartDate && this.reportShift && this.reportLane) {

                var lane_report_data = new FormData();
                lane_report_data.append("toll_plaza", this.reportTollPlaza);
                lane_report_data.append("date", this.reportStartDate);
                lane_report_data.append("shift", this.reportShift);
                lane_report_data.append("lane", this.reportLane);
                lane_report_data.append("manual_ticket", JSON.stringify(this.manualArray));

                try {
                    const response = await fetchWrapper.post(`${baseUrl}/admin/lane-report`, lane_report_data);
                    this.LaneReportArray = response.data;

                    this.ticketCounts = this.LaneReportArray.reduce((total, item) => {
                        return total + item.ticket_count;
                    }, 0);
                    this.AmountTotal = this.LaneReportArray.reduce((total, item) => {
                        return total + item.vehicle_price;
                    }, 0);
                    this.cancelTicketCounts = this.LaneReportArray.reduce((total, item) => {
                        return total + item.cancelled_ticket;
                    }, 0);
                    this.cancelTicketAmountTotal = this.LaneReportArray.reduce((total, item) => {
                        return total + item.cancelled_ticket_amount;
                    }, 0);
                    this.manualTickets = this.LaneReportArray.reduce((total, item) => {
                        return total + item.manual_ticket;
                    }, 0);
                    this.manualTicketsAmount = this.LaneReportArray.reduce((total, item) => {
                        return total + item.manual_ticket_amount;
                    }, 0);
                    this.totalTicket = this.LaneReportArray.reduce((total, item) => {
                        return total + item.total_ticket;
                    }, 0);
                    this.totalAmount = this.LaneReportArray.reduce((total, item) => {
                        return total + item.total_amount;
                    }, 0);

                } catch (error) {
                    const alertStore = useAlertStore();
                    alertStore.error(error)
                }
            } else {
                const alertStore = useAlertStore();
                alertStore.error('Please select Toll Plaza, Start Date, and End Date.')
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
                    <p class="text-large_semibold color-Grey_90 cursor-pointer">Lane Report</p>
                </div>
            </div>
            <div class="padding-y_24px padding-x_32px mobile-body">
                <div class="flex gap-x-2.5 gap-y-1.5 flex-wrap items-end">
                    <div class="space-y-8px min-w-[250px]">
                        <Label label="Toll Plaza" />
                        <Select :options="tollArray" @option-selected="getTollPlaza" :value="searchToll"
                            @input="searchTollFun" />
                    </div>
                    <div class="space-y-8px min-w-[250px]">
                        <Label label="Start Date" />
                        <Input type="date" id="Start Date" :value="reportStartDate" @input="handleStartDateInput" />
                    </div>
                    <div class="space-y-8px min-w-[250px]">
                        <Label label="Shirt" />
                        <Select :options="shiftArray" @option-selected="getShift" :value="searchShift"
                            @input="searchShiftFun" />
                    </div>
                    <div class="space-y-8px min-w-[250px]">
                        <Label label="Lane" />
                        <Select :options="tollLaneArray" @option-selected="getLane" :value="searchLane"
                            @input="searchLaneFun" />
                    </div>
                    <button class="bg-[#007BFF] px-3.5 py-2 rounded-md text-white"
                        @click="laneReport()">Generate</button>
                    <button class="bg-[#007BFF] px-3.5 py-2 rounded-md text-white">Reset</button>
                    <button class="bg-[#17A2B8] px-3.5 py-2 rounded-md text-white flex items-center gap-1">
                        <span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 7.5V3.75H18V7.5" stroke="currentcolor" stroke-width="1.5"
                                    stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M18 14.25H6V20.625H18V14.25Z" stroke="currentcolor" stroke-width="1.5"
                                    stroke-linecap="round" stroke-linejoin="round" />
                                <path
                                    d="M6 16.5H2.625V9C2.625 8.175 3.35625 7.5 4.24687 7.5H19.7531C20.6437 7.5 21.375 8.175 21.375 9V16.5H18"
                                    stroke="currentcolor" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M17.625 12C18.2463 12 18.75 11.4963 18.75 10.875C18.75 10.2537 18.2463 9.75 17.625 9.75C17.0037 9.75 16.5 10.2537 16.5 10.875C16.5 11.4963 17.0037 12 17.625 12Z"
                                    fill="currentcolor" />
                            </svg>
                        </span>
                        Print
                    </button>
                    <button @click="addManualData()"
                        class="bg-[#17A2B8] px-3.5 py-2 rounded-md text-white flex items-center gap-1">
                        <span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                                    stroke="currentcolor" stroke-width="1.5" stroke-miterlimit="10" />
                                <path d="M8.25 12H15.75" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path d="M12 8.25V15.75" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </span>
                        Update Manual Details
                    </button>
                    <button class="bg-[#17A2B8] px-3.5 py-2 rounded-md text-white flex items-center gap-1">
                        <span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M3.75 6V18C3.75 18.3978 3.90804 18.7794 4.18934 19.0607C4.47064 19.342 4.85218 19.5 5.25 19.5H20.25C20.4489 19.5 20.6397 19.421 20.7803 19.2803C20.921 19.1397 21 18.9489 21 18.75V8.25C21 8.05109 20.921 7.86032 20.7803 7.71967C20.6397 7.57902 20.4489 7.5 20.25 7.5H5.25C4.85218 7.5 4.47064 7.34196 4.18934 7.06066C3.90804 6.77936 3.75 6.39782 3.75 6ZM3.75 6C3.75 5.60218 3.90804 5.22064 4.18934 4.93934C4.47064 4.65804 4.85218 4.5 5.25 4.5H18"
                                    stroke="currentcolor" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M16.875 14.625C17.4963 14.625 18 14.1213 18 13.5C18 12.8787 17.4963 12.375 16.875 12.375C16.2537 12.375 15.75 12.8787 15.75 13.5C15.75 14.1213 16.2537 14.625 16.875 14.625Z"
                                    fill="currentcolor" />
                            </svg>
                        </span>
                        Add Collection
                    </button>
                </div>
            </div>



            <div class="text-center mt-9" v-if="this.LaneReportArray && this.LaneReportArray.length > 0">
                <div>
                    <p>Daily report - {{ reportStartDate }}</p>
                    <p>Lane - {{ laneSelected }}</p>
                    <p>Shift - {{ shiftSelected }}</p>
                    <p>Toll Plaza: {{ tollSelected }}</p>
                </div>
            </div>

            <div v-if="this.LaneReportArray && this.LaneReportArray.length > 0">
                <div>
                    <div class="w-full border-t border-solid border-Grey_20 mt-6">
                        <div class="flex items-center border-b border-solid border-Grey_20">
                            <div class="w-[12%] py-1.5 px-1.5">
                                <p class="font-bold color-Grey_90 text-base">Journey Type</p>
                            </div>
                            <div class="flex-1  flex items-center w-full">
                                <div class="w-1/4 px-1.5">
                                    <div class="flex items-center justify-between">
                                        <p class="font-bold color-Grey_90 text-base">Vehicle</p>
                                        <p class="font-bold color-Grey_90 text-base">Rate</p>
                                    </div>
                                </div>
                                <div class="w-3/4 flex-1">
                                    <div class="w-full flex items-center py-1.5 border-b border-solid border-Grey_20">
                                        <div class="w-1/4 text-center">
                                            <p class="font-bold color-Grey_90 text-base">Generated(A)</p>
                                        </div>
                                        <div class="w-1/4 text-center">
                                            <p class="font-bold color-Grey_90 text-base">Cancelled(B)</p>
                                        </div>
                                        <div class="w-1/4 text-center">
                                            <p class="font-bold color-Grey_90 text-base">Manual(C)</p>
                                        </div>
                                        <div class="w-1/4 text-center">
                                            <p class="font-bold color-Grey_90 text-base">Total(A - B + C)</p>
                                        </div>
                                    </div>
                                    <div class="w-full flex items-center py-1.5">
                                        <div class="w-1/4 flex-1 flex items-center justify-between px-2.5">
                                            <p class="font-bold color-Grey_90 text-base">Ticket</p>
                                            <p class="font-bold color-Grey_90 text-base">Amt.</p>
                                        </div>
                                        <div class="w-1/4 flex-1 flex items-center justify-between px-2.5">
                                            <p class="font-bold color-Grey_90 text-base">Ticket</p>
                                            <p class="font-bold color-Grey_90 text-base">Amt.</p>
                                        </div>
                                        <div class="w-1/4 flex-1 flex items-center justify-between px-2.5">
                                            <p class="font-bold color-Grey_90 text-base">Ticket</p>
                                            <p class="font-bold color-Grey_90 text-base">Amt.</p>
                                        </div>
                                        <div class="w-1/4 flex-1 flex items-center justify-between px-2.5">
                                            <p class="font-bold color-Grey_90 text-base">Ticket</p>
                                            <p class="font-bold color-Grey_90 text-base">Amt.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-full" v-for="(item, index) in LaneReportArray" :key="index">
                        <div class="flex items-center">
                            <div class="w-[12%] py-1.5 px-1.5">
                                Single
                            </div>
                            <div class="w-[88%] py-1.5 flex items-center border-b border-solid border-Grey_20">
                                <div class="w-1/4 px-1.5">
                                    <div class="flex items-center justify-between">
                                        <p class=" color-Grey_90 text-base">{{ item.vehicle_name }}</p>
                                        <p class=" color-Grey_90 text-base">{{ item.vehicle_actual_price }}</p>
                                    </div>
                                </div>
                                <div class="w-3/4 flex-1">
                                    <div class="w-full flex items-center">
                                        <div class="w-1/4 flex-1 flex items-center justify-between px-2.5">
                                            <p class="color-Grey_90 text-base">{{ item.ticket_count }}</p>
                                            <p class="color-Grey_90 text-base">Rs {{ item.vehicle_price }}</p>
                                        </div>
                                        <div class="w-1/4 flex-1 flex items-center justify-between px-2.5">
                                            <p class="color-Grey_90 text-base">{{ item.cancelled_ticket }}</p>
                                            <p class="color-Grey_90 text-base">Rs {{ item.cancelled_ticket_amount }}</p>
                                        </div>
                                        <div class="w-1/4 flex-1 flex items-center justify-between px-2.5">
                                            <input type="number" v-model="item.manual_ticket"
                                                @change="getManualTicket($event, index, item.veihcle_id)"
                                                class="input-1 max-w-[60px] max-h-[32px] text-right !px-1.5" />
                                            <p class="color-Grey_90 text-base">Rs {{ item.manual_ticket_amount }}</p>
                                        </div>
                                        <div class="w-1/4 flex-1 flex items-center justify-between px-2.5">
                                            <p class="color-Grey_90 text-base">{{ item.total_ticket }}</p>
                                            <p class="color-Grey_90 text-base">Rs{{ item.total_amount }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="w-full">
                        <div class="flex items-center">
                            <div class="w-[12%] py-1.5 px-1.5">
                            </div>
                            <div class="w-[88%] py-1.5 flex items-center border-b border-solid border-Grey_20">
                                <div class="w-1/4 px-1.5 items-center">
                                    <div class="flex justify-center">
                                        <p class="font-bold color-Grey_90 text-base">Total</p>
                                    </div>
                                </div>
                                <div class="w-3/4 flex-1">
                                    <div class="w-full flex items-center">
                                        <div class="w-1/4 flex-1 flex items-center justify-between px-2.5">
                                            <p class="font-bold color-Grey_90 text-base">{{ ticketCounts }}</p>
                                            <p class="font-bold color-Grey_90 text-base">Rs {{ AmountTotal }}</p>
                                        </div>
                                        <div class="w-1/4 flex-1 flex items-center justify-between px-2.5">
                                            <p class="font-bold color-Grey_90 text-base">{{ cancelTicketCounts }}</p>
                                            <p class="font-bold color-Grey_90 text-base">Rs {{ cancelTicketAmountTotal
                                                }}
                                            </p>
                                        </div>
                                        <div class="w-1/4 flex-1 flex items-center justify-between px-2.5">
                                            <p
                                                class="font-bold color-Grey_90 text-base text-right min-w-[60px] max-w-[60px]">
                                                {{ manualTickets }}</p>
                                            <p class="font-bold color-Grey_90 text-base">Rs {{ manualTicketsAmount }}
                                            </p>
                                        </div>
                                        <div class="w-1/4 flex-1 flex items-center justify-between px-2.5">
                                            <p class="font-bold color-Grey_90 text-base ">{{ totalTicket }}</p>
                                            <p class="font-bold color-Grey_90 text-base">Rs {{ totalAmount }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-full mt-4">
                    <div class="flex items-center">
                        <div class="w-full py-1.5 flex items-center border-y border-solid border-Grey_20">
                            <div class="w-[34%] px-1.5 items-center">
                                <div class="flex justify-center">
                                    <p class="font-bold color-Grey_90 text-base">GrandTotal</p>
                                </div>
                            </div>
                            <div class="w-[76%] flex-1">
                                <div class="w-full flex items-center">
                                    <div class="w-1/4 flex-1 flex items-center justify-between px-2.5">
                                        <p class="font-bold color-Grey_90 text-base">{{ ticketCounts }}</p>
                                        <p class="font-bold color-Grey_90 text-base">Rs {{ AmountTotal }}</p>
                                    </div>
                                    <div class="w-1/4 flex-1 flex items-center justify-between px-2.5">
                                        <p class="font-bold color-Grey_90 text-base">{{ cancelTicketCounts }}</p>
                                        <p class="font-bold color-Grey_90 text-base">Rs {{ cancelTicketAmountTotal }}
                                        </p>
                                    </div>
                                    <div class="w-1/4 flex-1 flex items-center justify-between px-2.5">
                                        <p
                                            class="font-bold color-Grey_90 text-base min-w-[60px] max-w-[60px] text-right">
                                            {{ manualTickets }}
                                        </p>
                                        <p class="font-bold color-Grey_90 text-base">Rs {{ manualTicketsAmount }}</p>
                                    </div>
                                    <div class="w-1/4 flex-1 flex items-center justify-between px-2.5">
                                        <p class="font-bold color-Grey_90 text-base">{{ totalTicket }}</p>
                                        <p class="font-bold color-Grey_90 text-base">Rs {{ totalAmount }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <p class="text-center mt-6" v-else>First, select the required field, and after the available data</p>



        </div>
    </Layout>
</template>