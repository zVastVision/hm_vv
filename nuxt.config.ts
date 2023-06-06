import eslintPlugin from 'vite-plugin-eslint';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    modules: [
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt',
        '@nuxt/devtools',
        '@vee-validate/nuxt'
    ],
    typescript: {
        strict: true,
    },
    devtools: {
      enabled: true
    },
    css: ['~/assets/style/_.scss', 'vue-final-modal/style.css', 'vue-toastification/dist/index.css'],
    imports: {
        dirs: ['store', 'types'],
        imports: [{
            from: 'vue-toastification',
            name: 'useToast'
        }]
    },
    pinia: {
        autoImports: [
            'defineStore',
        ],
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "@/assets/style/scss/main.scss" as *;'
                }
            }
        },
        plugins: [
            eslintPlugin()
        ],
        resolve: {
            alias: [
                {
                    find: "./runtimeConfig",
                    replacement: "./runtimeConfig.browser",
                },
            ],
        },
        define: {
            "window.global": {},
        },
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    veeValidate: {
        autoImports: true,
    },
    runtimeConfig: {
        app: {
            encodingQueue: 'encoding_queue'
        }
    }
})
