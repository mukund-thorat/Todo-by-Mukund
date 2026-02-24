import ShadowBox from "../components/ShadowBox.tsx";
import OTPInput from "../components/OTPInput.tsx";
import Button from "../components/Button.tsx";
import {useMutation} from "@tanstack/react-query";
import {useEffect, useRef, useState, type SubmitEvent} from "react";


function OTPPage(){
    const email = sessionStorage.getItem("email");
    const [otpMsg, setOtpMsg] = useState(`Sending OTP to ${email}`);
    const otp = useRef("")

    const {mutate} = useMutation({
        mutationFn: async () => {
            const result = await fetch(`http://127.0.0.1:8000/auth/otp/request?email=${email}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            return result.json();
        },
        onSuccess: () => {
            setOtpMsg(`Successfully sent OTP to your ${email}`);
        }
    })

    const verification = useMutation({
        mutationFn: async () => {
            const email = sessionStorage.getItem("email");
            const avatar = sessionStorage.getItem("avatar");
            if (otp.current.length == 6){
                const result = await fetch("http://127.0.0.1:8000/auth/otp/verify", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({email, otp, avatar})
                })

                return await result.json()
            }
        }
    })

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        verification.mutate()
    }

    useEffect(() => {
        if (email) {
            mutate()
        }
    }, [email, mutate]);

    return (
        <div className="flex items-center justify-center h-screen">
            <ShadowBox title="Verify OTP">
                <p className="text-center">{otpMsg}</p>
                <form className="flex flex-col gap-8 items-center" onSubmit={(e) => handleSubmit(e)}>
                    <OTPInput otpCallback={(fullOtp) => otp.current = fullOtp} />
                    <Button
                        type="submit"
                        children="Verify OTP"
                    />
                </form>
            </ShadowBox>
        </div>
    )
}

export default OTPPage;