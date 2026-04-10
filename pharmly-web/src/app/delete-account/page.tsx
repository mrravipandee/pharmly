export default function DeleteAccountPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Delete Account
        </h1>

        <p className="text-gray-600 mb-6 text-sm">
          This action is permanent. All your data including store details,
          customers, and bills will be deleted and cannot be recovered.
        </p>

        <form className="space-y-4">
          
          {/* WhatsApp Number */}
          <div>
            <label className="block text-sm font-medium mb-1">
              WhatsApp Number
            </label>
            <input
              type="text"
              placeholder="+91XXXXXXXXXX"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          {/* Confirmation Text */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Type &quot;DELETE&quot; to confirm
            </label>
            <input
              type="text"
              placeholder="Type DELETE"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          {/* Checkbox */}
          <div className="flex items-start gap-2">
            <input type="checkbox" className="mt-1" />
            <p className="text-sm text-gray-600">
              I understand that this action is irreversible.
            </p>
          </div>

          {/* Delete Button */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
          >
            Delete My Account
          </button>
        </form>
      </div>
    </div>
  );
}