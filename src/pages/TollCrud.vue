<script>

import axios from 'axios';

import Layout from '../components/Layout.vue';
import OverLaye from '../subcomponents/OverLaye.vue';
import SearchBox from '../subcomponents/SearchBox.vue';
import List from '../subcomponents/tollPlaza/List.vue';
import Pagination from '../subcomponents/Pagination.vue';

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export default {
    components: { Layout, SearchBox, List, OverLaye, Pagination },
    data() {
        return {
            list: [],
            searchText: "",
            gridView: true,
            listView: false,
        };
    },
    created() {
        this.tolldata();
    },
    methods: {
        async tolldata() {
            var Toll_data = new FormData();
            Toll_data.append("sort", "dsc");
            Toll_data.append("search", "");
            Toll_data.append("page", 1);
            Toll_data.append("t_id", "");

            try {
                const response = await axios.post(`${baseUrl}/ad/toll-plaza-list`, Toll_data);

                this.list = response.data.data

            } catch (error) {
                console.log(error);
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
                    <p class="text-large_semibold color-Grey_90 cursor-pointer">Toll Plaza Crud</p>
                </div>

                <div
                    class="w-100 display-flex align-center justify-between gap-8px margin-top_16px Md_flex-column Md_align-end">

                    <div class="display-flex align-stretch gap-8px">

                        <button class="btn-regular display-flex align-center gap-8px">
                            <img src="../assets/img/icons/adjustments.svg">
                            Filter</button>
                        <button class="icon-btn icon-btn_32px border border-solid border-Grey_20">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M19.5 13.5H4.5C4.08579 13.5 3.75 13.8358 3.75 14.25V18C3.75 18.4142 4.08579 18.75 4.5 18.75H19.5C19.9142 18.75 20.25 18.4142 20.25 18V14.25C20.25 13.8358 19.9142 13.5 19.5 13.5Z"
                                    stroke="#191C1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path
                                    d="M19.5 5.25H4.5C4.08579 5.25 3.75 5.58579 3.75 6V9.75C3.75 10.1642 4.08579 10.5 4.5 10.5H19.5C19.9142 10.5 20.25 10.1642 20.25 9.75V6C20.25 5.58579 19.9142 5.25 19.5 5.25Z"
                                    stroke="#191C1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                        <button class="icon-btn icon-btn_32px border border-solid border-Grey_20">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M10.5 4.5H4.5V10.5H10.5V4.5Z" stroke="#191C1F" stroke-width="1.5"
                                    stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M19.5 4.5H13.5V10.5H19.5V4.5Z" stroke="#191C1F" stroke-width="1.5"
                                    stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M10.5 13.5H4.5V19.5H10.5V13.5Z" stroke="#191C1F" stroke-width="1.5"
                                    stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M19.5 13.5H13.5V19.5H19.5V13.5Z" stroke="#191C1F" stroke-width="1.5"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>


                    </div>



                    <div class="display-flex align-center gap-8px Md_flex-wrap-reverse Md_align-end Md_justify-end">


                        <SearchBox placeholder="Serch Something" :value="searchText"
                            @input="event => searchText = event.target.value" />


                        <button class="btn-regular display-flex align-center  gap-8px text-no-wrap">
                            <img src="../assets/img/icons/plus-3.svg">
                            New Toll Plaza</button>

                    </div>

                </div>


            </div>

            <div class="padding-y_24px padding-x_32px">

                <ul class="list">

                    <List :list="list" />

                </ul>

            </div>

            <div class="border-t border-solid border-Grey_20">
                <Pagination />
            </div>

        </div>

    </Layout>
    <OverLaye v-if="overalye" />

    

</template>


<style scoped>
.list {
    display: grid;
    gap: 12px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
}

.list li {
    width: 100%;
    border: 1px solid #E5E7EB;
    padding: 16px 32px;
    border-radius: 8px;
}
</style>