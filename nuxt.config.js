import colors from 'vuetify/es5/util/colors'

export default {
    mode: 'universal',
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        titleTemplate: '%s - soa-karaoke-client',
        title: 'soa-karaoke-client',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' },
            { name: 'theme-color', content: '#4caf50'}
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/vuetify
        '@nuxtjs/vuetify',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/auth-next'
    ],

    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        theme: {
            dark: true,
            themes: {
                dark: {
                    primary: colors.blue.darken2,
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3
                }
            }
        }
    },
    router: {
        middleware: ['auth']
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},

    axios: {
        baseURL: 'http://q.josvar.com:3000'
    },

    auth: {
        strategies: {
            local: {
                token: {
                    property: 'access_token',
                    global: true,
                    required: true,
                    type: 'Bearer'
                },
                user: {
                    property: '',
                    autoFetch: true
                },
                endpoints: {
                    login: { url: '/auth/login', method: 'post' },
                    logout: false,
                    user: { url: '/me', method: 'get', propertyName: false }
                }
            }
        }
    }

}