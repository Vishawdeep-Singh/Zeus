export type SignUp = {
    name: string;
    email: string;
    cellPh: number;
    password?: string;
  };

  export type SignIn = Pick<SignUp, 'cellPh' | 'password'>;

  export type Credentials ={
        phone:string
        password:string
        csrfToken: string
        callbackUrl: string,
        json: string,
        redirect:string
      
  }