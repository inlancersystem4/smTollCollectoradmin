<script>
export default {
    props: {
        list: Array
    }
}
</script>

<template>
    <li v-for="(items, index) in list" :key="index">

        <h6 class="text-large_semibold color-Grey_90">{{ items.t_id }}.</h6>

        <div class="space-y-4px">
            <h2 class="text-large_semibold color-Grey_90">{{ items.t_name }}</h2>
            <p class="text-small_regular color-Grey_50">{{ items.t_address }}</p>
        </div>

    </li>
</template>

<style scoped>
li {
    width: 100%;
    border: 1px solid #E5E7EB;
    padding: 16px 24px;
    border-radius: 8px;
    display: flex;
    align-items: flex-start;
    gap: 12px;
}
</style>