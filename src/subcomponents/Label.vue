<script>
export default {
    props: {
        label: String,
    }
}
</script>


<template>
    <label :for="label" class="text-base capitalize font-medium tracking-wide block cursor-pointer">{{ label }}</label>
</template>