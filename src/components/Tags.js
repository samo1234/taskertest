import React from 'react'
import Tag from './Tag'

const Tags = ({tags, handler, handleAll}) => {
  return (
    <div className="tags">
      {tags.map(tag => (
        <Tag key={tag.id} tag={tag} handler={handler} />
      ))}
      <span className="button" onClick={ () => handleAll()}>Enable All</span>
    </div>
  )
}

export default Tags
