<script>
import Layout from '../components/Layout.vue';
import { useAlertStore } from '../stores';
import { fetchWrapper } from '../helpers/fetch-wrapper';

import Label from '../subcomponents/Label.vue';
import Select from '../subcomponents/Select.vue';
import Input from '../subcomponents/Input.vue';

const baseUrl = `${import.meta.env.VITE_API_URL}`;



export default {
    components: {
        Layout,
        Label,
        Select,
        Input
    },
    data() {
        return {
            tollArray: [],
            shiftArray: [],
            shiftReportArray: [],
            sort: "asc",
            currentPage: 1,
            searchToll: "",
            reportTollPlaza: "",
            tollSelected: "",
            reportStartDate: "",
            searchShift: "",
            shiftSelected: "",
            reportShift: "",
        }
    },
    created() {
        this.tollData();
        this.shiftData();
    },
    methods: {
        handleStartDateInput(event) {
            this.reportStartDate = event.target.value;
        },

        searchTollFun(event) {
            this.searchToll = event.target.value.trim();
        },

        searchShiftFun(event) {
            this.searchShift = event.target.value.trim();
            this.shiftData();
        },

        getShift(option) {
            if (option) {
                this.reportShift = option.s_id
            } else {
                this.reportShift = ""
            }
            this.shiftSelected = option.s_name
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

        async shiftReport() {
            if (this.reportTollPlaza && this.reportStartDate && this.reportShift) {

                var shift_report_data = new FormData();
                shift_report_data.append("toll_plaza", this.reportTollPlaza);
                shift_report_data.append("start_date", this.reportStartDate);
                shift_report_data.append("shift", this.reportShift);

                try {
                    const response = await fetchWrapper.post(`${baseUrl}/admin/shift-report`, shift_report_data);
                    this.shiftReportArray = response.data;

                } catch (error) {
                    const alertStore = useAlertStore();
                    alertStore.error(error)
                }
            } else {
                const alertStore = useAlertStore();
                alertStore.error('Please select Toll Plaza, Start Date, and End Date.')
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
                    <p class="text-large_semibold color-Grey_90 cursor-pointer">Shift Report</p>
                </div>
            </div>
            <div class="padding-y_24px padding-x_32px mobile-body">
                <div class="flex gap-x-4 gap-y-2 flex-wrap items-end">
                    <div class="space-y-8px min-w-[250px]">
                        <Label label="Toll Plaza" />
                        <Select :options="tollArray" @option-selected="getTollPlaza" :value="searchToll"
                            @input="searchTollFun" />
                    </div>
                    <div class="space-y-8px min-w-[250px]">
                        <Label label="Start Date" />
                        <Input type="date" placeholder="Ex. 160Rs." id="Start Date" :value="reportStartDate"
                            @input="handleStartDateInput" />
                    </div>
                    <div class="space-y-8px min-w-[250px]">
                        <Label label="Shift" />
                        <Select :options="shiftArray" @option-selected="getShift" :value="searchShift"
                            @input="searchShiftFun" />
                    </div>
                    <div class="flex gap-4 text-center justify-start">
                        <button class="bg-[#007BFF] px-3.5 py-2 rounded-md text-white"
                            @click="shiftReport">Generate</button>
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
                    </div>
                </div>
            </div>
            <div class=" text-center mt-9">
                <div v-if="shiftReportArray.length > 0">
                    <p>Daily report - {{ reportStartDate }}</p>
                    <p>Shift - {{ shiftSelected }}</p>
                    <p>Toll Plaza: {{ tollSelected }}</p>
                </div>
                <p v-else>No data available for the selected criteria.</p>
            </div>


            <div class="mt-6 border-t border-solid border-Grey_20 flex items-end">
                <div class="w-[12%] py-1.5 px-1.5 border-b border-solid border-Grey_20">
                    <p class="color-Grey_90 font-bold text-base">Journey Type</p>
                </div>
                <div class="w-[88%] flex-1 flex  items-end">
                    <div class=" w-full flex-1 flex items-end">
                        <div class="w-[13%] py-1.5 px-1.5 border-b border-solid border-Grey_20">
                            <p class="color-Grey_90 font-bold text-base">Lane Name</p>
                        </div>
                        <div class="w-[75%] flex border-b flex-1 border-solid  border-Grey_20"
                            v-for="(item, index) in shiftReportArray.vehicle" :key="index">
                            <div class="flex-1">
                                <p class="color-Grey_90 py-1.5 px-6 font-bold text-center text-base line-clamp-1">
                                    {{ item.vehicle_name }}</p>
                                <div
                                    class="flex items-center py-1.5 px-6 justify-between gap-6 border-t border-solid border-Grey_20">
                                    <p class="color-Grey_90 font-bold text-base">#</p>
                                    <p class="color-Grey_90 font-bold text-base">Amt</p>
                                </div>
                            </div>
                        </div>
                        <div class="w-[13%] flex border-b flex-1 border-solid border-Grey_20">
                            <div class="flex-1">
                                <p class="color-Grey_90 py-1.5 px-6 font-bold text-center text-base">
                                    Total
                                </p>
                                <div
                                    class="flex items-center py-1.5 px-6 justify-between gap-6 border-t border-solid border-Grey_20">
                                    <p class="color-Grey_90 font-bold text-base">#</p>
                                    <p class="color-Grey_90 font-bold text-base">Amt</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex items-end" v-for="(item, index) in shiftReportArray.lane_reports" :key="index">
                <div class="w-[12%] py-1.5 px-1.5"></div>
                <div class="w-[88%] flex-1 flex  items-end">
                    <div class="w-full flex-1 flex items-end">
                        <div class="w-[13%] py-1.5 px-1.5 border-b border-solid border-Grey_20">
                            <p class="color-Grey_90 text-base">{{ item.lane_name }}</p>
                        </div>
                        <div class="w-[87%] flex border-b flex-1 border-solid  border-Grey_20"
                            v-for="(vehicledata, vehicleIndex) in item.vehicle_reports" :key="vehicleIndex">
                            <div class="flex-1">
                                <div class="flex items-center py-1.5 px-6 justify-between gap-6">
                                    <p class="color-Grey_90 text-base">{{ vehicledata.ticket_count }}</p>
                                    <p class="color-Grey_90 text-base">{{ vehicledata.vehicle_price }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="w-[13%] flex border-b flex-1 border-solid border-Grey_20">
                            <div class="flex-1">
                                <div class="flex items-center py-1.5 px-6 justify-between gap-6">
                                    <p class="color-Grey_90 text-base font-bold"> {{ item.total_tickets }}</p>
                                    <p class="color-Grey_90 text-base font-bold">{{ item.total_amount }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex items-end">
                <div class="w-[12%] py-1.5 px-1.5 border-b border-solid border-Gray-200"></div>
                <div class="w-[88%] flex-1 flex  items-end">
                    <div class="w-full flex-1 flex items-end">
                        <div class="w-[13%] py-1.5 px-1.5 border-b border-solid border-Grey_20">
                            <p class="color-Grey_90 text-base font-bold">Total</p>
                        </div>
                        <div class="w-[87%] flex border-b flex-1 border-solid  border-Grey_20">
                            <div class="flex-1">
                                <div class="flex items-center py-1.5 px-6 justify-between gap-6">
                                    <p class="color-Grey_90 text-base"></p>
                                    <p class="color-Grey_90 text-base"></p>
                                </div>
                            </div>
                        </div>
                        <div class="w-[13%] flex border-b flex-1 border-solid border-Grey_20">
                            <div class="flex-1">
                                <div class="flex items-center py-1.5 px-6 justify-between gap-6">
                                    <p class="color-Grey_90 text-base font-bold"> </p>
                                    <p class="color-Grey_90 text-base font-bold"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- <div class="mt-6 border-t border-solid border-Grey_20">

                <div v-for="(item, index) in shiftReportArray" :key="index"
                    class="flex items-center gap-2 w-full border-b border-solid border-Grey_20">
                    <div class="w-1/3 flex items-center px-2">
                        <div class="w-1/3">
                            <p class="color-Grey_90 font-bold text-base">Journey Type</p>
                        </div>
                        <div class="w-2/3 flex items-center justify-between gap-1.5">
                            <p class="color-Grey_90 font-bold text-base">Lane Name</p>
                        </div>
                    </div>
                    {{ item }}
                    <div class="w-2/3 flex  flex-col items-stretch">
                        <div class="flex items-stretch">
                            <div class="w-1/3 py-1.5">
                                <p class="color-Grey_90 font-bold text-base text-center">Generate(A)</p>
                            </div>
                            <div class="w-1/3 py-1.5">
                                <p class="color-Grey_90 font-bold text-base text-center">Generate(B)</p>
                            </div>
                            <div class="w-1/3 py-1.5">
                                <p class="color-Grey_90 font-bold text-base text-center">Total(A - B)</p>
                            </div>
                        </div>
                        <div class="border-t border-solid border-Grey_20 flex items-stretch">
                            <div class="w-1/3 flex items-center justify-between py-1.5 px-6">
                                <p class="color-Grey_90 font-bold text-base text-center">Ticket</p>
                                <p class="color-Grey_90 font-bold text-base text-center">Amount</p>
                            </div>
                            <div class="w-1/3 flex items-center justify-between py-1.5 px-6">
                                <p class="color-Grey_90 font-bold text-base text-center">Ticket</p>
                                <p class="color-Grey_90 font-bold text-base text-center">Amount</p>
                            </div>
                            <div class="w-1/3 flex items-center justify-between py-1.5 px-6">
                                <p class="color-Grey_90 font-bold text-base text-center">Ticket</p>
                                <p class="color-Grey_90 font-bold text-base text-center">Amount</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex items-center gap-2 w-full border-b border-solid border-Grey_20"
                    v-for="(item, index) in dailyReportArray" :key="index">
                    <div class="w-1/3 flex items-center px-2">
                        <div class="w-1/3">
                            <p class="color-Grey_50  text-base">Single</p>
                        </div>
                        <div class="w-2/3 flex items-center justify-between gap-1.5">
                            <p class="color-Grey_50 line-clamp-1 text-base"> {{ item.vehicle_name }}</p>
                            <p class="color-Grey_50 line-clamp-1  text-base"> {{ item.vehicle_actual_price }}</p>
                        </div>
                    </div>
                    <div class="w-2/3">
                        <div class="flex items-stretch">
                            <div class="w-1/3 flex items-center justify-between py-1.5 px-6">
                                <p class="color-Grey_50 line-clamp-1  text-base text-center"> {{ item.ticket_count }}
                                </p>
                                <p class="color-Grey_50 line-clamp-1  text-base text-center">Rs.{{ item.vehicle_price }}
                                </p>
                            </div>
                            <div class="w-1/3 flex items-center justify-between py-1.5 px-6">
                                <p class="color-Grey_50  line-clamp-1 text-base text-center"> {{ item.cancelled_ticket
                                    }}
                                </p>
                                <p class="color-Grey_50  line-clamp-1 text-base text-center">Rs.{{
                                    item.cancelled_ticket_amount
                                }}</p>
                            </div>
                            <div class="w-1/3 flex items-center justify-between py-1.5 px-6">
                                <p class="color-Grey_50  line-clamp-1 text-base text-center">{{ item.total_ticket }}</p>
                                <p class="color-Grey_50  line-clamp-1 text-base text-center">Rs.{{ item.total_amount }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex items-center gap-2 w-full border-b border-solid border-Grey_20">
                    <div class="w-1/3 flex items-center px-2">
                        <div class="w-1/3">
                        </div>
                        <div class="w-2/3 flex items-center justify-center gap-1.5">
                            <p class="color-Grey_90 line-clamp-1 font-bold text-base"> Total</p>
                        </div>
                    </div>
                    <div class="w-2/3">
                        <div class="flex items-stretch">
                            <div class="w-1/3 flex items-center justify-between py-1.5 px-6">
                                <p class="color-Grey_90 font-bold line-clamp-1  text-base text-center">
                                    {{ ticketCounts }}
                                </p>
                                <p class="color-Grey_90 font-bold line-clamp-1  text-base text-center">
                                    Rs.{{ AmountTotal }}
                                </p>
                            </div>
                            <div class="w-1/3 flex items-center justify-between py-1.5 px-6">
                                <p class="color-Grey_90 font-bold  line-clamp-1 text-base text-center">
                                    {{ cancelTicketCounts }}
                                </p>
                                <p class="color-Grey_90 font-bold  line-clamp-1 text-base text-center">
                                    Rs.{{ cancelTicketAmountTotal }}
                                </p>
                            </div>
                            <div class="w-1/3 flex items-center justify-between py-1.5 px-6">
                                <p class="color-Grey_90 font-bold  line-clamp-1 text-base text-center">
                                    {{ totalTicket }}
                                </p>
                                <p class="color-Grey_90 font-bold  line-clamp-1 text-base text-center">
                                    Rs.{{ totalAmount }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div> -->
        </div>
    </Layout>
</template>