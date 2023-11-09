<script>

export default {

    props: {
        options: {
            type: Array,
            required: true,
        },
    },

    data() {
        return {
            selectDropdownOpen: false,
            selectedOption: null,
            selectedOptionVal: null
        }
    },

    methods: {
        toggleDropdown() {
            this.selectDropdownOpen = !this.selectDropdownOpen;
        },
        selectOption(option) {
            this.selectedOption = option.t_name;
            this.selectedOptionVal = option;
            this.selectDropdownOpen = false;
            this.$emit('option-selected', this.selectedOptionVal);
        },
        clearSelection() {
            this.selectedOption = null;
            this.selectDropdownOpen = false;
        },
    },

}

</script>


<template>
    <!-- <Select :options="array" @option-selected="onOptionSelected" /> -->

    <div class="select">
        <p @click="toggleDropdown" class="w-100 capitalize color-Grey_90 font-medium"
            :class="{ 'color-Grey_50': selectedOption !== null }">
            {{ selectedOption ? selectedOption : 'Select Option' }}
        </p>
        <div class="select-icon">
            <div @click="clearSelection" v-if="selectedOption" class="">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                        stroke="#191C1F" stroke-width="1.5" stroke-miterlimit="10" />
                    <path d="M15 9L9 15" stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                    <path d="M15 15L9 9" stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </div>
            <div @click="toggleDropdown">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M19.5 9L12 16.5L4.5 9" stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </div>
        </div>
        <div v-if="selectDropdownOpen" class="select-option">
            <ul class="w-100">
                <li v-for="(option, index) in options" :key="index" @click="selectOption(option)">
                    {{ option.t_name }}
                </li>
            </ul>
        </div>
    </div>
</template>


<style scoped>
.select {
    width: 100%;
    border-width: 1px;
    border-style: solid;
    border-color: var(--Grey-20);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    border-radius: 0.375rem;
    position: relative;
}

.select-option {
    width: 100%;
    position: absolute;
    top: 90%;
    border-width: 1px;
    border-style: solid;
    border-color: var(--Grey-20);
    background-color: #ffffff;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 0.375rem;
    left: 0;
    margin-top: 0.5rem;
    max-height: 180px;
    overflow-y: auto;
}


.select-icon {
    display: flex;
    align-items: center;
    gap: 6px;
}

.select-option li {
    display: block;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
    cursor: pointer;
    text-transform: capitalize;
    border-bottom: 1px solid var(--Grey-20);
}

.select-option li:hover {
    background-color: var(--Grey-20);
}
</style>