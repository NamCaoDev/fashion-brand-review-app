export const enum InputType {
  Text = 'text',
  Number = 'number',
  Date = 'date',
  TextArea = 'text-area',
  Select = 'select',
  InputGroup = 'input-group',
  Upload = 'upload',
  Email = 'email',
  Password = 'password',
  InputList = 'input-list',
}

export interface SelectOptions {
  label: string
  value: any
}

export interface InputGroup {
  [key: string]: InputParams
}

export interface InputParams {
  name: string
  type: InputType
  icon?: React.ReactNode
  label?: string
  required: boolean
  placeholder?: string
  selectOptions?: SelectOptions[]
  groups?: InputParams[]
  uploadOptions?: {
    isAvatar?: boolean
  }
}
