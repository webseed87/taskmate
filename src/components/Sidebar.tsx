import React, { useState } from 'react'
import ProjectManageModal from './ProjectManageModal'
import './Sidebar.css'

interface Project {
  id: number
  name: string
  isFavorite: boolean
  isRecent: boolean
}

interface TeamMember {
  id: number
  name: string
  status: 'online' | 'offline'
  avatar: string
}

const Sidebar: React.FC = () => {
  const [projects] = useState<Project[]>([
    { id: 1, name: '웹사이트 리뉴얼', isFavorite: true, isRecent: true },
    { id: 2, name: '모바일 앱 개발', isFavorite: false, isRecent: true },
    { id: 3, name: 'API 서버 구축', isFavorite: true, isRecent: false },
    { id: 4, name: '데이터베이스 최적화', isFavorite: false, isRecent: false },
  ])

  const [teamMembers] = useState<TeamMember[]>([
    { id: 1, name: '김개발', status: 'online', avatar: '👨‍💻' },
    { id: 2, name: '박디자인', status: 'online', avatar: '👩‍🎨' },
    { id: 3, name: '이기획', status: 'offline', avatar: '👨‍💼' },
    { id: 4, name: '최테스트', status: 'offline', avatar: '👩‍🔬' },
  ])

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)

  const favoriteProjects = projects.filter(p => p.isFavorite)
  const recentProjects = projects.filter(p => p.isRecent)

  return (
    <>
      <aside className="sidebar">
        {/* 프로젝트 섹션 */}
        <div className="sidebar-section">
          <div className="section-header">
            <h3>📁 프로젝트</h3>
          </div>
          
          {/* 즐겨찾기 프로젝트 */}
          <div className="subsection">
            <h4>⭐ 즐겨찾기</h4>
            <ul className="project-list">
              {favoriteProjects.map(project => (
                <li key={project.id} className="project-item active">
                  <span className="project-name">{project.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 최근 프로젝트 */}
          <div className="subsection">
            <h4>🕒 최근 항목</h4>
            <ul className="project-list">
              {recentProjects.map(project => (
                <li key={project.id} className="project-item">
                  <span className="project-name">{project.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 모든 프로젝트 */}
          <div className="subsection">
            <h4>📋 모든 프로젝트</h4>
            <ul className="project-list">
              {projects.map(project => (
                <li key={project.id} className="project-item">
                  <span className="project-name">{project.name}</span>
                  {project.isFavorite && <span className="favorite-star">⭐</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 팀원 섹션 */}
        <div className="sidebar-section">
          <div className="section-header">
            <h3>👥 팀원</h3>
            <span className="team-count">({teamMembers.length})</span>
          </div>
          
          <ul className="team-list">
            {teamMembers.map(member => (
              <li key={member.id} className="team-member">
                <div className="member-info">
                  <span className="member-avatar">{member.avatar}</span>
                  <span className="member-name">{member.name}</span>
                </div>
                <span className={`status-indicator ${member.status}`}>
                  {member.status === 'online' ? '🟢' : '⚫'}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* 새 프로젝트 버튼 */}
        <div className="sidebar-section">
          <button 
            className="new-project-btn"
            onClick={() => setIsProjectModalOpen(true)}
          >
            ➕ 새 프로젝트 만들기
          </button>
        </div>
      </aside>

      {/* 프로젝트 관리 모달 */}
      <ProjectManageModal 
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
      />
    </>
  )
}

export default Sidebar 