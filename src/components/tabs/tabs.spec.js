import UiTabs from './tabs.vue';
import UiTab from './tab.vue';
import { expect } from 'chai';
import { shallowMount, mount } from '@vue/test-utils';

const css = `
.ui-tabs--content-wrapper, .ui-tabs--content-wrapper__is-active {
        position: relative;
        opacity: 0;
}
.ui-tabs--content-wrapper__is-closing {
    opacity: 0;
    transition: opacity 500ms;
}
.ui-tabs--content-wrapper__is-opening {
    opacity: 1;
    transition: opacity 500ms;
}

.ui-tabs--content-wrapper__is-active {
    opacity: 1;
}
.ui-tabs--link, .ui-tabs--link__is-active {
    color: rgba(0, 0, 0, 1);
}

.ui-tabs--link__is-entering, .ui-tabs--link__is-leaving {
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
        wrapper.findAll('.ui-tabs--link').wrappers[1].element.click();
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
    it('has "is-entering" class on click event', () => {
        const wrapper = mount(UiTabs, {
            propsData: {
                selectedTab: 1,
            },
        });
        wrapper.setData({ initTabs: [TabMock({ tabId: 1 }), TabMock(), TabMock()] });
        const clickElement = wrapper.findAll('.ui-tabs--link').wrappers[2];
        
        clickElement.element.click();

        expect(clickElement.element.classList.contains('ui-tabs--link__is-entering')).to.be.equal(true);
    });
    it('has no "is-entering" class on onTransitionEnd event', () => {
        const wrapper = mount(UiTabs, {
            propsData: {
                selectedTab: 1,
            },
        });
        wrapper.setData({ initTabs: [TabMock({ tabId: 1 }), TabMock(), TabMock()] });
        const clickElement = wrapper.findAll('.ui-tabs--link').wrappers[2];
    
        wrapper.vm.onTransitionEnd(clickElement.element);
    
        expect(clickElement.element.classList.contains('ui-tabs--link__is-entering')).to.be.equal(false);
    });
    it('has "is-leaving" class on click event', () => {
        const wrapper = mount(UiTabs, {
            propsData: {
                selectedTab: 1,
            },
        });
        wrapper.setData({ initTabs: [TabMock({ tabId: 1 }), TabMock(), TabMock()] });
        const lastActiveElement = wrapper.findAll('.ui-tabs--link').wrappers[0];
        const clickElement = wrapper.findAll('.ui-tabs--link').wrappers[2];
        
        clickElement.element.click();
        expect(lastActiveElement.element.classList.contains('ui-tabs--link__is-leaving')).to.be.equal(true);
    });
    it('has no "is-leaving" class on onTransitionEnd event', () => {
        const wrapper = mount(UiTabs, {
            propsData: {
                selectedTab: 1,
            },
        });
        wrapper.setData({ initTabs: [TabMock({ tabId: 1 }), TabMock(), TabMock()] });
        const lastActiveElement = wrapper.findAll('.ui-tabs--link').wrappers[0];
        const clickElement = wrapper.findAll('.ui-tabs--link').wrappers[2];
    
        clickElement.element.click();
    
        wrapper.vm.onTransitionEnd(lastActiveElement.element);

        expect(lastActiveElement.element.classList.contains('ui-tabs--link__is-leaving')).to.be.equal(false);
    });
    it('has "is-active" class when tab is active', () => {
        const wrapper = mount(UiTabs, {
            propsData: {
                selectedTab: 1,
            },
        });
        wrapper.setData({ initTabs: [TabMock({ tabId: 1 }), TabMock(), TabMock()] });

        expect(wrapper.findAll('.ui-tabs--link').wrappers[0].element.classList.contains('ui-tabs--link__is-active')).to.be.equal(true);
    });
    it('has not "is-active" class when tab is clicked and hasAnimation is true', () => {
        const wrapper = mount(UiTabs, {
            propsData: {
                selectedTab: 1,
                hasAnimation: true,
            },
        });
        wrapper.setData({ initTabs: [TabMock({ tabId: 1 }), TabMock(), TabMock()] });
    
        const clickElement = wrapper.findAll('.ui-tabs--link').wrappers[2];
    
        clickElement.element.click();
    
    
        expect(clickElement.element.classList.contains('ui-tabs--link__is-active')).to.be.equal(false);
    });
    it('has "is-active" class when tab is clicked and hasAnimation is false', () => {
        const wrapper = mount(UiTabs, {
            propsData: {
                selectedTab: 1,
                hasAnimation: false,
            },
        });
        wrapper.setData({ initTabs: [TabMock({ tabId: 1 }), TabMock(), TabMock()] });
        
        const clickElement = wrapper.findAll('.ui-tabs--link').wrappers[2];
        
        clickElement.element.click();
        
        
        expect(clickElement.element.classList.contains('ui-tabs--link__is-active')).to.be.equal(true);
    });
    it('will not override hasTransition if hasAnimation is set on tab component', () => {
        const wrapper = mount(UiTabs, {
            propsData: {
                selectedTab: 1,
                hasAnimation: true,
            },
        });
        wrapper.setData({ initTabs: [TabMock({ tabId: 1 }), TabMock({ hasAnimation: false }), TabMock()] });
        
        const clickElement = wrapper.findAll('.ui-tabs--link').wrappers[1];
        
        clickElement.element.click();
        
        expect(wrapper.vm.tabs[1].hasTransition).to.be.equal(false);
    });
});
