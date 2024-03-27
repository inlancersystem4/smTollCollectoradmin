<script>
export default {
    props: {
        drawer_title: String,
        Btn_text: String,
        isButtonDisabled: Boolean,
        loading: Boolean,
    },
    mounted() {
        window.addEventListener('keydown', this.handleKeyPress);
    },
    beforeUnmount() {
        window.removeEventListener('keydown', this.handleKeyPress);
    },
    methods: {
        closeDrawer() {
            this.$emit('close_drawer')
        },
        drawerBtn() {
            this.$emit('drawebtn_clicked')
        },
        handleKeyPress(event) {
            if (event.key === 'Escape') {
                this.closeDrawer();
            }
        },
    },
}
</script>

<template>
    <div class="drawer rightside drawer-show">

        <div class="drawer-header">
            <div class="display-flex align-center gap-16px">
                <h4 class="drawer-title">{{ drawer_title }}</h4>
            </div>
            <button class="close-icon" @click="closeDrawer()">
                <img src="../assets/img/icons/close-icon.svg">
            </button>

        </div>

        <div class="drawer-body">

            <slot></slot>

        </div>

        <div class="drawer-footer">
            <div class="button-group">
                <button class="btn" @click="closeDrawer()">Cancel</button>
                <button class="btn bg-purple color-white" @click="drawerBtn()" :disabled="isButtonDisabled"
                    v-if="Btn_text">
                    <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24" v-if="loading">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                        </circle>
                        <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                    </svg>
                    {{ Btn_text }}
                </button>
                <button class="btn bg-purple color-white" @click="drawerBtn()" :disabled="isButtonDisabled" v-else>
                    <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24" v-if="loading">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                        </circle>
                        <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                    </svg>
                    Save and close
                </button>
            </div>
        </div>



    </div>
    <div class="overlay" @click="closeDrawer()"> </div>
</template>

<style scoped>
.overlay {
    position: fixed;
    z-index: 99;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0.4;
    background: #111827;
}
</style>