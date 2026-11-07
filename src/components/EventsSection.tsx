import React, { useState, useMemo } from 'react';
import { CampusEvent } from '../data/mockData';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Check, 
  Sparkles, 
  ExternalLink, 
  Clock, 
  Share2,
  Filter
} from 'lucide-react';

interface EventsSectionProps {
  events: CampusEvent[];
  searchQuery: string;
  onToggleRsvp: (eventId: string) => void;
  openPromptArchitect: () => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({
  events,
  searchQuery,
  onToggleRsvp,
  openPromptArchitect
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filterRsvpdOnly, setFilterRsvpdOnly] = useState<boolean>(false);

  const categories = ['All', 'Hackathon', 'Career & Internship', 'Academic Workshop', 'Guest Lecture', 'Social & Cultural'];

  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      const matchesCategory = selectedCategory === 'All' || e.category === selectedCategory;
      const matchesRsvp = !filterRsvpdOnly || e.isRsvpd;
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery = !query ||
        e.title.toLowerCase().includes(query) ||
        e.description.toLowerCase().includes(query) ||
        e.location.toLowerCase().includes(query) ||
        e.organizer.toLowerCase().includes(query);

      return matchesCategory && matchesRsvp && matchesQuery;
    });
  }, [events, selectedCategory, filterRsvpdOnly, searchQuery]);

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Campus Events &amp; Happenings
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Real-time updates on university hackathons, career recruiting, workshops, and student union mixers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterRsvpdOnly(!filterRsvpdOnly)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border ${
              filterRsvpdOnly
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            My RSVPs {events.filter(e => e.isRsvpd).length > 0 && `(${events.filter(e => e.isRsvpd).length})`}
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 no-scrollbar">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 px-2 shrink-0 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" />
          <span>Category:</span>
        </span>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Events Listing */}
      {filteredEvents.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
          <Calendar className="w-10 h-10 mx-auto text-slate-400 mb-3" />
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">No campus events match your criteria</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1">
            Try resetting your active category or RSVP filter to view all scheduled campus events.
          </p>
          <button
            onClick={() => { setSelectedCategory('All'); setFilterRsvpdOnly(false); }}
            className="mt-4 px-4 py-2 text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            Show All Events
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filteredEvents.map(evt => {
            const fillPercent = Math.min(100, Math.round((evt.attendeesCount / evt.capacity) * 100));

            return (
              <div
                key={evt.id}
                className={`bg-white dark:bg-slate-900 rounded-xl border p-5 sm:p-6 flex flex-col justify-between transition-all ${
                  evt.isRsvpd
                    ? 'border-indigo-300 dark:border-indigo-800/80 ring-1 ring-indigo-200 dark:ring-indigo-900/40 shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div>
                  {/* Meta strip with natural separators */}
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">{evt.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>By {evt.organizer}</span>
                    </div>

                    {evt.isRsvpd && (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
                        <Check className="w-3 h-3" />
                        <span>RSVP CONFIRMED</span>
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white leading-snug">
                    {evt.title}
                  </h3>

                  {/* Date, Time & Venue */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="font-medium">{evt.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="flex items-center gap-2 sm:col-span-2">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="truncate">{evt.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                    {evt.description}
                  </p>

                  {/* Highlights unboxed list */}
                  <div className="mt-3.5 space-y-1 text-xs text-slate-500 dark:text-slate-400">
                    {evt.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <span className="text-indigo-600 dark:text-indigo-400 font-bold">›</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Capacity Progress & RSVP Action */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                    <div className="flex items-center gap-1.5 font-mono">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span className="tabular-nums font-semibold text-slate-700 dark:text-slate-200">
                        {evt.attendeesCount} / {evt.capacity} attending
                      </span>
                    </div>
                    <span className="font-mono text-[11px] tabular-nums text-slate-400">
                      {fillPercent}% capacity
                    </span>
                  </div>

                  {/* Clean progress bar */}
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mb-4">
                    <div
                      className={`h-full transition-all duration-300 ${
                        fillPercent > 90 ? 'bg-amber-500' : 'bg-indigo-600'
                      }`}
                      style={{ width: `${fillPercent}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <button
                      onClick={() => {
                        const text = `Check out this campus event: ${evt.title} on ${evt.date} at ${evt.location}`;
                        navigator.clipboard?.writeText(text);
                        alert('Event details copied to clipboard!');
                      }}
                      className="px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share</span>
                    </button>

                    <button
                      onClick={() => onToggleRsvp(evt.id)}
                      className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                        evt.isRsvpd
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                      }`}
                    >
                      {evt.isRsvpd ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Cancel RSVP</span>
                        </>
                      ) : (
                        <span>RSVP Now</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
