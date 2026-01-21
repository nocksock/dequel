import { MinusCircle } from 'lucide-react'

export type ResultItem = {
  title: string
}

export const Result = ({ results }: { results: ResultItem[], for: string }) => {
  return (
    <>
      <h3 className="border-b pb-2 border-slate-400 dark:border-slate-900">
        {results.length} Einträge in dieser Selektion
      </h3>

      <ul className="overflow-auto grid grid-cols-2 gap-2 text-slate-800">
        {results.map(r => (
          <li className="flex gap-4 bg-slate-50 p-1 rounded justify-between items-start">
            <span className="text-lg ">{r.title}</span>
            <div className="bar">
              <button
                className="bar-2 hover:bg-red-500 hover:text-white rounded-full"
                title="Aus query #1 explizit exkludieren"
                onClick={() => alert('not yet implemented')}
              >
                <MinusCircle className="size-4 " />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
