import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const OtpInput = ({ length = 6, onComplete }) => {
    const [otp, setOtp] = useState(new Array(length).fill(""));
    const inputRefs = useRef([]);

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (isNaN(value)) return;

        const newOtp = [...otp];
        // Only take the last character
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // Move to next input if value is entered
        if (value && index < length - 1) {
            inputRefs.current[index + 1].focus();
        }

        // Check if complete
        const combinedOtp = newOtp.join("");
        if (combinedOtp.length === length) {
            onComplete(combinedOtp);
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const data = e.clipboardData.getData("text").slice(0, length);
        if (isNaN(data)) return;

        const newOtp = [...otp];
        data.split("").forEach((char, index) => {
            if (index < length) newOtp[index] = char;
        });
        setOtp(newOtp);

        if (data.length === length) {
            onComplete(data);
        } else {
            inputRefs.current[data.length].focus();
        }
    };

    return (
        <div className="flex gap-2 justify-center">
            {otp.map((digit, index) => (
                <motion.input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    className="w-10 h-14 md:w-12 md:h-16 text-center text-xl font-black bg-surface-container-highest border border-outline-variant/20 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-on-surface"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                />
            ))}
        </div>
    );
};

export default OtpInput;
