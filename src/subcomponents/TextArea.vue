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
    <textarea type="text" :placeholder="placeholder" :value="value" :id="id" class="input-1"></textarea>
</template>

<style scoped>
textarea {
    min-height: 150px;
}
</style>