'use client';

import { useState } from 'react';

interface JobPosting {
  id: string;
  title: string;
  requiredSkills: string[];
  experience: number;
  registeredDate: string;
}

interface MatchingResult {
  id: string;
  postingId: string;
  resumeName: string;
  score: number;
  reason: string;
}

export default function MatchingPage() {
  const [postings, setPostings] = useState<JobPosting[]>([
    {
      id: '1',
      title: 'Senior Frontend Developer',
      requiredSkills: ['React', 'TypeScript', 'Tailwind CSS'],
      experience: 5,
      registeredDate: '2024-01-15',
    },
  ]);

  const [matchingResults] = useState<MatchingResult[]>([
    {
      id: '1',
      postingId: '1',
      resumeName: '김개발',
      score: 0.92,
      reason: '필수 스킬 3개 모두 보유, 경력 5년 이상',
    },
    {
      id: '2',
      postingId: '1',
      resumeName: '이프론트',
      score: 0.78,
      reason: '필수 스킬 2개 보유, 경력 3년',
    },
  ]);

  const [newPosting, setNewPosting] = useState<JobPosting>({
    id: '',
    title: '',
    requiredSkills: [],
    experience: 0,
    registeredDate: '',
  });

  const [skillInput, setSkillInput] = useState('');

  const handleAddPosting = () => {
    if (!newPosting.title) return;

    const posting: JobPosting = {
      ...newPosting,
      id: Date.now().toString(),
      registeredDate: new Date().toLocaleDateString('ko-KR'),
    };

    setPostings([...postings, posting]);
    setNewPosting({ id: '', title: '', requiredSkills: [], experience: 0, registeredDate: '' });
  };

  const handleAddSkill = () => {
    if (!skillInput.trim()) return;
    setNewPosting({
      ...newPosting,
      requiredSkills: [...newPosting.requiredSkills, skillInput],
    });
    setSkillInput('');
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">채용공고 및 매칭</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">채용공고 등록</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">직급</label>
            <input
              type="text"
              value={newPosting.title}
              onChange={(e) => setNewPosting({ ...newPosting, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="예: Senior Frontend Developer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">필수 경력연수</label>
            <input
              type="number"
              value={newPosting.experience}
              onChange={(e) => setNewPosting({ ...newPosting, experience: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="5"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">필수 스킬</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="스킬 입력 후 Enter"
              />
              <button
                onClick={handleAddSkill}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                추가
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {newPosting.requiredSkills.map((skill, idx) => (
                <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={handleAddPosting}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
          >
            채용공고 등록
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">등록된 채용공고</h2>
        <div className="space-y-3">
          {postings.map(posting => (
            <div key={posting.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900">{posting.title}</h3>
                  <p className="text-sm text-gray-500">{posting.registeredDate}</p>
                </div>
                <span className="text-sm font-medium text-gray-700">경력 {posting.experience}년+</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {posting.requiredSkills.map(skill => (
                  <span key={skill} className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">매칭 결과</h2>
        <div className="space-y-3">
          {matchingResults.map(result => (
            <div key={result.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-900">{result.resumeName}</p>
                  <p className="text-sm text-gray-600 mt-1">{result.reason}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">매칭점수</p>
                  <p className="text-lg font-bold text-green-600">{Math.round(result.score * 100)}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
