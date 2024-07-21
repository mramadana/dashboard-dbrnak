<template>
    <div>
        <div class="container">

            <div id="teleportDiv" class="with-plus-btn"></div>

            <div class="section-btns mb-5">
        
                <nuxt-link :to="'/branches/'+ id + '/edit'" class="custom-btn order-btn sm">{{ $t('employees.edit_branch') }}</nuxt-link>
        
                <nuxt-link :to="'/branches/'+ id + '/employees'" class="custom-btn order-btn sm">{{ $t('Home.employees') }}</nuxt-link>
            </div>


            
        </div>
        <NuxtPage :page-key="route => route.fullPath"/>

    </div>
</template>

<script setup>
    const id = useRoute().params.id

    definePageMeta({
        middleware: ['auth', 'check'],
    });
</script>
