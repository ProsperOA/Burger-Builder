export default interface FormControl {
  elementType: string;
  elementConfig: any;
  value: string;
  validation?: {
    required?:  boolean;
    minLength?: number;
    maxLength?: number;
  };
  valid:    boolean;
  touched?: boolean;
}
