<script>

export default {

    props: {
        options: {
            type: Array,
            required: true,
        },
        responseData: Object,
        value: String
    },

    data() {
        return {
            selectDropdownOpen: false,
            selectedOption: null,
            selectedOptionVal: null,
            responseOption: "",
            inputValue: this.value || ''
        }
    },
    watch: {
        value(newValue) {
            this.inputValue = newValue;
        }
    },
    methods: {
        toggleDropdown() {
            this.selectDropdownOpen = !this.selectDropdownOpen;
        },
        selectOption(option) {
            this.selectedOption = option.t_name || option.l_name || option.s_name || option.v_name || option.user_name || option.v_image;
            this.selectedOptionVal = option;
            this.selectDropdownOpen = false;
            this.$emit('option-selected', this.selectedOptionVal);
        },
        clearSelection() {
            this.selectedOption = null;
            this.selectDropdownOpen = false;
            this.selectedOptionVal = ""
            this.$emit('option-selected', this.selectedOptionVal);
        },
        clearInput() {
            this.inputValue = ""
        }
    },
}

</script>


<template>
    <!-- <Select :options="array" @option-selected="onOptionSelected" /> -->

    <div class="select">


        <div @click="toggleDropdown" class="cursor-pointer w-full">

            <p v-if="!responseData" class="w-100 capitalize color-Grey_90 font-medium"
                :class="{ 'color-Grey_50': selectedOption !== null }">
                {{ selectedOption ? selectedOption : 'Select Option' }}
            </p>

            <p v-if="responseData" class="w-100 capitalize color-Grey_90 font-medium">
                {{ responseData }}
            </p>

        </div>

        <div class="select-icon cursor-pointer">
            <div @click="clearSelection" v-if="selectedOption">
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

            <div class="padding-x_24px padding-y_12px">
                <div class="search-wrraper w-100">
                    <button class="icon">
                        <img src="../assets/img/icons/search.svg" class="img-not-selected">
                    </button>
                    <input type="text" class=" w-100" placeholder="Search Something" v-model="inputValue">
                    <button class="icon val_clear" style="cursor: pointer;" v-if="inputValue" @click="clearInput">
                        <img src="../assets/img/icons/close-icon.svg" class="img-not-selected">
                    </button>
                </div>
            </div>

            <ul class="w-100">

                <p class="no-conetnt-show-section" v-if="!options">
                    Oops No data Found !!
                </p>

                <li v-for="(option, index) in options" :key="index" @click="selectOption(option)" class="capitalize">
                    <div v-if="option.t_name">
                        {{ option.t_name }}
                    </div>
                    <div v-if="option.l_name">
                        {{ option.l_name }}
                    </div>
                    <div v-if="option.s_name">
                        {{ option.s_name }}
                    </div>
                    <div v-if="option.user_name">
                        {{ option.user_name }}
                    </div>
                    <div class="display-flex gap-12px align-center" v-if="option.v_name">
                        <img :src="option.v_image" width="42" height="42" class="object-contain">
                        <div>
                            {{ option.v_name }}
                        </div>
                    </div>
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
    max-height: 240px;
    overflow-y: auto;
    z-index: 99;
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

.search-wrraper {
    border: 1px solid var(--Grey-20);
}

.search-wrraper:focus {
    box-shadow: none;
}

.select-option li:hover {
    background-color: var(--Grey-20);
}
</style>
