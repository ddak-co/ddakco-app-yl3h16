import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '이력서 자동분류 시스템',
  description: '이력서 자동 분류 및 채용공고 매칭 시스템',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-gray-50">
        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">이력서 자동분류</h1>
              <div className="flex gap-4">
                <a href="/" className="text-gray-600 hover:text-gray-900">업로드</a>
                <a href="/dashboard" className="text-gray-600 hover:text-gray-900">대시보드</a>
                <a href="/matching" className="text-gray-600 hover:text-gray-900">매칭</a>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
