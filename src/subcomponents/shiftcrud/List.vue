<script>
export default {
    props: {
        list: Array
    },
    methods: {
        deleteToll(id) {
            this.$emit('delete_shift', id)
        },
        editToll(id) {
            this.$emit('edit_shift', id)
        },
        editStatus(id) {
            this.$emit('edit_status', id)
        }
    },
}
</script>

<template>
    <li class="list" v-for="(items, index) in list" :key="index">

        <h6 class="text-large_semibold color-Grey_90">{{ items.s_id }}.</h6>

        <div class="space-y-4px">
            <h2 class="text-large_semibold color-Grey_90 text-capitalize">{{ items.s_name }}</h2>
            <div class="display-flex gap-12px">
                <p class="text-base_regular color-Grey_50"> <span class="font-600">From:-</span> {{ items.s_from_time }}</p>
                <p class="text-base_regular color-Grey_50"> <span class="font-600">To:-</span> {{ items.s_to_time }}</p>
            </div>
        </div>

        <div class="options">
            <button class="btn-regular display-flex align-center gap-8px" v-if="items.status === true">
                <div class="ellipse-dot bg-emerald"></div>
                <p class="text-sm_medium color-Grey_60">Enable</p>
            </button>
            <button class="btn-regular display-flex align-center gap-8px" v-if="items.status === false">
                <div class="ellipse-dot bg-rose"></div>
                <p class="text-sm_medium color-Grey_60">Disable</p>
            </button>
            <div class="icon-btn icon-btn_32px  custom-dropdown">
                <img src="../../assets/img/icons/dots-icon.svg">
                <ul class="custom-dropdown-list leftside icon-dropdown">
                    <li class="dropdown-item" @click="editToll(items.s_id)">
                        <div class="dropdown-link">
                            <img src="../../assets/img/icons/edit.svg">
                            <p class="dropdown-link-title"> Edit Toll Plaza </p>
                        </div>
                    </li>
                    <li class="dropdown-item" @click="deleteToll(items.s_id)">
                        <div class="dropdown-link">
                            <img src="../../assets/img/icons/trash.svg">
                            <p class="dropdown-link-title required"> Delete Toll Plaza </p>
                        </div>
                    </li>
                    <li class="dropdown-item" @click="editStatus(items.s_id)" v-if="items.status === false">
                        <div class="dropdown-link">
                            <p class="w20"></p>
                            <p class="dropdown-link-title"> Enable </p>
                        </div>
                    </li>
                    <li class="dropdown-item" @click="editStatus(items.s_id)" v-if="items.status === true">
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
</style>