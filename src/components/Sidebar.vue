<script>

export default {
    computed: {
        isTollCrudActive() {
            return this.$route.matched.some(route => route.path === '/toll-crud' || route.path === '/add-toll_plaza');
        }
    }
}

</script>

<template>
    <div class="w-full max-w-[250px] h-full">
        <div class="flex flex-col w-full h-full justify-between items-start space-y-2">

            <div class="space-y-12 w-full">

                <!-- <div class="pb-2 border-b border-solid border-white">
                                                                                                                                                                        </div> -->

                <div class="py-4">

                    <ul class="w-full space-y-2">

                        <li class="block w-full">

                            <router-link to="/" class="link" active-class="active_link">

                                <div class="flex space-x-3 items-center">


                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none">
                                        <path
                                            d="M14.25 19.499V14.999C14.25 14.8001 14.171 14.6093 14.0303 14.4686C13.8897 14.328 13.6989 14.249 13.5 14.249H10.5C10.3011 14.249 10.1103 14.328 9.96967 14.4686C9.82902 14.6093 9.75 14.8001 9.75 14.999V19.499C9.75 19.6979 9.67098 19.8887 9.53033 20.0293C9.38968 20.17 9.19891 20.249 9 20.249H4.5C4.30109 20.249 4.11032 20.17 3.96967 20.0293C3.82902 19.8887 3.75 19.6979 3.75 19.499V10.8271C3.75168 10.7233 3.77411 10.6209 3.81597 10.5259C3.85783 10.4309 3.91828 10.3453 3.99375 10.274L11.4937 3.45836C11.632 3.33187 11.8126 3.26172 12 3.26172C12.1874 3.26172 12.368 3.33187 12.5062 3.45836L20.0062 10.274C20.0817 10.3453 20.1422 10.4309 20.184 10.5259C20.2259 10.6209 20.2483 10.7233 20.25 10.8271V19.499C20.25 19.6979 20.171 19.8887 20.0303 20.0293C19.8897 20.17 19.6989 20.249 19.5 20.249H15C14.8011 20.249 14.6103 20.17 14.4697 20.0293C14.329 19.8887 14.25 19.6979 14.25 19.499Z"
                                            stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>

                                    <p class="text-lg">Home</p>

                                </div>

                            </router-link>


                        </li>

                        <li class="block w-full">

                            <router-link to="/toll-crud" class="link" :class="{ active_link: isTollCrudActive }">

                                <div class="flex space-x-3 items-center">


                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none">
                                        <path d="M2.25 9H21.75L12 3L2.25 9Z" stroke="#191C1F" stroke-width="1.5"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M5.25 9V16.5" stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path d="M9.75 9V16.5" stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path d="M14.25 9V16.5" stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path d="M18.75 9V16.5" stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path d="M3 16.5H21" stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path d="M1.5 19.5H22.5" stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>

                                    <p class="text-lg">Toll Plaza Crud</p>

                                </div>

                            </router-link>


                        </li>

                        <li class="block w-full">

                            <router-link to="/" class="link" active-class="active_link">

                                <div class="flex space-x-3 items-center">


                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none">
                                        <path
                                            d="M8.25 15C10.9424 15 13.125 12.8174 13.125 10.125C13.125 7.43261 10.9424 5.25 8.25 5.25C5.55761 5.25 3.375 7.43261 3.375 10.125C3.375 12.8174 5.55761 15 8.25 15Z"
                                            stroke="#191C1F" stroke-width="1.5" stroke-miterlimit="10" />
                                        <path
                                            d="M14.5684 5.42813C14.9993 5.31124 15.4437 5.25136 15.8902 5.25C17.1832 5.25 18.4231 5.76361 19.3374 6.67785C20.2516 7.59209 20.7652 8.83207 20.7652 10.125C20.7652 11.4179 20.2516 12.6579 19.3374 13.5721C18.4231 14.4864 17.1832 15 15.8902 15"
                                            stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path
                                            d="M1.5 18.5066C2.2612 17.4234 3.27191 16.5393 4.44676 15.9289C5.6216 15.3186 6.92608 15 8.25 15C9.57392 15 10.8784 15.3186 12.0532 15.9289C13.2281 16.5393 14.2388 17.4234 15 18.5066"
                                            stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path
                                            d="M15.8906 15C17.2147 14.9992 18.5194 15.3174 19.6944 15.9277C20.8693 16.5381 21.8799 17.4225 22.6406 18.5063"
                                            stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>

                                    <p class="text-lg">User</p>

                                </div>

                            </router-link>


                        </li>

                        <li class="block w-full">

                            <router-link to="/" class="link" active-class="active_link">

                                <div class="flex space-x-3 items-center">


                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none">
                                        <path
                                            d="M16.5 7.50002H20.4938C20.6432 7.49904 20.7894 7.54329 20.9132 7.62695C21.037 7.71061 21.1326 7.82977 21.1875 7.96877L22.5 11.25"
                                            stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path d="M1.5 13.5H16.5" stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path
                                            d="M17.625 20.25C18.8676 20.25 19.875 19.2426 19.875 18C19.875 16.7574 18.8676 15.75 17.625 15.75C16.3824 15.75 15.375 16.7574 15.375 18C15.375 19.2426 16.3824 20.25 17.625 20.25Z"
                                            stroke="#191C1F" stroke-width="1.5" stroke-miterlimit="10" />
                                        <path
                                            d="M6.375 20.25C7.61764 20.25 8.625 19.2426 8.625 18C8.625 16.7574 7.61764 15.75 6.375 15.75C5.13236 15.75 4.125 16.7574 4.125 18C4.125 19.2426 5.13236 20.25 6.375 20.25Z"
                                            stroke="#191C1F" stroke-width="1.5" stroke-miterlimit="10" />
                                        <path d="M15.375 18H8.625" stroke="#191C1F" stroke-width="1.5"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                        <path
                                            d="M4.125 18H2.25C2.05109 18 1.86032 17.921 1.71967 17.7803C1.57902 17.6397 1.5 17.4489 1.5 17.25V6.75C1.5 6.55109 1.57902 6.36032 1.71967 6.21967C1.86032 6.07902 2.05109 6 2.25 6H16.5V16.05"
                                            stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path
                                            d="M16.5 11.25H22.5V17.25C22.5 17.4489 22.421 17.6397 22.2803 17.7803C22.1397 17.921 21.9489 18 21.75 18H19.875"
                                            stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>

                                    <p class="text-lg">Vehicle Type</p>

                                </div>

                            </router-link>


                        </li>

                        <li class="block w-full">

                            <router-link to="/" class="link" active-class="active_link">

                                <div class="flex space-x-3 items-center">


                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none">
                                        <path
                                            d="M21 6.75H3C2.58579 6.75 2.25 7.08579 2.25 7.5V14.25C2.25 14.6642 2.58579 15 3 15H21C21.4142 15 21.75 14.6642 21.75 14.25V7.5C21.75 7.08579 21.4142 6.75 21 6.75Z"
                                            stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path d="M7.875 6.75L16.125 15" stroke="#191C1F" stroke-width="1.5"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M14.625 6.75L21.75 13.875" stroke="#191C1F" stroke-width="1.5"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M2.25 7.875L9.375 15" stroke="#191C1F" stroke-width="1.5"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M18 15V18.75" stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path d="M6 15V18.75" stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>

                                    <p class="text-lg">Lane</p>

                                </div>

                            </router-link>


                        </li>

                        <li class="block w-full">

                            <router-link to="/" class="link" active-class="active_link">

                                <div class="flex space-x-3 items-center">


                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none">
                                        <path
                                            d="M12 12L6.3 7.725C6.20738 7.65464 6.13217 7.56395 6.08016 7.45992C6.02814 7.35589 6.00072 7.24131 6 7.125V3.75C6 3.55109 6.07902 3.36032 6.21967 3.21967C6.36032 3.07902 6.55109 3 6.75 3H17.25C17.4489 3 17.6397 3.07902 17.7803 3.21967C17.921 3.36032 18 3.55109 18 3.75V7.0875C17.9993 7.20381 17.9719 7.31839 17.9198 7.42242C17.8678 7.52645 17.7926 7.61714 17.7 7.6875L12 12Z"
                                            stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path
                                            d="M12 12L6.3 16.275C6.20738 16.3454 6.13217 16.436 6.08016 16.5401C6.02814 16.6441 6.00072 16.7587 6 16.875V20.25C6 20.4489 6.07902 20.6397 6.21967 20.7803C6.36032 20.921 6.55109 21 6.75 21H17.25C17.4489 21 17.6397 20.921 17.7803 20.7803C17.921 20.6397 18 20.4489 18 20.25V16.9125C17.9993 16.7962 17.9719 16.6816 17.9198 16.5776C17.8678 16.4735 17.7926 16.3829 17.7 16.3125L12 12Z"
                                            stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path d="M7.00293 8.25H16.9592" stroke="#191C1F" stroke-width="1.5"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M12 15.75V12" stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>

                                    <p class="text-lg">Shift</p>

                                </div>

                            </router-link>


                        </li>


                    </ul>

                </div>


            </div>

        </div>
    </div>
</template>


<style scoped>
.link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 12px 24px;
    border-radius: 999px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    transition: background-color 0.2s;
    color: #333333;
    font-weight: 600;
}

.link svg path {
    stroke: #212121;
}

.link:hover {
    background-color: white;
    color: black;
}

.link:hover svg {
    widows: 24px;
    height: 24px;
}

.link:hover svg path {
    stroke: #F2994A;
}

.link.active_link {
    background-color: white;
    color: black;
    font-weight: 600;
}


.link.active_link svg path {
    stroke: #F2994A;
}
</style>