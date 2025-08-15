import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

export const signupSchema = z.object({
  email: z.email(),
  password: z.string().min(10, { message: 'Password must be at least 10 characters long.' }),
})

export const signupValidator = zValidator('json', signupSchema, (result, c) => {
  if (!result.success) {
    return c.json(
      {
        errors: result.error.issues.map((issue) => issue.message),
      },
      400
    )
  }
})