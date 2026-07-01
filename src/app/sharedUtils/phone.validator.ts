import { FormGroup } from '@angular/forms';

export function phoneValidator(
  event: Event,
  form: FormGroup,
  controlName: string
): void {
  const input = event.target as HTMLInputElement;
  const value = input.value.replace(/\D/g, '');

  input.value = value;

  form.get(controlName)?.setValue(value, {
    emitEvent: false
  });
}