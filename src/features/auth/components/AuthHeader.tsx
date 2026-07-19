import clsx from "clsx";

interface AuthHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export default function AuthHeader({
  title,
  description,
  className,
}: AuthHeaderProps) {
  return (
    <div className={clsx("mb-8 text-center", className)}>
      <h2 className="text-2xl font-bold tracking-tight text-slate-900">
        {title}
      </h2>

      {description && (
        <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
      )}
    </div>
  );
}
