import { SocketIoConfig } from "ngx-socket-io";

const config: SocketIoConfig = { url: 'https://tic-tac-toe-j.herokuapp.com/', options: {
  transports: ['websocket']
} };

export const environment = {
  production: true,
  socketConfig:config
};
