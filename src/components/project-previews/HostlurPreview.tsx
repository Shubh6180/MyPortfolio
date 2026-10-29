import React, { useState } from 'react';
import { Home, AlertCircle, Bell, CheckCircle2, Filter } from 'lucide-react';
import { sound } from '../../utils/audio';

export const HostlurPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'notices' | 'maintenance' | 'rooms'>('maintenance');
  const [tickets, setTickets] = useState([
    { id: 'T-104', room: 'Block B - 302', issue: 'Water Pressure Drop', priority: 'High', status: 'In Review' },
    { id: 'T-105', room: 'Block A - 114', issue: 'Study Lamp Fixture', priority: 'Low', status: 'Resolved' },
    { id: 'T-106', room: 'Block C - 205', issue: 'Wi-Fi AP Signal Loss', priority: 'Medium', status: 'Pending' },
  ]);

  const toggleTicket = (id: string) => {
    sound.click();
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === 'Resolved' ? 'In Review' : 'Resolved' }
          : t
      )
    );
  };

  return (
    <div className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl overflow-hidden text-xs font-sans shadow-xl">
      {/* Mini App Bar */}
      <div className="bg-[var(--bg-surface-elevated)] px-3 py-2 border-b border-[var(--border-subtle)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-pink)]" />
          <span className="font-display font-bold text-[var(--text-primary)] tracking-wide">HOSTLUR // PROTOTYPE</span>
        </div>
        <span className="font-mono text-[10px] text-[var(--color-turquoise)] bg-[var(--color-turquoise)]/10 px-2 py-0.5 rounded">
          HACKATHON BUILD
        </span>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[11px] font-mono">
        <button
          onClick={() => { sound.switch(); setActiveTab('maintenance'); }}
          className={`flex items-center gap-1.5 px-3 py-2 border-r border-[var(--border-subtle)] transition-colors ${
            activeTab === 'maintenance' ? 'bg-[var(--color-turquoise)]/15 text-[var(--color-turquoise)] font-bold border-b-2 border-b-[var(--color-turquoise)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          <AlertCircle size={12} /> Maintenance
        </button>
        <button
          onClick={() => { sound.switch(); setActiveTab('notices'); }}
          className={`flex items-center gap-1.5 px-3 py-2 border-r border-[var(--border-subtle)] transition-colors ${
            activeTab === 'notices' ? 'bg-[var(--color-pink)]/15 text-[var(--color-pink)] font-bold border-b-2 border-b-[var(--color-pink)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          <Bell size={12} /> Notices
        </button>
        <button
          onClick={() => { sound.switch(); setActiveTab('rooms'); }}
          className={`flex items-center gap-1.5 px-3 py-2 transition-colors ${
            activeTab === 'rooms' ? 'bg-[var(--color-blue)]/15 text-[var(--color-blue)] font-bold border-b-2 border-b-[var(--color-blue)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          <Home size={12} /> Amenities
        </button>
      </div>

      {/* Dynamic Content Body */}
      <div className="p-3 bg-[var(--bg-primary)] min-h-[160px]">
        {activeTab === 'maintenance' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)] pb-1">
              <span>ACTIVE STUDENT TICKETS (CLICK TO TOGGLE STATUS)</span>
              <span className="flex items-center gap-1 text-[var(--color-turquoise)]"><Filter size={10} /> 3 Total</span>
            </div>
            {tickets.map((t) => (
              <div
                key={t.id}
                onClick={() => toggleTicket(t.id)}
                className="flex items-center justify-between p-2 bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] hover:border-[var(--color-turquoise)]/50 rounded-lg cursor-pointer transition-all"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-[var(--color-turquoise)] font-bold">{t.id}</span>
                    <span className="text-[var(--text-primary)] font-medium">{t.issue}</span>
                  </div>
                  <span className="text-[10px] text-[var(--text-secondary)]">{t.room}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`font-mono text-[9px] px-1.5 py-0.5 rounded ${
                      t.priority === 'High' ? 'bg-[var(--color-pink)]/20 text-[var(--color-pink)]' : 'bg-[var(--bg-surface)] text-[var(--text-secondary)]'
                    }`}
                  >
                    {t.priority}
                  </span>
                  <span
                    className={`font-mono text-[9px] flex items-center gap-1 px-1.5 py-0.5 rounded ${
                      t.status === 'Resolved' ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/20 text-amber-600 dark:text-amber-300'
                    }`}
                  >
                    <CheckCircle2 size={10} /> {t.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'notices' && (
          <div className="space-y-2 font-mono text-[11px]">
            <div className="p-2.5 bg-[var(--bg-surface-elevated)] border-l-2 border-[var(--color-pink)] rounded-r-lg">
              <span className="text-[var(--color-pink)] font-bold block">[URGENT] Dining Hall Sanitization</span>
              <p className="text-[var(--text-secondary)] text-[10px] font-sans">Dinner service will operate from Auxiliary Block tonight (7:30 PM - 10:00 PM).</p>
            </div>
            <div className="p-2.5 bg-[var(--bg-surface-elevated)] border-l-2 border-[var(--color-turquoise)] rounded-r-lg">
              <span className="text-[var(--color-turquoise)] font-bold block">[CAMPUS] High-Speed Wi-Fi Firmware Upgrade</span>
              <p className="text-[var(--text-secondary)] text-[10px] font-sans">Scheduled router restart at 02:00 AM. Expected downtime 15 minutes.</p>
            </div>
          </div>
        )}

        {activeTab === 'rooms' && (
          <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
            <div className="p-2.5 bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] rounded-lg">
              <span className="text-[var(--color-turquoise)] block font-bold">LAUNDRY ROOM B</span>
              <span className="text-emerald-600 dark:text-emerald-400">● 4/6 Washers Free</span>
            </div>
            <div className="p-2.5 bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] rounded-lg">
              <span className="text-[var(--color-turquoise)] block font-bold">STUDY HALL 2</span>
              <span className="text-emerald-600 dark:text-emerald-400">● Open 24/7 (AC Active)</span>
            </div>
          </div>
        )}
      </div>

      <div className="bg-[var(--bg-surface)] px-3 py-1.5 border-t border-[var(--border-subtle)] flex items-center justify-between font-mono text-[9px] text-[var(--text-muted)]">
        <span>UI ARCHITECTURE: HTML5 / CSS3 / JAVASCRIPT</span>
        <span className="text-[var(--color-turquoise)]">STATUS: CLIENT PROTOTYPE</span>
      </div>
    </div>
  );
};

