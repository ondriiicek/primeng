import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CascadeSelect, CascadeSelectModule } from './cascadeselect';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('CascadeSelect', () => {
    let cascadeSelect: CascadeSelect;
    let fixture: ComponentFixture<CascadeSelect>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, CascadeSelectModule]
        });

        fixture = TestBed.createComponent(CascadeSelect);
        cascadeSelect = fixture.componentInstance;
    });

    it('should display by default', () => {
        fixture.detectChanges();

        const cascadeEl = fixture.debugElement.query(By.css('.p-cascadeselect-trigger'));
        expect(cascadeEl.nativeElement).toBeTruthy();
    });

    it('should call onArrowDownKey when ArrowDown key is pressed', () => {
        const keyboradEvent = new KeyboardEvent('keydown', { code: 'ArrowDown' });
        const speyOnFunc = spyOn(cascadeSelect, 'onArrowDownKey');
    
        cascadeSelect.onInputKeyDown(keyboradEvent);
    
        expect(speyOnFunc).toHaveBeenCalledTimes(1);
    });

    it('should call onArrowUpKey when ArrowUp key is pressed', () => {
        const keyboradEvent = new KeyboardEvent('keydown', { code: 'ArrowUp' });
        const speyOnFunc = spyOn(cascadeSelect, 'onArrowUpKey');
    
        cascadeSelect.onInputKeyDown(keyboradEvent);
    
        expect(speyOnFunc).toHaveBeenCalledTimes(1);
    });

    it('should call onArrowLeftKey when ArrowLeft key is pressed', () => {
        const keyboradEvent = new KeyboardEvent('keydown', { code: 'ArrowLeft' });
        const speyOnFunc = spyOn(cascadeSelect, 'onArrowLeftKey');
    
        cascadeSelect.onInputKeyDown(keyboradEvent);
    
        expect(speyOnFunc).toHaveBeenCalledTimes(1);
    });

    it('should call onArrowRightKey when ArrowRight key is pressed', () => {
        const keyboradEvent = new KeyboardEvent('keydown', { code: 'ArrowRight' });
        const speyOnFunc = spyOn(cascadeSelect, 'onArrowRightKey');
    
        cascadeSelect.onInputKeyDown(keyboradEvent);
    
        expect(speyOnFunc).toHaveBeenCalledTimes(1);
    });

    it('should call onHomeKey when Home key is pressed', () => {
        const keyboradEvent = new KeyboardEvent('keydown', { code: 'Home' });
        const speyOnFunc = spyOn(cascadeSelect, 'onHomeKey');
    
        cascadeSelect.onInputKeyDown(keyboradEvent);
    
        expect(speyOnFunc).toHaveBeenCalledTimes(1);
    });

    it('should call onEndKey when End key is pressed', () => {
        const keyboradEvent = new KeyboardEvent('keydown', { code: 'End' });
        const speyOnFunc = spyOn(cascadeSelect, 'onEndKey');
    
        cascadeSelect.onInputKeyDown(keyboradEvent);
    
        expect(speyOnFunc).toHaveBeenCalledTimes(1);
    });


    it('should call onSpaceKey when Space key is pressed', () => {
        const keyboradEvent = new KeyboardEvent('keydown', { code: 'Space' });
        const speyOnFunc = spyOn(cascadeSelect, 'onSpaceKey');
    
        cascadeSelect.onInputKeyDown(keyboradEvent);
    
        expect(speyOnFunc).toHaveBeenCalledTimes(1);
    });

    it('should call onEnterKey when Enter key is pressed', () => {
        const keyboradEvent = new KeyboardEvent('keydown', { code: 'Enter' });
        const speyOnFunc = spyOn(cascadeSelect, 'onEnterKey');
    
        cascadeSelect.onInputKeyDown(keyboradEvent);
    
        expect(speyOnFunc).toHaveBeenCalledTimes(1);
    });


    it('should call onEscapeKey when Escape key is pressed', () => {
        const keyboradEvent = new KeyboardEvent('keydown', { code: 'Escape' });
        const speyOnFunc = spyOn(cascadeSelect, 'onEscapeKey');
    
        cascadeSelect.onInputKeyDown(keyboradEvent);
    
        expect(speyOnFunc).toHaveBeenCalledTimes(1);
    });

    it('should call onTabKey when Tab key is pressed', () => {
        const keyboradEvent = new KeyboardEvent('keydown', { code: 'Tab' });
        const speyOnFunc = spyOn(cascadeSelect, 'onTabKey');
    
        cascadeSelect.onInputKeyDown(keyboradEvent);
    
        expect(speyOnFunc).toHaveBeenCalledTimes(1);
    });

    it('should call onBackspaceKey when Backspace key is pressed', () => {
        const keyboradEvent = new KeyboardEvent('keydown', { code: 'Backspace' });
        const speyOnFunc = spyOn(cascadeSelect, 'onBackspaceKey');
    
        cascadeSelect.onInputKeyDown(keyboradEvent);
    
        expect(speyOnFunc).toHaveBeenCalledTimes(1);
    });
});
