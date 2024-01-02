export default interface IPropRegister 
{
    name:  'username' | 'email'| 'password'
    placeholder:string,
    type:string,
    validation:{
        required?:boolean,
        minLength?:number,
        pattern?:RegExp,
    }
}