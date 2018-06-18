import * as React from 'react';
import Input from '../components/ui/input/input.component';

export default interface FormControl {
  elementType: string;
  elementConfig: any;
  value: string;
  validation?: {
    required?:  boolean;
    minLength?: number;
    maxLength?: number;
    isEmail?:   boolean;
  };
  valid:    boolean;
  touched?: boolean;
}

export const formControlToInput = (
  controls:       {[name: string]: FormControl},
  changedHandler?: any,
  $this?:          any,
): JSX.Element[] => {
  const formElements: any[] = [];

  for (const key of Object.keys(controls)) {
    formElements.push({
      id:     key,
      config: controls[key]
    });
  }

  return formElements.map(element => (
    <Input
      key={element.id}
      elementType={element.config.elementType}
      elementConfig={element.config.elementConfig}
      placeholder={element.config.placeholder}
      value={element.config.value}
      touched={element.config.touched}
      shouldValidate={element.config.validation}
      invalid={!element.config.valid}
      changed={changedHandler && changedHandler.bind($this, element.id)} />
  ));
};

export const validateFormControl = (value: any, rules: any): boolean => {
  let valid: boolean = true;

  if (!rules) return valid;

  if (rules.required) {
    valid = value.trim() !== '' && valid;
  }

  if (rules.minLength) {
    valid = value.length >= rules.minLength && valid;
  }

  if (rules.maxLength) {
    valid = value.length <= rules.maxLength && valid;
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    valid = pattern.test(value) && valid
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    valid = pattern.test(value) && valid
  }

  return valid;
}
