import { HttpErrorResponse, provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { CommentsService } from "./comments.service";
import { API_URL } from "../utils/resources";
import COMMENTS_DATA from "../../../db.json"

describe('CommentsService', () => {

    let commentsService: CommentsService;
    let httpTesting: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CommentsService,
                provideHttpClient(),
                provideHttpClientTesting()
            ]
        });
        commentsService = TestBed.inject(CommentsService);
        httpTesting = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTesting.verify();
    });

    it('should get all comments', () => {
        const comments = COMMENTS_DATA.comments.slice(0, 2);

        commentsService.getAllComments().subscribe((result: any) => {
            expect(result).toBeTruthy();
            expect(result.length).toBe(2);
        });

        const req = httpTesting.expectOne(`${API_URL}/comments`);

        expect(req.request.method).toBe('GET');
        req.flush(comments);
    });

    it('should get a comment by id', () => {
        const comments = COMMENTS_DATA.comments[0];
        const ID = 1;

        commentsService.getCommentById(ID).subscribe((result: any) => {

            expect(result).toBeTruthy();
            expect(result.id).toBe(`${ID}`);
            expect(result.text).toBe(comments.text);
        });


        const req = httpTesting.expectOne(`${API_URL}/comments/${ID}`);

        expect(req.request.method).toBe('GET');
        req.flush(comments);
    });

    it('should save a comment', () => {
        const comment =
        {
            id: 4,
            text: 'This is a testcomment'
        };

        commentsService.postComment(comment).subscribe((result: any) => {

            expect(result).toBeTruthy();
            expect(result.text).toBe(comment.text);
        });


        const req = httpTesting.expectOne(`${API_URL}/comments`);

        expect(req.request.method).toBe('POST');
        req.flush(comment);
    });

    it('should give error if save comment fails', () => {
        const comment =
        {
            id: 4,
            text: 'This is a testcomment'
        };

        commentsService.postComment(comment).subscribe({
            next: () => { },
            error: (error: HttpErrorResponse) => {

                expect(error.status).toBe(500);

                expect(error.statusText).toBe('Internal Server Error');
            }
        });
        const req = httpTesting.expectOne(`${API_URL}/comments`);

        expect(req.request.method).toBe('POST');
        req.flush(comment, { status: 500, statusText: 'Internal Server Error' });
    });

});