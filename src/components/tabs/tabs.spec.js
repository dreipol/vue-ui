import UiTabs from './tabs.vue';
import UiTab from './tab.vue';
import { expect } from 'chai';
import { shallowMount, mount } from '@vue/test-utils';

const css = `
.ui-tab, .ui-tab__is-active {
        position: relative;
        opacity: 0;
}
.ui-tab__is-closing {
    opacity: 0;
    transition: opacity 500ms;
}
.ui-tab__is-opening {
    opacity: 1;
    transition: opacity 500ms;
}

.ui-tab__is-active {
    opacity: 1;
}
.ui-tabs--tab, .ui-tabs--tab__is-active {
    color: rgba(0, 0, 0, 1);
}

.ui-tabs--tab__is-entering, .ui-tabs--tab__is-leaving {
    transition: color 500ms;
    color: rgba(0, 0, 0, 0.5);
}
`;

const TabContent = {
    template: `<p>Hello Body</p>`,
};
const TabLabel = {
    template: `<h1>Hello Tab</h1>`,
};

const contentWrapper = shallowMount(TabContent).vnode;
const labelWrapper = shallowMount(TabLabel).vnode;

const TabMock = ({ tabId, hasAnimation } = { tabId: null, hasAnimation: null }) => {
    const tab = shallowMount(UiTab, {
        propsData: {
            tabId: tabId,
            hasAnimation: hasAnimation,
        },
    });
    tab.vm.$slots['tab-label'] = labelWrapper;
    tab.vm.$slots['tab-body'] = contentWrapper;
    
    return tab.vm;
};


describe('Component Tabs', () => {
    const styleNode = document.createElement('style');
    
    before(() => {
        styleNode.innerHTML = css;
        document.head.appendChild(styleNode);
    });
    
    after(() => {
        document.head.removeChild(styleNode);
    });
    
    
    it('is an object', () => {
        expect(UiTabs).to.be.an('object');
        expect(UiTabs).to.be.not.empty;
    });
    it('renders Tabs', () => {
        const wrapper = mount(UiTabs);
        wrapper.setData({ initTabs: [TabMock(), TabMock(), TabMock()] });
        expect(wrapper.find('h1').element.innerText).to.be.equal('Hello Tab');
    });
    it('fires activeTab on click', () => {
        const wrapper = mount(UiTabs, {
        });
        wrapper.setData({ initTabs: [TabMock(), TabMock(), TabMock()] });
        wrapper.findAll('.ui-tabs--tab').wrappers[1].element.click();
        expect(wrapper.vm.tabs[1].isActive).to.be.equal(true);
    });
    it('sets state.entering.tab by clicking on tab', () => {
        const wrapper = mount(UiTabs, {
            propsData: {
                selectedTab: 1,
            },
        });
        wrapper.setData({ initTabs: [TabMock({ tabId: 1 }), TabMock(), TabMock()] });
        expect(wrapper.vm.state.isEntering.tab).not.to.be.equal(null);
    });
    it('dos not set state.entering.tab if no active Tab', () => {
        const wrapper = mount(UiTabs);
        wrapper.setData({ initTabs: [TabMock(), TabMock(), TabMock()] });
        expect(wrapper.vm.state.isEntering.tab).to.be.equal(null);
    });
    it('has "is-entering" class if is animating in', () => {
        const wrapper = mount(UiTabs, {
            propsData: {
                selectedTab: 1,
            },
        });
        wrapper.setData({ initTabs: [TabMock({ tabId: 1 }), TabMock(), TabMock()] });
        const clickElement = wrapper.findAll('.ui-tabs--tab').wrappers[2];
        
        clickElement.element.click();
        expect(clickElement.element.classList.contains('ui-tabs--tab__is-entering')).to.be.equal(true);
        //expect(clickElement.element.classList)
    });
    it('has no "is-entering" class if animation is done', () => {
        const wrapper = mount(UiTabs, {
            propsData: {
                selectedTab: 1,
            },
        });
        wrapper.setData({ initTabs: [TabMock({ tabId: 1 }), TabMock(), TabMock()] });
        const clickElement = wrapper.findAll('.ui-tabs--tab').wrappers[2];
    
        wrapper.vm.onTransitionEnd(clickElement.element);
    
        expect(clickElement.element.classList.contains('ui-tabs--tab__is-entering')).to.be.equal(false);
    });
    it('has "is-leaving" class if is animating in', () => {
        const wrapper = mount(UiTabs, {
            propsData: {
                selectedTab: 1,
            },
        });
        wrapper.setData({ initTabs: [TabMock({ tabId: 1 }), TabMock(), TabMock()] });
        const lastActiveElement = wrapper.findAll('.ui-tabs--tab').wrappers[0];
        const clickElement = wrapper.findAll('.ui-tabs--tab').wrappers[2];
        
        clickElement.element.click();
        expect(lastActiveElement.element.classList.contains('ui-tabs--tab__is-leaving')).to.be.equal(true);
        //expect(clickElement.element.classList)
    });
    it('has no "is-leaving" class if animation is done', () => {
        const wrapper = mount(UiTabs, {
            propsData: {
                selectedTab: 1,
            },
        });
        wrapper.setData({ initTabs: [TabMock({ tabId: 1 }), TabMock(), TabMock()] });
        const lastActiveElement = wrapper.findAll('.ui-tabs--tab').wrappers[0];
        const clickElement = wrapper.findAll('.ui-tabs--tab').wrappers[2];
    
        clickElement.element.click();
    
        wrapper.vm.onTransitionEnd(lastActiveElement.element);

        expect(lastActiveElement.element.classList.contains('ui-tabs--tab__is-leaving')).to.be.equal(false);
    });
    it('has "is-active" class when tab is active', () => {
        const wrapper = mount(UiTabs, {
            propsData: {
                selectedTab: 1,
            },
        });
        wrapper.setData({ initTabs: [TabMock({ tabId: 1 }), TabMock(), TabMock()] });

        expect(wrapper.findAll('.ui-tabs--tab').wrappers[0].element.classList.contains('ui-tabs--tab__is-active')).to.be.equal(true);
    });
});
