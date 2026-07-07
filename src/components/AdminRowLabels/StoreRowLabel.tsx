'use client'

import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

type StoreRow = {
  name?: string
  region?: string
}

export const StoreRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<StoreRow>()
  const index = data.rowNumber !== undefined ? data.rowNumber + 1 : ''
  const name = data.data?.name || '未命名门店'
  const region = data.data?.region ? ` · ${data.data.region}` : ''

  return <div>{`门店 ${index}: ${name}${region}`}</div>
}
