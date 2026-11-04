
import { useState, useMemo, useCallback } from 'react';

import {
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ListChecks,
  X,
  History,
  MapPin,
  Calendar,
  Tag,
  Flag,
  ChevronRight,
  User,
  Phone,
  Mail,
  Image as ImageIcon,
  MapPinned,
} from 'lucide-react';

import PageHeader from '@/components/ui/PageHeader';
import { sampleIssues } from '@/data/sampleData';
import type { Issue, IssueStatus, IssuePriority } from '@/types';

type AdminIssue = Issue & {
  reporterName?: string;
  phone?: string;
  email?: string;
  address?: string;
  landmark?: string;
  area?: string;
  pincode?: string;
  imageUrl?: string;
  photoUrl?: string;
};

const statusOptions: IssueStatus[] = [
  'Open',
  'In Progress',
  'Resolved',
];

const priorityOptions: IssuePriority[] = [
  'Low',
  'Medium',
  'High',
];

const statusStyles: Record<IssueStatus, string> = {
  Open: 'border-danger/30 bg-danger/10 text-danger',
  'In Progress': 'border-warning/30 bg-warning/10 text-warning',
  Resolved: 'border-success/30 bg-success/10 text-success',
};

const priorityStyles: Record<IssuePriority, string> = {
  Low: 'text-cream-muted',
  Medium: 'text-gold-light',
  High: 'text-danger',
};

export default function AdminIssues() {
  const [issues, setIssues] = useState<AdminIssue[]>(sampleIssues);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [selected, setSelected] = useState<AdminIssue | null>(null);

  const filtered = useMemo(() => {
    return issues.filter((issue) => {
      const q = query.toLowerCase().trim();

      const searchableText = [
        issue.title,
        issue.location,
        issue.id,
        issue.reporterName,
        issue.phone,
        issue.area,
        issue.pincode,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      const matchesQuery = !q || searchableText.includes(q);

      const matchesStatus =
        statusFilter === 'All' || issue.status === statusFilter;

      const matchesCategory =
        categoryFilter === 'All' || issue.category === categoryFilter;

      const matchesPriority =
        priorityFilter === 'All' || issue.priority === priorityFilter;

      return (
        matchesQuery &&
        matchesStatus &&
        matchesCategory &&
        matchesPriority
      );
    });
  }, [issues, query, statusFilter, categoryFilter, priorityFilter]);

  const stats = useMemo(
    () => ({
      total: issues.length,
      open: issues.filter((i) => i.status === 'Open').length,
      progress: issues.filter((i) => i.status === 'In Progress').length,
      resolved: issues.filter((i) => i.status === 'Resolved').length,
    }),
    [issues]
  );

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  const updateIssue = useCallback(
    (
      id: string,
      patch: Partial<Pick<Issue, 'status' | 'priority'>>
    ) => {
      setIssues((prev) =>
        prev.map((issue) => {
          if (issue.id !== id) return issue;

          const timestamp = new Date().toISOString();

          const updated: AdminIssue = {
            ...issue,
            ...patch,
            updatedAt: timestamp,
            history: [
              ...issue.history,
              {
                timestamp,
                action: patch.status
                  ? 'Status updated'
                  : 'Priority updated',
                detail: patch.status
                  ? `Status changed to ${patch.status}`
                  : `Priority changed to ${patch.priority}`,
              },
            ],
          };

          setSelected((current) =>
            current?.id === id ? updated : current
          );

          return updated;
        })
      );
    },
    []
  );

  const statCards = [
    {
      label: 'Total Issues',
      value: stats.total,
      icon: ListChecks,
      color: 'text-gold',
      bg: 'border-gold/20 bg-gold/5',
    },
    {
      label: 'Open',
      value: stats.open,
      icon: AlertTriangle,
      color: 'text-danger',
      bg: 'border-danger/20 bg-danger/5',
    },
    {
      label: 'In Progress',
      value: stats.progress,
      icon: Clock,
      color: 'text-warning',
      bg: 'border-warning/20 bg-warning/5',
    },
    {
      label: 'Resolved',
      value: stats.resolved,
      icon: CheckCircle2,
      color: 'text-success',
      bg: 'border-success/20 bg-success/5',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8 animate-fade-in">
      <PageHeader
        title="Admin Issue Management"
        description="Review, triage, and update the status of citizen-reported civic issues."
        icon={ListChecks}
      />

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {statCards.map(({ label, value, icon: Icon, color, bg }) => (
          <div
            key={label}
            className={`up-card flex items-center gap-3.5 border ${bg}`}
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${bg} ${color}`}
            >
              <Icon className="h-5 w-5" />
            </div>

            <div>
              <p className="text-2xl font-bold text-cream">{value}</p>
              <p className="text-[11px] text-cream-muted">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Issues table */}
      <div className="up-card overflow-hidden p-0">
        <div className="flex flex-col gap-3 border-b border-ink-line p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream-muted/50" />

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search title, location, reporter, or ID..."
              className="up-input py-2.5"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Filter className="h-4 w-4 text-cream-muted/50" />

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="up-select py-2"
            >
              <option value="All">All Categories</option>
              <option value="Pothole">Pothole</option>
              <option value="Garbage Overflow">Garbage Overflow</option>
              <option value="Water Leakage">Water Leakage</option>
              <option value="Broken Streetlight">Broken Streetlight</option>
              <option value="Other Infrastructure Issues">Other</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="up-select py-2"
            >
              <option value="All">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="up-select py-2"
            >
              <option value="All">All Statuses</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink-line bg-ink-raised/50 text-left text-[11px] uppercase tracking-wider text-cream-muted/60">
                <th className="px-4 py-3 font-semibold">Issue ID</th>
                <th className="px-4 py-3 font-semibold">Title</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Location</th>
                <th className="px-4 py-3 font-semibold">Priority</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Reported</th>
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-ink-line">
              {filtered.map((issue) => (
                <tr
                  key={issue.id}
                  className="transition hover:bg-ink-raised/30"
                >
                  <td className="px-4 py-3 font-mono text-xs text-cream-muted">
                    {issue.id}
                  </td>

                  <td className="max-w-xs px-4 py-3 font-medium text-cream">
                    <span className="block truncate">{issue.title}</span>
                  </td>

                  <td className="px-4 py-3 text-cream-muted">
                    {issue.category}
                  </td>

                  <td className="max-w-[160px] px-4 py-3 text-cream-muted">
                    <span className="block truncate">
                      {issue.address || issue.location}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-semibold ${priorityStyles[issue.priority]}`}
                    >
                      {issue.priority}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span className={`up-badge ${statusStyles[issue.status]}`}>
                      {issue.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-cream-muted">
                    {formatDate(issue.reportedAt)}
                  </td>

                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setSelected(issue)}
                      className="inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-semibold text-gold-light transition hover:bg-gold/10"
                    >
                      Manage
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-12 text-center text-cream-muted"
                  >
                    No issues match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Issue details drawer */}
      {selected && (
        <IssueDetailDrawer
          issue={selected}
          onClose={() => setSelected(null)}
          onUpdate={updateIssue}
        />
      )}
    </div>
  );
}

function IssueDetailDrawer({
  issue,
  onClose,
  onUpdate,
}: {
  issue: AdminIssue;
  onClose: () => void;
  onUpdate: (
    id: string,
    patch: Partial<Pick<Issue, 'status' | 'priority'>>
  ) => void;
}) {
  const photo = issue.imageUrl || issue.photoUrl;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-white/10 bg-[#0c0a18]/95 shadow-glow backdrop-blur-2xl animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-ink-line px-5 py-4">
          <div>
            <p className="font-mono text-xs text-cream-muted">
              {issue.id}
            </p>
            <h2 className="mt-0.5 text-base font-semibold text-cream">
              Issue Details
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-cream-muted transition hover:bg-ink-raised hover:text-cream"
            aria-label="Close issue details"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto p-5">
          {/* Issue description */}
          <section>
            <h3 className="text-lg font-semibold text-cream">
              {issue.title}
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-cream-muted">
              {issue.description}
            </p>
          </section>

          {/* Issue information */}
          <section className="space-y-3">
            <h4 className="text-sm font-semibold text-cream">
              Issue Information
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <DetailMeta
                icon={Tag}
                label="Category"
                value={issue.category}
              />

              <DetailMeta
                icon={Flag}
                label="Priority"
                value={issue.priority}
                valueClass={priorityStyles[issue.priority]}
              />

              <DetailMeta
                icon={Calendar}
                label="Reported"
                value={new Date(issue.reportedAt).toLocaleDateString('en-IN', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              />
            </div>
          </section>

          {/* Reporter information */}
          <section className="space-y-3 border-t border-ink-line pt-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-gold" />
              <h4 className="text-sm font-semibold text-cream">
                Reporter Information
              </h4>
            </div>

            <div className="space-y-2 rounded-lg border border-ink-line bg-ink-bg p-3">
              <InfoRow
                icon={User}
                label="Reporter Name"
                value={issue.reporterName}
              />

              <InfoRow
                icon={Phone}
                label="Contact Number"
                value={issue.phone}
              />

              <InfoRow
                icon={Mail}
                label="Email Address"
                value={issue.email}
              />
            </div>

            <p className="text-[11px] leading-relaxed text-cream-muted/60">
              Reporter contact details are intended for authorized
              administrative use only.
            </p>
          </section>

          {/* Issue location */}
          <section className="space-y-3 border-t border-ink-line pt-4">
            <div className="flex items-center gap-2">
              <MapPinned className="h-4 w-4 text-gold" />
              <h4 className="text-sm font-semibold text-cream">
                Issue Location
              </h4>
            </div>

            <div className="space-y-2 rounded-lg border border-ink-line bg-ink-bg p-3">
              <InfoRow
                icon={MapPin}
                label="Full Address"
                value={issue.address || issue.location}
              />

              <InfoRow
                icon={MapPin}
                label="Landmark"
                value={issue.landmark}
              />

              <InfoRow
                icon={MapPin}
                label="Area / Locality"
                value={issue.area}
              />

              <InfoRow
                icon={MapPin}
                label="PIN Code"
                value={issue.pincode}
              />
            </div>

            {Number.isFinite(issue.lat) && Number.isFinite(issue.lng) && (
              <div className="rounded-lg border border-ink-line bg-ink-bg p-3 text-xs text-cream-muted">
                <span className="font-mono">
                  Coordinates: {issue.lat.toFixed(4)}, {issue.lng.toFixed(4)}
                </span>
              </div>
            )}
          </section>

          {/* Uploaded photograph */}
          <section className="space-y-3 border-t border-ink-line pt-4">
            <div className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-gold" />
              <h4 className="text-sm font-semibold text-cream">
                Issue Photograph
              </h4>
            </div>

            {photo ? (
              <img
                src={photo}
                alt="Photograph submitted with the civic issue"
                className="max-h-64 w-full rounded-lg border border-ink-line object-cover"
              />
            ) : (
              <div className="rounded-lg border border-dashed border-ink-line bg-ink-bg px-4 py-7 text-center">
                <ImageIcon className="mx-auto h-7 w-7 text-cream-muted/40" />
                <p className="mt-2 text-xs text-cream-muted">
                  No photograph available for this issue.
                </p>
              </div>
            )}
          </section>

          {/* Current status */}
          <div className="flex items-center gap-2 border-t border-ink-line pt-4">
            <span className="text-xs text-cream-muted">
              Current status:
            </span>
            <span className={`up-badge ${statusStyles[issue.status]}`}>
              {issue.status}
            </span>
          </div>

          {/* Priority controls */}
          <section className="space-y-2">
            <label className="text-xs font-semibold text-cream">
              Edit Priority
            </label>

            <div className="flex gap-2">
              {priorityOptions.map((priority) => (
                <button
                  key={priority}
                  onClick={() =>
                    onUpdate(issue.id, { priority })
                  }
                  className={`flex-1 rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                    issue.priority === priority
                      ? 'border-gold/40 bg-gold/10 text-gold-light'
                      : 'border-ink-line text-cream-muted hover:bg-ink-raised'
                  }`}
                >
                  {priority}
                </button>
              ))}
            </div>
          </section>

          {/* Status controls */}
          <section className="space-y-2">
            <label className="text-xs font-semibold text-cream">
              Update Status
            </label>

            <div className="flex gap-2">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  onClick={() =>
                    onUpdate(issue.id, { status })
                  }
                  className={`flex-1 rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                    issue.status === status
                      ? statusStyles[status]
                      : 'border-ink-line text-cream-muted hover:bg-ink-raised'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </section>

          {/* Resolution timeline */}
          <section className="border-t border-ink-line pt-4">
            <div className="mb-3 flex items-center gap-2 text-cream">
              <History className="h-4 w-4 text-gold" />
              <h4 className="text-sm font-semibold">
                Resolution Timeline
              </h4>
            </div>

            <ol className="space-y-3">
              {issue.history.map((entry, idx) => (
                <li key={idx} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <span className="mt-1 h-2 w-2 rounded-full bg-gold" />

                    {idx < issue.history.length - 1 && (
                      <span className="mt-1 w-px flex-1 bg-ink-line" />
                    )}
                  </div>

                  <div className="pb-3">
                    <p className="text-xs font-semibold text-cream">
                      {entry.action}
                    </p>

                    <p className="text-xs text-cream-muted">
                      {entry.detail}
                    </p>

                    <p className="mt-0.5 text-[11px] text-cream-muted/50">
                      {new Date(entry.timestamp).toLocaleString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof User;
  label: string;
  value?: string;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cream-muted/60" />

      <div className="min-w-0">
        <p className="text-[10px] text-cream-muted/60">{label}</p>
        <p className="break-words text-sm text-cream">
          {value?.trim() || 'Not provided'}
        </p>
      </div>
    </div>
  );
}

function DetailMeta({
  icon: Icon,
  label,
  value,
  valueClass,
}: {
  icon: typeof Tag;
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="rounded-lg border border-ink-line bg-ink-bg p-3">
      <div className="flex items-center gap-1.5 text-[11px] text-cream-muted/60">
        <Icon className="h-3 w-3" />
        {label}
      </div>

      <p className={`mt-1 text-sm font-medium ${valueClass ?? 'text-cream'}`}>
        {value}
      </p>
    </div>
  );
}
