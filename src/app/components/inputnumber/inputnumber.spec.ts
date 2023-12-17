import { TestBed, ComponentFixture } from '@angular/core/testing';
import { InputNumber } from './inputnumber';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef, Component, DebugElement, ElementRef } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
    template: `<p-inputNumber [(ngModel)]="val" [readonly]="readonly"></p-inputNumber>`
})
class TestInputNumberComponent {
    val: number;
    readonly: boolean = true;
}

describe('InputNumber', () => {
    let inputNumber: InputNumber;
    let testComponent: TestInputNumberComponent;
    let fixture: ComponentFixture<TestInputNumberComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, FormsModule],
            declarations: [InputNumber, TestInputNumberComponent]
        });

        fixture = TestBed.createComponent(TestInputNumberComponent);
        inputNumber = fixture.debugElement.children[0].componentInstance;
        testComponent = fixture.componentInstance;
    });

    it('should display by default', () => {
        fixture.detectChanges();

        const inputMaskEl = fixture.debugElement.query(By.css('input'));
        expect(inputMaskEl.nativeElement).toBeTruthy();
    });

    it('should clear value', () => {
        inputNumber.value = 10;
        inputNumber.clear();

        expect(inputNumber.value).toBe(null);
    })

    it('should write value', () => {
        inputNumber.value = 5;
        inputNumber.writeValue(10);
        expect(inputNumber.value).toBe(10);
    })

    it('should get decimal value', () => {
        const decimalNumbers: string[] = [
            '123.45',
            '67.891',
            '0.123456',
            '987.654321',
            '123.0',
            '456',
            '789.01',
            '0.001',
            '98765.4321',
            '0'
          ];
        const numOfDecUnits: number[] = [2,3,6,6,1,0,2,3,4,0];
        inputNumber._decimal = '.';

        decimalNumbers.forEach((number, index) => {
            expect(inputNumber.getDecimalLength(number)).toBe(numOfDecUnits[index]);
        })
    })

    it('should return min value', () => {
        inputNumber.min = 1000;
        const nValues: number[] = [222, 1, 22, 423, 123, 31, 12, 129, 16, 211];
        const sValues: string[] = ['222', '1', '22', '423', '123.22', '31', '12', '129', '16', '211'];

        nValues.forEach(value => {
            expect(inputNumber.validateValue(value)).toEqual(1000);
        })

        sValues.forEach(value => {
            expect(inputNumber.validateValue(value)).toEqual(1000);
        })
    })

    it('should return max value', () => {
        inputNumber.max = 10;
        const nValues: number[] = [222, 1423423, 2221423, 423556, 123, 31, 12, 129, 16, 21164564521];
        const sValues: string[] = ['2224543', '1354431312', '224564', '4236544', '123.2246456', '316546', '126456', '129', '1653453', '211'];

        nValues.forEach(value => {
            expect(inputNumber.validateValue(value)).toEqual(10);
        })

        sValues.forEach(value => {
            expect(inputNumber.validateValue(value)).toEqual(10);
        })
    })

    it('should return null value', () => {
        expect(inputNumber.validateValue('-')).toEqual(null);

        expect(inputNumber.validateValue(null)).toEqual(null);
    })

    it('should return original value', () => {
        inputNumber.max = 10000;
        inputNumber.min = 10;

        const nValues: number[] = [
            2875, 5932, 431, 8657, 729, 1543, 9381, 2774, 685, 789, 
            3621, 2436, 5219, 874, 9203, 641, 7654, 1987, 4523, 1098
        ];

        const sValues: string[] = [
            '2875', '5932', '431', '8657', '729', '1543', '9381', '2774', '685', '789', 
            '3621', '2436', '5219', '874', '9203', '641', '7654', '1987', '4523', '1098'
        ];
        
        nValues.forEach(value => {
            expect(inputNumber.validateValue(value)).toEqual(value);
        })

        sValues.forEach(value => {
            expect(inputNumber.validateValue(value)).toEqual(value);
        })
    })

    it('should delete the range', () => {
        expect(inputNumber.deleteRange('123456', 3, 5)).toBe('1236');
        expect(inputNumber.deleteRange('123456', 1, 6)).toBe('1');
        expect(inputNumber.deleteRange('123456', 0, 5)).toBe('6');
        expect(inputNumber.deleteRange('123456', 0, 6)).toBe('');
    })

    it('should check if value is changed', () => {
        const currentValue: string[] = ['22','222','2222','22222','221','2211','22111','220', '2200', '22000'];
        const newValue: string[] = ['22','222','2222','22222','2210','22110','221110','2200', '22000', '220000'];
        const result: boolean[] = [false, false, false, false, true, true, true, true, true, true];

        for (let i = 0; i < currentValue.length; i++) {           
            expect(inputNumber.isValueChanged(currentValue[i], newValue[i])).toEqual(result[i]);
        }        
    })

    it('should escape special characters in a regular expression pattern', () => {
        const inputText = '[-]{}()*+?.,^$|#';
        const expectedResult = '\\[\\-\\]\\{\\}\\(\\)\\*\\+\\?\\.\\,\\^\\$\\|\\#';
        
        const result = inputNumber.escapeRegExp(inputText);
    
        expect(result).toEqual(expectedResult);              
    });

    it('should parse value', () => {
        const values = ['22.3', '12.66', '-12345', '54321','333','567','890','3453'];

        values.forEach((value) => {
            expect(inputNumber.parseValue(value)).toBe(Number(value));
        });  
    })

    it('should insert text in the middle of the value', () => {
        const value = '12345';
        const text = 'abc';
        const start = 2;
        const end = 2;
        
        const result = inputNumber.insertText(value, text, start, end);
        
        expect(result).toBe('12abc345');
    })

    it('should insert text at the beginning of the value', () => {
        const value = '12345';
        const text = 'abc';
        const start = 0;
        const end = 0;
        
        const result = inputNumber.insertText(value, text, start, end);
    
        expect(result).toBe('abc12345');
    });

    it('should insert text at the end of the value', () => {
        const value = '12345';
        const text = 'abc';
        const start = 5;
        const end = 5;
        
        const result = inputNumber.insertText(value, text, start, end);

        expect(result).toBe('12345abc');
    });

    it('should concatenate values with a suffix character', () => {
        inputNumber._decimal = /\./;
        inputNumber.suffixChar = 'X';
    
        const val1 = '123.45';
        const val2 = '678.90';
    
        const result = inputNumber.concatValues(val1, val2);
    
        expect(result).toBe('123.90X');
    });

    it('should concatenate values without a suffix character', () => {
        inputNumber._decimal = /\./;
        inputNumber.suffixChar = null;
    
        const val1 = '123.45';
        const val2 = '678.90';    
        const result = inputNumber.concatValues(val1, val2);

        expect(result).toBe('123.90');
    });

    it('should handle empty values', () => {
        inputNumber._decimal = /\./;
        inputNumber.suffixChar = 'X';
    
        const val1 = '';
        const val2 = '678.90';    
        const result = inputNumber.concatValues(val1, val2);
    
        expect(result).toBe('');
    });
});