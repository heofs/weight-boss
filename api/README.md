# API

## Environment Variables

Download file from service accounts in Firebase console

`export GOOGLE_APPLICATION_CREDENTIALS="/home/user/Downloads/service-account-key.json"`

## `npm run watch`

Will start function in watch mode.

Run while in folder `api/functions/`.

## `firebase deploy --only functions`

Firebase has to be set up first by running

- `npm install -g firebase-tools`
- `firebase login`

## Running tests

To run tests add your Project ID and API key to

`functions/.env`

```bash
PROJECT_ID="firebase-project-dev"
API_KEY="key"
SERVICE_KEY_LOCATION="./service-key.json"
```
