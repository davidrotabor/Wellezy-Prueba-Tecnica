import React, { useState } from 'react'
import styles from './ModalForm.module.sass'
import PersonForm from '../../molecules/PersonForm/PersonForm'
import Button from 'app/components/atoms/Button/Button'

interface Person {
    id: number
    nombre: string
    identificacion: string
    celular: string
}

interface ModalFormProps {
    initialCount: number
    onClose: () => void
    onPersonsChange: (persons: Person[]) => void
}

const ModalForm: React.FC<ModalFormProps> = ({ initialCount, onClose, onPersonsChange }) => {
    const [persons, setPersons] = useState<Person[]>(
        Array.from({ length: initialCount }, (_, i) => ({ id: i + 1, nombre: '', identificacion: '', celular: '' }))
    )

    const handlePersonChange = (id: number, field: keyof Person, value: string) => {
        const updatedPersons = persons.map(person => person.id === id ? { ...person, [field]: value } : person)
        setPersons(updatedPersons)
        onPersonsChange(updatedPersons)
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2>Formulario de Registro</h2>
                <div className={styles.personFormGrid}>
                    {persons.map((person) => (
                        <PersonForm
                            key={person.id}
                            id={person.id}
                            nameValue={person.nombre}
                            idValue={person.identificacion}
                            phoneValue={person.celular}
                            onChange={handlePersonChange}
                        />
                    ))}
                </div>
                <div className={styles.buttonRow}>
                    <Button onClick={onClose}>Cerrar</Button>
                    <Button onClick={() => {}}>Reservar</Button>
                </div>
            </div>
        </div>
    )
}

export default ModalForm
