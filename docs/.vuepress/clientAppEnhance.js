import SolanaCodeGroup from './components/SolanaCodeGroup.vue'
import SolanaCodeGroupItem from './components/SolanaCodeGroupItem.vue'
import './styles/index.scss'

import { defineClientAppEnhance } from '@vuepress/client'

export default defineClientAppEnhance(({ app, router, siteData }) => {
    app.component('SolanaCodeGroup', SolanaCodeGroup)
    app.component('SolanaCodeGroupItem', SolanaCodeGroupItem)
})