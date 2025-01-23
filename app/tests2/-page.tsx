'use client';

import { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react';

export default function DoubleClickModal() {
    const [selectedWord, setSelectedWord] = useState<string | null>(null); // Сохранение выбранного слова
    const [isModalOpen, setIsModalOpen] = useState(false); // Состояние модального окна
    const [tapCount, setTapCount] = useState(0); // Счётчик для двойного тапа

    const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const selection = window.getSelection()?.toString(); // Получение выделенного текста
        if (selection) {
            setSelectedWord(selection);
            setIsModalOpen(true); // Открытие модального окна
        }
    };

    const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        setTapCount((prev) => prev + 1);

        setTimeout(() => {
            setTapCount(0); // Сбрасываем счётчик через 300 мс
        }, 300);

        if (tapCount === 1) {
            const selection = window.getSelection()?.toString(); // Получение выделенного текста
            if (selection) {
                setSelectedWord(selection);
                setIsModalOpen(true); // Открытие модального окна
            }
        }
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setSelectedWord(null); // Очистка состояния после закрытия
    };

    return (
        <div>
            <div
                className={"text-2xl"}
                onDoubleClick={handleDoubleClick} // Для ПК
                onTouchEnd={handleTouchEnd} // Для мобильных устройств
                style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', cursor: 'pointer', }}
            >
                Дважды кликните или тапните на любое слово из этого текста, чтобы увидеть его в модальном окне.
            </div>

            <Modal isOpen={isModalOpen} onOpenChange={handleClose}>
                <ModalContent>
                    <ModalHeader>Выбранное слово</ModalHeader>
                    <ModalBody>
                        <p>{selectedWord}</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onPress={handleClose}>
                            Закрыть
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}