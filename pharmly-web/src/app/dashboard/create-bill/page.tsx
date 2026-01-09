"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Phone,
  User,
  Calendar,
  VenusAndMars,
  Package,
  DollarSign,
  Plus,
  Trash2,
  Percent,
  ShoppingCart,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  ArrowLeft,
  X,
  UserPlus,
  Mic,
  MicOff
} from "lucide-react";

// Web Speech API Types
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

// Types
interface PatientData {
  name: string;
  age?: string | number;
  gender?: string;
  whatsappNumber?: string;
}

interface BillItem {
  name: string;
  price: string;           // regular price
  stripPrice: string;      // e.g. 190
  stripQuantity: string;   // e.g. 20 tablets
  quantity: string;        // pieces needed (e.g. 2)
  usePerPiece: boolean;    // toggle for per-piece calculation
}

interface SuccessState {
  message: string;
  billId: string;
  whatsappLink: string;
  whatsappMessage: string;
}

interface FormFieldProps {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
  min?: string;
  max?: string;
  step?: string;
}

interface SearchPatientResponse {
  exists: boolean;
  patient?: PatientData;
  error?: string;
}

interface CreatePatientResponse {
  success: boolean;
  patient?: PatientData;
}

interface CreateBillResponse {
  success: boolean;
  billId?: string;
  message?: string;
  customer?: { name: string; whatsappNumber: string };
  totalAmount?: number;
  whatsappMessage?: string;
}

// Helper function to get auth token
function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
}

// API functions
async function searchPatient(whatsappNumber: string): Promise<SearchPatientResponse> {
  try {
    const token = getAuthToken();

    if (!token) {
      return { exists: false, error: "Not authenticated" };
    }

    const res = await fetch(`/api/patients/search?whatsappNumber=${whatsappNumber}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if (!res.ok) {
      const error = await res.json();
      return { exists: false, error: error.message || "Search failed" };
    }

    return await res.json();
  } catch (error) {
    return { exists: false, error: "Search failed" };
  }
}

async function createBill(billData: unknown): Promise<CreateBillResponse> {
  try {
    const token = getAuthToken();

    if (!token) {
      console.error("No authentication token found. Please log in again.");
      throw new Error("Not authenticated. Please log in again.");
    }

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };

    console.log("Creating bill with token:", token.substring(0, 20) + "...");

    const res = await fetch(`/api/bills`, {
      method: "POST",
      headers,
      body: JSON.stringify(billData)
    });

    if (!res.ok) {
      const error = await res.json();
      console.error("Create bill failed:", res.status, error);
      throw new Error(error.message || `Failed to create bill (${res.status})`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error creating bill:", error);
    throw error;
  }
}

async function createPatient(patientData: unknown): Promise<CreatePatientResponse> {
  try {
    const token = getAuthToken();

    if (!token) {
      console.error("No authentication token found. Please log in again.");
      throw new Error("Not authenticated. Please log in again.");
    }

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };

    const res = await fetch(`/api/patients`, {
      method: "POST",
      headers,
      body: JSON.stringify(patientData)
    });

    if (!res.ok) {
      const error = await res.json();
      console.error("Create patient failed:", res.status, error);
      throw new Error(error.message || `Failed to create patient (${res.status})`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error creating patient:", error);
    throw error;
  }
}

// Component for input fields
function FormField({ label, icon: Icon, type = "text", value, onChange, placeholder, className = "", ...props }: FormFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`space-y-1.5 group ${className}`}>
      <label className={`text-xs font-semibold uppercase tracking-wide transition-colors duration-200 ml-1 ${isFocused || value ? "text-teal-600" : "text-gray-500"}`}>
        {label}
      </label>
      <div className={`relative flex items-center bg-white border rounded-xl transition-all duration-200 ease-in-out ${isFocused ? "border-teal-500 ring-4 ring-teal-500/10 shadow-sm" : "border-gray-200 hover:border-gray-300"}`}>
        <div className="pl-4 pr-3 py-3 flex items-center justify-center">
          <Icon className={`w-5 h-5 transition-colors duration-200 ${isFocused ? "text-teal-600" : "text-gray-400 group-hover:text-gray-500"}`} />
        </div>
        <div className="h-6 w-px bg-gray-200 mx-1" />
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full px-3 py-3 bg-transparent border-none focus:outline-none text-gray-800 placeholder:text-gray-400 font-medium"
          {...props}
        />
      </div>
    </div>
  );
}

// Main component
export default function CreateBillPage() {
  const router = useRouter();

  // States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<SuccessState | null>(null);

  // Form states
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [items, setItems] = useState<BillItem[]>([{
    name: "",
    price: "",
    quantity: "1",
    stripQuantity: "",
    stripPrice: "",
    usePerPiece: false
  }]);
  const [discountPercent, setDiscountPercent] = useState(5);
  const [existingPatient, setExistingPatient] = useState<PatientData | null>(null);
  const [showPatientForm, setShowPatientForm] = useState(false);
  const [patientForm, setPatientForm] = useState({
    name: "",
    age: "",
    gender: ""
  });
  const [searchingPatient, setSearchingPatient] = useState(false);
  const [recordingIndex, setRecordingIndex] = useState<number | null>(null);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  // Check authentication on mount
  useEffect(() => {
    // Initialize speech recognition
    if (typeof window !== 'undefined') {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognitionAPI) {
        const recognitionInstance = new SpeechRecognitionAPI();
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = false;
        recognitionInstance.lang = 'en-US';
        setRecognition(recognitionInstance);
      }
    }
  }, []);

  // Handle patient search
  useEffect(() => {
    const checkPatient = async () => {
      if (whatsappNumber.length >= 10) {
        setSearchingPatient(true);
        try {
          const data = await searchPatient(whatsappNumber);
          if (data.exists && data.patient) {
            setExistingPatient(data.patient);
            setShowPatientForm(false);
          } else {
            setExistingPatient(null);
            setPatientForm(prev => ({ ...prev, name: "" }));
          }
        } catch (error) {
          console.error("Error:", error);
        } finally {
          setSearchingPatient(false);
        }
      } else {
        setExistingPatient(null);
        setShowPatientForm(false);
      }
    };

    const debounceTimer = setTimeout(checkPatient, 800);
    return () => clearTimeout(debounceTimer);
  }, [whatsappNumber]);

  // Calculate totals
  const { subtotal, discountAmount, totalAmount } = useMemo(() => {
    let subtotalCalc = 0;

    items.forEach(item => {
      let itemPrice = 0;

      // Automatically use per-piece calculation if strip details are provided
      if (item.stripPrice && item.stripQuantity) {
        // Calculate per-piece price: stripPrice / stripQuantity * quantity
        const stripPrice = parseFloat(item.stripPrice) || 0;
        const stripQuantity = parseFloat(item.stripQuantity) || 1;
        const quantity = parseFloat(item.quantity) || 0;
        const pricePerPiece = stripPrice / stripQuantity;
        itemPrice = pricePerPiece * quantity;
      } else if (item.price) {
        // Fallback to normal calculation if only regular price is provided
        const price = parseFloat(item.price) || 0;
        const quantity = parseFloat(item.quantity) || 0;
        itemPrice = price * quantity;
      }

      if (itemPrice > 0) {
        subtotalCalc += itemPrice;
      }
    });

    const discountAmountCalc = (subtotalCalc * discountPercent) / 100;
    const totalAmountCalc = Math.max(subtotalCalc - discountAmountCalc, 0);

    return {
      subtotal: subtotalCalc,
      discountAmount: discountAmountCalc,
      totalAmount: totalAmountCalc
    };
  }, [items, discountPercent]);

  // Validation
  const isValid = whatsappNumber.length >= 10 &&
    items.some(item => {
      // Check if item has strip details for per-piece calculation
      if (item.stripPrice && item.stripQuantity) {
        return item.name && parseFloat(item.stripPrice) > 0 && parseFloat(item.stripQuantity) > 0;
      }
      // Fallback to regular price validation
      return item.name && item.price && parseFloat(item.price) > 0;
    }) &&
    subtotal > 0;

  // Handle form actions
  const updateItem = (index: number, field: keyof BillItem, value: string | boolean) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, {
      name: "",
      price: "",
      quantity: "1",
      stripQuantity: "",
      stripPrice: "",
      usePerPiece: false
    }]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  // Handle patient form change
  const handlePatientFormChange = (field: string, value: string) => {
    setPatientForm(prev => ({ ...prev, [field]: value }));
  };

  // Format WhatsApp number
  const formatWhatsappNumber = (num: string) => {
    return num.replace(/\D/g, '');
  };

  // Create WhatsApp deep link
  const createWhatsAppLink = (phone: string, message: string) => {
    const formattedPhone = formatWhatsappNumber(phone);
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/91${formattedPhone}?text=${encodedMessage}`;
  };

  // Handle voice recording for medicine name
  const startVoiceRecording = (index: number) => {
    if (!recognition) {
      alert('Voice recognition is not supported in your browser. Please try Chrome or Edge.');
      return;
    }

    setRecordingIndex(index);

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      updateItem(index, 'name', transcript);
      setRecordingIndex(null);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      setRecordingIndex(null);
      if (event.error === 'not-allowed') {
        alert('Microphone access denied. Please allow microphone access in your browser settings.');
      }
    };

    recognition.onend = () => {
      setRecordingIndex(null);
    };

    try {
      recognition.start();
    } catch (error) {
      console.error('Error starting recognition:', error);
      setRecordingIndex(null);
    }
  };

  const stopVoiceRecording = () => {
    if (recognition) {
      recognition.stop();
    }
    setRecordingIndex(null);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      let patientData: PatientData | null = existingPatient;

      // Create patient if doesn't exist and user provided details
      if (!existingPatient && (showPatientForm || patientForm.name)) {
        const newPatient = {
          name: patientForm.name || "Customer",
          age: patientForm.age ? parseInt(patientForm.age) : undefined,
          gender: patientForm.gender || undefined,
          whatsappNumber: whatsappNumber
        };

        const patientRes = await createPatient(newPatient);
        if (patientRes.success) {
          patientData = patientRes.patient || null;
        }
      } else if (existingPatient) {
        patientData = existingPatient;
      } else {
        patientData = {
          name: "Customer",
          whatsappNumber: whatsappNumber
        };
      }

      // Prepare items for API
      const formattedItems = items
        .filter(item => {
          // Check if item has strip details for per-piece calculation
          if (item.stripPrice && item.stripQuantity) {
            return item.name && parseFloat(item.stripPrice) > 0 && parseFloat(item.stripQuantity) > 0;
          }
          // Fallback to regular price validation
          return item.name && item.price && parseFloat(item.price) > 0;
        })
        .map(item => {
          let finalPrice = 0;
          const quantity = parseFloat(item.quantity) || 1;

          if (item.stripPrice && item.stripQuantity) {
            // Calculate per-piece price
            const stripPrice = parseFloat(item.stripPrice);
            const stripQuantity = parseFloat(item.stripQuantity);
            finalPrice = stripPrice / stripQuantity;
          } else {
            finalPrice = parseFloat(item.price);
          }

          return {
            name: item.name,
            price: finalPrice,
            quantity: quantity
          };
        });

      if (formattedItems.length === 0) {
        throw new Error("Please add at least one medicine");
      }

      // Ensure patientData is not null
      if (!patientData) {
        throw new Error("Patient data is required");
      }

      // Prepare bill data
      const billData = {
        customer: {
          name: patientData.name,
          age: patientData.age,
          gender: patientData.gender,
          whatsappNumber: whatsappNumber
        },
        items: formattedItems,
        discountPercent: discountPercent,
        subtotal: subtotal,
        discountAmount: discountAmount,
        totalAmount: totalAmount
      };

      // Create bill
      const billRes = await createBill(billData);

      if (billRes.success) {
        // Use WhatsApp message from backend (already has store details)
        const whatsappMessage = billRes.whatsappMessage || "";
        const whatsappLink = createWhatsAppLink(whatsappNumber, whatsappMessage);

        setSuccess({
          message: "Bill created successfully!",
          billId: billRes.billId || "",
          whatsappLink: whatsappLink,
          whatsappMessage: whatsappMessage
        });

        // Automatically open WhatsApp link
        window.open(whatsappLink, "_blank");

        // Reset form after successful creation
        setTimeout(() => {
          setItems([{
            name: "",
            price: "",
            quantity: "1",
            stripQuantity: "",
            stripPrice: "",
            usePerPiece: false
          }]);
          setWhatsappNumber("");
          setExistingPatient(null);
          setShowPatientForm(false);
          setPatientForm({ name: "", age: "", gender: "" });
          setDiscountPercent(5);
          setSuccess(null);
        }, 3000);
      } else {
        throw new Error(billRes.message || "Failed to create bill");
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle WhatsApp redirect
  const handleSendWhatsApp = () => {
    if (success?.whatsappLink) {
      window.open(success.whatsappLink, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-white pt-6 sm:pt-12 pb-24 sm:pb-32">
      <div className="mx-auto max-w-2xl px-3 sm:px-4">

        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-teal-600 mb-3 sm:mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base font-medium">Back</span>
          </button>

          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <div className="p-1.5 sm:p-2 bg-gradient-to-br from-teal-500 to-teal-700 rounded-lg shadow-md">
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Create New Bill</h1>
          </div>
          <p className="text-sm sm:text-base text-gray-500">Fill customer details and add medicines</p>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="mb-4 sm:mb-6 bg-red-50 border border-red-200 rounded-xl p-3 sm:p-4 flex items-start gap-2 sm:gap-3 animate-in fade-in">
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 mt-0.5 shrink-0" />
            <p className="text-xs sm:text-sm text-red-600 font-medium">{error}</p>
            <button onClick={() => setError(null)} className="ml-auto">
              <X className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
            </button>
          </div>
        )}

        {success && (
          <div className="mb-4 sm:mb-6 bg-green-50 border border-green-200 rounded-xl p-3 sm:p-4 animate-in fade-in">
            <div className="flex items-start gap-2 sm:gap-3">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="text-xs sm:text-sm font-medium text-green-800 mb-2">{success.message}</p>
                <p className="text-xs text-green-700 mb-3 sm:mb-4">Bill ID: {success.billId}</p>
                <button
                  onClick={handleSendWhatsApp}
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors"
                >
                  <Send className="w-3 h-3 sm:w-4 sm:h-4" />
                  Send via WhatsApp
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">

          {/* Customer Section */}
          <div className="rounded-xl sm:rounded-2xl border border-gray-200 bg-white p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" />
              <h2 className="text-sm sm:text-base font-semibold text-gray-900">Customer Details</h2>
            </div>

            {/* WhatsApp Input */}
            <FormField
              label="WhatsApp Number"
              icon={Phone}
              type="tel"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="9876543210"
              required
              className="mb-4"
            />

            {/* Patient Search Status */}
            {searchingPatient && (
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 mb-4">
                <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
                <span>Checking patient details...</span>
              </div>
            )}

            {/* Existing Patient Info */}
            {existingPatient && !searchingPatient && (
              <div className="mb-4 p-3 sm:p-4 rounded-xl bg-teal-50 border border-teal-100">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-teal-600" />
                      <span className="text-sm sm:text-base font-medium text-gray-900">{existingPatient.name}</span>
                    </div>
                    {existingPatient.age && (
                      <p className="text-xs sm:text-sm text-gray-600">
                        Age: {existingPatient.age} • {existingPatient.gender || "Not specified"}
                      </p>
                    )}
                    <p className="text-xs text-teal-600 mt-1">✓ Existing customer found</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setExistingPatient(null);
                      setShowPatientForm(true);
                      setPatientForm({
                        name: existingPatient.name || "",
                        age: typeof existingPatient.age === 'number' ? existingPatient.age.toString() : existingPatient.age || "",
                        gender: existingPatient.gender || ""
                      });
                    }}
                    className="text-xs sm:text-sm font-medium text-teal-600 hover:text-teal-700"
                  >
                    Edit
                  </button>
                </div>
              </div>
            )}

            {/* New Patient Form */}
            {!existingPatient && whatsappNumber.length >= 10 && !searchingPatient && (
              <div className="mb-4">
                {!showPatientForm ? (
                  <button
                    type="button"
                    onClick={() => setShowPatientForm(true)}
                    className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 hover:border-teal-300 hover:bg-teal-50 p-3 sm:p-4 text-xs sm:text-sm font-medium text-gray-600 hover:text-teal-600 transition-colors"
                  >
                    <UserPlus className="w-3 h-3 sm:w-4 sm:h-4" />
                    Add customer details (optional)
                  </button>
                ) : (
                  <div className="space-y-3 sm:space-y-4 p-3 sm:p-4 rounded-xl border border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm sm:text-base font-medium text-gray-900">New Customer Details</h3>
                      <button
                        type="button"
                        onClick={() => setShowPatientForm(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>

                    <FormField
                      label="Full Name"
                      icon={User}
                      type="text"
                      value={patientForm.name}
                      onChange={(e) => handlePatientFormChange("name", e.target.value)}
                      placeholder="Enter customer name"
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        label="Age"
                        icon={Calendar}
                        type="number"
                        value={patientForm.age}
                        onChange={(e) => handlePatientFormChange("age", e.target.value)}
                        placeholder="Age"
                        min="0"
                        max="120"
                      />

                      <div className="space-y-1.5 group">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide ml-1">
                          Gender
                        </label>
                        <div className="relative flex items-center bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
                          <div className="pl-4 pr-3 py-3">
                            <VenusAndMars className="w-5 h-5 text-gray-400" />
                          </div>
                          <div className="h-6 w-px bg-gray-200 mx-1" />
                          <select
                            value={patientForm.gender}
                            onChange={(e) => handlePatientFormChange("gender", e.target.value)}
                            className="w-full px-3 py-3 bg-transparent border-none focus:outline-none text-gray-800 font-medium appearance-none"
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-gray-500 text-center">
                      These details help provide better service on future visits
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Medicines Section */}
          <div className="rounded-xl sm:rounded-2xl border border-gray-200 bg-white p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" />
                <h2 className="text-sm sm:text-base font-semibold text-gray-900">Medicines</h2>
              </div>
              <span className="text-xs sm:text-sm text-gray-500">{items.length} items</span>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-gray-200 bg-gray-50 p-3 sm:p-4"
                >
                  <div className="space-y-3 sm:space-y-4">
                    {/* Medicine name with voice input */}
                    <div className="space-y-1.5 group">
                      <label className="text-xs font-semibold uppercase tracking-wide transition-colors duration-200 ml-1 text-gray-500">
                        Medicine Name
                      </label>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <div className="relative flex items-center bg-white border rounded-xl transition-all duration-200 ease-in-out border-gray-200 hover:border-gray-300">
                            <div className="pl-4 pr-3 py-3 flex items-center justify-center">
                              <Package className="w-5 h-5 transition-colors duration-200 text-gray-400 group-hover:text-gray-500" />
                            </div>
                            <div className="h-6 w-px bg-gray-200 mx-1" />
                            <input
                              type="text"
                              value={item.name}
                              onChange={(e) => updateItem(index, "name", e.target.value)}
                              placeholder={recordingIndex === index ? "Listening..." : "Enter medicine name"}
                              className="w-full px-3 py-3 bg-transparent border-none focus:outline-none text-gray-800 placeholder:text-gray-400 font-medium"
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => recordingIndex === index ? stopVoiceRecording() : startVoiceRecording(index)}
                          className={`flex items-center justify-center px-4 py-3 rounded-xl border-2 transition-all ${
                            recordingIndex === index
                              ? "bg-red-50 border-red-300 text-red-600 animate-pulse"
                              : "bg-white border-gray-200 text-gray-600 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-600"
                          }`}
                          title={recordingIndex === index ? "Stop recording" : "Record medicine name"}
                        >
                          {recordingIndex === index ? (
                            <MicOff className="w-5 h-5" />
                          ) : (
                            <Mic className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      {recordingIndex === index && (
                        <p className="text-xs text-red-600 ml-1 animate-pulse">
                          🎤 Listening... Speak the medicine name
                        </p>
                      )}
                    </div>

                    {/* Strip details */}
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        label="Strip Price (₹)"
                        icon={DollarSign}
                        type="number"
                        value={item.stripPrice}
                        onChange={(e) =>
                          updateItem(index, "stripPrice", e.target.value)
                        }
                        placeholder="190"
                        min="0"
                        step="0.01"
                      />

                      <FormField
                        label="Tablets in Strip"
                        icon={Package}
                        type="number"
                        value={item.stripQuantity}
                        onChange={(e) =>
                          updateItem(index, "stripQuantity", e.target.value)
                        }
                        placeholder="20"
                        min="1"
                        step="1"
                      />
                    </div>

                    {/* Pieces needed */}
                    <FormField
                      label="Tablets Given"
                      icon={Package}
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(index, "quantity", e.target.value)
                      }
                      placeholder="2"
                      min="1"
                      step="1"
                    />

                    {/* Live calculation preview */}
                    {item.stripPrice && item.stripQuantity && item.quantity && (
                      <div className="rounded-lg border border-teal-100 bg-teal-50 p-2 sm:p-3">
                        <p className="mb-1 text-xs text-teal-700">
                          Price Calculation
                        </p>
                        <p className="text-xs sm:text-sm font-semibold text-teal-900">
                          ₹{item.stripPrice} ÷ {item.stripQuantity} ×{" "}
                          {item.quantity} = ₹
                          {(
                            (Number(item.stripPrice) /
                              Number(item.stripQuantity)) *
                            Number(item.quantity)
                          ).toFixed(2)}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Remove medicine */}
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="mt-3 sm:mt-4 flex items-center gap-2 text-xs sm:text-sm font-medium text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                      Remove Medicine
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addItem}
              className="mt-3 sm:mt-4 flex items-center gap-2 text-xs sm:text-sm font-medium text-teal-600 hover:text-teal-700"
            >
              <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
              Add another medicine
            </button>
          </div>

          {/* Discount & Summary */}
          <div className="rounded-xl sm:rounded-2xl border border-gray-200 bg-white p-4 sm:p-6">
            <div className="mb-4 sm:mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Percent className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" />
                <h2 className="text-sm sm:text-base font-semibold text-gray-900">Discount</h2>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs sm:text-sm font-medium text-gray-700">Discount Percentage</span>
                    <span className="text-sm sm:text-base font-bold text-teal-600">{discountPercent}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="1"
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-teal-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0%</span>
                    <span>25%</span>
                    <span>50%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="rounded-xl bg-gray-50 p-3 sm:p-4">
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-600">Discount ({discountPercent}%)</span>
                  <span className="font-medium text-red-500">- ₹{discountAmount.toFixed(2)}</span>
                </div>

                <div className="border-t border-gray-200 pt-2 sm:pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm sm:text-base font-bold text-gray-900">Total Amount</span>
                    <span className="text-xl sm:text-2xl font-bold text-teal-600">₹{totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-3 sm:p-4 -mx-3 sm:-mx-4 -mb-6 mt-4 sm:mt-6">
            <button
              type="submit"
              disabled={!isValid || loading}
              className="flex w-full items-center justify-center gap-2 sm:gap-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 py-3 sm:py-4 text-white text-sm sm:text-base font-semibold shadow-lg hover:from-teal-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                  <span>Creating Bill...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Create Bill & Generate WhatsApp Link</span>
                  <span className="sm:hidden">Create Bill</span>
                </>
              )}
            </button>

            {!isValid && whatsappNumber.length > 0 && (
              <p className="mt-2 text-center text-xs sm:text-sm text-red-500">
                Please add at least one medicine with valid price
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}