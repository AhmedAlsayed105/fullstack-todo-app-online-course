import {FORMREGISTER} from "../Data";
import InputErrorMessage from "../components/errors/InputErrorMessage";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaValid } from "../Vaildation";
import AxiosInstance from "../Axios/Axios.config";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

import {HandelErrInterFace} from "../Interface/index"
interface IFormInput {
  username: string;
  email: string;
  password: string;
}
const RegisterPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>({
    resolver: yupResolver(schemaValid),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //Handel
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true)
    

    try {
      const { status } = await AxiosInstance.post("/auth/local/register", data);
      if (status === 200) {
        toast.success("You will navigate to the login page after 4 seconds to login!", {
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
      console.log(errObj.response?.data.error.message);
    } finally{
      setIsLoading(false)
    }
  };

  console.log(isLoading);

  // render
  const formData = FORMREGISTER.map(
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
      <Toaster />
      <h2 className="text-center mb-4 text-3xl font-semibold">
        Register to get access!
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {formData}
        <Button fullWidth isLoading={isLoading}>Register</Button>
      </form>
    </div>
  );
};

export default RegisterPage;
