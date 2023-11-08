<script>
export default {
    props: {
        placeholder: String,
        value: String
    }
}
</script>


<template>
    <div class="search-wrraper w-100">
        <button class="icon">
            <img src="../assets/img/icons/search.svg" class="img-not-selected">
        </button>
        <input type="text" class=" w-100" :placeholder="placeholder"
            :value="value">
        <button class="icon val_clear" style="cursor: pointer;">
            <img src="../assets/img/icons/close-icon.svg" class="img-not-selected">
        </button>
    </div>
</template>