<script>
import Sidebar from './Sidebar.vue';
import Header from './Header.vue';

export default {
    components: {
        Sidebar,
        Header,
    },
    created() {
        // this.checkUser()
    },
    methods: {
        checkUser() {
            const User = localStorage.getItem('userToken')

            if (!User) {
                this.$router.push({ name: 'Login' });
            }

        }
    },
}
</script>


<template>
    <main class="main-layout">
        <Sidebar />
        <section class="main-content">
            <Header />
            <section class="main-content-body">
                <div class="content-section">
                    <slot></slot>
                </div>
            </section>
        </section>
    </main>
</template>