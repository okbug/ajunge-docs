import { expect } from 'chai' // jest 中的断言库
import Button from '@/packages/button';
import Icon from '@/packages/icon';

import {createApp} from 'vue/dist/vue.esm-bundler.js'

describe('HelloWorld.vue', () => {
  it('button能否正常显示', () => {
    // 目前vue3 还没有匹配的vue/test-utils
    const container = document.createElement('div');
    const app = createApp({
      template: `<zf-button>hello</zf-button>`,
      components: {
        "zf-button": Button,
      }
    }, {
      icon: 'edit',
    }).use(Icon).mount(container);
    let html = app.$el.innerHTML;
    document.body.appendChild(container)
    expect(html).to.match(/hello/);
    // expect(app.$el.innerHTML).to.be('helloworld')
  });
  // todo....
})
