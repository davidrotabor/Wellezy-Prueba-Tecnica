/*
El modal donde se ingresan los datos de los pasajeros
*/
import React, { useState } from 'react'
import styles from './ModalForm.module.sass'
import PersonForm from '../../molecules/PersonForm/PersonForm'
import Button from 'app/components/atoms/Button/Button'

interface Person {
    id: number
    name: string
    idNumber: string
    phoneNumber: string
}

interface ModalFormProps {
    initialCount: number
    onClose: () => void
    onPersonsChange: (persons: Person[]) => void
    onBooking: () => void
}

const ModalForm: React.FC<ModalFormProps> = ({ initialCount, onClose, onPersonsChange, onBooking }) => {
    const [persons, setPersons] = useState<Person[]>(
        Array.from({ length: initialCount }, (_, i) => ({ id: i + 1, name: '', idNumber: '', phoneNumber: '' }))
    )

    const handlePersonChange = (id: number, field: keyof Person, value: string) => {
        const updatedPersons = persons.map(person => person.id === id ? { ...person, [field]: value } : person)
        setPersons(updatedPersons)
        onPersonsChange(updatedPersons)
    }

    const areAllFieldsFilled = (): boolean => {
        return persons.every(person => person.name && person.idNumber && person.phoneNumber)
    }

    const handleBooking = () => {
        if (areAllFieldsFilled()) {
            onBooking()
        } else {
            alert("Por favor, complete todos los campos para cada persona antes de continuar.")
        }
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
                            nameValue={person.name}
                            idValue={person.idNumber}
                            phoneValue={person.phoneNumber}
                            onChange={handlePersonChange}
                        />
                    ))}
                </div>
                <div className={styles.buttonRow}>
                    <Button onClick={onClose}>Cerrar</Button>
                    <Button onClick={handleBooking}>Reservar</Button>
                </div>
            </div>
        </div>
    )
}

export default ModalForm
