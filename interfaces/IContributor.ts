interface GitHubUser {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string | null // Assuming it can be null
  url: string
  html_url: string
  followers_url: string
  following_url: string // You can further specify the template type
  gists_url: string
  starred_url: string // You can further specify the template type
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string // You can further specify the privacy parameter
  received_events_url: string
  type: string
  site_admin: boolean
  contributions: number
}

interface IContributor {
  contributors: GitHubUser[]
}

export type { IContributor, GitHubUser }
