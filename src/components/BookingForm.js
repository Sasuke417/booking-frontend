"use client";
import React, { useState } from "react";

export default function BookingForm({ onBookingCreated }) {
  const [formData, setFormData] = useState({
    customerName: "",
    date: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedDate = new Date(formData.date).toISOString();

    const res = await fetch("http://localhost:3001/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        date: formattedDate,
      }),
    });

    if (res.ok) {
      alert("Booking successful!");
      setFormData({ customerName: "", date: "" });
      if (onBookingCreated) {
        onBookingCreated();
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md border mb-8"
    >
      <h2 className="text-xl font-bold mb-4 text-black">New Booking</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <input
          type="text"
          placeholder="Customer Name"
          value={formData.customerName}
          onChange={(e) =>
            setFormData({ ...formData, customerName: e.target.value })
          }
          className="p-2 border rounded text-black"
          required
        />
        <input
          type="date"
          placeholder="Date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="p-2 border rounded text-black"
          required
        />
      </div>
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
      >
        Book
      </button>
    </form>
  );
}
