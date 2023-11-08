<script>

import axios from 'axios';

import Layout from '../components/Layout.vue';
import OverLaye from '../subcomponents/OverLaye.vue';
import SearchBox from '../subcomponents/SearchBox.vue';
import List from '../subcomponents/tollPlaza/List.vue';

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export default {
    components: { Layout, SearchBox, List, OverLaye },
    data() {
        return {
            headerLinks: [
                {
                    name: 'Add Toll Plaza',
                    route: '/add-toll_plaza'
                },
            ],
            // list: [
            //     {
            //         id: 1,
            //         name: 'Toll Plaza One',
            //         address: 'nisi porta lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor id eu'
            //     },
            // ],
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
            Toll_data.append("sort", "asc");
            Toll_data.append("search", "");
            Toll_data.append("page", 1);
            Toll_data.append("t_id", "");

            try {
                const response = await axios.post(`${baseUrl}/ad/toll-plaza-list`, Toll_data);

                this.list = response.data

            } catch (error) {
                console.log(error);
            }

        }
    },
}
</script>


<template>
    <Layout :Headlinks="headerLinks">

        <div class="w-full space-y-2 max-w-md">
            <h2 class="text-2xl font-semibold">Toll Plaza Crud</h2>
            <p class="text-base">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi natus distinctio beatae
                accusantium voluptate.
            </p>
        </div>

        <div class="w-full flex justify-between items-center my-6">

            <div class="flex items-center gap-2">

                <button class="w-9 h-9 flex items-center justify-center rounded hover:bg-Theme-color1"
                    @click="gridView = true, listView = false">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M10.5 4.5H4.5V10.5H10.5V4.5Z" stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M19.5 4.5H13.5V10.5H19.5V4.5Z" stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M10.5 13.5H4.5V19.5H10.5V13.5Z" stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M19.5 13.5H13.5V19.5H19.5V13.5Z" stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </button>

                <button class="w-9 h-9 flex items-center justify-center rounded hover:bg-Theme-color1"
                    @click="listView = true, gridView = false">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M19.5 13.5H4.5C4.08579 13.5 3.75 13.8358 3.75 14.25V18C3.75 18.4142 4.08579 18.75 4.5 18.75H19.5C19.9142 18.75 20.25 18.4142 20.25 18V14.25C20.25 13.8358 19.9142 13.5 19.5 13.5Z"
                            stroke="#191C1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path
                            d="M19.5 5.25H4.5C4.08579 5.25 3.75 5.58579 3.75 6V9.75C3.75 10.1642 4.08579 10.5 4.5 10.5H19.5C19.9142 10.5 20.25 10.1642 20.25 9.75V6C20.25 5.58579 19.9142 5.25 19.5 5.25Z"
                            stroke="#191C1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>

            </div>

            <div>
                <SearchBox placeholder="Serch Something" :value="searchText"
                    @input="event => searchText = event.target.value" />
            </div>

        </div>

        <div class="w-full">

            <ul class="w-full grid grid-cols-2 gap-x-2 gap-y-2" :class="{ 'grid-cols-1': listView }">

                <List :list="list" />

            </ul>


        </div>

    </Layout>
    <OverLaye v-if="overalye" />
</template>