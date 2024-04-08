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
                <div class="grid grid-cols-4 gap-4">
                    <div class="space-y-8px">
                        <Label label="Toll Plaza" />
                        <Select :options="tollArray" @option-selected="getTollPlaza" :value="searchToll"
                            @input="searchTollFun" />
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
                    <div class=" flex gap-4 text-center justify-start mt-7">
                        <button class=" bg-[#007BFF] p-2 rounded-md" @click="dailyReport">Generate</button>
                        <button class=" bg-[#17A2B8] p-2 rounded-md">Print</button>
                    </div>

                </div>
            </div>

            <div class=" text-center mt-9">
                <div v-if="dailyReportArray.length > 0">
                    <p>Daily report - {{ reportStartDate }} to {{ reportEndDate }}</p>
                    <p>Toll Plaza: {{ tollSelected }}</p>
                </div>
                <p v-else>No data available for the selected criteria.</p>
            </div>
            <div class=" mt-6">

                <div class=" grid grid-cols-6 border-y-2 gap-y-2">
                    <th class="">
                        Journey Type
                    </th>

                    <th>
                        Vehicle
                    </th>

                    <th>
                        Rate
                    </th>
                    <div class=" grid grid-cols-2">

                        <th class="col-span-2 border-b-4">
                            Generate(A)
                        </th>
                        <th>
                            Ticket
                        </th>
                        <th>Amount</th>
                    </div>
                    <div class=" grid grid-cols-2">

                        <th class="col-span-2 border-b-4">
                            Cancelled(B)
                        </th>
                        <th>
                            Ticket
                        </th>
                        <th>Amount</th>
                    </div>
                    <div class=" grid grid-cols-2">

                        <th class="col-span-2 border-b-4">
                            Generate(A-B)
                        </th>
                        <th>
                            Ticket
                        </th>
                        <th>Amount</th>
                    </div>

                </div>
                <ul>
                    <li v-for="(item, index) in dailyReportArray" :key="index"
                        class=" grid grid-cols-6 border-y-2 gap-y-2">
                        <td class="">
                            Single
                        </td>

                        <td>
                            {{ item.vehicle_name }}
                        </td>

                        <td>
                            {{ item.vehicle_actual_price }}

                        </td>
                        <div class=" grid grid-cols-2">
                            <td>
                                {{ item.ticket_count }}
                            </td>
                            <td> {{ item.vehicle_price }}
                            </td>
                        </div>
                        <div class=" grid grid-cols-2">

                            <td>
                                {{ item.cancelled_ticket }}

                            </td>
                            <td> {{ item.cancelled_ticket_amount }}
                            </td>
                        </div>
                        <div class=" grid grid-cols-2">

                            <td>
                                {{ item.total_ticket }}

                            </td>
                            <td>{{ item.total_amount }}</td>
                        </div>

                    </li>
                    <div class="">

                        <td class="">
                        </td>

                        <td class="row-span-2">
                            total
                        </td>
                        <div class="">
                            <td>
                                {{ ticketCounts }}
                            </td>
                            <td> {{ AmountTotal }}
                            </td>
                        </div>
                        <div class="">
                            <td>
                                {{ cancelTicketCounts }}
                            </td>
                            <td> {{ cancelTicketAmountTotal }}
                            </td>
                        </div>
                        <div class="">

                            <td>
                                {{ totalTicket }}

                            </td>
                            <td>{{ totalAmount }}</td>
                        </div>
                    </div>
                </ul>
            </div>

        </div>
    </Layout>
</template>