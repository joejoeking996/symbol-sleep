'use client'

import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

type MaterialRow = {
  name?: string
  title?: string
}

export const MaterialRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<MaterialRow>()
  const index = data.rowNumber !== undefined ? data.rowNumber + 1 : ''
  const title = data.data?.name || data.data?.title || '未命名材料'

  return <div>{`材料 ${index}: ${title}`}</div>
}
