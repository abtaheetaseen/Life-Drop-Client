import React from 'react'
import parse from 'html-react-parser';

const HTMLToPlainText = ({blogContent}) => {

  return (
    <div>
      {parse(blogContent)}
    </div>
  )
}

export default HTMLToPlainText
