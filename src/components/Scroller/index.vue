<template>
    <div class="wrapper" ref="wrapper">
        <slot></slot>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
    name: 'Scroller',
    data(){
        return{
            scrollObj: null
        }
    },
    props: {
        handleToScroll: {
            type: Function,
            default: function(){}
        },
        handleToTouchEnd: {
            type: Function,
            default: function(){}
        }
    },
    mounted(){
         this.scrollObj = new BScroll(this.$refs.wrapper, {
            tap: true,
            probeType: 1
        });
        this.scrollObj.on('scroll', (pos) => {
            this.handleToScroll(pos);
        });
        this.scrollObj.on('touchEnd', (pos) => {
            this.handleToTouchEnd(pos);
        });
    },
    methods: {
        toScrollTop(posY){
            this.scrollObj.scrollTo(0, posY);
        }
    }
}
</script>
<style scoped>
.wrapper{
    height: 100%;
}
</style>