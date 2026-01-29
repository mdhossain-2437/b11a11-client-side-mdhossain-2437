import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosSecure from '../../services/axios';
import { toast } from 'react-hot-toast';

const EditModal = ({ open, onClose, car, onSave }) => {
  const [form, setForm] = useState({
    model: car?.model || '',
    brand: car?.brand || '',
    dailyPrice: car?.dailyPrice || 0,
    available: car?.available || true,
    regNumber: car?.regNumber || '',
    features: (car?.features || []).join(', '),
    description: car?.description || '',
    image: car?.image || '',
    location: car?.location || '',
    fuelType: car?.fuelType || 'Petrol',
    transmission: car?.transmission || 'Auto',
  });
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-surface border border-white/10 rounded-xl p-6 w-full max-w-2xl">
        <h3 className="text-xl font-display font-bold mb-4">Update Car</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries({
            model: 'Model',
            brand: 'Brand',
            dailyPrice: 'Daily Price',
            regNumber: 'Registration',
            image: 'Image URL',
            location: 'Location',
            fuelType: 'Fuel Type',
            transmission: 'Transmission'
          }).map(([key, label]) => (
            <div key={key}>
              <label className="block text-sm text-secondary mb-1">{label}</label>
              <input
                className="w-full bg-background border border-white/10 rounded-lg px-3 py-2"
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                type={key === 'dailyPrice' ? 'number' : 'text'}
              />
            </div>
          ))}
          <div>
            <label className="block text-sm text-secondary mb-1">Available</label>
            <select
              className="w-full bg-background border border-white/10 rounded-lg px-3 py-2"
              value={form.available ? 'true' : 'false'}
              onChange={(e) => setForm({ ...form, available: e.target.value === 'true' })}
            >
              <option value="true">Available</option>
              <option value="false">Booked</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-secondary mb-1">Features (comma-separated)</label>
            <input
              className="w-full bg-background border border-white/10 rounded-lg px-3 py-2"
              value={form.features}
              onChange={(e) => setForm({ ...form, features: e.target.value })}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-secondary mb-1">Description</label>
            <textarea
              className="w-full bg-background border border-white/10 rounded-lg px-3 py-2"
              rows="3"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20">Cancel</button>
          <button
            onClick={() => onSave(form)}
            className="px-4 py-2 rounded-lg bg-primary text-black hover:bg-white"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

const ConfirmModal = ({ open, onClose, onConfirm, title }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-surface border border-white/10 rounded-xl p-6 w-full max-w-md">
        <h3 className="text-xl font-display font-bold mb-3">{title}</h3>
        <p className="text-secondary mb-6">This action cannot be undone.</p>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20">No</button>
          <button onClick={onConfirm} className="px-4 py-2 rounded-lg bg-accent text-white hover:bg-red-500">Yes</button>
        </div>
      </div>
    </div>
  );
};

const MyCars = () => {
  const queryClient = useQueryClient();
  const [sort, setSort] = useState('date_desc');
  const [editCar, setEditCar] = useState(null);
  const [deleteCar, setDeleteCar] = useState(null);

  const { data: cars = [], isLoading } = useQuery({
    queryKey: ['my-cars', sort],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-cars?sort=${sort}`);
      return res.data;
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const payload = {
        ...data,
        features: data.features ? data.features.split(',').map(f => f.trim()) : []
      };
      const res = await axiosSecure.patch(`/cars/${id}`, payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Car updated');
      queryClient.invalidateQueries({ queryKey: ['my-cars'] });
      setEditCar(null);
    },
    onError: () => toast.error('Update failed')
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/cars/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Car deleted');
      queryClient.invalidateQueries({ queryKey: ['my-cars'] });
      setDeleteCar(null);
    },
    onError: () => toast.error('Delete failed')
  });

  return (
    <div className="min-h-screen bg-background text-white pt-24 pb-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl md:text-4xl font-display font-bold">My Cars</h1>
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

        <div className="overflow-x-auto bg-surface border border-white/5 rounded-xl">
          <table className="min-w-full">
            <thead>
              <tr className="bg-white/5">
                <th className="text-left p-4">Image</th>
                <th className="text-left p-4">Model</th>
                <th className="text-left p-4">Price</th>
                <th className="text-left p-4">Availability</th>
                <th className="text-left p-4">Date Added</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td className="p-6" colSpan="6">Loading...</td></tr>
              ) : cars.length === 0 ? (
                <tr><td className="p-6 text-secondary" colSpan="6">No cars found. Add a car to get started.</td></tr>
              ) : (
                cars.map(car => (
                  <tr key={car._id} className="border-t border-white/5 hover:bg-white/5">
                    <td className="p-4">
                      <img src={car.image} alt={car.model} className="w-20 h-14 object-cover rounded" />
                    </td>
                    <td className="p-4">{car.model}</td>
                    <td className="p-4">${car.dailyPrice}/day</td>
                    <td className="p-4">{car.available ? 'Available' : 'Booked'}</td>
                    <td className="p-4">{new Date(car.postedDate).toLocaleDateString()}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          className="px-3 py-1 rounded bg-white/10 hover:bg-white/20"
                          onClick={() => setEditCar(car)}
                        >
                          Update
                        </button>
                        <button
                          className="px-3 py-1 rounded bg-accent text-white hover:bg-red-500"
                          onClick={() => setDeleteCar(car)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <EditModal
        open={!!editCar}
        car={editCar}
        onClose={() => setEditCar(null)}
        onSave={(data) => updateMutation.mutate({ id: editCar._id, data })}
      />

      <ConfirmModal
        open={!!deleteCar}
        title="Are you sure you want to delete this car?"
        onClose={() => setDeleteCar(null)}
        onConfirm={() => deleteMutation.mutate(deleteCar._id)}
      />
    </div>
  );
};

export default MyCars;
