'use client';

import React, { ChangeEvent, FormEvent, useState, FC, JSX } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Upload, CheckCircle, AlertCircle, X } from 'lucide-react';

// Type definitions
type FileFieldKey = 'file1' | 'file2' | 'file3' | 'file4' | 'file5' | 'file6';

interface FormData {
  readonly name: string;
  readonly email: string;
  readonly emirates: string;
  readonly nationality: string;
  readonly comments: string;
  readonly files: Readonly<Record<FileFieldKey, File | null>>;
}

interface ApplicationFormProps {
  readonly onClose?: () => void;
  readonly className?: string;
}

interface InputProps {
  readonly label: string;
  readonly name: string;
  readonly value: string;
  readonly type?: string;
  readonly required?: boolean;
  readonly error?: string;
  readonly onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface FileUploadProps {
  readonly label: string;
  readonly file: File | null;
  readonly onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface SubmitStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

interface AnimationVariants {
  container: Variants;
  item: Variants;
  input: Variants;
}

const initialFiles: Readonly<Record<FileFieldKey, File | null>> = {
  file1: null,
  file2: null,
  file3: null,
  file4: null,
  file5: null,
  file6: null,
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      duration: 0.5,
      bounce: 0.3,
      staggerChildren: 0.05, // Smooth entrance for form items
      delayChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.2 }
  }
};

const getAnimationVariants = (): AnimationVariants => ({
  container: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  } as Variants,
  item: {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'linear' },
    },
  } as Variants,
  input: {
    focus: { scale: 1.02, transition: { duration: 0.2 } },
    blur: { scale: 1 },
  } as Variants,
});

export const ApplicationForm: FC<ApplicationFormProps> = ({
  onClose,
  className = '',
}): JSX.Element => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    emirates: '',
    nationality: '',
    comments: '',
    files: initialFiles,
  });

  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({
    type: 'idle',
    message: '',
  });

  const variants = getAnimationVariants();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (
    key: FileFieldKey,
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    const file = e.currentTarget.files?.[0] ?? null;
    setFormData((prev) => ({
      ...prev,
      files: {
        ...prev.files,
        [key]: file,
      },
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setSubmitStatus({ type: 'loading', message: '' });

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        emirates: formData.emirates,
        nationality: formData.nationality,
        comments: formData.comments,
        files: Object.entries(formData.files).map(([key, file]) => ({
          key,
          fileName: file?.name ?? null,
        })),
      };

      console.log('[v0] Submitting form:', payload);

      // Simulate API delay
      await new Promise((res) => setTimeout(res, 1500));

      setSubmitStatus({
        type: 'success',
        message: 'Application submitted successfully! We will contact you soon.',
      });

      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          emirates: '',
          nationality: '',
          comments: '',
          files: initialFiles,
        });
        setSubmitStatus({ type: 'idle', message: '' });
        onClose?.();
      }, 2000);
    } catch (error) {
      console.error('[v0] Submission failed:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Failed to submit application. Please try again.',
      });
    }
  };

  return (
    <motion.div
      className={`fixed overflow-scroll bg-black/50 backdrop-blur-sm inset-0 z-50 flex items-start justify-center p-4 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        onClick={onClose}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Form Container */}
      <motion.form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative w-full max-w-3xl rounded-3xl border border-amber-200 bg-linear-to-br from-white via-amber-50 to-white p-6 shadow-2xl md:p-10"
      >
        {/* Close Button */}
        <motion.button
          type="button"
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="absolute right-4 top-4 rounded-full p-2 text-gray-500 hover:bg-amber-100 hover:text-amber-700 transition-colors md:right-6 md:top-6"
        >
          <X size={20} />
        </motion.button>

        {/* Header */}
        <motion.div variants={variants.item} className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight bg-linear-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
            Application Details
          </h2>
          <p className="text-gray-600 text-sm md:text-base mt-2">
            Fill in your information to get started with SR Bullion
          </p>
        </motion.div>

        {/* Text Inputs Grid */}
        <motion.div
          variants={variants.item}
          className="grid gap-4 md:gap-6 md:grid-cols-2 mb-6 md:mb-8"
        >
          <FormInput
            label="Corporate / Personal Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <FormInput
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <FormInput
            label="Emirates"
            name="emirates"
            value={formData.emirates}
            onChange={handleChange}
          />

          <FormInput
            label="Nationality"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
          />
        </motion.div>

        {/* File Uploads */}
        <div className="mb-6 md:mb-8">
          <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-4">
            Required Documents
          </h3>

          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {(Object.keys(formData.files) as FileFieldKey[]).map((key, index) => (
                <motion.div
                  key={key}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    delay: index * 0.05
                  }}
                >
                  <FormFileUpload
                    label={`Document ${index + 1}`}
                    file={formData.files[key]}
                    onChange={(e) => handleFileChange(key, e)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Comments */}
        <motion.div variants={variants.item} className="mb-6 md:mb-8">
          <label className="mb-2 md:mb-3 block text-sm md:text-base font-semibold text-gray-900">
            Additional Comments
          </label>
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            rows={4}
            placeholder="Share any additional information or questions..."
            className="w-full px-4 py-3 rounded-xl border border-amber-200 bg-white/50 text-gray-900 placeholder-gray-500 text-sm md:text-base outline-none transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 resize-none"
          />
        </motion.div>

        {/* Status Message */}
        {submitStatus.type !== 'idle' && (
          <motion.div
            variants={variants.item}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-xl flex items-gap-3 gap-3 text-sm md:text-base ${submitStatus.type === 'success'
              ? 'bg-green-50 border border-green-200 text-green-700'
              : submitStatus.type === 'error'
                ? 'bg-red-50 border border-red-200 text-red-700'
                : 'bg-blue-50 border border-blue-200 text-blue-700'
              }`}
          >
            {submitStatus.type === 'success' && (
              <CheckCircle size={20} className="shrink-0" />
            )}
            {submitStatus.type === 'error' && (
              <AlertCircle size={20} className="shrink-0" />
            )}
            <span>{submitStatus.message}</span>
          </motion.div>
        )}

        {/* Submit Button */}
        <motion.div
          variants={variants.item}
          className="flex gap-3 justify-end sm:justify-start"
        >
          {onClose && (
            <motion.button
              type="button"
              onClick={onClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 md:px-8 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold text-sm md:text-base transition-colors hover:bg-gray-50"
            >
              Cancel
            </motion.button>
          )}
          <motion.button
            type="submit"
            disabled={submitStatus.type === 'loading'}
            whileHover={submitStatus.type !== 'loading' ? { scale: 1.02 } : {}}
            whileTap={submitStatus.type !== 'loading' ? { scale: 0.98 } : {}}
            className="flex items-center gap-2 px-6 md:px-8 py-3 rounded-xl bg-linear-to-r from-amber-500 to-amber-600 text-white font-semibold text-sm md:text-base transition-all hover:from-amber-600 hover:to-amber-700 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-amber-500/30"
          >
            {submitStatus.type === 'loading' ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Upload size={18} />
                </motion.div>
                Submitting...
              </>
            ) : (
              <>
                <Upload size={18} />
                Submit Application
              </>
            )}
          </motion.button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

/* ---------- Form Input Component ---------- */
const FormInput: FC<InputProps> = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  required = false,
  error,
}): JSX.Element => {
  const variants = getAnimationVariants();

  return (
    <motion.div variants={variants.item}>
      <label className="mb-2 block text-sm md:text-base font-semibold text-gray-900">
        {label}
        {required && <span className="text-amber-600 ml-1">*</span>}
      </label>
      <motion.input
        name={name}
        type={type}
        value={value}
        required={required}
        onChange={onChange}
        variants={variants.input}
        whileFocus="focus"
        className={`w-full px-4 py-3 rounded-xl border text-gray-900 placeholder-gray-400 text-sm md:text-base outline-none transition-all ${error
          ? 'border-red-300 bg-red-50/50 focus:ring-red-500/20'
          : 'border-amber-200 bg-white/50 focus:border-amber-500 focus:ring-amber-500/20'
          } focus:ring-2`}
        placeholder={`Enter ${label.toLowerCase()}`}
      />
      {error && <p className="text-red-600 text-xs md:text-sm mt-1">{error}</p>}
    </motion.div>
  );
};

/* ---------- File Upload Component ---------- */
const FormFileUpload: FC<FileUploadProps> = ({
  label,
  file,
  onChange,
}): JSX.Element => {
  const variants = getAnimationVariants();
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDragEnter = (): void => setIsDragActive(true);
  const handleDragLeave = (): void => setIsDragActive(false);
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onChange({
        currentTarget: { files },
      } as ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <motion.label
      variants={variants.item}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      whileHover={{ scale: 1.02 }}
      className={`flex flex-col items-center justify-center gap-3 cursor-pointer rounded-xl border-2 border-dashed px-4 py-6 transition-all text-sm md:text-base ${isDragActive
        ? 'border-amber-500 bg-amber-50'
        : file
          ? 'border-green-300 bg-green-50'
          : 'border-amber-200 bg-amber-50/30 hover:border-amber-400 hover:bg-amber-50'
        }`}
    >
      <motion.div
        animate={isDragActive ? { scale: 1.1 } : { scale: 1 }}
        className="text-amber-600"
      >
        <Upload size={24} />
      </motion.div>
      <div className="text-center">
        <p className="font-semibold text-gray-900">{label}</p>
        <p className="text-xs md:text-sm text-gray-600 mt-1">
          {file ? file.name : 'Click to upload or drag and drop'}
        </p>
      </div>
      <input
        type="file"
        className="hidden"
        onChange={onChange}
        accept="*"
      />
    </motion.label>
  );
};
