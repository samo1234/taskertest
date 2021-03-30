import React from 'react'
import Tag from './Tag'

const Tasks = ({tasks, tags}) => {
  return (
  <ul className="tasks">
    {tasks.map((task, index) => (
      <li key={index}>
        <strong>{task.name}</strong>,<br />
        {task.description} value: <strong>${task.fiatvalue}</strong><br />

        {task.tags.map((tasktag, index) => (
          <Tag key={index} tag={tags.find(tag=>tag.id === tasktag)} />
        ))}
      </li>
    ))}
  </ul>
  )
}

export default Tasks
