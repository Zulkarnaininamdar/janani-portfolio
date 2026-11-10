// Intrinsic pixel sizes of the photos in /public/images.
// Passing width/height lets the browser reserve the right space before a lazy image
// loads, so the page doesn't jump and in-page navigation lands in the right place.
const SIZES = {
  'backstage-makeup.jpg': [1230, 1279],
  'costume-teal-seated-pose.jpg': [1086, 1448],
  'dr-mohamed-rela-with-janani-son.jpg': [1379, 1141],
  'hero-portrait-red-teal-saree.jpg': [1024, 1536],
  'hospital-after-delivery-with-cake.jpg': [1448, 1086],
  'nataraja-golden.jpg': [452, 590],
  'on-stage-green-costume.jpg': [1055, 1491],
  'portrait-block-print-saree.jpg': [720, 1601],
  'prayer-temple-portrait.jpg': [790, 1056],
  'prayer-temple-wide.jpg': [1489, 1056],
  'seeking-blessings.jpg': [992, 1586],
  'with-guru-malathi-vaidyanatham.jpg': [1558, 1010],
  'with-students-salangai-pooja.jpg': [1254, 1254]
}

export function imageSize(src) {
  const file = String(src).split('/').pop()
  const s = SIZES[file]
  return s ? { width: s[0], height: s[1] } : {}
}
