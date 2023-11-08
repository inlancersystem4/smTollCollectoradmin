<script>
export default {
    props: {
        placeholder: String,
        value: String,
        id: String,
    }
}
</script>


<template>
    <input type="text" :placeholder="placeholder" :value="value" :id="id"
        class="w-full rounded border border-Theme-color1 py-1.5 px-2 text-Theme-color2 text-md font-medium outline-0 focus:border-Theme-color3 placeholder:capitalize placeholder:text-gray-400">
</template>