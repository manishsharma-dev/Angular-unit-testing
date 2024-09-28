import { ComponentFixture, fakeAsync, flush, TestBed, tick, waitForAsync } from "@angular/core/testing";
import { UserComponent } from "./user.component";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('UserComponent', () => {

    let fixture: ComponentFixture<UserComponent>;
    let component: UserComponent;
    let el: DebugElement;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                UserComponent
            ]
        }).compileComponents();


        fixture = TestBed.createComponent(UserComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        fixture.detectChanges();
    })

    it("should show user name after clicking on button - done", (done) => {
        const buttonElement: HTMLButtonElement = fixture.nativeElement.querySelector('button');
        buttonElement.click();
        fixture.detectChanges();

        setTimeout(() => {
            expect(component.username).toBe("Leanne Graham");
            done();
        }, 1000)
    });

    // it("should show user name after clicking on button - fakeAsync", fakeAsync(() => {
    //     const buttonElement: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    //     buttonElement.click();
    //     fixture.detectChanges();

    //     //tick(1000);
    //     flush();
    //     expect(component.username).toBe("Leanne Graham");

    // }));

    it("should show user name after clicking on button - waitForAsync", waitForAsync(() => {
        const buttonElement: HTMLButtonElement = fixture.nativeElement.querySelector('button');
        buttonElement.click();
        fixture.whenStable().then(() => {
            expect(component.username).toBe("Leanne Graham");
        });

        //tick(1000);
        // flush();
        

    }));


});

