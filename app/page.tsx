'use client';

import { useState } from 'react';

interface Resume {
  id: string;
  name: string;
  phone: string;
  uploadDate: string;
  status: 'pending' | 'classified';
}

interface Classification {
  id: string;
  resumeId: string;
  jobCategory: string;
  experience: number;
  skills: string[];
  education: string;
  confidence: number;
}

export default function UploadPage() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [classifications, setClassifications] = useState<Classification[]>([]);
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newResume: Resume = {
      id: Date.now().toString(),
      name: '미분류',
      phone: '010-0000-0000',
      uploadDate: new Date().toLocaleDateString('ko-KR'),
      status: 'pending',
    };

    setResumes([...resumes, newResume]);
  };

  const handleClassify = (resumeId: string) => {
    const resume = resumes.find(r => r.id === resumeId);
    if (!resume) return;

    const classification: Classification = {
      id: Date.now().toString(),
      resumeId,
      jobCategory: '개발',
      experience: 5,
      skills: ['JavaScript', 'React', 'Node.js'],
      education: '대학교 졸업',
      confidence: 0.85,
    };

    setClassifications([...classifications, classification]);

    setResumes(resumes.map(r =>
      r.id === resumeId ? { ...r, status: 'classified' } : r
    ));
  };

  const selectedClassification = selectedResume
    ? classifications.find(c => c.resumeId === selectedResume.id)
    : null;

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">이력서 업로드</h2>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileUpload}
            className="hidden"
            id="resume-upload"
          />
          <label htmlFor="resume-upload" className="cursor-pointer block">
            <p className="text-gray-600">파일을 드래그하거나 클릭하여 업로드</p>
            <p className="text-sm text-gray-500 mt-2">PDF, DOC, DOCX 형식 지원</p>
          </label>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">업로드된 이력서</h2>
        <div className="space-y-3">
          {resumes.length === 0 ? (
            <p className="text-gray-500">업로드된 이력서가 없습니다</p>
          ) : (
            resumes.map(resume => (
              <div
                key={resume.id}
                className="border border-gray-200 rounded-lg p-4 flex justify-between items-center hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedResume(resume)}
              >
                <div>
                  <p className="font-medium text-gray-900">{resume.name}</p>
                  <p className="text-sm text-gray-500">{resume.phone} · {resume.uploadDate}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    resume.status === 'classified'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {resume.status === 'classified' ? '분류완료' : '분류대기'}
                  </span>
                  {resume.status === 'pending' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClassify(resume.id);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                      분류하기
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {selectedClassification && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">분류 결과</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">직군</p>
                <p className="text-lg font-semibold text-gray-900">{selectedClassification.jobCategory}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">경력연수</p>
                <p className="text-lg font-semibold text-gray-900">{selectedClassification.experience}년</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">학력</p>
                <p className="text-lg font-semibold text-gray-900">{selectedClassification.education}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">신뢰도</p>
                <p className="text-lg font-semibold text-gray-900">{Math.round(selectedClassification.confidence * 100)}%</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">추출된 스킬</p>
              <div className="flex flex-wrap gap-2">
                {selectedClassification.skills.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
