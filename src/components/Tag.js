import React from 'react'

const Tag = ({tag, handler}) => {
  return (
    <span 
      className={`${tag.enabled? 'button' : 'buttondisabled'} ${!handler && 'nobutton'}`} 
      onClick={() => handler? handler(tag.id) : () => false}
    >{tag.name}</span>
  )
}

export default Tag
