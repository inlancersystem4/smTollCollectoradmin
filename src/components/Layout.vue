<script>
import Sidebar from './Sidebar.vue';
import Header from './Header.vue';

export default {
    components: {
        Sidebar,
        Header,
    },
    props: {
        Headlinks: Array
    },
}
</script>


<template>
    <div class="h-[100dvh] w-full overflow-hidden p-2 bg-Theme-color flex">
        <Sidebar />
        <main class="w-full h-full bg-white rounded-xl overflow-y-hidden px-8 py-3">
            <Header :Headlinks="Headlinks" />
            <div class="overflow-y-auto h-full w-full pt-4 pb-11">
                <slot></slot>
            </div>
        </main>
    </div>
</template>