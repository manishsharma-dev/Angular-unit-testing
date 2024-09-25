import { LoggerService } from "./logger.service";


describe('LoggerService', () => {

    it('should log a message', () => {

        spyOn(console, 'log');
        const message = 'Angular Unit Testing';
        const loggerService = new LoggerService();
        loggerService.log(message);
        
        expect(console.log).withContext(`Should have been called only once`).toHaveBeenCalledTimes(1);

        expect(console.log).toHaveBeenCalledWith(`LOGGER LOG:${message}`);

    });
});