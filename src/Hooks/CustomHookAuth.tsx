import { AxiosRequestConfig } from "axios";
import AxiosInstance from "../Axios/Axios.config";
import { useQuery } from "@tanstack/react-query";

interface Iprop {
  keys: string[];
  url: string;
  config?: AxiosRequestConfig;
}

export default function CustomHookAuth({ keys, url, config }: Iprop) {
  const result = useQuery({
    queryKey: [keys],
    queryFn: async () => await AxiosInstance.get(url, config),
  });

  return result;
}
