import { ComponentFixture, ComponentFixtureAutoDetect, fakeAsync, flush, TestBed } from "@angular/core/testing";
import { NavComponent } from "./nav.component";
import { provideRouter, Router, RouterLink } from "@angular/router";
import { routes } from "../../app.routes";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

describe("NavComponent", () => {
    let fixture: ComponentFixture<NavComponent>;
    let component: NavComponent;
    let router: Router;
    let linkDes: DebugElement[];
    let routerLinks: RouterLink[];
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                NavComponent
            ],
            providers: [
                provideRouter(routes),
                { provide: ComponentFixtureAutoDetect, useValue: true },
                // { {pr : ComponentFixtureAutoDetect, useValue: true},ovide: Router, useValue: jasmine.createSpyObj("Router", ["navigate"]) }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(NavComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        linkDes = fixture.debugElement.queryAll(By.directive(RouterLink));

        routerLinks = linkDes.map((de: DebugElement) => de.injector.get(RouterLink));
        //fixture.detectChanges();
    });

    it("should have links to all pages", () => {
        expect(routerLinks.length).toBe(2);
        expect(routerLinks[0].href).toBe("/");
        expect(routerLinks[1].href).toBe("/about");
    });

    it("should have default route as home", () => {

        expect(router.url).toBe('/');

    });

    it("should navigate to about page when clicked on about link", fakeAsync(() => {
        const aboutLinkDebug = linkDes[1];
        aboutLinkDebug.triggerEventHandler("click", { button: 0 });
        flush();
        expect(router.url).toBe("/about");
    }));
});