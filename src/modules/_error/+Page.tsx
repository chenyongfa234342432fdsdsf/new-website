import ClientOnly from '@/components/client-only'

export { Page }

function Page() {
  return (
    <ClientOnly load={() => import('@/layout/error')} isPriorityLow fallback={null} deps={[]}>
      {ErrorLayout => <ErrorLayout />}
    </ClientOnly>
  )
}
