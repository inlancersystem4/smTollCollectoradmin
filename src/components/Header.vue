<script>
export default {
    props: {
        Headlinks: Array,
    }
}
</script>

<template>
    <div class="w-full   ">
        <div class="flex items-end justify-between w-full">
            <div class="">
                <div class="flex items-center gap-2">
                    <router-link v-for="(link, link_index) in Headlinks" :key="link_index" :to="link.route"
                        class="border-b border-black px-6 text-center text-lg pb-2 cursor-pointer w-max"
                        active-class="Active-link">
                        {{ link.name }}
                    </router-link>
                </div>
            </div>
            <div class="flex items-center space-x-4 pb-1 border-b border-solid border-Theme-color1 w-full justify-end">
                <div class="flex items-center space-x-4">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        class="object-cover w-10 h-10 rounded">
                    <p class="text-lg capitalize font-semibold">Jhon Deo</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.Active-link {
    border-color: #F2994A;
    font-weight: 600;
    letter-spacing: 0.2px;
}
</style>