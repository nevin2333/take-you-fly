export class Brand {
  id: number
  name: string
  name_en: string
  description: string
  link: string
  logo: string
  status: string
  user_id: number
  created_at: string
  updated_at: string

  constructor() {
    this.status = 'active'
  }

}
