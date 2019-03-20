export class Shop {
  id: number
  name: string
  user_id: number
  phone: string
  logo: string
  status: string
  state_id: number
  country_id: number
  province_id: number
  city_id: number
  system_language_id: string
  qq_number: string
  created_at: string
  updated_at: string

  constructor() {
    this.status = 'active'
  }

}
