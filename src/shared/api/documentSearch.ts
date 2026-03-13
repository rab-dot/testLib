import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { searchApi } from './api'

export type FacetBuckets = Record<string, number>

export interface SearchDocument {
  id: string
  documentId: string
  chunkId: number
  text: string
  type: string
  pageNumber?: number | null
  filePath: string
  fileType: string
  topics: string[]
  topicScore: number
  fileHash?: string
  lastModified?: string // ISO
  persons?: string[]
  organizations?: string[]
  locations?: string[]
}

export interface SearchResult {
  query?: string | null
  topics?: string[] | null
  hits: SearchDocument[]
  totalHits: number
  processingTimeMs: number
  facets?: {
    topics?: FacetBuckets
    persons?: FacetBuckets
    organizations?: FacetBuckets
    locations?: FacetBuckets
    [key: string]: FacetBuckets | undefined
  } | null
}

export interface SearchParams {
  q?: string
  topics?: string[]
  persons?: string[]
  orgs?: string[]
  locs?: string[]
  fileType?: string
  limit?: number
}

function toQuery(params: SearchParams): string {
  const qp: string[] = []
  const rawQuery = params.q ?? "''"
  qp.push(`q=${encodeURIComponent(rawQuery)}`)
  if (params.topics?.length)
    qp.push(`topics=${encodeURIComponent(params.topics.join(','))}`)
  if (params.persons?.length)
    qp.push(`persons=${encodeURIComponent(params.persons.join(','))}`)
  if (params.orgs?.length)
    qp.push(`orgs=${encodeURIComponent(params.orgs.join(','))}`)
  if (params.locs?.length)
    qp.push(`locs=${encodeURIComponent(params.locs.join(','))}`)
  if (params.fileType?.trim())
    qp.push(`fileType=${encodeURIComponent(params.fileType)}`)
  if (typeof params.limit === 'number') qp.push(`limit=${params.limit}`)
  return qp.length ? `?${qp.join('&')}` : ''
}

export async function searchDocuments(
  params: SearchParams
): Promise<SearchResult> {
  const url = `/search${toQuery(params)}`
  const response = await searchApi.get<SearchResult>(url)
  return response.data
}

export const SEARCH_DOCUMENTS_QUERY_KEY = 'searchDocuments'

export const DEFAULT_SEARCH_LIMIT = 10000

export const buildSearchQueryKey = (params: SearchParams) => [
  SEARCH_DOCUMENTS_QUERY_KEY,
  params,
]

export function useSearchDocuments(params: SearchParams) {
  return useQuery({
    queryKey: buildSearchQueryKey(params),
    queryFn: () => searchDocuments(params),
    placeholderData: keepPreviousData,
  })
}

export interface SearchTopicsDetails {
  [topic: string]: string[]
}

export interface SearchTopicsResponse {
  count: number
  topics: string[]
  details: SearchTopicsDetails
}

export async function searchTopics(): Promise<SearchTopicsResponse> {
  const response = await searchApi.get<SearchTopicsResponse>('/search/topics')
  return response.data
}

export const SEARCH_TOPICS_QUERY_KEY = 'searchTopics'

export function useSearchTopics() {
  return useQuery({
    queryKey: [SEARCH_TOPICS_QUERY_KEY],
    queryFn: searchTopics,
    staleTime: Infinity,
  })
}
