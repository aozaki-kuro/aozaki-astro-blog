export interface CommissionInfo {
  fileName: string
  Character: string
  Featured: boolean
  Twitter?: string
  Pixiv?: string
  Fantia?: string
  Skeb?: string
}

export interface CommissionData extends CommissionInfo {
  PublishDate: string
  Creator: string
}

export function prepareData(
  commissions: CommissionInfo[],
  priorities: Record<string, number>,
): CommissionData[] {
  const formatted = commissions.map(c => ({
    ...c,
    PublishDate: c.fileName.slice(0, 8),
    Creator: c.fileName.split('_')[1],
  }))

  const byCreator: Record<string, CommissionData[]> = {}

  for (const commission of formatted) {
    if (commission.Featured) {
      if (!byCreator[commission.Creator]) {
        byCreator[commission.Creator] = []
      }
      byCreator[commission.Creator].push(commission)
    }
  }

  const sortedCreators = Object.keys(byCreator).sort((a, b) => {
    const aPriority = priorities[a] || 0
    const bPriority = priorities[b] || 0
    if (aPriority !== bPriority) {
      return bPriority - aPriority
    }
    return a.localeCompare(b)
  })

  for (const creator of sortedCreators) {
    byCreator[creator].sort((a, b) => b.PublishDate.localeCompare(a.PublishDate))
  }

  const flattened = sortedCreators.reduce((acc: CommissionData[], creator) => {
    acc.push(...byCreator[creator])
    return acc
  }, [])

  return flattened
}
