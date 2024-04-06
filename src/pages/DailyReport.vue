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
            if (this.reportTollPlaza && this.reportStartDate && this.reportEndDate){

                this.dailyReport();
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

        async dailyReport() {
            var daily_report_data = new FormData();
            daily_report_data.append("toll_plaza", this.reportTollPlaza);
            daily_report_data.append("start_date", this.reportStartDate);
            daily_report_data.append("end_date", this.reportEndDate);

            try {
                const response = await fetchWrapper.post(`${baseUrl}/admin/daily-reports`, daily_report_data);
                this.dailyReportArray = response.data;

            } catch (error) {
                const alertStore = useAlertStore();
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
                    <p class="text-large_semibold color-Grey_90 cursor-pointer">Daily Report</p>
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
            <ul>
                <li v-for="(item, index) in dailyReportArray" :key="index">
                {{ item.vehicle_name }}
                {{ item.vehicle_actual_price }}
                {{ item.vehicle_price }}
                {{ item.ticket_count }}
                {{ item.cancelled_ticket }}
                {{ item.cancelled_ticket_amount }}
                {{ item.total_ticket }}
                {{ item.total_amount }}
                </li>
            </ul>

        </div>
    </Layout>
</template>