"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginStore } from "@/api/auth.api"; // API import

// Asset imports (Ensure these match your project)
import Appicon from "@/../public/globe.svg";
import { PharmlyAuthBg, PharmlyI, PharmlyLogo } from "@/../public/index";

import {
    Phone,
    Lock,
    Eye,
    EyeOff,
    Shield,
    FileText,
    TrendingUp,
    Smartphone,
    LucideIcon,
    Loader2,
    AlertCircle,
    LogIn
} from "lucide-react";

// --- Types ---

interface LoginFormData {
    whatsappNumber: string;
    password: string;
}

interface SimpleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    fullWidth?: boolean;
    isLoading?: boolean;
}

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

export default function LoginPage() {
    const router = useRouter();

    // UI State
    const [showPassword, setShowPassword] = useState(false);

    // Logic State
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState<LoginFormData>({
        whatsappNumber: "",
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const res = await loginStore(form);

            // Save token and store details to localStorage
            if (typeof window !== "undefined") {
                localStorage.setItem("token", res.token);
                localStorage.setItem("storeId", res.store.id);
                localStorage.setItem("storeName", res.store.name);
                localStorage.setItem("storeWhatsapp", res.store.whatsappNumber);
                localStorage.setItem("storeAddress", res.store.address);
                localStorage.setItem("storeCity", res.store.city);
                localStorage.setItem("storeDiscount", res.store.discountPercent.toString());
                // Set cookie for middleware
                document.cookie = `pharmly_token=${res.token}; path=/; max-age=${7 * 24 * 60 * 60}`; // 7 days
            }

            // Redirect to dashboard
            router.push("/dashboard");
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Invalid credentials. Please try again.");
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
                    <div className="">
                        <Image
                            src={PharmlyLogo}
                            alt="Pharmly Logo"
                            width={20}
                            height={20}
                            className="h-16 w-[5.5rem]"
                        />
                    </div>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2">

                {/* LEFT SIDE - Form */}
                <div className="flex flex-col items-center justify-center p-6 sm:p-12 lg:p-20">
                    <div className="w-full max-w-[440px] space-y-8">

                        {/* Desktop Header */}
                        <div className="hidden lg:block space-y-2">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="">
                                    <Image
                                        src={PharmlyLogo}
                                        alt="Pharmly Logo"
                                        width={24}
                                        height={24}
                                        className="h-16 w-[5.5rem]"
                                    />
                                </div>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                                Welcome back
                            </h1>
                            <p className="text-gray-500 text-base">
                                Enter your details to access your dashboard.
                            </p>
                        </div>

                        {/* Mobile Header (Title only) */}
                        <div className="lg:hidden space-y-2">
                            <h1 className="text-2xl font-bold text-gray-900">
                                Log In
                            </h1>
                            <p className="text-gray-500 text-sm">
                                Access your medical store dashboard
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

                        <form onSubmit={submit} className="space-y-6">
                            {/* WhatsApp Number */}
                            <FormField
                                label="WhatsApp Number"
                                name="whatsappNumber"
                                value={form.whatsappNumber}
                                onChange={handleChange}
                                type="tel"
                                placeholder="+91 98765 43210"
                                icon={Phone}
                                required
                            />

                            {/* Password */}
                            <div className="space-y-1.5 group">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                        Password
                                    </label>
                                    <a href="#" className="text-xs text-teal-600 font-medium hover:underline">
                                        Forgot Password?
                                    </a>
                                </div>
                                <div className="relative flex items-center bg-white border border-gray-200 rounded-xl focus-within:border-teal-500 focus-within:ring-4 focus-within:ring-teal-500/10 transition-all shadow-sm">
                                    <div className="pl-4 pr-3 py-3 text-gray-400 group-focus-within:text-teal-600 transition-colors">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <div className="h-6 w-px bg-gray-200 mx-1" />
                                    <input
                                        name="password"
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

                            {/* Submit Button */}
                            <SimpleButton
                                type="submit"
                                isLoading={loading}
                                className="mt-2"
                            >
                                <span className="flex items-center gap-2">
                                    {loading ? "Logging in..." : "Log In"}
                                    {!loading && <LogIn className="w-4 h-4" />}
                                </span>
                            </SimpleButton>

                            {/* Register Link */}
                            <p className="text-center text-gray-600 text-sm">
                                Don&apos;t have an account?{" "}
                                <a
                                    href="/register"
                                    className="text-teal-600 hover:text-teal-700 font-bold hover:underline underline-offset-4"
                                >
                                    Register now
                                </a>
                            </p>
                        </form>
                    </div>
                </div>

                {/* RIGHT SIDE - Image/Brand Section (Identical Style) */}
                <div className="hidden lg:flex flex-col relative bg-gray-900 overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <Image
                            src={PharmlyAuthBg}
                            alt="Background"
                            fill
                            className="object-cover opacity-100"
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
                                                src={PharmlyI}
                                                alt="Pharmly Logo"
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
                                        Access your store analytics, manage inventory, and track sales in real-time.
                                    </p>

                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { icon: Shield, text: "Secure Access" },
                                            { icon: FileText, text: "GST Ready" },
                                            { icon: TrendingUp, text: "Live Sales" },
                                            { icon: Smartphone, text: "Anywhere" },
                                        ].map((feature, idx) => (
                                            <div key={idx} className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                                                <feature.icon className="w-5 h-5 text-teal-300" />
                                                <span className="text-white text-sm font-medium">{feature.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}