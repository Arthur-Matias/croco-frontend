<script setup lang="ts">
import { Item } from '../components/Submenu.vue';
// import { Item } from './components/Submenu.vue';
import Topbar from '../components/Topbar.vue'
import Footer from '../components/Footer.vue'
// import Topbar from './Topbar.vue'


const getTeamOptions:(t: string)=>Item[] = (team: string)=>{
    return [
        {
            id: "team-history",
            title: "História",
            link: `teams/${team}/team-history`,
        },
        {
            id: "cast",
            title: "Elenco",
            link: `teams/${team}/cast`,
        },
        {
            id: "coaches",
            title: "Comissão Técnica",
            link: `teams/${team}/coaches`,
        },
        {
            id: "awards",
            title: "Premiações",
            link: `teams/${team}/awards`,
        },
        {
            id: "achievements",
            title: "Hall da Fama",
            link: `teams/${team}/hall`,
        }
    ]
}
// const teamsSubOptions: Item[] = [
//     {
//         id: "team-history",
//         title: "História",
//         link: "teams/[:teamID]/history",
//     },
//     {
//         id: "cast",
//         title: "Elenco",
//         link: "teams/[:teamID]/cast",
//     },
//     {
//         id: "coaches",
//         title: "Comissão Técnica",
//         link: "teams/[:teamID]/coaches",
//     },
//     {
//         id: "awards",
//         title: "Premiações",
//         link: "teams/[:teamID]/awards",
//     },
//     {
//         id: "achievments",
//         title: "Hall da Fama",
//         link: "teams/[:teamID]/hall",
//     },  
// ]
const options: Item[] = new Array<Item>();
options[0] = {
    id: "home",
    title: "Home",
    link: "/"
  }
options[1] = {
    id: "teams",
    title: "Times",
    options: [
        {
            id: "flag",
            title: "Flag",
            options:getTeamOptions("flag")
        },
        {
            id: "football",
            title: "Football",
            options:getTeamOptions("football")
        },
        {
            id: "cheer",
            title: "Cheerleading",
            options:getTeamOptions("cheerleading")
        }
    ]
    // subOptions: {
    //   "Flag": teamsSubOptions,
    //   "Football": teamsSubOptions,
    //   "Cheerleading": teamsSubOptions
    // }
  }
options[2] = {
    id: "about",
    title: "Sobre",
    options: [
        {
            id: "history",
            title: "História",
            link: "/about/history"
        },
        {
            id: "history",
            title: "Notícias",
            link: "/about/news"
        },
        {
            id: "agenda",
            title: "Calendário",
            link: "/about/agenda"
        }
    ]
}
options[3] = {
    id: "store",
    title: "Loja",
    link: "/store",
}
options[4] = {
    id: "other",
    title: "Outros",
    options: [
        {
            id: "kids",
            title: "Croco Kids",
            link: "/other/kids"
        },
        {
            id: "social-actions",
            title: "Ações Sociais",
            link: "/other/social"
        },
        {
            id: "agenda",
            title: "Calendário",
            link: "/other/agenda"
        }
    ]
}
options[5] = {
    id: "Contact",
    title: "Contato",
    link: "/contact",
}
const optionTitles = [
    "home",
    "teams",
    "about",
    "store",
    "other",
    "contact",
]

</script>

<template>
    <div id="template" class="d-flex flex-column w-100 h-100">
        <Topbar :options="options" :optionTitles="optionTitles" />
      
        <div>
            <slot></slot>
        </div>
    
        <Footer>
            <ul class="custom-list list-unstyled d-flex align-items-center ">
                <li class="m-0 me-5">
                    <router-link class="link"to="/">Home</router-link>
                </li>
                <li class="m-0 me-5">
                    <router-link class="link"to="/about/sponsorship">Patrocínios</router-link>
                </li>
                <li class="m-0 me-5">
                    <router-link class="link"to="/store">Loja</router-link>
                </li>
                <li class="m-0">
                    <router-link class="link"to="/contact">Contato</router-link>
                </li>
            </ul>
        </Footer>
    </div>
</template>

<style lang="scss" scoped>
    #template{
        padding-top: $topbarMax
    }
    .link{
        color: white;
        text-decoration: none;

        &:hover{
            color: $primary;
        }
    }

    @media screen and (max-width: 600px) {
        .custom-list{
            display: none !important;
        }
    }
</style>