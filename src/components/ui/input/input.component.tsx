import * as React from 'react';

import * as styles from './input.component.css';

const Input: React.SFC<any> = (props: any): JSX.Element => {
  let inputElement: JSX.Element;
  const inputClasses: string = [
    styles.InputElement,
    (props.invalid && props.shouldValidate && props.touched) && styles.Invalid
  ].join(' ');

  switch (props.elementType) {
    case 'input':
      inputElement = <input
        className={inputClasses}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed} />;
      break;
    case 'textarea':
      inputElement = <textarea
        className={inputClasses}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed} />;
      break;
    case 'select':
      inputElement = (
        <select
          className={inputClasses}
          value={props.value}
          onChange={props.changed}>
          {props.elementConfig.options.map((option: any) => (
            <option
              key={option.value}
              value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = <input
        className={inputClasses}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed} />;
  }

  return (
    <div className={styles.Input}>
      <label className={styles.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
