# Filters

Here you can see how to use the vue filters provided by this package.

## background-image
Create the `background-image` style string from a given URL

Example:
```vue
    <div class="teaser-card--col teaser-card--right-pane"
        :style="backgroundRight | backgroundImage" />
```

## srcset
Transforms a list of urls into a valid `srcset` property

Example
```vue
<img src="..." :srcset="['http://via.placeholder.com/600x600', 'http://via.placeholder.com/1200x1200'] | srcset"/>
```
