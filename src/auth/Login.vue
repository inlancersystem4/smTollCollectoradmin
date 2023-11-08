<script>

import axios from 'axios';

const baseUrl = `${import.meta.env.VITE_API_URL}`;


export default {
    data() {
        return {
            typePassword: true,
            email: "",
            password: "",
        }
    },

    methods: {
        async login() {
            var login_data = new FormData();
            login_data.append("user_email", this.email);
            login_data.append("user_password", this.password);

            try {
                const loginUser = await axios.post(`${baseUrl}/ad/admin-login`, login_data);
                console.log(loginUser)

            } catch (error) {
                console.log(error);
            }

        },

    },
}

</script>

<template>
    <main class="w-full h-[100dvh] overflow-hidden relative">

        <div class="w-full absolute -left-16 -bottom-2">
            <img src="../assets/img/oie_ZP9z5pOwfHfJ.png">
        </div>

        <div class="w-full max-w-7xl h-full mx-auto p-2 relative z-10">

            <div class="w-full h-full flex items-center justify-center">

                <div class="w-full max-w-md rounded-lg p-4 bg-Theme-color1 ml-auto space-y-6">

                    <div class="text-center space-y-1">
                        <h2 class="text-2xl font-semibold">Log in</h2>
                        <p class="text-base">Lorem ipsum dolor sit.</p>
                    </div>

                    <form @submit.prevent="login()" class="space-y-6">

                        <div class="space-y-4">
                            <div class="space-y-1">
                                <label for="" class="block cursor-pointer text-base">Email</label>
                                <input type="email" v-model="email"
                                    class="block w-full outline-0 border border-solid border-transparent py-2 px-2 rounded-md">
                            </div>

                            <div class="space-y-1">
                                <label for="" class="block cursor-pointer text-base">Password</label>
                                <div class="rounded-md overflow-hidden w-full flex items-stretch bg-white">
                                    <input :type="typePassword ? 'password' : 'text'" v-model="password"
                                        class="block w-full outline-0 border border-solid border-transparent py-2 px-2">
                                    <div class="px-2 cursor-pointer flex items-center justify-center">
                                        <span v-if="typePassword" @click="typePassword = false">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                                                viewBox="0 0 24 24" fill="none">
                                                <path
                                                    d="M12 4.25C4.5 4.25 1.5 12 1.5 12C1.5 12 4.5 19.75 12 19.75C19.5 19.75 22.5 12 22.5 12C22.5 12 19.5 4.25 12 4.25Z"
                                                    stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                                    stroke-linejoin="round" />
                                                <path
                                                    d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                                                    stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                                    stroke-linejoin="round" />
                                            </svg>
                                        </span>
                                        <span v-if="!typePassword" @click="typePassword = true">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                                                viewBox="0 0 24 24" fill="none">
                                                <path d="M4.5 3.75L19.5 20.25" stroke="#191C1F" stroke-width="1.5"
                                                    stroke-linecap="round" stroke-linejoin="round" />
                                                <path
                                                    d="M14.522 14.7766C13.8338 15.407 12.9334 15.7551 12.0001 15.7516C11.2432 15.7515 10.5041 15.5224 9.87984 15.0944C9.25561 14.6663 8.77551 14.0594 8.50265 13.3535C8.22979 12.6475 8.17695 11.8754 8.35107 11.1389C8.52519 10.4023 8.91812 9.73564 9.47821 9.22656"
                                                    stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                                    stroke-linejoin="round" />
                                                <path
                                                    d="M6.9375 6.42969C3.1125 8.36094 1.5 11.9984 1.5 11.9984C1.5 11.9984 4.5 18.7484 12 18.7484C13.7574 18.7628 15.4929 18.3578 17.0625 17.5672"
                                                    stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                                    stroke-linejoin="round" />
                                                <path
                                                    d="M19.5564 15.8531C21.6002 14.025 22.5002 12 22.5002 12C22.5002 12 19.5002 5.25002 12.0002 5.25002C11.35 5.24874 10.7008 5.30205 10.0596 5.4094"
                                                    stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                                    stroke-linejoin="round" />
                                                <path
                                                    d="M12.7031 8.31641C13.5006 8.46751 14.2273 8.8739 14.7735 9.47426C15.3198 10.0746 15.6559 10.8364 15.7313 11.6445"
                                                    stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                                    stroke-linejoin="round" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            class="w-full bg-Theme-color2 rounded-md py-2 px-2 text-center text-Theme-color1 text-lg border border-transparent border-solid">
                            Log In
                        </button>

                    </form>

                </div>

            </div>

        </div>

    </main>
</template>