<script>
import Sidebar from './Sidebar.vue';
import Header from './Header.vue';

export default {
    components: {
        Sidebar,
        Header,
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