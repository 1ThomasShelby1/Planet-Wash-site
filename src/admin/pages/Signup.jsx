import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSendOtpMutation, useVerifyOtpMutation } from '../redux/auth/AuthApi';
import toast from 'react-hot-toast';

const Logo = "/Frame5.png";

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const [sendOtp, { isSuccess }] = useSendOtpMutation();
  const [verifyOtp] = useVerifyOtpMutation();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await sendOtp(email).unwrap();
      if (res.message ===
        "OTP sent to email") {
        toast.success("OTP sent successfully!"); setStep(2);
      }
    } catch (err) {
      toast.error("Failed to send OTP.");
      console.error('OTP send failed:', err);
    }
  };
  // const getAllOrders = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await sendOtp(email).unwrap();
  //     if (res.message ===
  //       "OTP sent to email") {
  //       toast.success("OTP sent successfully!"); setStep(2);
  //     }
  //   } catch (err) {
  //     toast.error("Failed to send OTP.");
  //     console.error('OTP send failed:', err);
  //   }
  // };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const otpCode = otp.join('');
      const res = await verifyOtp({ email, otp: otpCode }).unwrap();
      toast.success("OTP verified successfully!")
      navigate('/');
    } catch (err) {
      toast.error("OTP verification failed!");
      console.error('OTP verification failed:', err);
    }
  };

  const handleResendOtp = async () => {
    try {
      const res = await sendOtp(email).unwrap();
      toast.success("OTP resent successfully!");
    } catch (err) {
      toast.error("Failed to resend OTP.");
      console.error('Resend OTP failed:', err);
    }
  };


  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-b from-[#052344] to-[#000000]">
      <div className="rounded-[20px] border-4 border-cyan-400 bg-white shadow-xl flex flex-col lg:flex-row overflow-hidden relative h-[400px]">
        {/* Left Section */}
        <div className="w-full lg:w-[510px] px-6 sm:px-10 flex flex-col justify-center">
          <form className=" space-y-5" onSubmit={step === 1 ? handleSendOtp : handleVerifyOtp}>
          <div className="flex justify-center">
            <img src={Logo} alt="Logo" className="w-32 sm:w-40 md:w-56" />
          </div>
            <div>
              <label className="block font-sans text-sm md:text-base font-[400] text-black">Email</label>
            {/* Email Input */}
              <input
                type="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 block w-full px-2 py-2 text-sm rounded-lg border border-gray-200 bg-[#F4F7FE] text-gray-700 focus:outline-none"
                required
                disabled={step === 2}
              />
            </div>

            {/* OTP Input (Step 2 only) */}
              <div>
                <label className="text-sm md:text-base font-[400] font-sans">
                  Enter OTP Sent On Your Mail
                </label>
                <div className="flex justify-start space-x-5 ">
                  {Array(4).fill(0).map((_, idx) => (
                    <input
                      key={idx}
                      id={`otp-${idx}`}
                      maxLength={1}
                      type="text"
                      value={otp[idx]}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (!/^\d*$/.test(val)) return;
                        const newOtp = [...otp];
                        newOtp[idx] = val;
                        setOtp(newOtp);
                        if (val && idx < 3) {
                          document.getElementById(`otp-${idx + 1}`)?.focus();
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
                          document.getElementById(`otp-${idx - 1}`)?.focus();
                        }
                      }}
                      className=" mt-1 size-10 text-center text-sm md:text-base font-[400] font-sans rounded-lg border border-gray-200 bg-[#F4F7FE] focus:outline-none"
                    />
                  ))}
                </div>{step === 2 && (
                  <div className="text-right mt-2">
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Resend OTP
                    </button>
                  </div>
                )}


              </div>

            {/* Button */}
            <div className="text-center">
              <button
                type="submit"
                className="p-2 px-4 mb-2 bg-[#8EDF4C] text-white font-sans font-semibold text-sm rounded-xl hover:bg-[#031a30] transition"
              >
                {step === 1 ? 'Send OTP' : 'Sign In'}
              </button>
            </div>
          </form>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 bg-[#09B1EE] text-white px-6 sm:px-4 py-8 flex flex-col justify-end relative overflow-hidden">
          {/* Background Circles confined to right section only */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#6AD2FF45] opacity-100 rounded-full"></div>
            <div className="absolute -bottom-12 -right-12 w-36 h-36 bg-[#6AD2FF45] opacity-100 rounded-full"></div>
          </div>

          <h1 className="text-5xl font-DM Sans font-bold z-10">Sign In</h1>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
