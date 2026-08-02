
"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { X, Loader2, Plus, Trash2, Image as ImageIcon } from "lucide-react";
import { updateProperty } from "@/services/landlord.service";

interface EditPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: any;
  onUpdateSuccess: (updatedProperty: any) => void;
}

export default function EditPropertyModal({
  isOpen,
  onClose,
  property,
  onUpdateSuccess,
}: EditPropertyModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: 0,
    categoryId: "",
    landlordId: "",
    isAvailable: true,
    amenities: [] as string[],
    images: [] as string[],
  });

  const [newAmenity, setNewAmenity] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (property) {
      setFormData({
        title: property.title || "",
        description: property.description || "",
        location: property.location || "",
        price: Number(property.price || property.rentAmount || 0),
        categoryId: property.categoryId || property.category?.id || "",
        landlordId: property.landlordId || "",
        isAvailable: property.isAvailable !== false,
        amenities: Array.isArray(property.amenities) ? [...property.amenities] : [],
        images: Array.isArray(property.images) ? [...property.images] : [],
      });
    }
  }, [property]);

  if (!isOpen || !property) return null;

  // 🔹 Amenity Add/Remove
  const handleAddAmenity = () => {
    if (newAmenity.trim() && !formData.amenities.includes(newAmenity.trim())) {
      setFormData((prev) => ({
        ...prev,
        amenities: [...prev.amenities, newAmenity.trim()],
      }));
      setNewAmenity("");
    }
  };

  const handleRemoveAmenity = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index),
    }));
  };

  // 🔹 Image URL Add/Remove
  const handleAddImage = () => {
    if (newImageUrl.trim() && !formData.images.includes(newImageUrl.trim())) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, newImageUrl.trim()],
      }));
      setNewImageUrl("");
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      const targetId = property.id || property._id;

      const payload = {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        price: Number(formData.price),
        categoryId: formData.categoryId,
        landlordId: formData.landlordId,
        isAvailable: formData.isAvailable,
        amenities: formData.amenities,
        images: formData.images,
      };

      const res = await updateProperty(targetId, payload);

      if (res?.success || res?.data) {
        toast.success("Property updated successfully!");
        onUpdateSuccess(res.data || { ...property, ...payload });
        onClose();
      } else {
        toast.error(res?.message || "Failed to update property");
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Edit Property Details</h3>
            <p className="text-xs text-slate-500">Update property information, images & specifications</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
              Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              placeholder="Property title..."
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Provide a detailed description..."
            />
          </div>

          {/* Category & Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                Category
              </label>
              <select
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium bg-white"
              >
                {/* 📌 আসল ডাটাবেজ আইডি ধরে রাখবে যেন Foreign key constraint error না আসে */}
                <option value={formData.categoryId}>
                  {property?.category?.name || "Current Category"}
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                Price / Rent Amount (Tk/$)
              </label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: Number(e.target.value) })
                }
                className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-blue-600"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
              Location
            </label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 🖼️ Images Management Section */}
          <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-3">
            <label className="block text-xs font-semibold text-slate-700 uppercase flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4 text-blue-600" /> Property Images (URLs)
            </label>
            
            <div className="flex gap-2">
              <input
                type="url"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddImage())}
                placeholder="Paste image URL (e.g. https://images.unsplash.com/...)"
                className="flex-1 px-3.5 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition"
              >
                <Plus className="w-4 h-4" /> Add Image
              </button>
            </div>

            {/* Image Preview List */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {formData.images.map((imgUrl, idx) => (
                <div key={idx} className="relative group rounded-xl overflow-hidden border border-slate-200 bg-white aspect-video">
                  <img
                    src={imgUrl}
                    alt={`Property ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1 right-1 p-1 bg-rose-600/90 hover:bg-rose-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition duration-200"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
            {formData.images.length === 0 && (
              <p className="text-xs text-slate-400 italic">No image URLs added yet.</p>
            )}
          </div>

          {/* Amenities Section */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
              Amenities
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newAmenity}
                onChange={(e) => setNewAmenity(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddAmenity())}
                placeholder="Add amenity (e.g., Wifi, CCTV, Generator)"
                className="flex-1 px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={handleAddAmenity}
                className="bg-slate-800 hover:bg-slate-900 text-white px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {formData.amenities.map((item, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-lg text-xs font-medium"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => handleRemoveAmenity(idx)}
                    className="hover:text-rose-600 transition"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Availability Toggle */}
          <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
            <div>
              <span className="text-sm font-semibold text-slate-800 block">Property Availability</span>
              <span className="text-xs text-slate-500">Toggle whether this property is available for rent</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isAvailable}
                onChange={(e) =>
                  setFormData({ ...formData, isAvailable: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-xs font-semibold transition flex items-center gap-2 shadow-md shadow-blue-500/20 disabled:opacity-50"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}