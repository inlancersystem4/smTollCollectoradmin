<script>
export default {
    props: {
        msg: String
    }
}
</script>

<template>
    <p class="text-rose-600 required">{{ msg }}</p>
</template>

<style scoped>
p {
    font-size: 16px;
    font-weight: 600;
}
</style>