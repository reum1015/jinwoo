// src/utils/index.js

/**
 * 전체 경로에서 파일 이름만 추출 (예: 'src/assets/img.jpg' -> 'img.jpg')
 */
export const getFileName = (path) => {
  if (!path) return ''
  return path.split('/').pop()
}
