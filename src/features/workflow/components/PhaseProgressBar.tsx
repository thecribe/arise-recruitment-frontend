interface Props {
  progress?: number;
}

export default function PhaseProgressBar({ progress }: Props) {
  return (
    <div className="mt-4">
      <div className="mb-2 flex justify-between text-sm">
        <span className="text-slate-500">Progress</span>

        <span className="font-medium">{progress}%</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  );
}
