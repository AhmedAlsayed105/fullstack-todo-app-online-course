import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useState } from "react";
import AxiosInstance from "../Axios/Axios.config";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { HandelErrInterFace } from "../Interface";
import { FORMRLOGIN } from "../Data";
import InputErrorMessage from "../components/errors/InputErrorMessage";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaValidLogin } from "../Vaildation";


interface IFormInput {
  identifier: string;
  password: string;
}

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
//Handel
const {
  register,
  formState: { errors },
  handleSubmit,
} = useForm<IFormInput>({
  resolver: yupResolver(schemaValidLogin),
});
const onSubmit: SubmitHandler<IFormInput> = async (data) => {
  setIsLoading(true)
  

  try {
    const { status } = await AxiosInstance.post("/auth/local", data);
    if (status === 200) {
      toast.success("You will navigate to the Home page after 2 seconds to login!", {
        duration: 4000,
        position: "bottom-center",
        // Change colors of success/error/loading icon
        style: {
          backgroundColor: "black",
          color: "white",
          width: "fit-content",
        },
      });
      
    }
  } catch (err) {
    // ToDo
      const errObj = err as AxiosError<HandelErrInterFace>
    toast.error(`${errObj.response?.data.error.message}`, { duration: 4000 });
    console.log(errObj);
  } finally{
    setIsLoading(false)
  }
};

console.log(isLoading);

// render
const formData = FORMRLOGIN.map(
  ({ name, placeholder, type, validation }, index) => (
    <div key={index}>
      <Input
        type={type}
        placeholder={placeholder}
        {...register(name, { validation })}
      />
      {errors[name] && <InputErrorMessage msg={errors[name]?.message} />}
    </div>
  )
);
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">Login to get access!</h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}> 
             {
              formData
             }

        <Button fullWidth isLoading={isLoading}>Login</Button>
      </form>
    </div>
  );
};

export default LoginPage;
