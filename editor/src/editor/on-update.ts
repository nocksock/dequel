import { EditorState, Facet, StateField } from '@codemirror/state'

// In Codemirror a facet is a way to define configurable options and behaviors.

const UpdateCallback = Facet.define<OnUpdateCallbackFn>()
export type OnUpdateCallbackFn = (doc: string, state: EditorState) => void

const StateWatcher = StateField.define({
  create: state => {
    const cb = state.facet(UpdateCallback).at(0)
    cb?.(state.doc.sliceString(0), state)
  },
  update: (_, { state, docChanged }) => {
    if (docChanged) {
      const cb = state.facet(UpdateCallback).at(0)
      cb?.(state.doc.sliceString(0), state)
    }
  },
})

/**
  * A simple facet that allows you to run a callback function whenever the
  * editor's content is updated.
  */
export const OnUpdate = (cb?: OnUpdateCallbackFn) =>
  cb ? [UpdateCallback.of(cb), StateWatcher] : []
