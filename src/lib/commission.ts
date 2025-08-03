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
  const byCreator = new Map<string, CommissionData[]>()

  for (const c of commissions) {
    const item: CommissionData = {
      ...c,
      PublishDate: c.fileName.slice(0, 8),
      Creator: c.fileName.split('_')[1],
    }

    if (!item.Featured) continue

    const list = byCreator.get(item.Creator)
    if (list) {
      list.push(item)
    } else {
      byCreator.set(item.Creator, [item])
    }
  }

  const creators = Array.from(byCreator.keys()).sort((a, b) => {
    const aPriority = priorities[a] ?? 0
    const bPriority = priorities[b] ?? 0
    if (aPriority !== bPriority) {
      return bPriority - aPriority
    }
    return a.localeCompare(b)
  })

  const result: CommissionData[] = []

  for (const creator of creators) {
    const items = byCreator.get(creator)!
    items.sort((a, b) => b.PublishDate.localeCompare(a.PublishDate))
    result.push(...items)
  }

  return result
}
