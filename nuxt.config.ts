import { Configuration } from '@nuxt/types'

const config: Configuration = {
    srcDir: './src',

    build: {
        extend(config, { isClient, isDev }) {
            if (isDev && isClient) {
                config.module!.rules.push({
                    enforce: 'pre',
                    test: /\.(js|ts|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
        }
    },

    buildModules: ['@nuxt/typescript-build', '@nuxtjs/style-resources'],

    css: ['~/styles/main.scss'],

    styleResources: {
        scss: ['~/styles/tools/_index.scss', '~/styles/settings/_index.scss']
    },

    plugins: ['~/plugins/vue-composition-api']
}

export default config
