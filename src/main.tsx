import './index.css'
import './element'
import { previewQuery } from './lib/api'

const form = document.getElementById('form') as HTMLFormElement
const editor = document.getElementById('primary') as HTMLElement & { value: string }
const resultDiv = document.getElementById('result') as HTMLDivElement
const collectionSelect = form.querySelector('select[name="collection"]') as HTMLSelectElement

const SCHEMA_BASE_URL = 'http://localhost:4000/api/selections/schema'
const SUGGESTIONS_BASE_URL = 'http://localhost:4000/api/selections/preview/schema'

function updateEndpoints(collection: string) {
  editor.setAttribute('autocompletions', `${SCHEMA_BASE_URL}?collection=${collection}`)
  editor.setAttribute('suggestions', `${SUGGESTIONS_BASE_URL}?collection=${collection}`)
}

// Update endpoints when collection changes
collectionSelect.addEventListener('change', () => {
  updateEndpoints(collectionSelect.value)
})

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const query = editor.value?.trim()
  const collection = collectionSelect.value

  if (!query || !collection) {
    resultDiv.innerHTML = renderError('Query und Collection sind erforderlich.')
    return
  }

  const data = await previewQuery(collection, query)

  if (data.error) {
    resultDiv.innerHTML = renderError(data.error)
    return
  }

  if (!Array.isArray(data) || data.length === 0) {
    resultDiv.innerHTML = renderInfo('Keine Einträge gefunden.')
    return
  }

  resultDiv.innerHTML = renderList(data)
})

const renderError = (message: string) =>
  `<div class="alert alert-error">${message}</div>`

const renderInfo = (message: string) =>
  `<div class="alert alert-info">${message}</div>`

const renderList = (data: any[]) => {
  return `<div class="card bg-base-100 shadow-sm">
        <div class="card-body">
          <h2 class="card-title">${data.length} entries found</h2>
          <ul class="flex flex-col gap-2">
            ${data.map((item: { id: string; title: string }) => `
              <li class="p-3 bg-base-200 rounded-box">
                <span class="font-medium">${item.title}</span>
                <span class="text-base-content/50 text-sm ml-2">${item.id}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    `
}
