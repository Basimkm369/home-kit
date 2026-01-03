export const formatDateTime = (iso: string) => {
  const date = new Date(iso)
  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

export const formatDate = (iso: string) => {
  const date = new Date(iso)
  return new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(date)
}
