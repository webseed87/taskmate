import React, { useState } from 'react'
import ProjectOverview from './ProjectOverview'
import './KanbanBoard.css'

interface Task {
  id: number
  title: string
  assignee: string
  dueDate: string
  checklistTotal: number
  checklistCompleted: number
  status: string
  tags: string[]
  priority: 'high' | 'medium' | 'low'
}

interface Column {
  id: string
  title: string
  emoji: string
  tasks: Task[]
}

const KanbanBoard: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  // 프로젝트 정보 (실제로는 props나 context에서 받아올 데이터)
  const projectInfo = {
    name: 'TaskMate Project',
    startDate: '2024-05-01',
    endDate: '2024-07-31',
    deadline: '2024-06-15',
    progress: 65
  }

  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'planning',
      title: '기획',
      emoji: '📋',
      tasks: [
        {
          id: 1,
          title: '사용자 요구사항 분석',
          assignee: '이기획',
          dueDate: '2024-06-01',
          checklistTotal: 5,
          checklistCompleted: 3,
          status: 'planning',
          tags: ['기획', '분석'],
          priority: 'high'
        },
        {
          id: 2,
          title: '와이어프레임 설계',
          assignee: '이기획',
          dueDate: '2024-06-03',
          checklistTotal: 3,
          checklistCompleted: 1,
          status: 'planning',
          tags: ['기획', 'UI'],
          priority: 'medium'
        }
      ]
    },
    {
      id: 'design',
      title: '디자인',
      emoji: '🎨',
      tasks: [
        {
          id: 3,
          title: 'UI/UX 디자인',
          assignee: '박디자인',
          dueDate: '2024-06-05',
          checklistTotal: 8,
          checklistCompleted: 4,
          status: 'design',
          tags: ['디자인', 'UI/UX'],
          priority: 'high'
        }
      ]
    },
    {
      id: 'frontend',
      title: '프론트엔드',
      emoji: '💻',
      tasks: [
        {
          id: 4,
          title: '컴포넌트 개발',
          assignee: '김개발',
          dueDate: '2024-06-10',
          checklistTotal: 12,
          checklistCompleted: 8,
          status: 'frontend',
          tags: ['개발', 'React'],
          priority: 'high'
        }
      ]
    },
    {
      id: 'backend',
      title: '백엔드',
      emoji: '⚙️',
      tasks: [
        {
          id: 5,
          title: 'API 개발',
          assignee: '김개발',
          dueDate: '2024-06-08',
          checklistTotal: 6,
          checklistCompleted: 2,
          status: 'backend',
          tags: ['개발', 'API'],
          priority: 'medium'
        }
      ]
    },
    {
      id: 'completed',
      title: '완료',
      emoji: '✅',
      tasks: [
        {
          id: 6,
          title: '프로젝트 초기 설정',
          assignee: '김개발',
          dueDate: '2024-05-28',
          checklistTotal: 4,
          checklistCompleted: 4,
          status: 'completed',
          tags: ['설정', '초기화'],
          priority: 'low'
        }
      ]
    }
  ])

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task)
    setIsDetailOpen(true)
  }

  const closeTaskDetail = () => {
    setIsDetailOpen(false)
    setSelectedTask(null)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric'
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ef4444'
      case 'medium': return '#f59e0b'
      case 'low': return '#10b981'
      default: return '#6b7280'
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return '높음'
      case 'medium': return '보통'
      case 'low': return '낮음'
      default: return '없음'
    }
  }

  // 카드 마감일이 프로젝트 마감일을 넘는지 체크
  const isTaskOverdue = (taskDueDate: string) => {
    if (!taskDueDate || !projectInfo.deadline) return false
    return new Date(taskDueDate) > new Date(projectInfo.deadline)
  }

  // 마감일까지 남은 일수 계산
  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="kanban-board">
      {/* 프로젝트 개요 */}
      <ProjectOverview project={projectInfo} />

      <div className="board-header">
        <h2>📌 칸반 보드</h2>
        <div className="board-actions">
          <button className="add-column-btn">+ 컬럼 추가</button>
        </div>
      </div>

      <div className="board-content">
        {columns.map(column => (
          <div key={column.id} className="kanban-column">
            <div className="column-header">
              <span className="column-emoji">{column.emoji}</span>
              <h3 className="column-title">{column.title}</h3>
              <span className="task-count">({column.tasks.length})</span>
            </div>

            <div className="tasks-container">
              {column.tasks.map(task => {
                const daysUntilDue = getDaysUntilDue(task.dueDate)
                const isOverdue = isTaskOverdue(task.dueDate)
                
                return (
                  <div 
                    key={task.id} 
                    className={`task-card ${isOverdue ? 'overdue-warning' : ''} ${daysUntilDue <= 3 && daysUntilDue > 0 ? 'due-soon' : ''}`}
                    onClick={() => handleTaskClick(task)}
                  >
                    <div className="task-header">
                      <h4 className="task-title">{task.title}</h4>
                      <div 
                        className="priority-indicator"
                        style={{ backgroundColor: getPriorityColor(task.priority) }}
                        title={`우선순위: ${getPriorityLabel(task.priority)}`}
                      ></div>
                    </div>

                    <div className="task-meta">
                      <div className="assignee">
                        👤 {task.assignee}
                      </div>
                      <div className={`due-date ${daysUntilDue <= 0 ? 'overdue' : daysUntilDue <= 3 ? 'due-soon' : ''}`}>
                        📅 {formatDate(task.dueDate)}
                        {daysUntilDue <= 0 && <span className="overdue-badge">지연</span>}
                        {daysUntilDue > 0 && daysUntilDue <= 3 && <span className="due-soon-badge">급함</span>}
                      </div>
                    </div>

                    {isOverdue && (
                      <div className="overdue-warning-text">
                        ⚠️ 프로젝트 마감일을 초과합니다
                      </div>
                    )}

                    <div className="task-progress">
                      <div className="checklist-info">
                        ✅ {task.checklistCompleted}/{task.checklistTotal}
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ 
                            width: `${(task.checklistCompleted / task.checklistTotal) * 100}%` 
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="task-tags">
                      {task.tags.map((tag, index) => (
                        <span key={index} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              })}

              <button className="add-task-btn">
                ➕ 새 카드 추가
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 태스크 상세 슬라이드 */}
      {isDetailOpen && selectedTask && (
        <div className="task-detail-overlay" onClick={closeTaskDetail}>
          <div className="task-detail-slide" onClick={e => e.stopPropagation()}>
            <div className="detail-header">
              <h3>{selectedTask.title}</h3>
              <button className="close-btn" onClick={closeTaskDetail}>✕</button>
            </div>
            
            <div className="detail-content">
              <div className="detail-section">
                <h4>📋 기본 정보</h4>
                <div className="info-grid">
                  <div className="info-item">
                    <label>담당자</label>
                    <span>{selectedTask.assignee}</span>
                  </div>
                  <div className="info-item">
                    <label>마감일</label>
                    <span className={isTaskOverdue(selectedTask.dueDate) ? 'overdue-text' : ''}>
                      {formatDate(selectedTask.dueDate)}
                      {isTaskOverdue(selectedTask.dueDate) && ' (프로젝트 마감일 초과)'}
                    </span>
                  </div>
                  <div className="info-item">
                    <label>우선순위</label>
                    <span 
                      className="priority-badge"
                      style={{ backgroundColor: getPriorityColor(selectedTask.priority) }}
                    >
                      {getPriorityLabel(selectedTask.priority)}
                    </span>
                  </div>
                  <div className="info-item">
                    <label>상태</label>
                    <span>{columns.find(c => c.id === selectedTask.status)?.title}</span>
                  </div>
                </div>
              </div>

              {isTaskOverdue(selectedTask.dueDate) && (
                <div className="detail-warning">
                  ⚠️ 이 카드의 마감일이 프로젝트 전체 마감일({formatDate(projectInfo.deadline)})을 초과합니다. 일정을 재조정해주세요.
                </div>
              )}

              <div className="detail-section">
                <h4>✅ 체크리스트 ({selectedTask.checklistCompleted}/{selectedTask.checklistTotal})</h4>
                <div className="progress-bar large">
                  <div 
                    className="progress-fill"
                    style={{ 
                      width: `${(selectedTask.checklistCompleted / selectedTask.checklistTotal) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>

              <div className="detail-section">
                <h4>🏷️ 태그</h4>
                <div className="tags-container">
                  {selectedTask.tags.map((tag, index) => (
                    <span key={index} className="tag large">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default KanbanBoard 