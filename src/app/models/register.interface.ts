export interface Register {
  name:string;
  lastname:string;
  email:string;
  phone:number | null;
  password:string;
  password_confirm:string;
}
