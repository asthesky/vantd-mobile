
<template>
    <div :class="classList" :style="styleInfo">
        Items
    </div>
</template> 


<script>
export default {
    name: 'placeholder',
    props: {
        classname: String
    },
    computed: {
        classList() {
            const list = [];
            if (this.classname) {
                var newlist = this.classname.split(' ') || [];
                newlist.forEach(function (item) {
                    list.push(item)
                }, this);
            }
            return list;
        },
        styleInfo() {
            var style = {
                backgroundColor: '#ebebef',
                color: '#bbb',
                textAlign: 'center',
                height: '0.6rem',
                fontSize: '0.3rem',
                lineHeight: '0.6rem',
                width: '100%',
            }
            return style;
        }
    }
}
</script>