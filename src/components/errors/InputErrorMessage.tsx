interface Iprop
{
    msg?:string
}

export default function InputErrorMessage({msg}:Iprop) {
    return  msg ? <span className="block text-red-700 font-medium text-sm">{msg}</span> : null ;
}
