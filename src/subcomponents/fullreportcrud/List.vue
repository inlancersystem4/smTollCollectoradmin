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
        editStatus(id) {
            this.$emit('edit_status', id)
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
        <div>
            <button class="btn-regular display-flex align-center" @click="deleteToll(items.r_id)">
                <p class="text-sm_medium text-red-600">Delete</p>
            </button>
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