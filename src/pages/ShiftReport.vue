<script>
import Layout from '../components/Layout.vue';
import { useAuthStore, useAlertStore } from '../stores';
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
            total_ticket_count: "",
            total_vehicle_price: "",
            totalOfAmount: 0,
            totalOfTickets: 0,
        }
    },
    created() {
        this.tollData();
        this.shiftData();
        const authStore = useAuthStore();
        const title = "Shift Report | Smtoll"
        const description = "this is description for Shift Report."
        authStore.chnageTitle(title, description)
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

        calculateTotals(data) {
            const vehicleTotals = {};

            data.lane_reports.forEach(laneReport => {
                const { vehicle_reports } = laneReport;

                vehicle_reports.forEach(vehicleReport => {
                    const { vehicle_name, vehicle_price, ticket_count } = vehicleReport;

                    if (!vehicleTotals[vehicle_name]) {
                        vehicleTotals[vehicle_name] = {
                            total_vehicle_price: 0,
                            total_ticket_count: 0
                        };
                    }

                    vehicleTotals[vehicle_name].total_vehicle_price += vehicle_price;
                    vehicleTotals[vehicle_name].total_ticket_count += ticket_count;
                });
            });
            return vehicleTotals;
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
                    if (this.shiftReportArray && this.shiftReportArray.lane_reports.length > 0) {
                        const vehicleTotals = this.calculateTotals(this.shiftReportArray);
                        this.vehicleTotalsArray = Object.keys(vehicleTotals).map(vehicle_name => ({
                            vehicle_name,
                            total_vehicle_price: vehicleTotals[vehicle_name].total_vehicle_price,
                            total_ticket_count: vehicleTotals[vehicle_name].total_ticket_count
                        }));

                        this.totalOfAmount = 0;
                        this.totalOfTickets = 0;

                        this.shiftReportArray.lane_reports.forEach(laneReport => {
                            this.totalOfAmount += laneReport.total_amount;
                            this.totalOfTickets += laneReport.total_tickets;
                        });
                    } else {
                        const alertStore = useAlertStore();
                        // alertStore.error("This Selected Toll And Shift Have Data No Found.")
                        alertStore.error(response.message);
                    }
                } catch (error) {
                    const alertStore = useAlertStore();
                    alertStore.error(error)
                }
            } else {
                const alertStore = useAlertStore();
                alertStore.error('Please select Toll Plaza, Start Date, and Shift Select After Show Records.')
            }
        },

        printdiv(elem) {
            if (this.reportTollPlaza && this.reportStartDate && this.reportShift) {
                var header_str = '<html><head><title>' + document.title + '</title></head><body>';
                var footer_str = '</body></html>';
                var new_str = document.getElementById(elem).innerHTML;
                var old_str = document.body.innerHTML;
                document.body.innerHTML = header_str + new_str + footer_str;
                window.print();
                document.body.innerHTML = old_str;
                // return false;
                setTimeout(function() {
                    location.reload();
                })
            } else {
                const alertStore = useAlertStore();
                alertStore.error('Please select Toll Plaza, Start Date, and Shift Select After Print.')
            }
        },

        formatDate(timestamp) {
            const date = new Date(timestamp);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const pad = (num) => (num < 10 ? '0' : '') + num;
            return `${pad(day)}-${pad(month)}-${year}`;
        }
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
                        <button @click="printdiv('printable-content')"
                            class="bg-[#17A2B8] px-3.5 py-2 rounded-md text-white flex items-center gap-1">
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
            <div id="printable-content" v-if="shiftReportArray.vehicle && shiftReportArray.vehicle.length > 0">
                <div class="text-center mt-9">
                    <div>
                        <p>Daily report - {{ formatDate(reportStartDate) }}</p>
                        <p>Shift - {{ shiftSelected }}</p>
                        <p>Toll Plaza: {{ tollSelected }}</p>
                    </div>
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

                <div v-if="shiftReportArray.lane_reports.length > 0">
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
                                <div class="w-[87%] flex border-b flex-1 border-solid  border-Grey_20"
                                    v-for="(totalData, index) in vehicleTotalsArray" :key="index">
                                    <div class="flex-1">
                                        <div class="flex items-center py-1.5 px-6 justify-between gap-6">
                                            <p class="color-Grey_90 text-base font-bold">{{ totalData.total_ticket_count
                                                }}
                                            </p>
                                            <p class="color-Grey_90 text-base font-bold">{{
                                                totalData.total_vehicle_price }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="w-[13%] flex border-b flex-1 border-solid border-Grey_20">
                                    <div class="flex-1">
                                        <div class="flex items-center py-1.5 px-6 justify-between gap-6">
                                            <p class="color-Grey_90 text-base font-bold">{{ totalOfTickets }}</p>
                                            <p class="color-Grey_90 text-base font-bold"> {{ totalOfAmount }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="mt-6 border-t border-solid border-Grey_20 flex items-end">
                        <div class="w-[12%] py-1.5 px-1.5 border-b border-solid border-Grey_20">
                            <p class="color-Grey_90 font-bold text-base">Grand Total</p>
                        </div>
                        <div class="w-[88%] flex-1 flex  items-end">
                            <div class=" w-full flex-1 flex items-end">
                                <div class="w-[13%] py-1.5 px-1.5 border-b border-solid border-Grey_20">
                                </div>
                                <div class="w-[75%] flex border-b flex-1 border-solid  border-Grey_20"
                                    v-for="(totalData, index) in vehicleTotalsArray" :key="index">
                                    <div class="flex-1">
                                        <div class="flex items-center py-1.5 px-6 justify-between gap-6">
                                            <p class="color-Grey_90 text-base font-bold">{{ totalData.total_ticket_count
                                                }}
                                            </p>
                                            <p class="color-Grey_90 text-base font-bold">{{
                                                totalData.total_vehicle_price }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="w-[13%] flex border-b flex-1 border-solid border-Grey_20">
                                    <div class="flex-1">
                                        <div class="flex items-center py-1.5 px-6 justify-between gap-6">
                                            <p class="color-Grey_90 text-base font-bold">{{ totalOfTickets }}</p>
                                            <p class="color-Grey_90 text-base font-bold"> {{ totalOfAmount }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <p class="text-center mt-9">This Selected Date Has no Record Found.</p>
                </div>
            </div>
            <div v-else>
                <p class="text-center mt-9">First, select the required field, and after the available data</p>
            </div>

        </div>
    </Layout>
</template>