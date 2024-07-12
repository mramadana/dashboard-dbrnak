<template>
    <div class="layout_Auth">
        <img src="@/assets/images/authBanner.png" alt="authbbaner" loading="lazy">
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
    .layout_Auth {
        position: relative;
        padding: 40px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        @media (max-width: 550px) {
            padding: 20px 0;
        }

        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 1;
        }
    }
</style>