
import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

import {
  AlertCircle,
  MapPin,
  Send,
  ImagePlus,
  CheckCircle2,
  Loader2,
  X,
  LocateFixed,
  User,
  Phone,
  Mail,
  MapPinned,
  Camera,
} from 'lucide-react';

import PageHeader from '@/components/ui/PageHeader';
import type { IssueCategory, IssuePriority } from '@/types';

const categories: IssueCategory[] = [
  'Pothole',
  'Garbage Overflow',
  'Water Leakage',
  'Broken Streetlight',
  'Other Infrastructure Issues',
];

const priorities: IssuePriority[] = ['Low', 'Medium', 'High'];

type FormState = {
  reporterName: string;
  phone: string;
  email: string;
  address: string;
  landmark: string;
  area: string;
  pincode: string;
  lat: string;
  lng: string;
  title: string;
  description: string;
  category: IssueCategory;
  priority: IssuePriority;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const emptyForm: FormState = {
  reporterName: '',
  phone: '',
  email: '',
  address: '',
  landmark: '',
  area: '',
  pincode: '',
  lat: '',
  lng: '',
  title: '',
  description: '',
  category: categories[0],
  priority: 'Medium',
};

export default function ReportIssue() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});

  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');

  const [refId, setRefId] = useState<string | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationMessage, setLocationMessage] = useState('');

  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!photo) {
      setPhotoPreview(null);
      return;
    }

    const url = URL.createObjectURL(photo);
    setPhotoPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [photo]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setStatus('idle');
  };

  // GPS is optional. Coordinates are stored internally, never shown as fields.
  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationMessage('Your browser does not support location detection.');
      return;
    }

    setLocationLoading(true);
    setLocationMessage('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setForm((prev) => ({
          ...prev,
          lat: position.coords.latitude.toFixed(6),
          lng: position.coords.longitude.toFixed(6),
        }));

        setLocationMessage('Current location captured successfully.');
        setLocationLoading(false);
      },
      (error) => {
        let message = 'Unable to detect your location. You can enter the address manually.';

        if (error.code === error.PERMISSION_DENIED) {
          message = 'Location permission denied. Please enter the address manually.';
        }

        setLocationMessage(message);
        setLocationLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 60000,
      }
    );
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      alert('Please select a PNG or JPG image.');
      e.target.value = '';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must not exceed 5 MB.');
      e.target.value = '';
      return;
    }

    setPhoto(file);
    setStatus('idle');
  };

  const removePhoto = () => {
    setPhoto(null);

    if (fileRef.current) {
      fileRef.current.value = '';
    }
  };

  const validate = (): boolean => {
    const next: FormErrors = {};

    if (!form.reporterName.trim()) {
      next.reporterName = 'Please enter your full name.';
    } else if (form.reporterName.trim().length < 3) {
      next.reporterName = 'Name must contain at least 3 characters.';
    }

    if (!/^[6-9]\d{9}$/.test(form.phone.trim())) {
      next.phone = 'Enter a valid 10-digit Indian mobile number.';
    }

    if (
      form.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    ) {
      next.email = 'Enter a valid email address.';
    }

    if (!form.address.trim()) {
      next.address = 'Complete address is required.';
    }

    if (!form.landmark.trim()) {
      next.landmark = 'Please enter a nearby landmark.';
    }

    if (!form.area.trim()) {
      next.area = 'Area or locality is required.';
    }

    if (!/^\d{6}$/.test(form.pincode.trim())) {
      next.pincode = 'Enter a valid 6-digit PIN code.';
    }

    if (!form.title.trim()) {
      next.title = 'Issue title is required.';
    } else if (form.title.trim().length < 5) {
      next.title = 'Title must contain at least 5 characters.';
    }

    if (!form.description.trim()) {
      next.description = 'Please describe the issue.';
    } else if (form.description.trim().length < 10) {
      next.description = 'Description must contain at least 10 characters.';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // Frontend demonstration only. Connect createIssue() after the
  // backend accepts the reporter and address fields.
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    setStatus('submitting');
    setRefId(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const id = `UPM-FE-${Date.now().toString().slice(-6)}`;

      setRefId(id);
      setStatus('success');

      setForm(emptyForm);
      setPhoto(null);
      setLocationMessage('');

      if (fileRef.current) {
        fileRef.current.value = '';
      }
    } catch {
      setStatus('error');
    }
  };

  const handleReset = () => {
    setForm(emptyForm);
    setErrors({});
    setPhoto(null);
    setRefId(null);
    setStatus('idle');
    setLocationMessage('');

    if (fileRef.current) {
      fileRef.current.value = '';
    }
  };

  const inputClass = (field: keyof FormState) =>
    `up-input ${errors[field] ? 'border-danger/50 focus:ring-danger/20' : ''}`;

  const errorText = (field: keyof FormState) =>
    errors[field] ? (
      <p className="mt-1 text-xs text-danger">{errors[field]}</p>
    ) : null;

  return (
    <div className="mx-auto max-w-5xl space-y-8 animate-fade-in">

      <PageHeader
        title="Report a Civic Issue"
        description="Help make Mysuru a better place. Share the details of a civic problem in your area."
        icon={AlertCircle}
      />

      {status === 'success' && refId && (
        <div className="up-card border-success/30 bg-success/5">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-6 w-6 shrink-0 text-success" />

            <div className="flex-1">
              <p className="text-sm font-semibold text-cream">
                Report submitted successfully!
              </p>

              <p className="mt-2 text-xs text-cream-muted">
                Temporary demonstration reference ID:
              </p>

              <p className="mt-1 font-mono font-semibold text-gold-light">
                {refId}
              </p>

              <p className="mt-2 text-xs text-cream-muted">
                This is a frontend-generated ID. The report has not yet
                been saved to the database. Permanent submission and
                tracking will be enabled after backend integration.
              </p>

              <button
                type="button"
                onClick={() => {
                  setStatus('idle');
                  setRefId(null);
                }}
                className="mt-3 text-xs font-semibold text-gold-light hover:underline"
              >
                Report another issue
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                setStatus('idle');
                setRefId(null);
              }}
              aria-label="Close success message"
              className="text-cream-muted"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="up-card border-danger/30 bg-danger/5">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-danger" />
            <p className="text-sm text-cream">
              Something went wrong. Please try again.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="up-card space-y-8">

        {/* SECTION 1: REPORTER INFORMATION */}
        <section className="space-y-5">
          <div className="flex items-center gap-3 border-b border-ink-line pb-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-gold/20 bg-gold/5 text-gold">
              <User className="h-4 w-4" />
            </div>

            <div>
              <p className="text-xs font-semibold text-gold-light">
                SECTION 01
              </p>
              <h2 className="text-base font-semibold text-cream">
                Reporter Information
              </h2>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-cream">
              Full Name *
            </label>

            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream-muted/50" />

              <input
                name="reporterName"
                value={form.reporterName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={`${inputClass('reporterName')} pl-9`}
              />
            </div>

            {errorText('reporterName')}
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-cream">
                Mobile Number *
              </label>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream-muted/50" />

                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  maxLength={10}
                  placeholder="10-digit mobile number"
                  className={`${inputClass('phone')} pl-9`}
                />
              </div>

              {errorText('phone')}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-cream">
                Email Address
                <span className="ml-1 font-normal text-cream-muted">
                  (Optional)
                </span>
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream-muted/50" />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`${inputClass('email')} pl-9`}
                />
              </div>

              {errorText('email')}
            </div>
          </div>
        </section>

        {/* SECTION 2: ISSUE LOCATION */}
        <section className="space-y-5">
          <div className="flex items-center gap-3 border-b border-ink-line pb-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-gold/20 bg-gold/5 text-gold">
              <MapPinned className="h-4 w-4" />
            </div>

            <div>
              <p className="text-xs font-semibold text-gold-light">
                SECTION 02
              </p>
              <h2 className="text-base font-semibold text-cream">
                Issue Location
              </h2>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-cream">
              Complete Address *
            </label>

            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows={2}
              placeholder="House number, street name and complete address"
              className={`${inputClass('address')} resize-none`}
            />

            {errorText('address')}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-cream">
              Nearby Landmark *
            </label>

            <input
              name="landmark"
              value={form.landmark}
              onChange={handleChange}
              placeholder="e.g. Near Mysuru Palace, opposite bus stop"
              className={inputClass('landmark')}
            />

            {errorText('landmark')}
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-cream">
                Area / Locality *
              </label>

              <input
                name="area"
                value={form.area}
                onChange={handleChange}
                placeholder="e.g. Nazarbad"
                className={inputClass('area')}
              />

              {errorText('area')}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-cream">
                PIN Code *
              </label>

              <input
                type="text"
                inputMode="numeric"
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                maxLength={6}
                placeholder="6-digit PIN code"
                className={inputClass('pincode')}
              />

              {errorText('pincode')}
            </div>
          </div>

          <div className="rounded-lg border border-gold/20 bg-gold/5 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gold" />

                <div>
                  <p className="text-sm font-semibold text-cream">
                    Current Location
                  </p>

                  <p className="text-xs text-cream-muted">
                    Optional GPS location detection
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCurrentLocation}
                disabled={locationLoading}
                className="inline-flex items-center gap-2 rounded-lg border border-gold/30 px-3 py-2 text-xs font-semibold text-gold-light transition hover:bg-gold/10 disabled:opacity-50"
              >
                {locationLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <LocateFixed className="h-4 w-4" />
                )}

                {locationLoading ? 'Detecting...' : 'Use my current location'}
              </button>
            </div>

            {locationMessage && (
              <p className="mt-3 text-xs text-cream-muted">
                {locationMessage}
              </p>
            )}

            <p className="mt-3 text-xs leading-relaxed text-cream-muted/70">
              GPS is optional. Your address and landmark are sufficient
              to submit a report. Coordinates, if detected, are kept
              internally and are not displayed.
            </p>
          </div>
        </section>

        {/* SECTION 3: ISSUE DETAILS */}
        <section className="space-y-5">
          <div className="flex items-center gap-3 border-b border-ink-line pb-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-gold/20 bg-gold/5 text-gold">
              <AlertCircle className="h-4 w-4" />
            </div>

            <div>
              <p className="text-xs font-semibold text-gold-light">
                SECTION 03
              </p>
              <h2 className="text-base font-semibold text-cream">
                Issue Details
              </h2>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-cream">
              Issue Title *
            </label>

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Large pothole near Mysuru Palace"
              className={inputClass('title')}
            />

            {errorText('title')}
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-cream">
                Issue Category *
              </label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="up-select"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-cream">
                Priority *
              </label>

              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="up-select"
              >
                {priorities.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-cream">
              Issue Description *
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Describe the problem, its severity and any safety concerns..."
              className={`${inputClass('description')} resize-none`}
            />

            {errorText('description')}
          </div>

          {/* Photograph upload */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-cream">
              Issue Photograph
              <span className="ml-2 text-xs font-normal text-cream-muted">
                (Optional)
              </span>
            </label>

            <input
              ref={fileRef}
              type="file"
              accept="image/png,image/jpeg"
              onChange={handlePhotoChange}
              className="hidden"
            />

            {!photoPreview ? (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="flex w-full items-center gap-3 rounded-lg border border-dashed border-ink-line bg-ink-bg p-4 text-left transition hover:border-gold/40"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-ink-line bg-ink-card text-cream-muted">
                  <ImagePlus className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm text-cream">
                    Upload an issue photograph
                  </p>

                  <p className="text-xs text-cream-muted/60">
                    PNG or JPG · Maximum 5 MB
                  </p>
                </div>

                <Camera className="ml-auto h-5 w-5 text-cream-muted" />
              </button>
            ) : (
              <div className="overflow-hidden rounded-lg border border-ink-line bg-ink-bg">
                <img
                  src={photoPreview}
                  alt="Selected issue photograph"
                  className="max-h-64 w-full object-contain"
                />

                <div className="flex items-center justify-between gap-3 p-3">
                  <p className="truncate text-xs text-cream">
                    {photo?.name}
                  </p>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="text-xs text-gold-light hover:underline"
                    >
                      Replace
                    </button>

                    <button
                      type="button"
                      onClick={removePhoto}
                      className="text-xs text-danger hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* PRIVACY NOTE */}
        <div className="rounded-lg border border-ink-line bg-ink-bg p-4">
          <p className="text-xs leading-relaxed text-cream-muted">
            <strong className="text-cream">Privacy:</strong> Your contact
            details are collected to help authorities follow up on your
            report. They should not be displayed publicly. Your issue
            location is recorded separately from your personal contact
            information.
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-wrap justify-end gap-3 border-t border-ink-line pt-5">
          <button
            type="button"
            onClick={handleReset}
            className="up-btn-ghost"
          >
            Clear Form
          </button>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="up-btn-primary"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Submit Report
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
