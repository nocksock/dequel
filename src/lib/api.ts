export const previewQuery = async (collection: string, query: string) => {
  const params = new URLSearchParams({ collection, query })
    return await fetch(`/api/selections/preview?${params}`)
      .then(res => res.json())
      .catch(err => ({ error: 'Failed to fetch preview data' }))
}


