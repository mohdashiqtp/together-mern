import React from 'react'
import './PostGrid.css'

function PostGrid(props) {
  return (
    <div className="post_grid">
        <img src={props.post.image} />
    </div>
  )
}

export default PostGrid