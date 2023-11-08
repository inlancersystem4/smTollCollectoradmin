<script>
export default {
    props: {
        list: Array
    }
}
</script>

<template>
    <li class="w-full border border-Theme-color1 rounded py-3 px-6  relative flex items-start gap-3"
        v-for="(items, index) in list" :key="index">

        <h6 class="text-xl font-semibold">{{ items.id }}.</h6>

        <div class="space-y-1">
            <h2 class="text-lg font-semibold">{{ items.name }}</h2>
            <p class="text-sm">{{ items.address }}</p>
        </div>

    </li>
</template>