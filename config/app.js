import { ENV } from './env';

// some variables for build processes
export const isProduction = ENV === 'production';
export const isDebug = ENV === 'development';
export const isClient = typeof window !== 'undefined';

// the API will be located at /api/v1/*
export const apiEndpoint = isDebug ? `http://localhost:${ENV.PORT}/api/v1` : 'https://driver.wheelright.de/api/v1';

// Replace with 'UA-########-#' or similar to enable tracking
export const trackingID = null;
