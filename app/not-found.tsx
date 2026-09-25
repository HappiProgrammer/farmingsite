import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-agri-yellow">
        404
      </p>
      <h1 className="font-display text-display-lg font-bold text-forest-deep">
        Page not found
      </h1>
      <p className="max-w-sm text-base text-ink-mid">
        This page doesn&apos;t exist or the content hasn&apos;t been added yet.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button href="/" variant="primary" size="md">
          Go home
        </Button>
        <Button href="/farmers" variant="ghost" size="md" className="!text-forest-mid">
          Browse farmers
        </Button>
      </div>
    </div>
  );
}
