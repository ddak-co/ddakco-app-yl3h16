'use client';

import { useState, useEffect } from 'react';

interface DashboardStats {
  totalResumes: number;
  classifiedResumes: number;
  pendingResumes: number;
  jobCategories: { [key: string]: number };
  avgExperience: number;
  avgConfidence: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalResumes: 0,
    classifiedResumes: 0,
    pendingResumes: 0,
    jobCategories: {},
    avgExperience: 0,
    avgConfidence: 0,
  });

  useEffect(() => {
    const mockStats: DashboardStats = {
      totalResumes: 42,
      classifiedResumes: 28,
      pendingResumes: 14,
      jobCategories: {
        '개발': 18,
        '디자인': 7,
        '마케팅': 3,
      },
      avgExperience: 4.5,
      avgConfidence: 0.82,
    };
    setStats(mockStats);
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">대시보드</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 mb-2">전체 이력서</p>
          <p className="text-4xl font-bold text-gray-900">{stats.totalResumes}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 mb-2">분류 완료</p>
          <p className="text-4xl font-bold text-green-600">{stats.classifiedResumes}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 mb-2">분류 대기</p>
          <p className="text-4xl font-bold text-yellow-600">{stats.pendingResumes}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">직군별 분포</h2>
          <div className="space-y-3">
            {Object.entries(stats.jobCategories).map(([category, count]) => (
              <div key={category}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{category}</span>
                  <span className="text-sm text-gray-600">{count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(count / stats.totalResumes) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">분류 통계</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">평균 경력연수</p>
              <p className="text-2xl font-bold text-gray-900">{stats.avgExperience}년</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">평균 신뢰도</p>
              <p className="text-2xl font-bold text-gray-900">{Math.round(stats.avgConfidence * 100)}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">분류 완료율</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round((stats.classifiedResumes / stats.totalResumes) * 100)}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
