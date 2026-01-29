import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import axiosSecure from '../../services/axios';
import { toast } from 'react-hot-toast';

const ConfirmModal = ({ open, onClose, onConfirm, summary }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-surface border border-white/10 rounded-xl p-6 w-full max-w-md">
        <h3 className="text-xl font-display font-bold mb-3">Confirm Booking</h3>
        <p className="text-secondary mb-4">{summary}</p>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 rounded-lg bg-primary text-black hover:bg-white">Confirm</button>
        </div>
      </div>
    </div>
  );
};

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const { data: car, isLoading } = useQuery({
    queryKey: ['car', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/cars/${id}`);
      return res.data;
    }
  });

  const bookingMutation = useMutation({
    mutationFn: async () => {
      const payload = { carId: id, startDate, endDate };
      const res = await axiosSecure.post('/bookings', payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Booking confirmed');
      navigate('/my-bookings');
    },
    onError: () => toast.error('Booking failed')
  });

  const days = (() => {
    if (!startDate || !endDate) return 0;
    const s = new Date(startDate);
    const e = new Date(endDate);
    const diff = Math.ceil((e - s) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  })();
  const total = car ? days * Number(car.dailyPrice) : 0;

  return (
    <div className="min-h-screen bg-background text-white pt-24 pb-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {isLoading ? (
          <div className="text-center py-20">Loading...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="rounded-2xl overflow-hidden border border-white/10">
                <img src={car.image} alt={car.model} className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">{car.model}</h1>
                <p className="text-primary text-2xl font-bold mb-4">${car.dailyPrice}<span className="text-sm text-secondary font-normal">/day</span></p>
                <p className="text-secondary mb-6">{car.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-secondary mb-2">Start Date</label>
                    <input type="date" className="w-full bg-surface border border-white/10 rounded-lg px-3 py-2" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm text-secondary mb-2">End Date</label>
                    <input type="date" className="w-full bg-surface border border-white/10 rounded-lg px-3 py-2" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                  </div>
                </div>
                <div className="mt-6 p-4 bg-surface border border-white/10 rounded-lg">
                  <p className="text-secondary">Days: <span className="text-white font-semibold">{days}</span></p>
                  <p className="text-secondary">Total: <span className="text-primary font-semibold">${total}</span></p>
                </div>
                <button
                  onClick={() => setOpenModal(true)}
                  disabled={days <= 0}
                  className="mt-6 w-full bg-primary text-black font-bold py-3 rounded-lg hover:bg-white disabled:bg-white/10 disabled:text-white/50 transition"
                >
                  Book Now
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <ConfirmModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        summary={`Confirm booking for ${car?.model} from ${startDate} to ${endDate} for ${days} days. Total: $${total}`}
        onConfirm={() => bookingMutation.mutate()}
      />
    </div>
  );
};

export default CarDetails;
