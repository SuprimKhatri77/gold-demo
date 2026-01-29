'use client';

import React, { ChangeEvent, FormEvent, useState, FC, JSX } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Upload, CheckCircle, AlertCircle, X, FileText } from 'lucide-react';

// Type definitions
type FileFieldKey = 'file1' | 'file2' | 'file3' | 'file4' | 'file5' | 'file6';

interface FormData {
  readonly name: string;
  readonly email: string;
  readonly company: string;
  readonly position: string;
  readonly phone: string;
  readonly country: string;
  readonly comments: string;
  readonly files: Readonly<Record<FileFieldKey, File | null>>;
}

interface ApplicationFormProps {
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
      staggerChildren: 0.05,
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
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
  } as Variants,
  input: {
    focus: { scale: 1.01, transition: { duration: 0.2 } },
    blur: { scale: 1 },
  } as Variants,
});

export const ApplicationForm: FC<ApplicationFormProps> = ({
  className = '',
}): JSX.Element => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    position: '',
    phone: '',
    country: '',
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
        company: formData.company,
        position: formData.position,
        phone: formData.phone,
        country: formData.country,
        comments: formData.comments,
        files: Object.entries(formData.files).map(([key, file]) => ({
          key,
          fileName: file?.name ?? null,
        })),
      };

      console.log('[ApplicationForm] Submitting corporate application:', payload);

      // Simulate API delay
      await new Promise((res) => setTimeout(res, 1500));

      setSubmitStatus({
        type: 'success',
        message: 'Application submitted successfully! Our team will review your submission and contact you within 2-3 business days.',
      });

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          company: '',
          position: '',
          phone: '',
          country: '',
          comments: '',
          files: initialFiles,
        });
        setSubmitStatus({ type: 'idle', message: '' });
      }, 3000);
    } catch (error) {
      console.error('[ApplicationForm] Submission failed:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Failed to submit application. Please try again or contact our support team.',
      });
    }
  };

  return (
    <motion.div
      className={`bg-transparent flex items-start justify-center sm:p-2 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Form Container */}
      <motion.form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-full max-w-4xl rounded-sm border border-white/10 bg-linear-to-br from-slate-900/95 via-blue-950/95 to-slate-900/95 backdrop-blur-xl p-6 shadow-2xl shadow-blue-500/20 md:p-10"
      >

        {/* Header */}
        <motion.div variants={variants.item} className="mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Corporate Account Application
          </h2>
          <p className="text-zinc-400 text-sm md:text-base mt-2">
            Complete your business information to begin trading precious metals
          </p>
        </motion.div>

        {/* Text Inputs Grid */}
        <motion.div
          variants={variants.item}
          className="grid gap-4 md:gap-6 md:grid-cols-2 mb-6 md:mb-8"
        >
          <FormInput
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <FormInput
            label="Business Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <FormInput
            label="Company Name"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
          />

          <FormInput
            label="Position / Title"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
          />

          <FormInput
            label="Phone Number"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <FormInput
            label="Country of Operation"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </motion.div>

        {/* File Uploads */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm md:text-base font-semibold text-white">
              Required Corporate Documents
            </h3>
          </div>
          <p className="text-xs md:text-sm text-zinc-400 mb-4">
            Upload incorporation documents, tax certificates, and authorized signatory identification
          </p>

          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
          <label className="mb-2 md:mb-3 block text-sm md:text-base font-semibold text-white">
            Additional Information
            <span className="text-zinc-500 font-normal ml-2">(Optional)</span>
          </label>
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            rows={4}
            placeholder="Trading volume expectations, preferred metals, delivery requirements, or any questions for our team..."
            className="w-full px-4 py-3 border border-white/10 bg-white/5 backdrop-blur-xl text-white placeholder-zinc-500 text-sm md:text-base outline-none transition-all focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/20 resize-none hover:border-white/20"
          />
        </motion.div>

        {/* Status Message */}
        {submitStatus.type !== 'idle' && (
          <motion.div
            variants={variants.item}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm md:text-base border backdrop-blur-xl ${submitStatus.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-400/30 text-emerald-300'
              : submitStatus.type === 'error'
                ? 'bg-red-500/10 border-red-400/30 text-red-300'
                : 'bg-blue-500/10 border-blue-400/30 text-blue-300'
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
          <motion.button
            type="submit"
            disabled={submitStatus.type === 'loading'}
            whileHover={submitStatus.type !== 'loading' ? { scale: 1.02, y: -1 } : {}}
            whileTap={submitStatus.type !== 'loading' ? { scale: 0.98 } : {}}
            className="flex items-center gap-2 px-6 md:px-8 py-3 bg-linear-to-r from-blue-600 to-cyan-600 text-white font-semibold text-sm md:text-base transition-color duration-150 hover:shadow-lg hover:shadow-blue-500/30 disabled:opacity-60 disabled:cursor-not-allowed shadow-md shadow-blue-500/20"
          >
            {submitStatus.type === 'loading' ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Upload size={18} />
                </motion.div>
                Processing Application...
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
      <label className="mb-2 block text-sm md:text-base font-semibold text-white">
        {label}
        {required && <span className="text-cyan-400 ml-1">*</span>}
      </label>
      <motion.input
        name={name}
        type={type}
        value={value}
        required={required}
        onChange={onChange}
        variants={variants.input}
        whileFocus="focus"
        className={`w-full px-4 py-3 border text-white placeholder-zinc-500 text-sm md:text-base outline-none transition-all backdrop-blur-xl ${error
          ? 'border-red-400/30 bg-red-500/10 focus:ring-red-400/20'
          : 'border-white/10 bg-white/5 focus:border-cyan-400/40 focus:ring-cyan-400/20 hover:border-white/20'
          } focus:ring-2`}
        placeholder={`Enter ${label.toLowerCase()}`}
      />
      {error && <p className="text-red-400 text-xs md:text-sm mt-1">{error}</p>}
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
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      whileHover={{ scale: 1.02, y: -2 }}
      className={`flex flex-col items-center justify-center gap-3 cursor-pointer rounded-xl border-2 border-dashed px-4 py-6 transition-all duration-300 backdrop-blur-xl text-sm md:text-base ${isDragActive
        ? 'border-cyan-400/60 bg-cyan-500/10 scale-105'
        : file
          ? 'border-emerald-400/40 bg-emerald-500/10'
          : 'border-white/20 bg-white/5 hover:border-cyan-400/40 hover:bg-white/10'
        }`}
    >
      <motion.div
        animate={
          isDragActive
            ? { scale: 1.2, rotate: 10 }
            : file
              ? { scale: 1.1 }
              : { scale: 1 }
        }
        transition={{ duration: 0.2 }}
        className={`${isDragActive ? 'text-cyan-400' : file ? 'text-emerald-400' : 'text-zinc-400'}`}
      >
        {file ? <CheckCircle size={24} /> : <Upload size={24} />}
      </motion.div>
      <div className="text-center">
        <p className="font-semibold text-white">{label}</p>
        <p className="text-xs md:text-sm text-zinc-400 mt-1">
          {file ? file.name : 'Click or drag to upload'}
        </p>
      </div>
      <input
        type="file"
        className="hidden"
        onChange={onChange}
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
      />
    </motion.label>
  );
};