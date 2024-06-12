<script setup lang="ts">
import { ref } from 'vue';
import layout from '../components/_layout.vue'

let blurRef = ref<HTMLElement>();
let linesRef = ref<HTMLElement>();
let line1Ref = ref<HTMLElement>();
let line2Ref = ref<HTMLElement>();

function handleMouseMove(e: MouseEvent){
    var y = (e.clientY ) + window.scrollY;
    if(linesRef.value && line1Ref.value && line2Ref.value && y < (window.innerHeight - window.innerHeight * 0.1) && y > window.innerHeight * 0.30){
        linesRef.value.style.top = (y-(0.30* window.innerHeight)) + 'px';
        line1Ref.value.style.backgroundPositionY = -(y - (0.33 * window.innerHeight)) + 'px';
        line2Ref.value.style.backgroundPositionY = -(y - (0.17 * window.innerHeight)) + 'px';
    }
}
</script>


<template>
    <layout>
        <div class="home-section bg-danger" @mousemove="handleMouseMove">
            <div class="h-100 bg-img position-relative">
                <div class="h-100 bg-blur" ref="blurRef"></div>
                <div class="lines" ref="linesRef">
                    <div class="line" ref="line1Ref">
                        <div class="line__inner"></div>
                    </div>
                    <div class="line" ref="line2Ref">
                        <div class="line__inner"></div>
                    </div>
                </div>
                <div class="section d-flex flex-column justify-content-between rounded-1">
                    <h2 class="fs-1">description title</h2>
                    <p class="fs-4">a lorem ipsum of a great description</p>
                    <div class="w-100 d-flex align-items-center justify-content-end">
                        <button class="btn btn-outline-primary fs-4">Confira</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="position-relative home-section">
            <div class="container">

            </div>
        </div>
    </layout>
</template>


<style lang="scss" scoped>
.home-section{
    height: 90vh
}
.bg-img {
    position: relative;
    background-image: url("/drible.jpg");
    background-position: top;
    background-repeat: no-repeat;
    background-size: cover;
}

.bg-blur {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($color: $secondary, $alpha: 0.7);
    backdrop-filter: blur(.3rem);
}

.lines {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: transparent
    // background: red; /* Change this to the color you want */
}

.line {
    height: 10vh;
    background-image: url("/drible.jpg");
    background-position: top;
    background-repeat: no-repeat;
    background-size: cover;
    // background-color: $secondary;
    box-shadow: 0 0 0.3rem rgba($color: $secondary, $alpha: 1) inset;
    &:first-of-type{
        margin-bottom: 5vh;
    }

    .line__inner{
        height: 100%;
        width: 100%;
        background-color: rgba($color: white, $alpha: 0.5);
        // opacity: .1;
    }
}
.section{
    position: absolute;
    right: 0;
    bottom: 10vh;
    background-color: $secondary;
    padding: 2rem;
    padding-right: 4rem;
    width: 60%;
    min-height: 200px;
    // border-radius: .2rem;

    h2{
        color: $primary;
    }
    p{
        color: white;
    }
}
</style>

