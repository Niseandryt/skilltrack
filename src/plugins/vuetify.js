import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

export default createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: { mdi }
    },
    theme: {
        defaultTheme: 'light',
        themes: {
            light: {
                dark: false,
                colors: {
                    primary: '#3F63C8',
                    secondary: '#7C8DB0',
                    accent: '#22B8A8',
                    background: '#F4F6FB',
                    surface: '#FFFFFF',
                    error: '#D64545'
                }
            },
            dark: {
                dark: true,
                colors: {
                    primary: '#7C9CF0',
                    secondary: '#9AA7C7',
                    accent: '#3ED2C0',
                    background: '#161B27',
                    surface: '#1F2635',
                    error: '#EF6B6B'
                }
            }
        }
    }
})
