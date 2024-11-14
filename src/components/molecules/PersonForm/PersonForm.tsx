// PersonForm.tsx
import React from 'react'
import styles from './PersonForm.module.sass'
import Input from '../../atoms/Input/Input'

interface Person {
  id: number
  name: string
  idNumber: string
  phoneNumber: string
}

interface PersonFormProps {
  id: number
  nameValue: string
  idValue: string
  phoneValue: string
  onChange: (id: number, field: keyof Person, value: string) => void
}

const PersonForm: React.FC<PersonFormProps> = ({ id, nameValue, idValue, phoneValue, onChange }) => {
  return (
    <div className={styles.personForm}>
      <Input
        placeholder="Nombre completo"
        value={nameValue}
        onChange={(e) => onChange(id, 'name', e.target.value)}
      />
      <Input
        placeholder="Número de identificación"
        value={idValue}
        onChange={(e) => onChange(id, 'idNumber', e.target.value)}
      />
      <Input
        placeholder="Número de celular"
        value={phoneValue}
        onChange={(e) => onChange(id, 'phoneNumber', e.target.value)}
      />
    </div>
  )
}

export default PersonForm
