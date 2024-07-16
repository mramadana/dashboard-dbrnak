<template>
    <div>
        <h1>{{ id }}</h1>
        <p>show Data</p>
    </div>
</template>

<script setup>
    const { id } = useRoute().params
</script>