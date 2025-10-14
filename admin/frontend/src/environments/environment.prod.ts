export const environment = {
  production: true,
  HOST: 'http://localhost',
  FRONT_PORT: process.env.FRONT_PORT || '4500',
  STS_PORT: process.env.STS_PORT || '5000',
  MS_MONGO_PORT: process.env.MS_MONGO_PORT || '5050',
  STS_SERVER: process.env.STS_SERVER || 'https://sts.skoruba.local',
  STS_ADMIN_SERVER: process.env.STS_ADMIN_SERVER || 'https://admin.skoruba.local',
  GO_PORT: process.env.GO_PORT || '8085',
  PATH: "",
  USE_AUTHORITY_SERVER: process.env.USE_AUTHORITY_SERVER ? false : true,
  CLIENT_ID: process.env.CLIENT_ID || 'feature_toggle_admin',
  useNgxSocket: true
}

