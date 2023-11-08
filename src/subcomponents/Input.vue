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
    <input type="text" :placeholder="placeholder" :value="value" :id="id" class="input-1">
</template>