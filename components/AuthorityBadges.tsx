import { AUTHORITY_BADGES } from '@/lib/data';

export default function AuthorityBadges() {
  return (
    <section className="bg-white border-b border-gray-100 py-5">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {AUTHORITY_BADGES.map((badge, i) => (
            <div key={i} className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
              <span className="text-base">{badge.icon}</span>
              <span>{badge.label}</span>
              {i < AUTHORITY_BADGES.length - 1 && (
                <span className="ml-6 w-px h-4 bg-gray-200 inline-block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
