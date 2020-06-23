declare type BootOption = {
    mongoUri: string;
    port: number;
};
export default function (options: BootOption): Promise<void>;
export {};
