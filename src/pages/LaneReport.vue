<script>
import Layout from '../components/Layout.vue';
import { useAlertStore } from '../stores';
import { fetchWrapper } from '../helpers/fetch-wrapper';
import Label from '../subcomponents/Label.vue';
import Select from '../subcomponents/Select.vue';
import Input from '../subcomponents/Input.vue';

export default {
    components: { Layout, Label, Select, Input }
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
                        <Select :options="tollArray" @option-selected="getTollPlaza" :value="searchToll"
                            @input="searchTollFun" />
                    </div>
                    <div class="space-y-8px min-w-[250px]">
                        <Label label="Lane" />
                        <Select :options="tollArray" @option-selected="getTollPlaza" :value="searchToll"
                            @input="searchTollFun" />
                    </div>
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
                    <button class="bg-[#17A2B8] px-3.5 py-2 rounded-md text-white flex items-center gap-1">
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
        </div>
    </Layout>
</template>