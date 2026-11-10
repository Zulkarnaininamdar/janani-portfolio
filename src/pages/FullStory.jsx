import fullStoryMd from '../content/full-story.md?raw'
import MarkdownPage from './MarkdownPage'

export default function FullStory() {
  return (
    <MarkdownPage
      title="My Life, My Family, and My Dreams"
      markdown={fullStoryMd}
      backLabel="Back to portfolio"
    />
  )
}
