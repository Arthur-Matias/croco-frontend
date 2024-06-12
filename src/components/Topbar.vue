<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import Submenu, { Item } from './Submenu.vue';

let isExpanded = ref(true);
let displaySubmenu = ref(false);

// interface Props{
//   optionTitles: string[],
//   options: Item[]
// }

import { defineProps } from 'vue'

const props = defineProps({
  optionTitles: {
    type: Array<String>,
    default: [],
    required: true
  },
  options: {
    type: Array<Item>,
    default: []
  }
})

let firstOptions: Item[] = [];
let lastOptions: Item[] = [];
props.options.map((e, i)=>{
  if (i < props.options.length/2) {
    firstOptions.push(e)
  }else{
    lastOptions.push(e)
  }
})

let subMenuInfo = ref<Item>(props.options[0]);

function handleScroll() {
  const offset = (window.innerHeight / 10) * 2;
  isExpanded.value = window.scrollY <= offset;
}
onBeforeUnmount(()=>{
  window.removeEventListener('scroll', handleScroll);
});
onMounted(()=>{
  window.addEventListener('scroll', handleScroll);
});
function beforeEnter(el: Element) {
  let element = el as HTMLElement;
  element.style.transform = 'scaleY(0)';
}
function enter(el: Element, done: ()=>void) {
  let element = el as HTMLElement;
  let progress = 0;
  let interval: number;
  interval = setInterval(()=>{
  progress+=0.02
    element.style.transform = `scaleY(${progress})`;
    // console.log(progress)
    if(progress > 1){stopInterval()}
  },1)
  function stopInterval(){
    element.style.transform = 'scaleY(1)';
    clearInterval(interval);
    done();
  }
}
function beforeLeave(el: Element) {
  // Prepare the element for the leaving transition here...
  // el.classList.remove("open")
  // el.classList.add("close")
  let element = el as HTMLElement;
  element.style.transform = 'scaleY(1)';
}
function leave(el: Element, done: ()=>void) {
  // Apply the leaving transition here...
  // Call done() when the leaving transition is finished.
  let element = el as HTMLElement;
  let progress = 1;
  let interval: number;
  interval = setInterval(()=>{
  progress-=0.02
    element.style.transform = `scaleY(${progress})`;
    // console.log(progress)
    if(progress < 0){stopInterval()}
  },1)
  function stopInterval(){
    element.style.transform = 'scaleY(1)';
    clearInterval(interval);
    done();
  }
}
function handleMouseLeave(){
  // const element = event.target as HTMLElement;
  displaySubmenu.value = false;
}
function handleMouseOver(event: MouseEvent){
  // console.log("entrou")
    // displaySubmenu.value = true;

  let target = event.target as HTMLElement;
  console.log("entrou")
  console.log(target.id)
  console.log(props.options[props.optionTitles.indexOf(target.id)])
  // let timeout = setTimeout(()=>{
  // }, 1000)
  displaySubmenu.value = false;
  if(props.optionTitles.includes(target.id)){
    subMenuInfo.value = props.options[props.optionTitles.indexOf(target.id)];
    displaySubmenu.value = true;
  }
}

</script>

<template>
  <nav id="navbar" class="navbar fixed-top bg-black px-3 mb-3 justify-content-center align-items-center" :class="{ expanded: isExpanded }" v-on:mouseleave="handleMouseLeave">
      <ul class="nav nav-pills">
        <li class="nav-item" v-for="item in firstOptions">
          <router-link class="nav-link text-primary" @mouseover="handleMouseLeave" v-if="item.link" :to="item.link">{{item.title}}</router-link>
          <a class="nav-link text-primary" :id="item.id" @mouseover="handleMouseOver" v-else>{{item.title}}</a>
        </li>
        
        <li class="nav-item">
          <a class="nav-link position-relative" href="#">
            <img id="logo-expanded" class="position-absolute" src="/croco-full.png" alt="Crocodiles">
            <img id="logo" class="position-absolute" src="/croco.png" alt="Crocodiles">
          </a>
        </li>

        <li class="nav-item" v-for="item in lastOptions">
          <router-link class="nav-link text-primary" @mouseover="handleMouseLeave" v-if="item.link" :to="item.link">{{item.title}}</router-link>
          <a class="nav-link text-primary" :id="item.id" @mouseover="handleMouseOver" v-else>{{item.title}}</a>
        </li>
      </ul>
      <transition
        name="scale"
        @before-enter="beforeEnter"
        @enter="enter"
        @before-leave="beforeLeave"
        @leave="leave"
      >
        <div class="sub-menu" :class="{open: isExpanded, close: !isExpanded}" v-if="displaySubmenu">
          <Submenu :id="subMenuInfo.id" :title="subMenuInfo.title" :options="subMenuInfo.options"/>
        </div>
      </transition>
    </nav>
</template>

<style lang="scss" scoped>
#navbar{
    transition: ease .2s;
    height: $topbarMin;
    
    .nav-link{
      transition: ease-in-out .2s ;
      color: $primary !important;
      font-style: normal;
      font-weight: 700;
      text-transform: uppercase;
    }
    li:has(#logo){
      margin: 0 4rem;
      // order: 1;
    }
    #logo-expanded{
      display: none;
    }
    #logo{
      display: block;
      height: calc($topbarMin + 1vh);
      transform: translateX(-50%);
      margin-top: 0.6rem;
    }
  
    &.expanded{
      height: $topbarMax;
      .nav-link{
        
        font-size: 1.4rem !important;
        margin: 0 1rem;
      }
      li:has(#logo){
        margin: 0 6rem;
      }
      #logo-expanded{
        display: block;
        // color: transparent !important;
        // left: 52.5%;
        transform: translateX(-50%);
        height: calc($topbarMax + 4vh);
        margin-top: -3.1vh;
      }
  
      #logo{
        display: none;
      }
    }
    .sub-menu{
      position: absolute;
      left: 0;
      top: 100%;
      height: 100% * 2.5;
      width: 100%;
      background-color: $secondary;
      z-index: -1;
      transform-origin: top;
      // scale: 0 1;
      // &.open{
      //   animation: .5s expand;
      // }
      // &.close{
      //   animation: .5s expand reverse
      // }
    }
  }
</style>
