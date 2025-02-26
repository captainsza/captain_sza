import React from 'react';
import { FormData, FormErrors } from '../types';

interface ContactFormProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  errors: FormErrors;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
  formData,
  setFormData,
  errors,
  isSubmitting,
  onSubmit,
  onCancel,
}) => {
  return (
    <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-purple-500/30 animate-fade-in">
      <h2 className="text-green-400 text-xl mb-4">Contact Me</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-300">Name</label>
          <input
            type="text"
            className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-gray-300"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && (
            <p className="text-red-400 text-sm">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-300">Email</label>
          <input
            type="email"
            className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-gray-300"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          {errors.email && (
            <p className="text-red-400 text-sm">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-300">Subject</label>
          <input
            type="text"
            className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-gray-300"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          />
          {errors.subject && (
            <p className="text-red-400 text-sm">{errors.subject}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-300">Message</label>
          <textarea
            className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-gray-300"
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
          {errors.message && (
            <p className="text-red-400 text-sm">{errors.message}</p>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
