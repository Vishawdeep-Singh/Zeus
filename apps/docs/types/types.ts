export type SignUp = {
    name: string;
    email: string;
    cellPh: string;
    password?: string;
  };

  export type SignIn = Pick<SignUp, 'email' | 'password'>;

  export type Credentials ={
        phone:string
        password:string
        csrfToken: string
        callbackUrl: string,
        json: string,
        redirect:string
      
  }