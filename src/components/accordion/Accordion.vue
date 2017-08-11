<template>
    <div class="v-accordion" :class="clsWrapper">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'Accordion',
    props: {
        size: {
            type: String,
            default: 'md'
        },
    },
    computed: {
        clsWrapper() {
            const list = [];
            const { size } = this.$props;
            list.push('v-wingblank' + `-${size}`);
            // 
            return list;
        }
    }
};
</script>