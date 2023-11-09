<script>

import { useAuthStore, useAlertStore } from '../../stores'
import { fetchWrapper } from '../../helpers/fetch-wrapper'

import axios from 'axios';

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export default {
    props: {
        list: Array
    },
    methods: {
        deleteToll(id) {
            this.$emit('delete_lane', id)
        },
        editToll(id) {
            this.$emit('edit_lane', id)
        },
        async tollData() {
            var toll_data = new FormData();
            toll_data.append("t_id", "");
            toll_data.append("sort", "asc");
            toll_data.append("search", "");
            toll_data.append("page", "1");

        },
    },
}
</script>

<template>
    <li class="list" v-for="(items, index) in list" :key="index">

        <h6 class="text-large_semibold color-Grey_90">{{ items.l_number }}.</h6>

        <div class="space-y-4px">
            <h2 class="text-large_semibold color-Grey_90">{{ items.l_name }}</h2>
            <p class="text-small_regular color-Grey_50">{{ items.l_toll_plaza }}</p>
        </div>

        <div class="options">
            <div class="icon-btn icon-btn_32px  custom-dropdown">
                <img src="../../assets/img/icons/dots-icon.svg">
                <ul class="custom-dropdown-list leftside icon-dropdown">
                    <li class="dropdown-item" @click="editToll(items.l_id)">
                        <div class="dropdown-link">
                            <img src="../../assets/img/icons/edit.svg">
                            <p class="dropdown-link-title"> Edit Lane </p>
                        </div>
                    </li>
                    <li class="dropdown-item" @click="deleteToll(items.l_id)">
                        <div class="dropdown-link">
                            <img src="../../assets/img/icons/trash.svg">
                            <p class="dropdown-link-title required"> Delete Lane </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

    </li>
</template>

<style scoped>
.list {
    width: 100%;
    border: 1px solid #E5E7EB;
    padding: 16px 24px;
    border-radius: 8px;
    display: flex;
    align-items: flex-start;
    gap: 12px;
    cursor: pointer;
    position: relative;
}

.list:hover {
    background-color: var(--Grey-5);
}

.list .options .icon-btn {
    border: 1px solid transparent;
    display: flex;
    align-items: center;
    justify-content: center;
}

.list:hover .options .icon-btn {
    border: 1px solid var(--Grey-20);
    background-color: white;
}

.list .options {
    position: absolute;
    right: 8px;
    top: 8px;
}

.list .options:hover .custom-dropdown-list {
    display: inline-flex;
}

.list .options .custom-dropdown-list {
    top: 104%;
}
</style>