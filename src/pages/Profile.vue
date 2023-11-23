<script>
import { useAuthStore, useAlertStore } from '../stores'
import { fetchWrapper } from '../helpers/fetch-wrapper'

import axios from 'axios';

import Layout from '../components/Layout.vue';
import Input from '../subcomponents/Input.vue';
import Label from '../subcomponents/Label.vue';
import Textarea from '../../../vuejsProject/vuedashboard/src/subcomponents/Textarea.vue';

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export default {
    components: { Layout, Input, Label, Textarea, useAuthStore },
    data() {
        return {
            adminData: "",
        }
    },
    created() {
        this.profileData();
    },
    methods: {
        async profileData() {
            var data = new FormData();

            try {
                const response = await fetchWrapper.post(`${baseUrl}/admin/details`, data);

                this.adminData = response.data

            } catch (error) {
                console.log(error);
            }

        },
    },
}
</script>


<template>
    <Layout>

        <div class="w-100 border border-solid border-Grey_20 bg-white rounded-regualr padding-18px">

            <div class="profile-banner" :style="{ backgroundImage: `url(${adminData.profile_pic})` }"></div>
            <div class="profile-details">

                <div class="profile-img">
                    <img :src="adminData.profile_pic">
                </div>

                <ul class="list">

                    <li>
                        <p class="data-title">name</p>
                        <h6 class="data text-capitalize">{{ adminData.user_name }}</h6>
                    </li>

                    <li>
                        <p class="data-title">email</p>
                        <h6 class="data">{{ adminData.user_email }}</h6>
                    </li>

                    <li>
                        <p class="data-title">number</p>
                        <h6 class="data">{{ adminData.user_phone_number }}</h6>
                    </li>

                </ul>

            </div>

        </div>


    </Layout>
</template>

<style scoped>
.profile-banner {
    height: 220px;
    border-radius: 8px;
    overflow: hidden;
    background-size: cover;
}

.profile-details {
    display: flex;
    align-items: flex-start;
    gap: 24px;
    position: relative;
    width: 100%;
    padding: 10px 24px;
}

.profile-img {
    width: 108px;
    height: 108px;
    background-color: white;
    border-radius: 999px;
    padding: 4px;
    margin-top: -3rem;
}

.profile-img img {
    width: 100%;
    height: 100%;
    border-radius: 999px;
    object-fit: cover;
}

.list {
    display: flex;
    align-items: flex-start;
    gap: 4rem;
}

.list li {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.list li .data-title {
    font-size: 14px;
    text-transform: capitalize;
    color: var(--Grey-50);
}

.list li .data {
    font-size: 16px;
    color: var(--Grey-90);
}
</style>