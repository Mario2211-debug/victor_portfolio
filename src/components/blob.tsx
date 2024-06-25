export default function Blob() {
  return (
    <div className="justify-arround blur-3xl border-l-8 border-l-slate-800 opacity-80">
      <div className="animate-blob origin-center">
        <div className="flex-1 absolute space-y-6 w-[100hv] h-[100hv] overflow-hidden">
          <div className="bg-gradient-to-tl from-gray-950 from-45% via-gray-300 to-blue-950 to-55%"></div>
          <div className="rounded-full w-60 h-60 bg-gradient-to-tr from-green-300 from-50% via-violet-600 via-20% to-blue-900 to-30%"></div>
        </div>
      </div>
    </div>
  );
}
