export interface IValidate {
  checkEmail?(email: string): boolean;
  checkPhotoSize?(size: number): boolean;
};
