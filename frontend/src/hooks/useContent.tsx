import axios from "axios";
import { useEffect, useState } from "react";
import type { CardProps } from "../components/Card";

const backend_url = import.meta.env.VITE_backend_url;

export function useContent() {
    const [contents, setContents] = useState<CardProps[]>([]);
    const [refresh, setRefresh] = useState<boolean>(false);

    useEffect(() => {
        axios.get(`${backend_url}/content`,{
            headers: {
                Authorization: "Bearer "+ localStorage.getItem("token")
            }
        }).then((response) => {
            console.log(response);
            setContents(response.data);
        }).catch((err) => {
            console.log(err);
            if(axios.isAxiosError(err)){
                alert("Error fetching content: "+err.response?.data.msg);
            }else{
                alert("An unknown error occurred. "+err);
            }
        });
    }, [refresh]);   

    return {contents, setRefresh};
}