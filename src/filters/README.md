# Filters
The package includes a few basic filters to simplify common tasks.

## background-image
Create a `background-image` style string from a given URL.

Example:
```vue
    <!-- Without filter -->
    <div :style="{ 'background-image': 'url(./image.jpg)' }"/>

    <!-- With filter -->
    <div :style="'./image.jpg' | backgroundImage"/>
```

## srcset
Transforms a list of urls into a valid `srcset` property.

Example:
```vue
    <img src="./image@1x.jpg" :srcset="['./image@1x.jpg', './image@2x.jpg'] | srcset"/>
    <!-- Result: `<img src="./image@1x.jpg" :srcset="'./image@1x.jpg 1x, ./image@2x.jpg 2x'"/>` -->
```
