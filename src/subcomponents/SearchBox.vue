<script>
export default {
    props: {
        placeholder: String,
        value: String
    }
}
</script>


<template>
    <div class="flex items-center bg-Theme-color1 rounded">
        <div class="h-full  flex items-center justify-center px-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                    d="M10.875 18.75C15.2242 18.75 18.75 15.2242 18.75 10.875C18.75 6.52576 15.2242 3 10.875 3C6.52576 3 3 6.52576 3 10.875C3 15.2242 6.52576 18.75 10.875 18.75Z"
                    stroke="#191C1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M16.4434 16.4453L20.9996 21.0016" stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
        </div>
        <input type="text" class="outline-none py-1.5 pr-2 text-base bg-transparent" :placeholder="placeholder"
            :value="value">
    </div>
</template>