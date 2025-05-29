import React from 'react'
import './ProjectOverview.css'

interface ProjectOverviewProps {
  project: {
    name: string
    startDate: string
    endDate: string
    deadline: string
    progress: number
  }
}

const ProjectOverview: React.FC<ProjectOverviewProps> = ({ project }) => {
  const calculateDDay = (targetDate: string): string => {
    if (!targetDate) return ''
    
    const today = new Date()
    const target = new Date(targetDate)
    const diffTime = target.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays > 0) {
      return `D-${diffDays}`
    } else if (diffDays === 0) {
      return 'D-Day'
    } else {
      return `D+${Math.abs(diffDays)}`
    }
  }

  const formatDate = (dateString: string): string => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getDeadlineStatus = (deadline: string): 'safe' | 'warning' | 'danger' => {
    if (!deadline) return 'safe'
    
    const today = new Date()
    const target = new Date(deadline)
    const diffTime = target.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays <= 0) return 'danger'
    if (diffDays <= 7) return 'warning'
    return 'safe'
  }

  const deadlineStatus = getDeadlineStatus(project.deadline)
  const dDay = calculateDDay(project.deadline)

  return (
    <div className="project-overview">
      <div className="overview-header">
        <div className="project-info">
          <h2 className="project-name">{project.name}</h2>
          <div className="project-progress">
            <span className="progress-text">전체 진행률 {project.progress}%</span>
            <div className="progress-bar-container">
              <div 
                className="progress-bar-fill"
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="deadline-info">
          <div className={`dday-badge ${deadlineStatus}`}>
            {dDay && (
              <>
                <span className="dday-text">{dDay}</span>
                <span className="dday-label">마감까지</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="overview-details">
        <div className="date-item">
          <span className="date-label">📅 시작일</span>
          <span className="date-value">{formatDate(project.startDate)}</span>
        </div>
        
        <div className="date-item">
          <span className="date-label">🏁 종료일</span>
          <span className="date-value">{formatDate(project.endDate)}</span>
        </div>
        
        <div className="date-item">
          <span className="date-label">⏰ 마감일</span>
          <span className={`date-value ${deadlineStatus}`}>
            {formatDate(project.deadline)}
          </span>
        </div>
      </div>

      {deadlineStatus === 'warning' && (
        <div className="deadline-warning">
          ⚠️ 마감일이 일주일 이내입니다. 진행 상황을 점검해주세요.
        </div>
      )}

      {deadlineStatus === 'danger' && (
        <div className="deadline-danger">
          🚨 마감일이 지났습니다. 프로젝트 일정을 재조정해주세요.
        </div>
      )}
    </div>
  )
}

export default ProjectOverview 