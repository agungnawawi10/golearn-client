export type AthleteRank = {
id: number
name: string
color: string
level: number
}

export type AthleteAccount = {
username: string
email: string
is_active: boolean
}

export type Athlete = {
id: string
full_name: string
gender: string
status: string
rank: AthleteRank
account: AthleteAccount
joined_at: string
}

export type AthletesResponse = {
data: Athlete[]
}