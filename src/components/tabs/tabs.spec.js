import UiTabs from './tabs.vue';
import { expect } from 'chai';
import { mockData } from './mock-data';
import { mount } from '@vue/test-utils';

const css = `
.ui-tabs--list {
    display: flex;
}
.ui-tabs--list-item {
    color: rgba(0, 0, 0, 0.5)
}
.ui-tabs--list-item__active {
    color: rgba(0, 0, 0, 1)
}
.ui-tabs--pannel-wrapper {
    position: relative;
    transition: height 1s;
}
.ui-tabs--panel-enter, .ui-tabs--panel-leave-to {
    opacity: 0;
}
.ui-tabs--panel-enter-active, .ui-tabs--panel-leave-active {
    transition: all 1s;
    position: absolute;
}
`;

const mountWrapper = (props = {}) => mount(UiTabs, {
    propsData: { ...props },
    scopedSlots: {
        tab: '<div slot-scope="props">{{ props.title }}</div>',
        content() {
            return [
                mockData.map((data, index) => {
                    return (
                        <div title={data.tab.title} key={index}>
                            <h1>{data.content.title}</h1>
                            <p>{data.content.description}</p>
                        </div>
                    );
                }),
            ];
        },
    },
});

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
        const wrapper = mountWrapper();

        expect(wrapper.find('.ui-tabs--list-item').element).to.exist;
    });
    it('renders only one panel if isLazy is set to true', () => {
        const wrapper = mountWrapper();
    
        expect(wrapper.findAll('.ui-tabs--panel-wrapper').wrappers.length).to.be.equal(1);
    });
    it('renders all panels to dome if isLazy is set to false', () => {
        const wrapper = mountWrapper({ isLazy: false });
    
        expect(wrapper.find('.ui-tabs--panel-wrapper').element.childNodes.length).to.be.equal(4);
    });
    it('sets initial active tab', () => {
        const wrapper = mountWrapper({ initialActiveId: 2 });
    
        const tabs = wrapper.findAll('.ui-tabs--list-item').wrappers;
        
        const activeIndex = tabs.findIndex(tab => tab.element.classList.contains('ui-tabs--list-item__is-active'));
        
        expect(activeIndex).to.be.equal(2);
    });
    it('sets active tab on tab click', () => {
        const wrapper = mountWrapper();
        
        const clickTab = wrapper.findAll('.ui-tabs--list-item').wrappers[3].element;
        
        clickTab.click();
        
        expect(clickTab.classList.contains('ui-tabs--list-item__is-active')).to.be.true;
    });
});
