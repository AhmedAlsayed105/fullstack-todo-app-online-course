export default interface IPropRegister 
{
    name:  'userName' | 'email'| 'password'
    placeholder:string,
    type:string,
    validation:{
        required?:boolean,
        minLength?:number,
        pattern?:RegExp,
    }
}