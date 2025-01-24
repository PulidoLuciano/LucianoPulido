import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch"
import { Link } from "luciano-react-router";

export default function VerifyEmail() {
    
    const { fetcher } = useFetch();
    const [ error, setError ] = useState<string | null>(null);
    const [ token, _ ] = useState<string | null>(new URLSearchParams(location.search).get("token"));

    useEffect(() => {
        async function verifyInApi() {
            try {
                await fetcher(`/auth/verify-account?token=${token}`, "POST");
            } catch (error) {
                setError("An error occurred while verifying your account. Please try again later.");
            }
        }

        verifyInApi();
    }, [])

    return (
        <>
        {
            error ?
            <h1 className="font-bold text-center my-5">{error}</h1>
            :
            <h1 className="font-bold text-center my-5">Your account has been verified successfully!</h1>
        }
        <Link href={"/"} className="text-secondary-dark underline block text-center">Back to main page</Link>
        </>
    )
}