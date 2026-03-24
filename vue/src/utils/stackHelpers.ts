import type { HomeSection, StackSection } from '../types'

const isStackSection = (section: HomeSection): section is StackSection =>
  section._type === 'stackSection'

export const findStackSection = (sections?: HomeSection[] | null): StackSection | null => {
  if (!sections) return null
  return sections.find(isStackSection) ?? null
}

export const selectStackVariant = (
  stacks: StackSection['stacks'] | undefined,
  preferredKey: string
): NonNullable<StackSection['stacks']>[number] | null => {
  if (!stacks?.length) return null

  const lowerPreferred = preferredKey.toLowerCase()

  return (
    stacks.find((stack) => {
      const host = stack?.host?.toLowerCase() ?? ''
      const label = stack?.label?.toLowerCase() ?? ''
      return host.includes(lowerPreferred) || label.includes(lowerPreferred)
    }) ?? stacks[0] ?? null
  )
}

export const getBuiltWithFromSections = (sections?: HomeSection[] | null): string | null => {
  const stackSection = findStackSection(sections)
  if (!stackSection) return null

  const currentStack = selectStackVariant(stackSection.stacks, 'Vue')
  if (!currentStack) return null

  if (currentStack.builtWith?.trim()) return currentStack.builtWith

  return currentStack.label ?? null
}
