'use client';
import {useState,useEffect} from 'react';
import BookingForm from '../components/BookingForm';
import BookingList from '@/components/BookingList';

export default function HomePage() {
    const [bookings, setBookings] = useState([]);

    const refreshookings = async () => {
      try {
        const res = await fetch('http://localhost:3001/bookings');
        const data = await res.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    useEffect(() => {
        const loadInitialBookings = async () => {
            await refreshookings();
        };
        loadInitialBookings();
    }, []);

    return (
       <main className='min-h-screen bg-gray-100 p-8'>
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-black">Booking</h1>
            <BookingForm onBookingCreated={refreshookings} />
            <BookingList bookings={bookings} refresh={refreshookings} />
        </div>
        </main>
    );
}