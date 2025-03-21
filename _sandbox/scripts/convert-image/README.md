# Generate image variants


Generates images of various aspect ratios & background gradients based on supplied settings.


```shell

  node convert-image-variants.js --workDir=./img/atc-025 --output=output --outputItems='[
    {"aspectRatio": "9:16", "backgroundType": "gradient"},
    {"aspectRatio": "16:9", "backgroundType": "black"},
    {"aspectRatio": "4:3", "backgroundType": "gradient"},
    {"aspectRatio": "1:1", "backgroundType": "black"}
  ]'
  
```
