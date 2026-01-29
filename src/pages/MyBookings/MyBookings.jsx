import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosSecure from '../../services/axios';
import { toast } from 'react-hot-toast';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const ModifyModal = ({ open, onClose, booking, onSave }) => {
  const [startDate, setStartDate] = useState(booking?.startDate?.slice(0, 10) || '');
  const [endDate, setEndDate] = useState(booking?.endDate?.slice(0, 10) || '');
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-surface border border-white/10 rounded-xl p-6 w-full max-w-md">
        <h3 className="text-xl font-display font-bold mb-3">Modify Booking Dates</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-secondary mb-2">Start Date</label>
            <input type="date" className="w-full bg-background border border-white/10 rounded-lg px-3 py-2" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm text-secondary mb-2">End Date</label>
            <input type="date" className="w-full bg-background border border-white/10 rounded-lg px-3 py-2" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20">Cancel</button>
          <button onClick={() => onSave({ startDate, endDate })} className="px-4 py-2 rounded-lg bg-primary text-black hover:bg-white">Confirm</button>
        </div>
      </div>
    </div>
  );
};

const MyBookings = () => {
  const queryClient = useQueryClient();
  const [sort, setSort] = useState('date_desc');
  const [modifyBooking, setModifyBooking] = useState(null);

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['my-bookings', sort],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-bookings?sort=${sort}`);
      return res.data;
    }
  });

  const cancelMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/bookings/${id}`, { status: 'canceled' });
      return res.data;
    },
    onSuccess: () => {
      toast.success('Booking canceled');
      queryClient.invalidateQueries({ queryKey: ['my-bookings'] });
    },
    onError: () => toast.error('Cancel failed')
  });

  const modifyMutation = useMutation({
    mutationFn: async ({ id, startDate, endDate }) => {
      const res = await axiosSecure.patch(`/bookings/${id}`, { startDate, endDate });
      return res.data;
    },
    onSuccess: () => {
      toast.success('Booking updated');
      queryClient.invalidateQueries({ queryKey: ['my-bookings'] });
      setModifyBooking(null);
    },
    onError: () => toast.error('Update failed')
  });

  const chartData = bookings.map(b => ({
    name: new Date(b.createdAt).toLocaleDateString(),
    total: b.totalPrice
  }));

  return (
    <div className="min-h-screen bg-background text-white pt-24 pb-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl md:text-4xl font-display font-bold">My Bookings</h1>
          <select
            className="bg-background border border-white/10 rounded-lg px-4 py-2"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="date_desc">Newest First</option>
            <option value="date_asc">Oldest First</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>

        <div className="overflow-x-auto bg-surface border border-white/5 rounded-xl mb-8">
          <table className="min-w-full">
            <thead>
              <tr className="bg-white/5">
                <th className="text-left p-4">Image</th>
                <th className="text-left p-4">Model</th>
                <th className="text-left p-4">Start</th>
                <th className="text-left p-4">End</th>
                <th className="text-left p-4">Days</th>
                <th className="text-left p-4">Total</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td className="p-6" colSpan="8">Loading...</td></tr>
              ) : bookings.length === 0 ? (
                <tr><td className="p-6 text-secondary" colSpan="8">No bookings found.</td></tr>
              ) : (
                bookings.map(b => (
                  <tr key={b._id} className="border-t border-white/5 hover:bg-white/5">
                    <td className="p-4">
                      <img src={b.carImage} alt={b.carModel} className="w-20 h-14 object-cover rounded" />
                    </td>
                    <td className="p-4">{b.carModel}</td>
                    <td className="p-4">{new Date(b.startDate).toLocaleDateString()}</td>
                    <td className="p-4">{new Date(b.endDate).toLocaleDateString()}</td>
                    <td className="p-4">{b.days}</td>
                    <td className="p-4">${b.totalPrice}</td>
                    <td className="p-4">{b.status}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          className="px-3 py-1 rounded bg-white/10 hover:bg-white/20"
                          onClick={() => setModifyBooking(b)}
                        >
                          Modify Date
                        </button>
                        <button
                          className="px-3 py-1 rounded bg-accent text-white hover:bg-red-500"
                          onClick={() => cancelMutation.mutate(b._id)}
                          disabled={b.status === 'canceled'}
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-surface border border-white/5 rounded-xl p-6">
          <h2 className="text-xl font-display font-bold mb-4">Spending Overview</h2>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip />
                <Bar dataKey="total" fill="#D4AF37" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <ModifyModal
        open={!!modifyBooking}
        booking={modifyBooking}
        onClose={() => setModifyBooking(null)}
        onSave={({ startDate, endDate }) => modifyMutation.mutate({ id: modifyBooking._id, startDate, endDate })}
      />
    </div>
  );
};

export default MyBookings;
