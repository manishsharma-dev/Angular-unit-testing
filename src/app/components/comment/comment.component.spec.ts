import { ComponentFixture, TestBed } from "@angular/core/testing"
import { CommentComponent } from "./comment.component"
import { CommentsService } from "../../services/comments.service"
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { trigger } from "@angular/animations";

describe(('CommentComponent'), () => {
    let commentsService: jasmine.SpyObj<CommentsService>;
    let fixture: ComponentFixture<CommentComponent>;
    let component: CommentComponent;
    let el: DebugElement;
    beforeEach(async () => {
        const commSpy = jasmine.createSpyObj('CommentsService', ['getAllComments', 'postComment']);
        await TestBed.configureTestingModule({
            imports: [
                CommentComponent
            ],
            providers: [
                {
                    provide: CommentsService
                    , useValue: commSpy
                }
            ]
        }).compileComponents();

        commentsService = TestBed.inject(CommentsService) as jasmine.SpyObj<CommentsService>;
        fixture = TestBed.createComponent(CommentComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
    })

    it("should have a input and button present", () => {
        expect(el.query(By.css('h1')).nativeElement.innerText).toBe("welcome to comments section");
        expect(fixture.nativeElement.querySelector('h1').innerText).toBe("welcome to comments section");
        expect(fixture.nativeElement.querySelector('button')).toBeTruthy();
        expect(fixture.nativeElement.querySelector('button')).toBeTruthy();
    });

    it("should load comments on initialization", () => {
        const comments = [
            {
                id: 1,
                text: "This is a comment"
            },
            {
                id: 2,
                text: "This is another comment"
            }
        ];
        commentsService.getAllComments.and.returnValue(of(comments));
        fixture.detectChanges();
        console.log(el.queryAll(By.css('li')));

        expect(el.queryAll(By.css('li')).length).toBe(2);
    });

    it("should display alert if comment text is empty is submission", () => {
        spyOn(window, 'alert');
        component.text = "";
        component.handleSubmit();
        expect(window.alert).toHaveBeenCalledOnceWith("Please add a comment");
        expect(commentsService.postComment).not.toHaveBeenCalled();

    });

    it("should add a comment on UI when user types and clicks on post button", () => {
        const comments = {
            id: 1,
            text: "This is a new test comment by jasmine"
        }
        spyOn(Date, 'now').and.returnValue(comments.id);
        commentsService.getAllComments.and.returnValue(of([]));
        fixture.detectChanges();
        commentsService.postComment.and.returnValue(of(comments));

        //simulate user typing a comment
        const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');
        inputElement.value = comments.text;
        inputElement.dispatchEvent(new Event('input'));

        //simulate click on post button
        const buttonElement: HTMLButtonElement = fixture.nativeElement.querySelector('button');
        buttonElement.click();
        fixture.detectChanges();
        const commentsLiElement = fixture.nativeElement.querySelectorAll('li');

        expect(commentsLiElement.length).toBe(1);
        expect(commentsLiElement[0].innerText).toBe(comments.text);
        expect(commentsService.postComment).toHaveBeenCalledOnceWith(comments);

    });

})