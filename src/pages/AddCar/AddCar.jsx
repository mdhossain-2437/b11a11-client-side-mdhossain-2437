import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import axiosSecure from '../../services/axios';

const AddCar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const payload = {
        model: data.model,
        brand: data.brand,
        dailyPrice: data.dailyPrice,
        available: data.available === 'true',
        regNumber: data.regNumber,
        features: data.features ? data.features.split(',').map(f => f.trim()) : [],
        description: data.description,
        image: data.image,
        location: data.location,
        fuelType: data.fuelType,
        transmission: data.transmission,
      };
      const res = await axiosSecure.post('/cars', payload);
      if (res?.data?.insertedId) {
        toast.success('Car added successfully');
        reset();
        navigate('/available-cars');
      }
    } catch (e) {
      toast.error('Failed to add car');
    }
  };

  return (
    <div className="min-h-screen bg-background text-white pt-24 pb-10 px-4 md:px-8">
      <div className="max-w-3xl mx-auto bg-surface border border-white/5 rounded-2xl p-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-6">Add a Car</h1>
        <p className="text-secondary mb-8">Fill out the details below to list your car.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-secondary mb-2">Model</label>
            <input className="w-full bg-background border border-white/10 rounded-lg px-3 py-2" {...register('model', { required: true })} />
          </div>
          <div>
            <label className="block text-sm text-secondary mb-2">Brand</label>
            <input className="w-full bg-background border border-white/10 rounded-lg px-3 py-2" {...register('brand', { required: true })} />
          </div>
          <div>
            <label className="block text-sm text-secondary mb-2">Daily Price ($)</label>
            <input type="number" className="w-full bg-background border border-white/10 rounded-lg px-3 py-2" {...register('dailyPrice', { required: true, min: 1 })} />
          </div>
          <div>
            <label className="block text-sm text-secondary mb-2">Availability</label>
            <select className="w-full bg-background border border-white/10 rounded-lg px-3 py-2" {...register('available', { required: true })}>
              <option value="true">Available</option>
              <option value="false">Booked</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-secondary mb-2">Registration Number</label>
            <input className="w-full bg-background border border-white/10 rounded-lg px-3 py-2" {...register('regNumber', { required: true })} />
          </div>
          <div>
            <label className="block text-sm text-secondary mb-2">Features (comma-separated)</label>
            <input className="w-full bg-background border border-white/10 rounded-lg px-3 py-2" {...register('features')} placeholder="GPS, AC, Bluetooth" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-secondary mb-2">Description</label>
            <textarea className="w-full bg-background border border-white/10 rounded-lg px-3 py-2" rows="3" {...register('description', { required: true })}></textarea>
          </div>
          <div>
            <label className="block text-sm text-secondary mb-2">Image URL</label>
            <input className="w-full bg-background border border-white/10 rounded-lg px-3 py-2" {...register('image', { required: true })} />
          </div>
          <div>
            <label className="block text-sm text-secondary mb-2">Location</label>
            <input className="w-full bg-background border border-white/10 rounded-lg px-3 py-2" {...register('location', { required: true })} />
          </div>
          <div>
            <label className="block text-sm text-secondary mb-2">Fuel Type</label>
            <input className="w-full bg-background border border-white/10 rounded-lg px-3 py-2" {...register('fuelType')} placeholder="Petrol" />
          </div>
          <div>
            <label className="block text-sm text-secondary mb-2">Transmission</label>
            <input className="w-full bg-background border border-white/10 rounded-lg px-3 py-2" {...register('transmission')} placeholder="Auto" />
          </div>
          <div className="md:col-span-2">
            <button type="submit" className="w-full bg-primary text-black font-bold py-3 rounded-lg hover:bg-white transition-colors">
              Save Car
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCar;
