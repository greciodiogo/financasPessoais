import { Servers } from './servers';

export const environment = {
  production: false,
  host: Servers.Dev.host,
  port: Servers.Dev.port,
  app_url: `${Servers.Dev.protocol}://${Servers.Dev.host}:${Servers.Dev.port}/${Servers.Dev.prefix}/`,
  app: Servers.Dev.app_name,
  type: 'DEV',
};
