import { cn } from '@/lib/utils'

export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string
  showWordmark?: boolean
}) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span className="relative grid h-7 w-7 place-items-center rounded-sm bg-primary text-primary-foreground">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path
            d="M4 16c3-6 5-6 8 0s5 6 8 0"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <circle cx="20" cy="6" r="2" className="fill-accent" />
        </svg>
      </span>
      {showWordmark && (
        <span className="text-[15px] font-semibold tracking-tight text-foreground">
          OpenSign<span className="text-primary">Flow</span>
        </span>
      )}
    </span>
  )
}
