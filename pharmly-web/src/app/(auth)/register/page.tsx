"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Used for redirection
// NOTE: Make sure this import path is correct in your project
import { registerStore } from "@/api/auth.api";

// Asset imports
import Appicon from "@/../public/globe.svg";
import { PharmlyAuthBg } from "@/../public/index";

import {
    Building2,
    Phone,
    MapPin,
    Lock,
    Percent,
    MapPin as CityIcon,
    Eye,
    EyeOff,
    Shield,
    FileText,
    TrendingUp,
    Smartphone,
    LucideIcon,
    CheckCircle2,
    Loader2,
    AlertCircle
} from "lucide-react";

// --- Types ---

// 1. Define the shape of your form data
interface RegisterFormData {
    name: string;
    whatsappNumber: string;
    address: string;
    city: string;
    discountPercent: number | string; // string allowed for empty input state
    password: string;
}

// 2. Props for the Button
interface SimpleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    fullWidth?: boolean;
    isLoading?: boolean;
}

// 3. Props for the Form Field
interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    icon: LucideIcon;
}

// --- Components ---

function SimpleButton({
    children,
    onClick,
    disabled,
    fullWidth = true,
    isLoading = false,
    className,
    ...props
}: SimpleButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`
        ${fullWidth ? "w-full" : ""}
        relative
        flex items-center justify-center
        bg-teal-600 
        hover:bg-teal-700
        active:scale-[0.99]
        text-white 
        font-semibold 
        py-3.5
        px-6
        rounded-xl
        shadow-lg shadow-teal-600/20
        transition-all
        duration-200
        disabled:opacity-70 
        disabled:cursor-not-allowed
        disabled:active:scale-100
        ${className}
      `}
            {...props}
        >
            {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
                children
            )}
        </button>
    );
}

function FormField({
    label,
    icon: Icon,
    ...props
}: FormFieldProps) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="space-y-1.5 group">
            <label className={`text-xs font-semibold uppercase tracking-wide transition-colors duration-200 ml-1 ${isFocused || props.value ? "text-teal-600" : "text-gray-500"
                }`}>
                {label}
            </label>
            <div
                className={`
          relative flex items-center
          bg-white
          border
          rounded-xl
          transition-all duration-200 ease-in-out
          ${isFocused
                        ? "border-teal-500 ring-4 ring-teal-500/10 shadow-sm"
                        : "border-gray-200 hover:border-gray-300"
                    }
        `}
            >
                <div className="pl-4 pr-3 py-3 flex items-center justify-center">
                    <Icon className={`w-5 h-5 transition-colors duration-200 ${isFocused ? "text-teal-600" : "text-gray-400 group-hover:text-gray-500"
                        }`} />
                </div>
                <div className="h-6 w-px bg-gray-200 mx-1" />
                <input
                    {...props}
                    onFocus={(e) => {
                        setIsFocused(true);
                        props.onFocus?.(e);
                    }}
                    onBlur={(e) => {
                        setIsFocused(false);
                        props.onBlur?.(e);
                    }}
                    className="w-full px-3 py-3 bg-transparent border-none focus:outline-none text-gray-800 placeholder:text-gray-400 font-medium"
                />
            </div>
        </div>
    );
}

// --- Main Page ---

export default function RegisterPage() {
    const router = useRouter();

    // UI State
    const [showPassword, setShowPassword] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);

    // Logic State (from your code snippet)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState<RegisterFormData>({
        name: "",
        whatsappNumber: "",
        address: "",
        city: "",
        discountPercent: 5,
        password: ""
    });

    // Handler for inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // Handler for submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            // API Call
            const res = await registerStore({
                ...form,
                discountPercent: Number(form.discountPercent)
            });

            // Save token
            if (typeof window !== "undefined") {
                localStorage.setItem("token", res.token);
            }

            // Redirect to dashboard
            router.push("/dashboard"); // Better Next.js practice than window.location

        } catch (err: unknown) {
            // Type safe error handling
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white lg:bg-gray-50 flex flex-col">
            {/* Mobile Header */}
            <div className="lg:hidden bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-teal-500 to-teal-700 rounded-lg shadow-md shadow-teal-500/20">
                        <Image
                            src={Appicon}
                            alt="Pharmly"
                            width={20}
                            height={20}
                            className="invert brightness-0"
                        />
                    </div>
                    <span className="text-xl font-bold text-gray-900 tracking-tight">Pharmly</span>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2">

                {/* LEFT SIDE - Form */}
                <div className="flex flex-col items-center justify-center p-6 sm:p-12 lg:p-20">
                    <div className="w-full max-w-[440px] space-y-8">

                        {/* Desktop Header */}
                        <div className="hidden lg:block space-y-2">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2.5 bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl shadow-lg shadow-teal-500/20">
                                    <Image
                                        src={Appicon}
                                        alt="Pharmly"
                                        width={24}
                                        height={24}
                                        className="invert brightness-0"
                                    />
                                </div>
                                <span className="text-2xl font-bold text-gray-900 tracking-tight">Pharmly</span>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                                Create your account
                            </h1>
                            <p className="text-gray-500 text-base">
                                Start managing your pharmacy smarter today.
                            </p>
                        </div>

                        {/* Mobile Header (Title only) */}
                        <div className="lg:hidden space-y-2">
                            <h1 className="text-2xl font-bold text-gray-900">
                                Get Started
                            </h1>
                            <p className="text-gray-500 text-sm">
                                Create a free account for your store
                            </p>
                        </div>

                        {/* Error Message Display */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                                <p className="text-sm text-red-600 font-medium leading-relaxed">
                                    {error}
                                </p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Medical Name */}
                            <FormField
                                label="Medical Store Name"
                                name="name" // Matches state key
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Ex. Apollo Pharmacy"
                                icon={Building2}
                                required
                            />

                            {/* WhatsApp Number */}
                            <FormField
                                label="WhatsApp Number"
                                name="whatsappNumber" // Matches state key
                                value={form.whatsappNumber}
                                onChange={handleChange}
                                type="tel"
                                placeholder="+91 98765 43210"
                                icon={Phone}
                                required
                            />

                            {/* Address */}
                            <FormField
                                label="Store Address"
                                name="address" // Matches state key
                                value={form.address}
                                onChange={handleChange}
                                placeholder="Shop No, Street, Area"
                                icon={MapPin}
                                required
                            />

                            <div className="grid grid-cols-2 gap-4">
                                {/* City */}
                                <FormField
                                    label="City"
                                    name="city" // Matches state key
                                    value={form.city}
                                    onChange={handleChange}
                                    placeholder="Mumbai"
                                    icon={CityIcon}
                                    required
                                />

                                {/* Discount */}
                                <FormField
                                    label="Discount %"
                                    name="discountPercent" // Matches state key
                                    value={form.discountPercent}
                                    onChange={handleChange}
                                    type="number"
                                    placeholder="0"
                                    min={0}
                                    max={100}
                                    icon={Percent}
                                />
                            </div>

                            {/* Password */}
                            <div className="space-y-1.5 group">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide ml-1">
                                    Password
                                </label>
                                <div className="relative flex items-center bg-white border border-gray-200 rounded-xl focus-within:border-teal-500 focus-within:ring-4 focus-within:ring-teal-500/10 transition-all shadow-sm">
                                    <div className="pl-4 pr-3 py-3 text-gray-400 group-focus-within:text-teal-600 transition-colors">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <div className="h-6 w-px bg-gray-200 mx-1" />
                                    <input
                                        name="password" // Matches state key
                                        value={form.password}
                                        onChange={handleChange}
                                        type={showPassword ? "text" : "password"}
                                        className="w-full px-3 py-3 bg-transparent border-none focus:outline-none text-gray-800 placeholder:text-gray-400 font-medium"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 p-2 text-gray-400 hover:text-teal-600 transition-colors rounded-lg hover:bg-gray-50"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Terms */}
                            <div className="flex items-start gap-3 py-2">
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        checked={termsAccepted}
                                        onChange={(e) => setTermsAccepted(e.target.checked)}
                                        className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 transition-all checked:border-teal-600 checked:bg-teal-600 hover:border-teal-500"
                                    />
                                    <CheckCircle2 className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                                </div>
                                <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer select-none">
                                    I agree to the{" "}
                                    <a href="#" className="text-teal-600 hover:text-teal-700 font-medium underline underline-offset-2">
                                        Terms of Service
                                    </a>{" "}
                                    and{" "}
                                    <a href="#" className="text-teal-600 hover:text-teal-700 font-medium underline underline-offset-2">
                                        Privacy Policy
                                    </a>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <SimpleButton
                                type="submit"
                                disabled={!termsAccepted}
                                isLoading={loading}
                            >
                                {loading ? "Creating Account..." : "Create Account"}
                            </SimpleButton>

                            {/* Login Link */}
                            <p className="text-center text-gray-600 text-sm">
                                Already have an account?{" "}
                                <a href="/login" className="text-teal-600 hover:text-teal-700 font-bold hover:underline underline-offset-4">
                                    Log in
                                </a>
                            </p>
                        </form>
                    </div>
                </div>

                {/* RIGHT SIDE - Image/Brand Section (Unchanged visual) */}
                <div className="hidden lg:flex flex-col relative bg-gray-900 overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <Image
                            src={PharmlyAuthBg}
                            alt="Background"
                            fill
                            className="object-cover opacity-40 mix-blend-overlay"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/90 via-teal-800/90 to-gray-900/90" />
                    </div>

                    {/* Decorative Blobs */}
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-teal-500/30 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl" />

                    {/* Content Container */}
                    <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-12">
                        <div className="w-full max-w-lg">
                            {/* Glass Card */}
                            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 shadow-2xl relative overflow-hidden group hover:bg-white/15 transition-all duration-500">
                                {/* Shine Effect */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                                <div className="relative z-10">
                                    <div className="flex justify-center mb-8">
                                        <div className="p-4 bg-white/10 rounded-2xl border border-white/20 shadow-inner">
                                            <Image
                                                src={Appicon}
                                                alt="Pharmly"
                                                width={48}
                                                height={48}
                                                className="invert brightness-0"
                                            />
                                        </div>
                                    </div>

                                    <h2 className="text-4xl font-bold text-white text-center mb-4 tracking-tight">
                                        Pharmly
                                    </h2>

                                    <p className="text-teal-100/80 text-center text-lg mb-10 leading-relaxed">
                                        The modern operating system for forward-thinking pharmacies.
                                    </p>

                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { icon: Shield, text: "Secure Data" },
                                            { icon: FileText, text: "GST Billing" },
                                            { icon: TrendingUp, text: "Analytics" },
                                            { icon: Smartphone, text: "Mobile App" },
                                        ].map((feature, idx) => (
                                            <div key={idx} className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                                                <feature.icon className="w-5 h-5 text-teal-300" />
                                                <span className="text-white text-sm font-medium">{feature.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Trust Indicator */}
                            <div className="mt-10 text-center">
                                <p className="text-white/60 text-sm font-medium uppercase tracking-widest mb-4">Trusted By</p>
                                <div className="flex justify-center gap-2 items-center">
                                    <div className="flex -space-x-3">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div key={i} className="w-10 h-10 rounded-full border-2 border-teal-900 bg-gray-200" />
                                        ))}
                                    </div>
                                    <span className="text-white font-semibold ml-2">1,000+ Stores</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}