import React, { useState } from 'react'
import './ProjectManageModal.css'

interface ProjectManageModalProps {
  isOpen: boolean
  onClose: () => void
  isEditMode?: boolean
  project?: any
}

interface ProjectFormData {
  name: string
  participants: string[]
  stages: Array<{ name: string; color: string }>
  permissions: { [key: string]: 'admin' | 'editor' | 'readonly' }
  startDate: string
  endDate: string
  deadline: string
}

const ProjectManageModal: React.FC<ProjectManageModalProps> = ({ 
  isOpen, 
  onClose, 
  isEditMode = false,
  project 
}) => {
  const [formData, setFormData] = useState<ProjectFormData>({
    name: project?.name || '',
    participants: project?.participants || [],
    stages: project?.stages || [
      { name: '기획', color: '#3b82f6' },
      { name: '디자인', color: '#8b5cf6' },
      { name: '프론트엔드', color: '#10b981' },
      { name: '백엔드', color: '#f59e0b' },
      { name: '완료', color: '#ef4444' }
    ],
    permissions: project?.permissions || {},
    startDate: project?.startDate || '',
    endDate: project?.endDate || '',
    deadline: project?.deadline || ''
  })

  const [newParticipant, setNewParticipant] = useState('')
  const [newStage, setNewStage] = useState({ name: '', color: '#3b82f6' })

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 프로젝트 생성/수정 로직
    console.log('Project data:', formData)
    onClose()
  }

  const addParticipant = () => {
    if (newParticipant.trim()) {
      setFormData(prev => ({
        ...prev,
        participants: [...prev.participants, newParticipant.trim()]
      }))
      setNewParticipant('')
    }
  }

  const removeParticipant = (index: number) => {
    setFormData(prev => ({
      ...prev,
      participants: prev.participants.filter((_, i) => i !== index)
    }))
  }

  const addStage = () => {
    if (newStage.name.trim()) {
      setFormData(prev => ({
        ...prev,
        stages: [...prev.stages, { ...newStage }]
      }))
      setNewStage({ name: '', color: '#3b82f6' })
    }
  }

  const removeStage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      stages: prev.stages.filter((_, i) => i !== index)
    }))
  }

  const updateStageColor = (index: number, color: string) => {
    setFormData(prev => ({
      ...prev,
      stages: prev.stages.map((stage, i) => 
        i === index ? { ...stage, color } : stage
      )
    }))
  }

  const updatePermission = (participant: string, permission: 'admin' | 'editor' | 'readonly') => {
    setFormData(prev => ({
      ...prev,
      permissions: { ...prev.permissions, [participant]: permission }
    }))
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="project-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isEditMode ? '프로젝트 수정' : '새 프로젝트 만들기'}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-content">
          {/* 프로젝트명 */}
          <div className="form-group">
            <label>프로젝트명 *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="프로젝트 이름을 입력하세요"
              required
            />
          </div>

          {/* 일정 설정 */}
          <div className="form-group">
            <label>📅 일정 설정</label>
            <div className="date-inputs">
              <div className="date-field">
                <label>시작일</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                />
              </div>
              <div className="date-field">
                <label>종료일</label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                />
              </div>
              <div className="date-field">
                <label>프로젝트 마감일</label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                />
              </div>
            </div>
          </div>

          {/* 참여자 초대 */}
          <div className="form-group">
            <label>👥 참여자 초대</label>
            <div className="participant-input">
              <input
                type="email"
                value={newParticipant}
                onChange={(e) => setNewParticipant(e.target.value)}
                placeholder="이메일 주소 입력"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addParticipant())}
              />
              <button type="button" onClick={addParticipant}>추가</button>
            </div>
            
            <div className="participants-list">
              {formData.participants.map((participant, index) => (
                <div key={index} className="participant-item">
                  <span className="participant-email">{participant}</span>
                  <select
                    value={formData.permissions[participant] || 'editor'}
                    onChange={(e) => updatePermission(participant, e.target.value as any)}
                  >
                    <option value="admin">관리자</option>
                    <option value="editor">편집자</option>
                    <option value="readonly">읽기 전용</option>
                  </select>
                  <button type="button" onClick={() => removeParticipant(index)}>삭제</button>
                </div>
              ))}
            </div>
          </div>

          {/* 단계 설정 */}
          <div className="form-group">
            <label>📋 단계 설정</label>
            <div className="stage-input">
              <input
                type="text"
                value={newStage.name}
                onChange={(e) => setNewStage(prev => ({ ...prev, name: e.target.value }))}
                placeholder="단계 이름"
              />
              <input
                type="color"
                value={newStage.color}
                onChange={(e) => setNewStage(prev => ({ ...prev, color: e.target.value }))}
              />
              <button type="button" onClick={addStage}>추가</button>
            </div>

            <div className="stages-list">
              {formData.stages.map((stage, index) => (
                <div key={index} className="stage-item">
                  <div 
                    className="stage-color" 
                    style={{ backgroundColor: stage.color }}
                  ></div>
                  <span className="stage-name">{stage.name}</span>
                  <input
                    type="color"
                    value={stage.color}
                    onChange={(e) => updateStageColor(index, e.target.value)}
                  />
                  <button type="button" onClick={() => removeStage(index)}>삭제</button>
                </div>
              ))}
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              취소
            </button>
            <button type="submit" className="submit-btn">
              {isEditMode ? '수정하기' : '프로젝트 만들기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProjectManageModal 