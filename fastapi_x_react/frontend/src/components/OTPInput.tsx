import '../assets/css/otp.css'
import {useRef, useState} from "react";

function OTPInput({otpCallback} : {otpCallback: (otp: string) => void}) {
    const [otp, setOTP] = useState<string[]>(Array(6).fill(""));
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (value: string, index: number) => {
        const newOtp = [...otp]
        newOtp[index] = value
        setOTP(newOtp)

        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus()
        }

        if (newOtp.every((digit) => digit !== "")) {
            const fullOtp = newOtp.join("")
            otpCallback(fullOtp)
        }
    }

    return (
        <div className="flex items-center gap-2">
            {
                otp.map((digit, index) => (
                    <input
                        type="text"
                        maxLength={1}
                        value={digit}
                        ref={(el) => {
                            inputsRef.current[index] = el;
                        }}
                        className="otp-input"
                        pattern="[0-9]"
                        inputMode="numeric"
                        onChange={(e) => handleChange(e.target.value, index)}
                        required
                    />
                ))
            }
        </div>
    );
}

export default OTPInput;
