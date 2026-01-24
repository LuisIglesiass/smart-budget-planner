<script setup lang="ts">
import { computed, ref } from 'vue';

const isOpen = ref(false);
const menuId = 'primary-navigation';

const toggleMenu = () => {
    isOpen.value = !isOpen.value;
};

const closeMenu = () => {
    isOpen.value = false;
};

const ariaExpanded = computed(() => (isOpen.value ? 'true' : 'false'));
</script>

<template>
    <header class="w-full border-b border-gray15 dark:border-gray70">
        <nav class="mx-auto w-full max-w-[1200px] px-small5 md:px-large2" aria-label="Primary">
            <div class="flex items-center gap-small2 py-3">
                <!-- Left: logo + title -->
                <div class="flex items-center gap-small2 shrink-0">
                    <NuxtLink
                        to="/"
                        class="inline-flex items-center gap-small2 focus:outline-none focus:ring-2 focus:ring-primary rounded"
                    >
                        <NuxtImg src="/dev/logo.png" alt="Smart Budget Planner logo" width="75" height="75" />
                        <span class="text-lg md:text-2xl font-bold text-primary whitespace-nowrap">
                            Smart Budget Planner
                        </span>
                    </NuxtLink>
                </div>

                <!-- Center: links (desktop) -->
                <div class="hidden md:flex flex-1 justify-center">
                    <ul class="flex items-center gap-medium2">
                        <li>
                            <NuxtLink
                                to="/how-it-works"
                                class="px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                                @click="closeMenu"
                            >
                                How it works
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink
                                to="/features"
                                class="px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                                @click="closeMenu"
                            >
                                Features
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink
                                to="/about"
                                class="px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                                @click="closeMenu"
                            >
                                About
                            </NuxtLink>
                        </li>
                    </ul>
                </div>

                <!-- Right: buttons (desktop) -->
                <div class="hidden md:flex shrink-0 items-center justify-end gap-small2">
                    <NuxtLink
                        to="/login"
                        class="px-3 py-2 rounded border border-gray30 dark:border-gray70 focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        Login
                    </NuxtLink>
                    <NuxtLink
                        to="/planner"
                        class="px-3 py-2 rounded bg-primary text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        Create your budget
                    </NuxtLink>
                </div>

                <!-- Mobile: menu button -->
                <div class="md:hidden ml-auto">
                    <button
                        type="button"
                        class="inline-flex items-center justify-center px-3 py-2 rounded border border-gray30 dark:border-gray70 focus:outline-none focus:ring-2 focus:ring-primary"
                        :aria-expanded="ariaExpanded"
                        :aria-controls="menuId"
                        @click="toggleMenu"
                    >
                        <span class="sr-only">Toggle navigation menu</span>
                        <!-- simple icon -->
                        <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" class="fill-current">
                            <path d="M3 5h14v2H3V5zm0 4h14v2H3V9zm0 4h14v2H3v-2z" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Mobile panel -->
            <div :id="menuId" class="md:hidden pb-3" v-show="isOpen">
                <ul class="flex flex-col gap-small2">
                    <li>
                        <NuxtLink
                            to="/how-it-works"
                            class="block px-2 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                            @click="closeMenu"
                        >
                            How it works
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink
                            to="/features"
                            class="block px-2 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                            @click="closeMenu"
                        >
                            Features
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink
                            to="/about"
                            class="block px-2 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                            @click="closeMenu"
                        >
                            About
                        </NuxtLink>
                    </li>
                </ul>

                <div class="mt-small2 flex flex-col gap-small2">
                    <NuxtLink
                        to="/login"
                        class="px-3 py-2 rounded border border-gray30 dark:border-gray70 focus:outline-none focus:ring-2 focus:ring-primary"
                        @click="closeMenu"
                    >
                        Login
                    </NuxtLink>
                    <NuxtLink
                        to="/planner"
                        class="px-3 py-2 rounded bg-primary text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        @click="closeMenu"
                    >
                        Create your budget
                    </NuxtLink>
                </div>
            </div>
        </nav>
    </header>
</template>

<style scoped></style>
