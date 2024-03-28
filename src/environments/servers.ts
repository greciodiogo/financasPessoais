
export class Server {
  host: string;
  port: number;
  protocol: string;
  prefix: string;
  app_name:string;
  constructor(
    port: number,
    host: string = '127.16.10.1',
    app_name:string='at',
    protocol: string = 'http',
    prefix: string = 'api'
  ) {
    this.host = host;
    this.port = port;
    this.protocol = protocol;
    this.prefix = prefix;
    this.app_name = app_name;
  }
}

export const Servers = { 

  //Ambiente de DEV & Teste
  Dev: new Server(3381, 'localhost'),
  Local: new Server(3333, 'localhost'),
};
