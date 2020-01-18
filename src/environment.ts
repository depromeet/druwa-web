export const isProduction = process.env.NODE_ENV === 'production';

// NOTE: Netlify에서 제공되는 환경변수 입니다.
export const deployUrl = process.env.DEPLOY_URL ?? 'http://localhost:4200';
