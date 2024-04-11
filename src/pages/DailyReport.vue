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
            dailyReportArray: [],
            sort: "asc",
            currentPage: 1,
            searchToll: "",
            reportTollPlaza: "",
            reportStartDate: "",
            reportEndDate: "",
            ticketCounts: "",
            AmountTotal: "",
            cancelTicketCounts: "",
            cancelTicketAmountTotal: "",
            totalTicket: "",
            totalAmount: "",
        }
    },
    created() {
        this.tollData();
    },
    methods: {
        handleStartDateInput(event) {
            this.reportStartDate = event.target.value;
        },

        handleEndDateInput(event) {
            this.reportEndDate = event.target.value;
        },

        searchTollFun(event) {
            this.searchToll = event.target.value.trim();
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

        async dailyReport() {
            if (this.reportTollPlaza && this.reportStartDate && this.reportEndDate) {

                var daily_report_data = new FormData();
                daily_report_data.append("toll_plaza", this.reportTollPlaza);
                daily_report_data.append("start_date", this.reportStartDate);
                daily_report_data.append("end_date", this.reportEndDate);

                try {
                    const response = await fetchWrapper.post(`${baseUrl}/admin/daily-reports`, daily_report_data);
                    this.dailyReportArray = response.data;
                    this.ticketCounts = this.dailyReportArray.reduce((total, item) => {
                        return total + item.ticket_count;
                    }, 0);
                    this.AmountTotal = this.dailyReportArray.reduce((total, item) => {
                        return total + item.vehicle_price;
                    }, 0);
                    this.cancelTicketCounts = this.dailyReportArray.reduce((total, item) => {
                        return total + item.cancelled_ticket;
                    }, 0);
                    this.cancelTicketAmountTotal = this.dailyReportArray.reduce((total, item) => {
                        return total + item.cancelled_ticket_amount;
                    }, 0);
                    this.totalTicket = this.dailyReportArray.reduce((total, item) => {
                        return total + item.total_ticket;
                    }, 0);
                    this.totalAmount = this.dailyReportArray.reduce((total, item) => {
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

        printReport() {
            const printableContent = document.getElementById('printable-content');
            if (printableContent) {
                const printWindow = window.open('', '_blank');
                printWindow.document.write(printableContent.innerHTML);
                printWindow.document.close();
                printWindow.print();
                printWindow.close();
            } else {
                const alertStore = useAlertStore();
                alertStore.error('Printable content not found.');
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
                    <p class="text-large_semibold color-Grey_90 cursor-pointer">Daily Report</p>
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
                        <Label label="End Date" />
                        <Input type="date" placeholder="Ex. 160Rs." id="End Date" :value="reportEndDate"
                            @input="handleEndDateInput" />
                    </div>
                    <div class="flex gap-4 text-center justify-start">
                        <button class="bg-[#007BFF] px-3.5 py-2 rounded-md text-white"
                            @click="dailyReport">Generate</button>
                        <button @click="printReport"
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

            <div v-if="dailyReportArray && dailyReportArray.length > 0" class="mt-9" id="printable-content">
                <div class=" text-center ">
                    <div v-if="dailyReportArray.length > 0">
                        <p>Daily report - {{ reportStartDate }} to {{ reportEndDate }}</p>
                        <p>Toll Plaza: {{ tollSelected }}</p>
                    </div>
                </div>

                <div class="mt-6 border-t border-solid border-Grey_20">

                    <div class="flex items-center gap-2 w-full border-b border-solid border-Grey_20">
                        <div class="w-1/3 flex items-center px-2">
                            <div class="w-1/3">
                                <p class="color-Grey_90 font-bold text-base">Journey Type</p>
                            </div>
                            <div class="w-2/3 flex items-center justify-between gap-1.5">
                                <p class="color-Grey_90 font-bold text-base">Vehicle</p>
                                <p class="color-Grey_90 font-bold text-base">Rate</p>
                            </div>
                        </div>
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
                                <p class="color-Grey_50 line-clamp-1  text-base"> {{ item.vehicle_actual_price }}
                                </p>
                            </div>
                        </div>
                        <div class="w-2/3">
                            <div class="flex items-stretch">
                                <div class="w-1/3 flex items-center justify-between py-1.5 px-6">
                                    <p class="color-Grey_50 line-clamp-1  text-base text-center"> {{ item.ticket_count }}</p>
                                    <p class="color-Grey_50 line-clamp-1  text-base text-center">Rs.{{item.vehicle_price }}</p>
                                </div>
                                <div class="w-1/3 flex items-center justify-between py-1.5 px-6">
                                    <p class="color-Grey_50  line-clamp-1 text-base text-center">{{ item.cancelled_ticket }}</p>
                                    <p class="color-Grey_50  line-clamp-1 text-base text-center">Rs.{{ item.cancelled_ticket_amount }}</p>
                                </div>
                                <div class="w-1/3 flex items-center justify-between py-1.5 px-6">
                                    <p class="color-Grey_50  line-clamp-1 text-base text-center">{{ item.total_ticket }}</p>
                                    <p class="color-Grey_50  line-clamp-1 text-base text-center">Rs.{{ item.total_amount }}</p>
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
                                    <p class="color-Grey_90 font-bold line-clamp-1  text-base text-center">{{ ticketCounts }}</p>
                                    <p class="color-Grey_90 font-bold line-clamp-1  text-base text-center">Rs.{{ AmountTotal }}</p>
                                </div>
                                <div class="w-1/3 flex items-center justify-between py-1.5 px-6">
                                    <p class="color-Grey_90 font-bold  line-clamp-1 text-base text-center">{{ cancelTicketCounts }}</p>
                                    <p class="color-Grey_90 font-bold  line-clamp-1 text-base text-center">Rs.{{ cancelTicketAmountTotal }}</p>
                                </div>
                                <div class="w-1/3 flex items-center justify-between py-1.5 px-6">
                                    <p class="color-Grey_90 font-bold  line-clamp-1 text-base text-center">{{ totalTicket }}</p>
                                    <p class="color-Grey_90 font-bold  line-clamp-1 text-base text-center">Rs.{{ totalAmount }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="border-y border-solid border-Grey_20 w-full mt-6 py-1.5 flex items-center justify-evenly">
                    <p class="color-Grey_90  line-clamp-1 text-base font-bold">Grand Total</p>
                    <p class="color-Grey_90  line-clamp-1 text-base font-bold"> {{ ticketCounts }}</p>
                    <p class="color-Grey_90  line-clamp-1 text-base font-bold">{{ AmountTotal }}</p>
                    <p class="color-Grey_90  line-clamp-1 text-base font-bold">{{ cancelTicketCounts }}</p>
                    <p class="color-Grey_90  line-clamp-1 text-base font-bold">{{ cancelTicketAmountTotal }}</p>
                    <p class="color-Grey_90  line-clamp-1 text-base font-bold">{{ totalTicket }}</p>
                    <p class="color-Grey_90  line-clamp-1 text-base font-bold">{{ totalAmount }}</p>
                </div>
            </div>
            <div v-else>
                <p class="text-center mt-9">First, select the required field, and after the available data</p>
            </div>
        </div>
    </Layout>
</template>
<style scoped>
@media print {
    #printable-content {
        display: none !important;
    }
}
</style>