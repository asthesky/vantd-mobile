<template>
    <div class="v-carousel-item" :style="cssWrapper">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'CarouselItem',

    computed: {

        cssWrapper() {
            const style = {};
            // 
            return style;
        },

        carousel() {
            let parent = this.$parent
            while (parent) {
                if (parent.$options.name === 'Carousel') {
                    return parent
                } else {
                    parent = parent.$parent
                }
            }
            return null
        }
    },

    created() {
        // this.carousel && this.carousel.updateItems();
    },

    destroyed() {
        this.carousel && this.carousel.updateItems();
    }
}
</script>
