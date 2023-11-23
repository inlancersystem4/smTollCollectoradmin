<script>

export default {
    computed: {
        isTollCrudActive() {
            return this.$route.matched.some(route => route.path === '/toll-crud' || route.path === '/add-toll_plaza');
        },
        islaneCrudActive() {
            return this.$route.matched.some(route => route.path === '/lane-crud');
        },
        isvehicleCrudActive() {
            return this.$route.matched.some(route => route.path === '/vehicle-crud');
        },
        isshiftCrudActive() {
            return this.$route.matched.some(route => route.path === '/shift-crud');
        },
        isuserCrudActive() {
            return this.$route.matched.some(route => route.path === '/user-crud');
        },
        isReceiptsCrudActive() {
            return this.$route.matched.some(route => route.path === '/receipt-crud');
        }
    }
}

</script>

<template>
    <aside class="main-sidebar">

        <div class="sidebar-content">

            <div class="user-details">
                <p class="user-owernship">Store</p>
                <h5 class="user-name">Tekla Fabrics</h5>
            </div>


            <div class="sidebar-main-content">


                <ul class="main-pages-list">

                    <li class="list-items">
                        <router-link to="/" class="list-link" active-class="link_active">
                            <div class="link-items">
                                <img src="../assets/img/icons/search.svg" class="img-not-selected">
                                <p class="link-title">Home</p>
                            </div>
                        </router-link>
                    </li>

                    <li class="list-items">
                        <router-link to="/user-crud" class="list-link" :class="{ link_active: isuserCrudActive }">
                            <div class="link-items">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none">
                                    <path
                                        d="M8.25 15C10.9424 15 13.125 12.8174 13.125 10.125C13.125 7.43261 10.9424 5.25 8.25 5.25C5.55761 5.25 3.375 7.43261 3.375 10.125C3.375 12.8174 5.55761 15 8.25 15Z"
                                        stroke="#6B7280" stroke-width="1.5" stroke-miterlimit="10" />
                                    <path
                                        d="M14.5684 5.42813C14.9993 5.31124 15.4437 5.25136 15.8902 5.25C17.1832 5.25 18.4231 5.76361 19.3374 6.67785C20.2516 7.59209 20.7652 8.83207 20.7652 10.125C20.7652 11.4179 20.2516 12.6579 19.3374 13.5721C18.4231 14.4864 17.1832 15 15.8902 15"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M1.5 18.5066C2.2612 17.4234 3.27191 16.5393 4.44676 15.9289C5.6216 15.3186 6.92608 15 8.25 15C9.57392 15 10.8784 15.3186 12.0532 15.9289C13.2281 16.5393 14.2388 17.4234 15 18.5066"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M15.8906 15C17.2147 14.9992 18.5194 15.3174 19.6944 15.9277C20.8693 16.5381 21.8799 17.4225 22.6406 18.5063"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                                <p class="link-title">Users</p>
                            </div>
                        </router-link>
                    </li>

                    <li class="list-items">
                        <router-link to="/toll-crud" class="list-link" :class="{ link_active: isTollCrudActive }">
                            <div class="link-items">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none">
                                    <path d="M2.25 9H21.75L12 3L2.25 9Z" stroke="#6B7280" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M5.25 9V16.5" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M9.75 9V16.5" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M14.25 9V16.5" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M18.75 9V16.5" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M3 16.5H21" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M1.5 19.5H22.5" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                                <p class="link-title">Toll Plaza</p>
                            </div>
                        </router-link>
                    </li>

                    <li class="list-items">
                        <router-link to="/lane-crud" class="list-link" :class="{ link_active: islaneCrudActive }">
                            <div class="link-items">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none">
                                    <path
                                        d="M21 6.75H3C2.58579 6.75 2.25 7.08579 2.25 7.5V14.25C2.25 14.6642 2.58579 15 3 15H21C21.4142 15 21.75 14.6642 21.75 14.25V7.5C21.75 7.08579 21.4142 6.75 21 6.75Z"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M7.875 6.75L16.125 15" stroke="#6B7280" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M14.625 6.75L21.75 13.875" stroke="#6B7280" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M2.25 7.875L9.375 15" stroke="#6B7280" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M18 15V18.75" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M6 15V18.75" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                                <p class="link-title">Lane</p>
                            </div>
                        </router-link>
                    </li>

                    <li class="list-items">
                        <router-link to="/vehicle-crud" class="list-link" :class="{ link_active: isvehicleCrudActive }">
                            <div class="link-items">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none">
                                    <path d="M1.5 11.25H22.5" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M21 17.25V19.5C21 19.6989 20.921 19.8897 20.7803 20.0303C20.6397 20.171 20.4489 20.25 20.25 20.25H18C17.8011 20.25 17.6103 20.171 17.4697 20.0303C17.329 19.8897 17.25 19.6989 17.25 19.5V17.25"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M6.75 17.25V19.5C6.75 19.6989 6.67098 19.8897 6.53033 20.0303C6.38968 20.171 6.19891 20.25 6 20.25H3.75C3.55109 20.25 3.36032 20.171 3.21967 20.0303C3.07902 19.8897 3 19.6989 3 19.5V17.25"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M6 14.25H7.5" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M16.5 14.25H18" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M21 11.25L18.1969 4.95C18.1387 4.81672 18.043 4.70322 17.9215 4.62333C17.8 4.54343 17.6579 4.50058 17.5125 4.5H6.4875C6.34208 4.50058 6.19997 4.54343 6.07846 4.62333C5.95695 4.70322 5.86129 4.81672 5.80313 4.95L3 11.25V17.25H21V11.25Z"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                                <p class="link-title">Vehicle</p>
                            </div>
                        </router-link>
                    </li>

                    <li class="list-items">
                        <router-link to="/shift-crud" class="list-link" :class="{ link_active: isshiftCrudActive }">
                            <div class="link-items">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none">
                                    <path
                                        d="M12 12L6.3 7.725C6.20738 7.65464 6.13217 7.56395 6.08016 7.45992C6.02814 7.35589 6.00072 7.24131 6 7.125V3.75C6 3.55109 6.07902 3.36032 6.21967 3.21967C6.36032 3.07902 6.55109 3 6.75 3H17.25C17.4489 3 17.6397 3.07902 17.7803 3.21967C17.921 3.36032 18 3.55109 18 3.75V7.0875C17.9993 7.20381 17.9719 7.31839 17.9198 7.42242C17.8678 7.52645 17.7926 7.61714 17.7 7.6875L12 12Z"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M12 12L6.3 16.275C6.20738 16.3454 6.13217 16.436 6.08016 16.5401C6.02814 16.6441 6.00072 16.7587 6 16.875V20.25C6 20.4489 6.07902 20.6397 6.21967 20.7803C6.36032 20.921 6.55109 21 6.75 21H17.25C17.4489 21 17.6397 20.921 17.7803 20.7803C17.921 20.6397 18 20.4489 18 20.25V16.9125C17.9993 16.7962 17.9719 16.6816 17.9198 16.5776C17.8678 16.4735 17.7926 16.3829 17.7 16.3125L12 12Z"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M7.00293 8.25H16.9592" stroke="#6B7280" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M12 15.75V12" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                                <p class="link-title">Shirt</p>
                            </div>
                        </router-link>
                    </li>


                    <li class="list-items">
                        <router-link to="/receipt-crud" class="list-link" :class="{ link_active: isReceiptsCrudActive }">
                            <div class="link-items">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none">
                                    <path
                                        d="M3 19.5V5.25C3 5.05109 3.07902 4.86032 3.21967 4.71967C3.36032 4.57902 3.55109 4.5 3.75 4.5H20.25C20.4489 4.5 20.6397 4.57902 20.7803 4.71967C20.921 4.86032 21 5.05109 21 5.25V19.5L18 18L15 19.5L12 18L9 19.5L6 18L3 19.5Z"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M7.125 9.75H16.875" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M7.125 12.75H16.875" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                                <p class="link-title">Receipts</p>
                            </div>
                        </router-link>
                    </li>


                </ul>



            </div>


        </div>


    </aside>


    <aside class="mini-main-sidebar mini-main-sidebar-deactive">

        <div class="sidebar-content">

            <div class="sidebar-avatar-header">

                <div class="user-profile-avatar">
                    <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&amp;fit=crop&amp;q=80&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&amp;w=1374">
                </div>

            </div>



            <div class="sidebar-main-content">


                <ul class="main-pages-list">

                    <li class="list-items">
                        <router-link to="/" class="list-link">
                            <div class="link-items">
                                <img src="../assets/img/icons/search.svg" class="img-not-selected">
                            </div>
                        </router-link>
                    </li>

                    <li class="list-items">
                        <router-link to="/" class="list-link">
                            <div class="link-items">
                                <img src="../assets/img/icons/bell.svg" class="img-not-selected">
                            </div>
                            <div class="count">12</div>
                        </router-link>
                    </li>


                    <li class="list-items">
                        <router-link to="/" class="list-link">
                            <div class="link-items">
                                <img src="../assets/img/icons/tag.svg" class="img-not-selected">
                            </div>
                        </router-link>
                    </li>

                    <li class="list-items">
                        <router-link to="/" class="list-link">
                            <div class="link-items">
                                <img src="../assets/img/icons/users.svg" class="img-not-selected">
                            </div>
                        </router-link>
                    </li>


                    <li class="list-items">
                        <router-link to="/" class="list-link">
                            <div class="link-items">
                                <img src="../assets/img/icons/cart.svg" class="img-not-selected">
                            </div>
                        </router-link>
                    </li>


                    <li class="list-items">
                        <router-link to="/" class="list-link link_active">
                            <div class="link-items">
                                <img src="../assets/img/icons/buildings.svg" class="img-not-selected">
                            </div>
                        </router-link>
                    </li>


                    <li class="list-items">
                        <router-link to="/" class="list-link">
                            <div class="link-items">
                                <img src="../assets/img/icons/sale.svg" class="img-not-selected">
                            </div>
                        </router-link>
                    </li>

                    <li class="list-items">
                        <router-link to="/" class="list-link">
                            <div class="link-items">
                                <img src="../assets/img/icons/gift.svg" class="img-not-selected">
                            </div>
                        </router-link>
                    </li>

                    <li class="list-items">
                        <router-link to="/" class="list-link">
                            <div class="link-items">
                                <img src="../assets/img/icons/cash.svg" class="img-not-selected">
                            </div>
                        </router-link>
                    </li>

                    <li class="list-items">
                        <router-link to="/" class="list-link">
                            <div class="link-items">
                                <img src="../assets/img/icons/settings.svg" class="img-not-selected">
                            </div>
                        </router-link>
                    </li>

                </ul>


                <div>

                    <div class="sidebar-section-heading">


                        <div class="add-new-flied-btn">
                            <img src="../assets/img/icons/plus.svg">
                        </div>


                    </div>


                    <ul class="favorites-pages-list">

                        <li class="list-items">
                            <router-link to="/" class="list-link">

                                <div class="list-icon">💸</div>


                            </router-link>
                        </li>


                        <li class="list-items">
                            <router-link to="/" class="list-link">

                                <div class="list-icon">🏝</div>


                            </router-link>
                        </li>

                    </ul>



                </div>

            </div>


        </div>


    </aside>
</template>

