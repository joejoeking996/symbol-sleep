'use client'

import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

type ContactRow = {
  title?: string
}

export const ContactRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<ContactRow>()
  const index = data.rowNumber !== undefined ? data.rowNumber + 1 : ''
  const title = data.data?.title || '未命名联系分组'

  return <div>{`联系分组 ${index}: ${title}`}</div>
}
