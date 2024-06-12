<script setup lang="ts">
import { ref } from 'vue';


export interface Item {
    id: string;
    title: string;
    link?: string;
    options?: Item[];
}

const props = defineProps<Item>();

let selectedItem = ref();

if(props.options){
    selectedItem.value = props.options[0];
}

</script>

<template>
    <div v-if="props" id="sub-menu" class="d-flex h-100 w-100 align-items-start justify-content-start p-5">
        <div class="wrapper align-self-center">
            <ul id="options" class="list-unstyled m-0 ms-5 me-5"v-for="option in props.options">
                <li v-on:mouseover="selectedItem = option" class="item text-white">
                    <router-link class="nav-link text-white mb-3" v-if="option.link" :to="option.link">{{ option.title }}</router-link>
                    <p :class=" { active: selectedItem == option } " class="nav-link text-white" v-else>{{ option.title }}</p>
                </li>
            </ul>
        </div>
        <div class="separator ms-5 me-5 align-self-center"></div>
        <div class="wrapper align-self-center">
            <ul id="sub-options" class="list-unstyled m-0" v-for="option in props.options">
                <li v-for="subOption in option.options" v-if="selectedItem == option && option.options">
                    <router-link class="nav-link text-white mb-1 sub-link" v-if="subOption.link" :to="subOption.link">{{ subOption.title }}</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss"scoped>
    #sub-menu{
        // margin-top: $topbarMin;
        height: $topbarMax;
        background-color: $secondary;
    }
    .separator{
        width: 1px;
        height: 100%;
        background-color: $primary;
    }
    .item{
        font-weight: 700;
        font-size: 1.4rem;
        cursor: pointer;
        &:hover, .active{
            color: $primary !important;
        }
    }
    .sub-link{
        font-size: 1.2rem
    }
    // .item-sm{
    //     font-weight: 300;
    //     font-size: 1.4rem;
    //     cursor: pointer;

    //     &:hover, .active{
    //         color: $primary !important;
    //     }
    // }
    .nav-link{
        // color: $primary !important;
        
        &:hover, 
        &.active{
            color: $primary !important;
        }
    }
</style>
