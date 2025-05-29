import React, { useState, useEffect } from 'react'
import './Header.css'

const Header: React.FC = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState<string[]>([])

  // 프로젝트 정보 (실제로는 context나 props에서 받아올 데이터)
  const projectInfo = {
    name: 'TaskMate Project',
    deadline: '2024-06-15'
  }

  useEffect(() => {
    // 프로젝트 마감일 알림 체크
    const checkProjectDeadline = () => {
      if (!projectInfo.deadline) return

      const today = new Date()
      const deadline = new Date(projectInfo.deadline)
      const diffTime = deadline.getTime() - today.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      const newNotifications: string[] = []

      if (diffDays <= 0) {
        newNotifications.push('프로젝트 마감일이 지났습니다!')
      } else if (diffDays <= 3) {
        newNotifications.push(`프로젝트 마감일이 ${diffDays}일 남았습니다`)
      } else if (diffDays <= 7) {
        newNotifications.push(`프로젝트 마감일이 ${diffDays}일 남았습니다`)
      }

      // 기존 알림에 새 알림 추가 (실제로는 서버에서 받아올 데이터)
      setNotifications(['새 댓글이 달렸습니다', '카드가 이동되었습니다', ...newNotifications])
    }

    checkProjectDeadline()
  }, [projectInfo.deadline])

  const getNotificationCount = () => {
    return notifications.length
  }

  const hasUrgentNotifications = () => {
    return notifications.some(notification => 
      notification.includes('마감일이 지났습니다') || 
      notification.includes('마감일이') && (notification.includes('1일') || notification.includes('2일') || notification.includes('3일'))
    )
  }

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="project-title">📌 {projectInfo.name}</h1>
      </div>
      
      <div className="header-center">
        <div className="search-container">
          <input 
            type="text" 
            placeholder="🔍 카드, 담당자, 태그 검색..." 
            className="search-input"
          />
        </div>
      </div>
      
      <div className="header-right">
        <button className="filter-btn">
          🎛️ 필터
        </button>
        
        <div className="notification-container">
          <button className={`notification-btn ${hasUrgentNotifications() ? 'urgent' : ''}`}>
            🔔
            {getNotificationCount() > 0 && (
              <span className={`notification-badge ${hasUrgentNotifications() ? 'urgent' : ''}`}>
                {getNotificationCount()}
              </span>
            )}
          </button>
          
          {/* 알림 드롭다운 (간단 버전) */}
          <div className="notification-dropdown">
            <div className="notification-header">
              <span>알림 ({getNotificationCount()})</span>
            </div>
            <div className="notification-list">
              {notifications.length === 0 ? (
                <div className="no-notifications">새 알림이 없습니다</div>
              ) : (
                notifications.map((notification, index) => (
                  <div 
                    key={index} 
                    className={`notification-item ${
                      notification.includes('마감일') ? 'deadline-notification' : ''
                    }`}
                  >
                    {notification.includes('마감일') && (
                      <span className="notification-icon">⏰</span>
                    )}
                    {notification}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        
        <div className="user-menu-container">
          <button 
            className="user-menu-btn"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          >
            👤 사용자 ▼
          </button>
          
          {isUserMenuOpen && (
            <div className="user-menu-dropdown">
              <ul>
                <li><a href="#profile">내 정보</a></li>
                <li><a href="#settings">설정</a></li>
                <li><a href="#dark-mode">다크모드</a></li>
                <li className="divider"></li>
                <li><a href="#logout">로그아웃</a></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header 