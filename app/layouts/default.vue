<script setup lang="ts"></script>

<template>
    <div class="min-h-screen flex flex-col bg-white dark:bg-dark text-black dark:text-white">
        <Navbar />
        <!-- Page Content -->
        <main class="flex-1">
            <slot />
        </main>

        <!-- Footer -->
        <footer
            class="bg-gray15 dark:bg-darkComponent border-t border-gray30 dark:border-gray70 text-center py-4 mt-auto"
        >
            <p class="text-sm text-gray70 dark:text-gray30">{{ new Date().getFullYear() }} | Luis Iglesias</p>
        </footer>
    </div>
</template>

<style scoped></style>
