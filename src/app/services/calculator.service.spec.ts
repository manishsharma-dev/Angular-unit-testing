import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";
import {TestBed} from '@angular/core/testing';
describe('CalculatorService', () => {
    let logger : jasmine.SpyObj<LoggerService>;
    let calculatorService : CalculatorService; 
    beforeEach(() => {
        const loggerSpy = jasmine.createSpyObj('LoggerService', ['log']);
        //calculatorService = new CalculatorService(logger);
        TestBed.configureTestingModule({
            providers: [
                CalculatorService,
                { provide: LoggerService, useValue: loggerSpy }
            ]
        });
        calculatorService = TestBed.inject(CalculatorService);
        logger = TestBed.inject(LoggerService) as jasmine.SpyObj<LoggerService>;

    })
    
    it('should add two numbers', () => {
        
        const result = calculatorService.add(2, 3);

        expect(logger.log).toHaveBeenCalledTimes(1);

        expect(result).toBe(5);

    })

    it('should multiply two numbers', () => {        
        const result = calculatorService.multiply(2, 3);

        expect(logger.log).toHaveBeenCalledTimes(1);

        expect(result).toBe(6);

    });
});