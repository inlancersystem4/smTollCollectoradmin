<script>
export default {
    props: {
        list: Array
    }
}
</script>

<template>
    <li v-for="(items, index) in list" :key="index">

        <h6 class="text-xl font-semibold">{{ items.t_id }}.</h6>

        <div class="space-y-1">
            <h2 class="text-lg font-semibold">{{ items.t_name }}</h2>
            <p class="text-sm">{{ items.t_address }}</p>
        </div>

    </li>
</template>