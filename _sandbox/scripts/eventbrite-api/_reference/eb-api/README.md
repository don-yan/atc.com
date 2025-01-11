# Eventbrite API Blueprint


### TODO:
- this is not working... 

## Generating Types from `.apib` file


#### Install Dependencies

```shell

npm install -g api-spec-converter

npm install -g @openapitools/openapi-generator-cli

```


#### Convert File


```shell

api-spec-converter --from=api_blueprint --to=swagger_2 --syntax=yaml ./eventbriteapiv3public.apib > eb-swagger.yaml


openapi-generator-cli generate -i eb-swagger.yaml -g typescript-axios -o ./api-client



```
