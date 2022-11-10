import { useContext, createContext } from 'react';

export const SocketIoContext = createContext(null);
export const useSocketIo = () => useContext(SocketIoContext);
