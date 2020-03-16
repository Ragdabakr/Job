import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { PostJobComponent } from 'src/app/employer/post-job/post-job.component';

@Injectable()
export class DeactivateGuard
    implements CanDeactivate<PostJobComponent> {

    constructor() { }

    canDeactivate(component: PostJobComponent): boolean {
        if (component.jobForm.dirty) {
            return confirm('Are you sure you want to discard your changes?');
        }
        return true;
    }
}