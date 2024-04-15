<script>

export default {
    computed: {
        isRole1() {
            const userRole = localStorage.getItem('role');
            return userRole === '1';
        },
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
        },
        isFullReportCrudActive() {
            return this.$route.matched.some(route => route.path === '/full-report');
        },
        isdailyReportActive() {
            return this.$route.matched.some(route => route.path === '/daily-report');
        },
        isShiftReportActive() {
            return this.$route.matched.some(route => route.path === '/shift-report');
        },
        isLaneReportActive() {
            return this.$route.matched.some(route => route.path === '/lane-report');
        }
    },
    props: {
        responsiveSidebarActive: Boolean
    },
    data() {
        return {
            mainSidebarActive: true,
            miniSidebarActive: false,
        }
    },
    created() {
        const mainSidebarActive = localStorage.getItem('mainSidebarActive');
        const miniSidebarActive = localStorage.getItem('miniSidebarActive');

        if (mainSidebarActive !== null) {
            this.mainSidebarActive = JSON.parse(mainSidebarActive);
        }
        if (miniSidebarActive !== null) {
            this.miniSidebarActive = JSON.parse(miniSidebarActive);
        }
    },
    watch: {
        mainSidebarActive(newVal) {
            localStorage.setItem('mainSidebarActive', newVal);
        },
        miniSidebarActive(newVal) {
            localStorage.setItem('miniSidebarActive', newVal);
        }
    },
    methods: {
        toggleSidebar() {
            this.mainSidebarActive = !this.mainSidebarActive;
            this.miniSidebarActive = !this.miniSidebarActive;
        },
        CloseMenuMini() {
            this.mainSidebarActive = !this.mainSidebarActive;
            this.miniSidebarActive = !this.miniSidebarActive;
        },
        closeResponsiveMenu() {
            this.$emit('closeResponsiveMenu')
        }
    }
}

</script>

<template>
    <aside class="main-sidebar"
        :class="{ 'main-sidebar-deactive': miniSidebarActive === true, 'responsive-main-sidebar': responsiveSidebarActive === true }">

        <div class="sidebar-content">

            <div class="sidebar-avatar-header margin-bottom_24px">

                <router-link to="/">
                    <img src="https://inlancer.in/assets/upload/images/original/63380d4d8dcc1-633572ab8819c-logo.svg"
                        class="w-full" alt="logo" />
                </router-link>

                <div class="user-profile-btn" id="Open_mini_sidebar"
                    @click="miniSidebarActive = true, mainSidebarActive = false">
                    <img src="../assets/img/icons/burger-menu.svg" class="img-not-selected">
                </div>

                <div class="user-profile-btn" id="Responsive_Close_sidebar" @click="closeResponsiveMenu">
                    <img src="../assets/img/icons/close-icon.svg" class="img-not-selected close-menu">
                </div>

            </div>


            <div class="sidebar-main-content">


                <ul class="main-pages-list">

                    <li class="list-items">
                        <router-link to="/" class="list-link" active-class="link_active">
                            <div class="link-items">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                    fill="none">
                                    <path
                                        d="M17.0141 16.5423V8.79977C17.0141 8.59442 16.9326 8.39749 16.7874 8.25229C16.6422 8.10709 16.4452 8.02551 16.2399 8.02551H13.1429"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M3.07739 16.5422V4.15414C3.07739 3.94879 3.15897 3.75186 3.30417 3.60666C3.44937 3.46146 3.6463 3.37988 3.85165 3.37988H12.3684C12.5738 3.37988 12.7707 3.46146 12.9159 3.60666C13.0611 3.75186 13.1427 3.94879 13.1427 4.15414V16.5422"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M5.98065 6.6521H10.2391" stroke="#6B7280" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M5.98065 9.96106H10.2391" stroke="#6B7280" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M5.98087 16.5422H10.2393V13.2089H5.98087V16.5422Z" stroke="#6B7280"
                                        stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M17.7885 16.5422H2.30347" stroke="#6B7280" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <p class="link-title">Home</p>
                            </div>
                        </router-link>
                    </li>

                    <li v-if="isRole1" class="list-items">
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

                    <li v-if="isRole1" class="list-items">
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

                    <li v-if="isRole1" class="list-items">
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

                    <li v-if="isRole1" class="list-items">
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

                    <li v-if="isRole1" class="list-items">
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
                                <p class="link-title">Shift</p>
                            </div>
                        </router-link>
                    </li>

                    <li class="list-items">
                        <router-link to="/receipt-crud" class="list-link"
                            :class="{ link_active: isReceiptsCrudActive }">
                            <div class="link-items">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none">
                                    <path
                                        d="M3 19.5V5.25C3 5.05109 3.07902 4.86032 3.21967 4.71967C3.36032 4.57902 3.55109 4.5 3.75 4.5H20.25C20.4489 4.5 20.6397 4.57902 20.7803 4.71967C20.921 4.86032 21 5.05109 21 5.25V19.5L18 18L15 19.5L12 18L9 19.5L6 18L3 19.5Z"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M7.125 9.75H16.875" stroke="#6B7280" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M7.125 12.75H16.875" stroke="#6B7280" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <p class="link-title">Receipts</p>
                            </div>
                        </router-link>
                    </li>

                    <li class="list-items">
                        <router-link to="/full-report" class="list-link"
                            :class="{ link_active: isFullReportCrudActive }">
                            <div class="link-items">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 14.25H15" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M9 11.25H15" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M15 3.75H18.75C18.9489 3.75 19.1397 3.82902 19.2803 3.96967C19.421 4.11032 19.5 4.30109 19.5 4.5V20.25C19.5 20.4489 19.421 20.6397 19.2803 20.7803C19.1397 20.921 18.9489 21 18.75 21H5.25C5.05109 21 4.86032 20.921 4.71967 20.7803C4.57902 20.6397 4.5 20.4489 4.5 20.25V4.5C4.5 4.30109 4.57902 4.11032 4.71967 3.96967C4.86032 3.82902 5.05109 3.75 5.25 3.75H9"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M8.25 6.75V6C8.25 5.00544 8.64509 4.05161 9.34835 3.34835C10.0516 2.64509 11.0054 2.25 12 2.25C12.9946 2.25 13.9484 2.64509 14.6517 3.34835C15.3549 4.05161 15.75 5.00544 15.75 6V6.75H8.25Z"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                                <p class="link-title">Full Report</p>
                            </div>
                        </router-link>
                    </li>

                    <li class="list-items">
                        <router-link to="/daily-report" class="list-link" :class="{ link_active: isdailyReportActive }">
                            <div class="link-items">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M15 3.75H18.75C18.9489 3.75 19.1397 3.82902 19.2803 3.96967C19.421 4.11032 19.5 4.30109 19.5 4.5V20.25C19.5 20.4489 19.421 20.6397 19.2803 20.7803C19.1397 20.921 18.9489 21 18.75 21H5.25C5.05109 21 4.86032 20.921 4.71967 20.7803C4.57902 20.6397 4.5 20.4489 4.5 20.25V4.5C4.5 4.30109 4.57902 4.11032 4.71967 3.96967C4.86032 3.82902 5.05109 3.75 5.25 3.75H9"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M8.25 6.75V6C8.25 5.00544 8.64509 4.05161 9.34835 3.34835C10.0516 2.64509 11.0054 2.25 12 2.25C12.9946 2.25 13.9484 2.64509 14.6517 3.34835C15.3549 4.05161 15.75 5.00544 15.75 6V6.75H8.25Z"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                                <p class="link-title">Daily Report</p>
                            </div>
                        </router-link>
                    </li>

                    <li class="list-items">
                        <router-link to="/shift-report" class="list-link" :class="{ link_active: isShiftReportActive }">
                            <div class="link-items">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M19.5 3.75H4.5C4.08579 3.75 3.75 4.08579 3.75 4.5V19.5C3.75 19.9142 4.08579 20.25 4.5 20.25H19.5C19.9142 20.25 20.25 19.9142 20.25 19.5V4.5C20.25 4.08579 19.9142 3.75 19.5 3.75Z"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M16.5 2.25V5.25" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M7.5 2.25V5.25" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M3.75 8.25H20.25" stroke="#6B7280" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path
                                        d="M12 17C13.6569 17 15 15.6569 15 14C15 12.3431 13.6569 11 12 11C10.3431 11 9 12.3431 9 14C9 15.6569 10.3431 17 12 17Z"
                                        stroke="#6B7280" stroke-miterlimit="10" />
                                    <path d="M12 12.25V14H13.75" stroke="#6B7280" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                                <p class="link-title">Shift Report</p>
                            </div>
                        </router-link>
                    </li>


                    <li class="list-items">
                        <router-link to="/lane-report" class="list-link" :class="{ link_active: isLaneReportActive }">
                            <div class="link-items">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M4.5 20.25L10.3219 3.50625C10.3752 3.35949 10.4719 3.23245 10.5992 3.14201C10.7265 3.05158 10.8783 3.00204 11.0344 3H12.9656C13.1217 3.00204 13.2735 3.05158 13.4008 3.14201C13.5281 3.23245 13.6248 3.35949 13.6781 3.50625L19.5 20.25"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M21.75 20.25H2.25" stroke="#6B7280" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M15.5904 9H8.40918" stroke="#6B7280" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M17.6719 15H6.32812" stroke="#6B7280" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <p class="link-title">Lane Report</p>
                            </div>
                        </router-link>
                    </li>


                </ul>



            </div>


        </div>


    </aside>

    <aside class="mini-main-sidebar" :class="{ 'mini-main-sidebar-deactive': mainSidebarActive === true }">

        <div class="sidebar-content">

            <div class="w-[25px]">
                <router-link to="/">
                    <img src="https://inlancer.in/public/inlancer-template/img/favicon.png" class="w-full h-auto">
                </router-link>
            </div>

            <div class="openmainSidebar" @click="toggleSidebar">
                <img src="../assets/img/icons/chevron-right.svg" />
            </div>


            <div class="sidebar-main-content">


                <ul class="main-pages-list">

                    <li class="list-items">
                        <router-link to="/" class="list-link" active-class="link_active">
                            <div class="link-items">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                    fill="none">
                                    <path
                                        d="M17.0141 16.5423V8.79977C17.0141 8.59442 16.9326 8.39749 16.7874 8.25229C16.6422 8.10709 16.4452 8.02551 16.2399 8.02551H13.1429"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M3.07739 16.5422V4.15414C3.07739 3.94879 3.15897 3.75186 3.30417 3.60666C3.44937 3.46146 3.6463 3.37988 3.85165 3.37988H12.3684C12.5738 3.37988 12.7707 3.46146 12.9159 3.60666C13.0611 3.75186 13.1427 3.94879 13.1427 4.15414V16.5422"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M5.98065 6.6521H10.2391" stroke="#6B7280" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M5.98065 9.96106H10.2391" stroke="#6B7280" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M5.98087 16.5422H10.2393V13.2089H5.98087V16.5422Z" stroke="#6B7280"
                                        stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M17.7885 16.5422H2.30347" stroke="#6B7280" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                        </router-link>
                    </li>

                    <li v-if="isRole1" class="list-items">
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
                            </div>
                        </router-link>
                    </li>

                    <li v-if="isRole1" class="list-items">
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
                            </div>
                        </router-link>
                    </li>

                    <li v-if="isRole1" class="list-items">
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
                            </div>
                        </router-link>
                    </li>

                    <li v-if="isRole1" class="list-items">
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
                            </div>
                        </router-link>
                    </li>

                    <li v-if="isRole1" class="list-items">
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
                            </div>
                        </router-link>
                    </li>


                    <li class="list-items">
                        <router-link to="/receipt-crud" class="list-link"
                            :class="{ link_active: isReceiptsCrudActive }">
                            <div class="link-items">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none">
                                    <path
                                        d="M3 19.5V5.25C3 5.05109 3.07902 4.86032 3.21967 4.71967C3.36032 4.57902 3.55109 4.5 3.75 4.5H20.25C20.4489 4.5 20.6397 4.57902 20.7803 4.71967C20.921 4.86032 21 5.05109 21 5.25V19.5L18 18L15 19.5L12 18L9 19.5L6 18L3 19.5Z"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M7.125 9.75H16.875" stroke="#6B7280" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M7.125 12.75H16.875" stroke="#6B7280" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                        </router-link>
                    </li>

                    <li class="list-items">
                        <router-link to="/full-report" class="list-link"
                            :class="{ link_active: isFullReportCrudActive }">
                            <div class="link-items">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 14.25H15" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M9 11.25H15" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M15 3.75H18.75C18.9489 3.75 19.1397 3.82902 19.2803 3.96967C19.421 4.11032 19.5 4.30109 19.5 4.5V20.25C19.5 20.4489 19.421 20.6397 19.2803 20.7803C19.1397 20.921 18.9489 21 18.75 21H5.25C5.05109 21 4.86032 20.921 4.71967 20.7803C4.57902 20.6397 4.5 20.4489 4.5 20.25V4.5C4.5 4.30109 4.57902 4.11032 4.71967 3.96967C4.86032 3.82902 5.05109 3.75 5.25 3.75H9"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M8.25 6.75V6C8.25 5.00544 8.64509 4.05161 9.34835 3.34835C10.0516 2.64509 11.0054 2.25 12 2.25C12.9946 2.25 13.9484 2.64509 14.6517 3.34835C15.3549 4.05161 15.75 5.00544 15.75 6V6.75H8.25Z"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                            </div>
                        </router-link>
                    </li>

                    <li class="list-items">
                        <router-link to="/daily-report" class="list-link" :class="{ link_active: isdailyReportActive }">
                            <div class="link-items">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M15 3.75H18.75C18.9489 3.75 19.1397 3.82902 19.2803 3.96967C19.421 4.11032 19.5 4.30109 19.5 4.5V20.25C19.5 20.4489 19.421 20.6397 19.2803 20.7803C19.1397 20.921 18.9489 21 18.75 21H5.25C5.05109 21 4.86032 20.921 4.71967 20.7803C4.57902 20.6397 4.5 20.4489 4.5 20.25V4.5C4.5 4.30109 4.57902 4.11032 4.71967 3.96967C4.86032 3.82902 5.05109 3.75 5.25 3.75H9"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M8.25 6.75V6C8.25 5.00544 8.64509 4.05161 9.34835 3.34835C10.0516 2.64509 11.0054 2.25 12 2.25C12.9946 2.25 13.9484 2.64509 14.6517 3.34835C15.3549 4.05161 15.75 5.00544 15.75 6V6.75H8.25Z"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                            </div>
                        </router-link>
                    </li>

                    <li class="list-items">
                        <router-link to="/shift-report" class="list-link" :class="{ link_active: isShiftReportActive }">
                            <div class="link-items">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M19.5 3.75H4.5C4.08579 3.75 3.75 4.08579 3.75 4.5V19.5C3.75 19.9142 4.08579 20.25 4.5 20.25H19.5C19.9142 20.25 20.25 19.9142 20.25 19.5V4.5C20.25 4.08579 19.9142 3.75 19.5 3.75Z"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M16.5 2.25V5.25" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M7.5 2.25V5.25" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M3.75 8.25H20.25" stroke="#6B7280" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path
                                        d="M12 17C13.6569 17 15 15.6569 15 14C15 12.3431 13.6569 11 12 11C10.3431 11 9 12.3431 9 14C9 15.6569 10.3431 17 12 17Z"
                                        stroke="#6B7280" stroke-miterlimit="10" />
                                    <path d="M12 12.25V14H13.75" stroke="#6B7280" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                            </div>
                        </router-link>
                    </li>

                    <li class="list-items">
                        <router-link to="/lane-report" class="list-link" :class="{ link_active: isLaneReportActive }">
                            <div class="link-items">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M4.5 20.25L10.3219 3.50625C10.3752 3.35949 10.4719 3.23245 10.5992 3.14201C10.7265 3.05158 10.8783 3.00204 11.0344 3H12.9656C13.1217 3.00204 13.2735 3.05158 13.4008 3.14201C13.5281 3.23245 13.6248 3.35949 13.6781 3.50625L19.5 20.25"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M21.75 20.25H2.25" stroke="#6B7280" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M15.5904 9H8.40918" stroke="#6B7280" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M17.6719 15H6.32812" stroke="#6B7280" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                        </router-link>
                    </li>

                </ul>

            </div>


        </div>


    </aside>
</template>


<style scoped>
.openmainSidebar {
    position: absolute;
    border: 1px solid var(--Grey-20);
    width: 34px;
    height: 34px;
    right: -12px;
    top: 9px;
    z-index: 101;
    border-radius: 999px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 3px;
}
</style>