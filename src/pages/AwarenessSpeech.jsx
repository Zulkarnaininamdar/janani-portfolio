import speechMd from '../content/awareness-speech.md?raw'
import MarkdownPage from './MarkdownPage'

export default function AwarenessSpeech() {
  return (
    <MarkdownPage
      title="A Gift of Life: My Journey from Waiting to Living"
      markdown={speechMd}
      backLabel="Back to portfolio"
    />
  )
}
