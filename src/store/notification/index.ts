import { createEffect } from 'effector'

export const showErrorNotificationFx = createEffect((err: Error) =>
  console.error({ message: err.message })
)

export const showSuccessNotificationFx = createEffect((message: string) =>
  console.log({ message: message })
)
