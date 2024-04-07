import { Alert, Spin } from 'antd'
import React from 'react'

const Loading = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
         <Spin size='large' tip="Loading...">
  </Spin>
    </div>
  )
}

export default Loading