import { Spin } from 'antd'

function FallBack({ fallback }) {
  return <Spin spinning>{fallback}</Spin>
}

export default FallBack
