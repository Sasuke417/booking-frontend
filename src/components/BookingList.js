"use-client";
import { CheckCircle, XCircle } from "lucide-react";

export default function BookingList({ bookings, refresh }) {
  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:3001/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    refresh();
  };

  const statusColors = {
    pending: "text-yellow-500",
    confirmed: "text-green-500",
    cancelled: "text-red-500",
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full text-left border-collapse text-black">
        <thead className="bg-gray-50 uppercase text-xs">
          <tr>
            <th className="p-4 border-b">Customer</th>
            <th className="p-4 border-b">Date</th>
            <th className="p-4 border-b">Status</th>
            <th className="p-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id} className="border-b hover:bg-gray-50">
              <td className="p-4 font-medium">{booking.customerName}</td>
              <td className="p-4 text-sm">
                {new Date(booking.date).toLocaleString()}
              </td>
              <td className="p-4 text-sm">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    statusColors[booking.status]
                  }`}
                >
                  {booking.status}
                </span>
              </td>
              <td className="p-4 flex gap-2">
                <button
                  onClick={() => updateStatus(booking._id, "confirmed")}
                  className="text-green-600 hover:text-green-800"
                >
                  <CheckCircle size={20} />
                </button>
                <button
                  onClick={() => updateStatus(booking._id, "cancelled")}
                  className="text-red-600 hover:text-red-800"
                >
                  <XCircle size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
