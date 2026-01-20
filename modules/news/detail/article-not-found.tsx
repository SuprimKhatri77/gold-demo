import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const NotFoundState: React.FC = () => (
  <div className="min-h-screen bg-slate-50">
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="bg-white rounded-2xl shadow-xl p-16 text-center border-2 border-slate-100">
        <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <AlertCircle className="w-12 h-12 text-amber-600" />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Article Not Found
        </h1>
        <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
          We couldn&apos;t find the article you&apos;re looking for. It may have
          been moved or deleted.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to News
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition-colors shadow-lg"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  </div>
);
