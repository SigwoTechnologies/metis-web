import { Buffer } from 'buffer';

const getBufferString = (value: string) => `0x${Buffer.from(value).toString('hex')}`;

export default getBufferString;
