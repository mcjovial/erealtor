// User Model

export interface UserAttributes {
  _id?: number | string
  name: string
  email: string
  password?: string
  phone: string
  isAdmin?: boolean
  createdAt?: string
  updatedAt?: string
}

// Warehouse Model
export interface PropertyAttributes {
  _id?: number | string
  title: string
  description: string
  rent: number
  size: number
  state: string
  location: string
  street: string
  services: Array<string>
  images: Array<string>
  UserId?: number | string
  createdAt?: string
  updatedAt?: string
}

export interface MenuItem {
  id: number
  name: string
  description?: string
  active: boolean
}

export interface Services {
  wifi?: JSX.Element
  power?: JSX.Element
  bathroom?: JSX.Element
  thermostat?: JSX.Element
  iot?: JSX.Element
}

export interface IServices<T> {
  label: string
  Icon: T
}

export interface RegisterState {
  firstName: string
  lastName: string
  email: string
  password: string
  phone: string
}

export interface LoginState {
  email?: string
  password?: string
}

export interface FilterPropertyOptions {
  states: Array<string>
  locations: Array<string>
  rent?: Array<number>
  size?: Array<number>
}

export interface IFormInput {
  title: string
  description: string
  size: number
  rent: number
  state: string
  location: string
  street: string
  services: string[]
}
