# To enable ssh & remote debugging on app service change the base image to the one below
# FROM mcr.microsoft.com/azure-functions/node:4-node16-appservice
FROM mcr.microsoft.com/azure-functions/node:4-node16

ENV AzureWebJobsScriptRoot=/home/site/wwwroot \
    AzureFunctionsJobHost__Logging__Console__IsEnabled=true \
    AzureWebJobsStorage=DefaultEndpointsProtocol=https;AccountName=assg3cs519am811d;AccountKey=Y+7JrHrSaCcqlHKKiW6Ih3w5aaqm0ndy5DEZUjBri515sCQ4wF3YNpN38CVWovIsmCsRgj8XRMSi+AStWrPntQ==;EndpointSuffix=core.windows.net \
    CONNECTION_STRING=AccountEndpoint=https://cs-519-assg-5-am.documents.azure.com:443/;AccountKey=60PUo2tmk6udXP4LVamW81BlPD3fRPJrvVdWQDCHOjYM7YgNGbo669B8GGVWrKgICMqpshdbTzDfACDbo5mdPg==; \
    CORS_ALLOWED_ORIGIN='["*"]'

COPY . /home/site/wwwroot

RUN cd /home/site/wwwroot && \
    npm install \
    npm install node-fetch@2