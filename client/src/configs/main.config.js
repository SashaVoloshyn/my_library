export const mainConfig = {
    ENVIRONMENT_VARIABLE: process.env.REACT_APP_ENVIRONMENT_VARIABLE || 'dev',
    SERVER_URL: process.env.REACT_APP_SERVER_URL || 'http://localhost:2000',

    DOMAIN_NAME: process.env.REACT_APP_DOMAIN_NAME || 'https://my-domain.ua',
    PROJECT_NAME: process.env.REACT_APP_PROJECT_NAME || 'my-project',

    CLOUD_DOMAIN_NAME: process.env.REACT_APP_LOUD_DOMAIN_NAME,

    ROOT_EMAIL: process.env.REACT_APP_ROOT_EMAIL,

    GOOGLE_CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    GOOGLE_SECRET_KEY: process.env.REACT_APP_GOOGLE_SECRET_KEY,
};