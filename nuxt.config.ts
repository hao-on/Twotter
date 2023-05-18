// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss'],

    runtimeConfig: {
        accessSecret: '',
        refreshSecret: '',
        cloudinaryName: '',
        cloudinaryKey: '',
        cloudinarySecret: ''
    }
})
