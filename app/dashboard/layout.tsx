import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <section className="min-h-screen bg-white">
      {/* Bisa tambahkan sidebar/dashboard header khusus di sini */}
      {children}
    </section>
  );
}
