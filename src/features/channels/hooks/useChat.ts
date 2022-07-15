import { useEffect, useState } from "react"
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000/chat')

export default () => {
    const [mesagges, setMessages] = useState([])

    useEffect(() => {
        socket.on('createMessage', () => {
            console.log('nuevo mensaje');
        })
    
        return () => {
          socket.off('connect');
          socket.off('disconnect');
          socket.off('pong');
        };
      }, []);
}