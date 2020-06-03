# swiper
Implementation of [swiper](https://swiperjs.com/). 

## Implementation
- Import the custom Swiper CSS into your project, e.g. in a file named `swiper.scss`.  

```scss
    @import 'node_modules/swiper/swiper';
    @import 'node_modules/swiper/src/components/pagination/pagination';
    @import 'node_modules/swiper/src/components/navigation/navigation';
```

- If you want to overwrite Swiper css properties you need to pay attention to the
variables as Swiper uses native variables. 

```scss
    :root {
        --swiper-theme-color: #{$c--monochrome-black};
        --swiper-navigation-size: 24px;
    
        .swiper-button-disabled {
            display: none;
        }
    
        .swiper-button-next {
            &::after {
                content: '';
            }
        }
    
        .swiper-button-prev {
            &::after {
                content: '';
            }
        }
    }
```

- If you need to support older browsers like IE, you should transpile 
Swiper and Dom7 with babel in your webpack pipeline. 

- Install [postcss-css-variables](https://www.npmjs.com/package/postcss-css-variables) 
module via npm so that the css variables of Swiper are supported

## Example Usage

```html
<div class="project-slider"
    <ui-swiper v-if="isSwiperEnabled" v-bind="{
        pagination: {
            clickable: false,
        }">
        <template slot="slides">
                <div class="swiper-slide">Slide 1</div>
                <div class="swiper-slide">Slide 2</div>
                <div class="swiper-slide">Slide 3</div>
        </template>
<tem
    </ui-swiper>
```
