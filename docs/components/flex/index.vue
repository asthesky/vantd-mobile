<template>
    <div class="flex-container">
        <h2 class="sub-title">基本</h2>
        <flex>
            <flex-item>
                <placeholder />
            </flex-item>
            <flex-item>
                <placeholder />
            </flex-item>
        </flex>
        <white-space size="lg" />
        <flex>
            <flex-item>
                <placeholder />
            </flex-item>
            <flex-item>
                <placeholder />
            </flex-item>
            <flex-item>
                <placeholder />
            </flex-item>
        </flex>
        <white-space size="lg" />
        <flex>
            <flex-item>
                <placeholder />
            </flex-item>
            <flex-item>
                <placeholder />
            </flex-item>
            <flex-item>
                <placeholder />
            </flex-item>
            <flex-item>
                <placeholder />
            </flex-item>
        </flex>
        <white-space size="lg" />
    
        <h2 class="sub-title">wrap 换行</h2>
        <flex wrap="wrap">
            <placeholder classname="inline" />
            <placeholder classname="inline" />
            <placeholder classname="inline" />
            <placeholder classname="inline" />
            <placeholder classname="inline" />
            <placeholder classname="inline" />
            <placeholder classname="inline" />
        </flex>
        <white-space size="lg" />
    
        <h2 class="sub-title">轴对齐方式</h2>
        <flex justify="center">
            <placeholder classname="inline" />
            <placeholder classname="inline" />
            <placeholder classname="inline" />
        </flex>
        <white-space />
        <flex justify="flex-end">
            <placeholder classname="inline" />
            <placeholder classname="inline" />
            <placeholder classname="inline" />
        </flex>
        <white-space />
        <flex justify="space-between">
            <placeholder classname="inline" />
            <placeholder classname="inline" />
            <placeholder classname="inline" />
        </flex>
    
        <white-space />
        <flex align="flex-start">
            <placeholder classname="inline" />
            <placeholder classname="inline small" />
            <placeholder classname="inline" />
        </flex>
        <white-space />
        <flex align="flex-end">
            <placeholder classname="inline" />
            <placeholder classname="inline small" />
            <placeholder classname="inline" />
        </flex>
        <white-space />
        <flex align="baseline">
            <placeholder classname="inline" />
            <placeholder classname="inline small" />
            <placeholder classname="inline" />
        </flex>
    
    </div>
</template>

<script>
import Placeholder from './placeholder.vue'

export default {
    components: {
        Placeholder
    }
}
</script>

<<style>
html{
    font-size: 100px !important; 
}

.flex-container {
  margin: 0 0.30rem;
}
.flex-container .inline {
  width: 1.6rem!important;
  margin: 0.18rem 0.18rem 0.18rem 0;
}
.flex-container .small {
  height: 0.4rem!important;
  line-height: 0.4rem!important;
}
.sub-title {
  color: #888;
  font-size: .28rem;
  padding: 30px 0 18px 0;
}
</style>
