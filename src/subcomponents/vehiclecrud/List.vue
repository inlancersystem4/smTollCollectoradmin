<script>
export default {
    props: {
        list: Array
    },
    methods: {
        deleteToll(id) {
            this.$emit('delete_vehicle', id)
        },
        editToll(id) {
            this.$emit('edit_vehicle', id)
        }
    },
}
</script>

<template>
    <li class="list" v-for="(items, index) in list" :key="index">

        <img :src="items.v_image" :alt="items.v_image">

        <div class="space-y-4px display-flex align-center text-center justify-center" style="flex-direction: column;">
            <h2 class="text-xl_semibold color-Grey_90">{{ items.v_name }}</h2>
            <p class="text-md_regular color-Grey_50">{{ items.v_price }}</p>
        </div>

        <div class="options">
            <div class="icon-btn icon-btn_32px  custom-dropdown">
                <img src="../../assets/img/icons/dots-icon.svg">
                <ul class="custom-dropdown-list leftside icon-dropdown">
                    <li class="dropdown-item" @click="editToll(items.v_id)">
                        <div class="dropdown-link">
                            <img src="../../assets/img/icons/edit.svg">
                            <p class="dropdown-link-title"> Edit Vehicle </p>
                        </div>
                    </li>
                    <li class="dropdown-item" @click="deleteToll(items.v_id)">
                        <div class="dropdown-link">
                            <img src="../../assets/img/icons/trash.svg">
                            <p class="dropdown-link-title required"> Delete Vehicle </p>
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
    align-items: center;
    justify-content: center;
    flex-direction: column;
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

img {
    max-width: 100%;
    height: auto;
}
</style>