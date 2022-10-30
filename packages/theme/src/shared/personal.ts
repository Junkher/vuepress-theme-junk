export type Platform =
  | 'github'
  | 'email'
  | 'bilibili'
  | 'youtube'
  | 'telegram'
  | 'twitter'
  | 'instagram'

export type SNS = {
  [key in Platform]?: string
}

export interface PersonalConfig {
  name: string
  avatar: string
  banner: string
  bio: string
  sns?: SNS
}
