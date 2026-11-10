import volunteerMd from '../content/volunteer-statement.md?raw'
import MarkdownPage from './MarkdownPage'

export default function VolunteerStatement() {
  return (
    <MarkdownPage
      title="Why I Want to Volunteer with MOHAN Foundation"
      markdown={volunteerMd}
      backLabel="Back to portfolio"
    />
  )
}
