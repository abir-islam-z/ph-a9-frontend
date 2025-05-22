export interface Comment {
  id: string
  content: string
  author: {
    id: string
    name: string
  }
  post: {
    id: string
    title: string
  }
  createdAt: string
  updatedAt: string
}
