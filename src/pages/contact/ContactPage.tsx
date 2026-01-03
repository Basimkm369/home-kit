import { FormEvent, useState } from 'react'
import Button from '@/components/Button'
import PageHeader from '@/components/PageHeader'
import InputField from '@/forms/InputField'
import TextAreaField from '@/forms/TextAreaField'

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [submitted, setSubmitted] = useState(false)

  const setField = (key: 'name' | 'email' | 'message', value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    // live-validate the specific field
    setErrors((prev) => {
      const next = { ...prev }
      if (key === 'name') {
        if (!value) next.name = 'Name is required.'
        else delete next.name
      }
      if (key === 'email') {
        if (!value || !value.includes('@')) next.email = 'Valid email required.'
        else delete next.email
      }
      if (key === 'message') {
        if (value.length < 10) next.message = 'Add a short message (10+ chars).'
        else delete next.message
      }
      return next
    })
  }

  const validate = () => {
    const nextErrors: { [key: string]: string } = {}
    if (!form.name) nextErrors.name = 'Name is required.'
    if (!form.email || !form.email.includes('@')) nextErrors.email = 'Valid email required.'
    if (form.message.length < 10) nextErrors.message = 'Add a short message (10+ chars).'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!validate()) return
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Message sent"
          description="Thanks for reaching out. This is a mock confirmation screen."
          action={<Button onClick={() => setSubmitted(false)}>Send another message</Button>}
        />
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-black/30">
          <p className="text-sm text-slate-300">
            We received your note and will respond with availability. In this demo the submission is mocked;
            restart a new message if you want to test validation again.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Contact us"
        description="Send a quick note and we will respond with availability. Mocked form for this demo."
      />

      <div className="grid gap-6 md:grid-cols-2">
        <form
          onSubmit={onSubmit}
          className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-black/30"
        >
          <InputField
            label="Name"
            value={form.name}
            error={errors.name}
            onChange={(event) => setField('name', event.target.value)}
          />
          <InputField
            label="Email"
            type="email"
            value={form.email}
            error={errors.email}
            onChange={(event) => setField('email', event.target.value)}
          />
          <TextAreaField
            label="Message"
            value={form.message}
            error={errors.message}
            onChange={(event) => setField('message', event.target.value)}
            placeholder="Describe your service need or follow up request."
          />
          <div className="flex items-center gap-3">
            <Button type="submit">Send message</Button>
          </div>
        </form>

        <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-black/30">
          <h2 className="text-lg font-semibold text-white">Visit or call</h2>
          <p className="text-sm text-slate-300">
            Home Kit HQ
            <br />
            221B Service Lane, Downtown District
            <br />
            +91-99999-12345
          </p>
          <div className="overflow-hidden rounded-xl border border-slate-800">
            <div className="h-48 w-full bg-gradient-to-br from-indigo-600/40 via-slate-900 to-slate-950">
              <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.3em] text-slate-200">
                Map placeholder
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
