<template>
    <div class="v-whitespace" :class="clsWrapper" />
</template>
<script>
export default {
    name: 'WhiteSpace',
    props: {
        size: {
            type: String,
            default: 'md'
        }
    },
    computed: {
        clsWrapper() {
            const list = [];
            const { size } = this.$props;
            list.push('v-whitespace' + `-${size}`);
            // 
            return list;
        }
    }
};
</script>
