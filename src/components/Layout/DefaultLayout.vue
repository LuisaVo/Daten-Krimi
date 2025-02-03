<script>
import NavComponent from '@/components/Layout/Navbar.vue';
import FooterComponent from '@/components/Layout/Footer.vue';

export default {
components: {
    NavComponent,
    FooterComponent
}
};
</script>

<template>
    <div class="layout">
        <NavComponent />
        <main class="w3-margin-top">
            <slot />
        </main>
        <FooterComponent />
    </div>
</template>