import { Buffer } from 'buffer';

export const getBufferString = (value: string) => `0x${Buffer.from(value).toString('hex')}`;

export default { getBufferString };
