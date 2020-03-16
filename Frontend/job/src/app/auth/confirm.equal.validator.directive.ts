import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[appConfirmEqualValidator]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: ConfirmEqualValidatorDirective,
            multi: true
        }]
})
export class ConfirmEqualValidatorDirective implements Validator {
    validate(passwordGroup: AbstractControl): { [key: string]: any } | null {
        const passwordFild = passwordGroup.get('password');
        const confirmPasswordFild = passwordGroup.get('confirmPassword');
        if (passwordFild && confirmPasswordFild && passwordFild.value !== confirmPasswordFild.value) {
            return { 'notEqual': true };
        }

        return null;
    }
}
