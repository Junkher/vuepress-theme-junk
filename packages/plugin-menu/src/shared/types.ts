export interface Post<
  T extends Record<string, unknown> = Record<string, unknown>
> {
  /**
   * Post path
   */
  path: string

  /**
   * Post info
   */
  info: T
}

export interface MenuData<
  T extends Record<string, unknown> = Record<string, unknown>
> {
  /**
   *  Only available when current route matches a group path
   */
  currentPosts?: Post<T>[]

  map: Record<
    string,
    {
      path: string
      name: string
      posts: Post<T>[]
    }
  >
}
