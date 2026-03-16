import { Star } from 'lucide-react'

const EVENTS = [
    {
        date: 'TODAY',
        dateColor: 'bg-background text-text',
        title: 'Ben&Ben Live at SM MOA',
        sub: '~5,000 crowd · High foot traffic',
    },
    {
        date: 'MAR 12',
        dateColor: 'bg-background text-text',
        title: 'Korean Cultural Fair',
        sub: 'Cultural Center · K-cuisine demand ↑',
    },
]

const DISH_FEEDBACK = [
    { name: 'Kare-Kare', rating: 5, reviews: 24 },
    { name: 'Lumpia', rating: 3.5, reviews: 31 },
    { name: 'Callos', rating: 1.5, reviews: 8 },
]

const GUEST_MIX = [
    { label: 'Filipino', pct: 32, color: 'bg-corePurple' },
    { label: 'Chinese', pct: 24, color: 'bg-sky-500' },
    { label: 'Korean', pct: 19, color: 'bg-amber-500' },
    { label: 'American', pct: 15, color: 'bg-emerald-500' },
    { label: 'Other', pct: 10, color: 'bg-pink-500' },
]

const Stars = ({ rating }: { rating: number }) => {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map(i => {
                const filled = rating >= i
                const half = !filled && rating >= i - 0.5
                return (
                    <Star
                        key={i}
                        size={13}
                        className={filled || half ? 'text-yellow-400' : 'text-darkGrey'}
                        fill={filled ? 'currentColor' : half ? 'url(#half)' : 'none'}
                    />
                )
            })}
        </div>
    )
}

const Section = ({ emoji, title, children }: { emoji: string; title: string; children: React.ReactNode }) => (
    <div className="bg-cards border border-borderGrey space-y-3 pb-4">
        <div className="bg-background border-b border-borderGrey py-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-darkGrey flex items-center gap-1.5 px-4">
                <span>{emoji}</span> {title}
            </p>
        </div>
        {children}
    </div>
)

const LiveContextFeed = () => {
    return (
        <div className="flex flex-col h-full w-full bg-cards border-l border-borderGrey overflow-y-auto hide-scrollbar">

            {/* Header */}
            <div className="px-5 py-4 border-b border-borderGrey shrink-0">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-darkGrey">
                    Live Context Feed
                </p>
            </div>

            <div className="p-4 space-y-3 flex-1">

                {/* Nearby Events */}
                <Section emoji="🗓️" title="Nearby Events (3 days)">
                    {EVENTS.map((ev, i) => (
                        <div key={i} className="flex items-start gap-3 px-4">
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 shrink-0 font-mono ${ev.dateColor}`}>
                                {ev.date}
                            </span>
                            <div>
                                <p className="text-[12px] font-semibold text-text leading-snug">{ev.title}</p>
                                <p className="text-[11px] text-darkGrey mt-0.5">{ev.sub}</p>
                            </div>
                        </div>
                    ))}
                </Section>

                {/* Recent Dish Feedback */}
                <Section emoji="⭐" title="Recent Dish Feedback">
                    {DISH_FEEDBACK.map((dish, i) => (
                        <div key={i} className="flex items-center justify-between gap-2 px-4">
                            <span className="text-[13px] font-medium text-text w-20 shrink-0">{dish.name}</span>
                            <Stars rating={dish.rating} />
                            <span className="text-[11px] text-darkGrey font-mono shrink-0">{dish.reviews} reviews</span>
                        </div>
                    ))}
                </Section>

                {/* Today's Guest Mix */}
                <Section emoji="👥" title="Today's Guest Mix">
                    {GUEST_MIX.map((g, i) => (
                        <div key={i} className="flex items-center gap-3 px-4">
                            <span className="text-[12px] text-text w-16 shrink-0">{g.label}</span>
                            <div className="flex-1 h-2 bg-borderGrey">
                                <div
                                    className={`h-full ${g.color}`}
                                    style={{ width: `${g.pct}%` }}
                                />
                            </div>
                            <span className="text-[11px] text-darkGrey font-mono w-8 text-right shrink-0">
                                {g.pct}%
                            </span>
                        </div>
                    ))}
                </Section>

            </div>
        </div>
    )
}

export default LiveContextFeed