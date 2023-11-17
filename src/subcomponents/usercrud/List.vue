<script>
export default {
    props: {
        list: Array
    },
    methods: {
        deleteToll(id) {
            this.$emit('delete_user', id)
        },
        editToll(id) {
            this.$emit('edit_user', id)
        },
        editStatus(id) {
            this.$emit('edit_status', id)
        }
    },
}
</script>

<template>
    <li class="list" v-for="(items, index) in list" :key="index">

        <img :src="items.profile_picture" class="user_pic" v-if="items.profile_picture">

        <img src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png" v-if="!items.profile_picture"
            class="user_pic">

        <div class="space-y-6px">

            <div class="">
                <h6 class="text-large_semibold color-Grey_90 line-clamp-1">{{ items.user_name }}</h6>
                <a :href="'tel:' + items.user_phone_number" class="text-sm_medium color-Grey_50">
                    {{ items.user_phone_number }}</a>
            </div>


            <div class="user_options">

                <div class="display-flex align-center gap-4px">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M2.25 9H21.75L12 3L2.25 9Z" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
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
                    <p class="text-base_medium color-Grey_90">{{ items.user_toll_plaza }}</p>
                </div>

                <div class="display-flex align-center gap-4px">

                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M21 6.75H3C2.58579 6.75 2.25 7.08579 2.25 7.5V14.25C2.25 14.6642 2.58579 15 3 15H21C21.4142 15 21.75 14.6642 21.75 14.25V7.5C21.75 7.08579 21.4142 6.75 21 6.75Z"
                            stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M7.875 6.75L16.125 15" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M14.625 6.75L21.75 13.875" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M2.25 7.875L9.375 15" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M18 15V18.75" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M6 15V18.75" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>

                    <p class="text-base_medium color-Grey_90">{{ items.user_lane_select }}</p>

                </div>

                <div class="display-flex align-center gap-4px">

                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M12 12L6.3 7.725C6.20738 7.65464 6.13217 7.56395 6.08016 7.45992C6.02814 7.35589 6.00072 7.24131 6 7.125V3.75C6 3.55109 6.07902 3.36032 6.21967 3.21967C6.36032 3.07902 6.55109 3 6.75 3H17.25C17.4489 3 17.6397 3.07902 17.7803 3.21967C17.921 3.36032 18 3.55109 18 3.75V7.0875C17.9993 7.20381 17.9719 7.31839 17.9198 7.42242C17.8678 7.52645 17.7926 7.61714 17.7 7.6875L12 12Z"
                            stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path
                            d="M12 12L6.3 16.275C6.20738 16.3454 6.13217 16.436 6.08016 16.5401C6.02814 16.6441 6.00072 16.7587 6 16.875V20.25C6 20.4489 6.07902 20.6397 6.21967 20.7803C6.36032 20.921 6.55109 21 6.75 21H17.25C17.4489 21 17.6397 20.921 17.7803 20.7803C17.921 20.6397 18 20.4489 18 20.25V16.9125C17.9993 16.7962 17.9719 16.6816 17.9198 16.5776C17.8678 16.4735 17.7926 16.3829 17.7 16.3125L12 12Z"
                            stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M7.00293 8.25H16.9592" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M12 15.75V12" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>

                    <p class="text-base_medium color-Grey_90">{{ items.user_shift_select }}</p>

                </div>

            </div>
        </div>

        <div class="options">
            <button class="btn-regular display-flex align-center gap-8px" v-if="items.user_status === true">
                <div class="ellipse-dot bg-emerald"></div>
                <p class="text-sm_medium color-Grey_60">Enable</p>
            </button>
            <button class="btn-regular display-flex align-center gap-8px" v-if="items.user_status === false">
                <div class="ellipse-dot bg-rose"></div>
                <p class="text-sm_medium color-Grey_60">Disable</p>
            </button>
            <div class="icon-btn icon-btn_32px  custom-dropdown">
                <img src="../../assets/img/icons/dots-icon.svg">
                <ul class="custom-dropdown-list leftside icon-dropdown">
                    <li class="dropdown-item" @click="editToll(items.user_id)">
                        <div class="dropdown-link">
                            <img src="../../assets/img/icons/edit.svg">
                            <p class="dropdown-link-title"> Edit User </p>
                        </div>
                    </li>
                    <li class="dropdown-item" @click="deleteToll(items.user_id)">
                        <div class="dropdown-link">
                            <img src="../../assets/img/icons/trash.svg">
                            <p class="dropdown-link-title required"> Delete User </p>
                        </div>
                    </li>
                    <li class="dropdown-item" @click="editStatus(items.user_id)" v-if="items.user_status === false">
                        <div class="dropdown-link">
                            <p class="w20"></p>
                            <p class="dropdown-link-title"> Enable </p>
                        </div>
                    </li>
                    <li class="dropdown-item" @click="editStatus(items.user_id)" v-if="items.user_status === true">
                        <div class="dropdown-link">
                            <p class="w20"></p>
                            <p class="dropdown-link-title"> Disable </p>
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


.user_pic {
    min-width: 42px;
    min-height: 42px;
    max-width: 42px;
    max-height: 42px;
    border-radius: 999px;
    object-fit: cover;
}

.w20 {
    width: 20px;
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
    display: flex;
    align-items: center;
    gap: 8px;
}

.list .options .custom-dropdown:hover .custom-dropdown-list {
    display: inline-flex;
}

.list .options .custom-dropdown-list {
    top: 104%;
}

img {
    max-width: 100%;
    height: auto;
}

.user_options {
    display: flex;
    align-items: center;
    row-gap: 6px;
    column-gap: 22px;
    flex-wrap: wrap;
}

.user_options div {
    position: relative;
}

.user_options div:nth-last-child(1)::after {
    display: none;
}

.user_options div:after {
    content: "";
    position: absolute;
    left: calc(100% + 8px);
    top: 55%;
    transform: translateY(-50%);
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: var(--Grey-50);
}
</style>