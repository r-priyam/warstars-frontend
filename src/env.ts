const env = process.env.VUE_APP_ENV;

let envApiUrl = '';

if (env === 'production') {
	envApiUrl = `https://${String(process.env.VUE_APP_DOMAIN_PROD)}`;
} else if (env === 'staging') {
	envApiUrl = `https://${String(process.env.VUE_APP_DOMAIN_STAG)}`;
} else {
	envApiUrl = `http://${String(process.env.VUE_APP_DOMAIN_DEV)}`;
}

export const apiUrl = envApiUrl;
export const appName = process.env.VUE_APP_NAME;
