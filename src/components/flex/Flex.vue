<template>
    <div class="v-flexbox" :class="clsWrapper">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'Flex',
    props: {
        align: {
            type: String
        },
        direction: {
            type: String
        },
        wrap: {
            type: String
        },
        justify: {
            type: String
        },
        alignContent: {
            type: String
        }
    },
    computed: {
        clsWrapper() {
            const list = [];
            const { align, direction, wrap, justify, alignContent } = this.$props;
            if (align) {
                list.push(`v-align-${align}`)
            }
            if (direction) {
                list.push(`v-direct-${direction}`)
            }
            if (wrap) {
                list.push(`v-wrap-${wrap}`)
            }
            if (justify) {
                list.push(`v-justify-${justify}`)
            }
            if (alignContent) {
                list.push(`v-aligncont-${alignContent}`)
            }
            // 
            return list;
        }
    }
};
</script>
