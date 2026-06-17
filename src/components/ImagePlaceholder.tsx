interface Props {
  className?: string;
}

export default function ImagePlaceholder({ className = '' }: Props) {
  return (
    <div className={`w-full h-full bg-stone-100 flex flex-col items-center justify-center gap-2 ${className}`}>
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 19.5h18a.75.75 0 00.75-.75V6.75A.75.75 0 0021 6H3a.75.75 0 00-.75.75v12c0 .414.336.75.75.75z" />
      </svg>
      <span className="text-[10px] font-mono uppercase tracking-widest text-stone-300">Photo</span>
    </div>
  );
}
