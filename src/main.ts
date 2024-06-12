import { createApp } from 'vue'
import { createRouter, createMemoryHistory } from 'vue-router'
// import "./styles/_variables.scss"
import './styles/animations.scss'

import './styles/global.scss'
import "bootstrap/scss/bootstrap.scss";
import "bootstrap/dist/js/bootstrap.js";

// import App from './App.vue'
import Home from './Views/Home.vue'
import Teams from './Views/Teams.vue'
import Contact from './Views/Contact.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/teams', component: Teams },
    { path: '/teams/[:teamID]/team-history', component: Teams },
    { path: '/teams/[:teamID]/cast', component: Teams },
    { path: '/teams/[:teamID]/coaches', component: Teams },
    { path: '/teams/[:teamID]/awards', component: Teams },
    { path: '/teams/[:teamID]/achievements', component: Teams },
    { path: '/about', component: Contact },
    { path: '/about/history', component: Contact },
    { path: '/about/news', component: Contact },
    { path: '/about/agenda', component: Contact },
    { path: '/store', component: Contact },
    { path: '/other', component: Contact },
    { path: '/other/kids', component: Contact },
    { path: '/other/social', component: Contact },
    { path: '/other/agenda', component: Contact },
    { path: '/contact', component: Contact },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes
});

createApp(Home)
    .use(router)
    .mount('#app')
