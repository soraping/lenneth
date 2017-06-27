export interface IlennethApplication {
    listen(port: number, callback?: () => void);
}