'use client'

import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

type MaterialCategoryRow = {
  title?: string
}

export const MaterialCategoryRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<MaterialCategoryRow>()
  const index = data.rowNumber !== undefined ? data.rowNumber + 1 : ''
  const title = data.data?.title || '未命名材料分类'

  return <div>{`材料分类 ${index}: ${title}`}</div>
}
