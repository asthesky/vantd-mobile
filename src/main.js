import Flex from './components/flex'
import WhiteSpace from './components/white-space'
import WingBlank from './components/wing-blank'

const components = {
    /* General */

    /* Layout */
    Flex,
    WhiteSpace,
    WingBlank,
    // 
}

// 组件单独挂载install方法 (当组件返回的为数组时将每个组件都挂载)
Object.keys(components).forEach(item => {
    let component = components[item];
    if (Array.isArray(component)) {
        component.forEach(compItem => {
            compItem.install = function (Vue, opts = {}) {
                Vue.component(compItem.name, compItem);
            }
            // 将compItem挂载到components以便统一调用
            components[compItem.name] = compItem;
        })
    } else {
        component.install = function (Vue, opts = {}) {
            Vue.component(component.name, component);
        }
    }
});

// 组件全局挂载install方法
const install = function (Vue, opts = {}) {
    if (install.installed) return
    //
    Object.keys(components).map(item => {
        let component = components[item]
        // 如果存在安装函数component为组件
        if (component.install) {
            Vue.component(component.name, component)
        }
    });
    //   Vue.prototype.$loading = Loading.service;
    install.installed = true
};
components.install = install
// todo 加载全部
// if (typeof window !== 'undefined' && window.Vue) {
//     install(window.Vue)
// }

components.version = '0.0.1'

export default components

