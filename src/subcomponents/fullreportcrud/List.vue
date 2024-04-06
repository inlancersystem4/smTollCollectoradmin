<script>

export default {
    props: {
        list: Array
    },
    data() {
        return {
        }
    },
    methods: {
        deleteToll(id) {
            this.$emit('delete_lane', id)
        },
        editToll(id) {
            this.$emit('edit_lane', id)
        },
        editStatus(id , status_id) {
            this.$emit('edit_status', id , status_id)
        },
        formatDate(timestamp) {
            const date = new Date(timestamp);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();

            // Pad single digit numbers with leading zero
            const pad = (num) => (num < 10 ? '0' : '') + num;

            return `${pad(day)}-${pad(month)}-${year} ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
        }
    },
}
</script>

<template>
    <li class="table-header grid grid-cols-12 space-y-2" v-for="(items, index) in list" :key="index">
        <div>{{ index + 1 }}</div>
        <div>{{ items.ticket_number }}</div>
        <div>{{ items.r_user_job }}</div>
        <div>{{ items.r_shift_select }}</div>
        <div>{{ items.r_lane_select }}</div>
        <div>{{ items.r_vehical_type }}</div>
        <div>{{ items.r_ticket_type }}</div>
        <div>{{ items.r_vehical_number }}</div>
        <div>{{ items.r_qty }}</div>
        <div>{{ items.r_price }}</div>
        <div>{{ formatDate(items.created_at) }}</div>
        <!-- <div>
            <button class="btn-regular display-flex align-center" @click="deleteToll(items.r_id)">
                <p class="text-sm_medium text-red-600">Delete</p>
            </button>
        </div> -->
        <div class="">
            <button class="btn-regular display-flex align-center gap-8px" v-if="items.r_iscancel === 0">
                <div class="ellipse-dot bg-emerald"></div>
                <p class="text-sm_medium color-Grey_60">Not Cancel</p>
            </button>
            <button class="btn-regular display-flex align-center gap-8px" v-if="items.r_iscancel === 1">
                <div class="ellipse-dot bg-rose"></div>
                <p class="text-sm_medium color-Grey_60">Cancel</p>
            </button>
            <button class="btn-regular display-flex align-center gap-8px" v-if="items.r_iscancel === 2">
                <div class="ellipse-dot bg-rose"></div>
                <p class="text-sm_medium color-Grey_60">Panding</p>
            </button>
            <div class="icon-btn icon-btn_32px  custom-dropdown">
                <img src="../../assets/img/icons/dots-icon.svg">
                <ul class=" absolute right-0  top-full">
                    <!-- <li class="dropdown-item" @click="deleteToll(items.r_id)">
                        <div class="dropdown-link">
                            <img src="../../assets/img/icons/trash.svg">
                            <p class="dropdown-link-title required"> Delete </p>
                        </div>
                    </li> -->
                    <!-- <li class="dropdown-item" @click="editStatus(items.r_id , 0)">
                        <div class="dropdown-link">
                            <p class="w20"></p>
                            <p class="dropdown-link-title"> Not Cancel </p>
                        </div>
                    </li> -->
                    <li class="dropdown-item" @click="editStatus(items.r_id , 1)">
                        <div class="dropdown-link">
                            <p class="w20"></p>
                            <p class="dropdown-link-title"> Cancel </p>
                        </div>
                    </li>
                    <li class="dropdown-item" @click="editStatus(items.r_id , 2)">
                        <div class="dropdown-link">
                            <p class="w20"></p>
                            <p class="dropdown-link-title"> Panding </p>
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


.w20 {
    width: 20px;
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

.list .options:hover .custom-dropdown-list {
    display: inline-flex;
}

.list .options .custom-dropdown-list {
    top: 104%;
}
</style>