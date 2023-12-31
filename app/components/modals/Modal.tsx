'use client'

import { useCallback, useEffect, useState } from "react";
import {IoMdClose} from 'react-icons/io';
import { Button } from "@/app/components";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryActionLabel,
}) => {
    const [showModal, setShowModal] = useState(isOpen)

    useEffect(() => {
      setShowModal(isOpen);
    }, [isOpen])

    const handleClose = useCallback(
      () => {
        if (disabled) {
            return;
        }

        setShowModal(false);
        setTimeout(() => {
            onClose()
        }, 300);
      }, [disabled, onClose]
    )

    const handleSubmit = useCallback(
      () => {
        if (disabled) {
            return;
        }

        onSubmit();
      }, [disabled, onSubmit]
    )

    const handleSecondaryAction = useCallback(
      () => {
        if (disabled || !secondaryAction) {
            return;
        }

        secondaryAction();
      }, [disabled, secondaryAction]
    )
    
    if (!isOpen) {
        return null;
    }
    
  return (
    <>
        <div className="
            flex flex-col items-center overflow-hidden fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70 justify-center
        ">
            <div className="
                relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-screen md:h-[calc(100vh-100px)]
            ">
                <div className={
                    `translate duration-300 h-screen md:h-[calc(100vh-100px)] ${showModal ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`
                }>
                    <div className="
                        translate h-screen md:h-[calc(100vh-100px)] border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none
                    ">
                        <div className="
                            flex items-center md:h-20 h-14 rounded-t justify-center border-b-[1px] absolute top-0 w-full
                        ">
                            <button 
                                onClick={handleClose}
                                className="
                                    p-1 border-0 hover:opacity-70 transition absolute left-9
                            ">
                                <IoMdClose size={18} />
                            </button>
                            <div className="text-lg font-semibold">
                                {title}
                            </div>
                        </div>
                        <div className="relative mt-[80px] md:mt-[104px] px-6 h-[calc(100vh-184px)] md:h-[calc((100vh-100px)-208px)] overflow-y-scroll">
                            {body}
                        </div>
                        <div className="
                            flex flex-col justify-center gap-2 h-20 px-6 absolute bottom-0 w-full
                        ">
                            <div className="flex flex-row items-center gap-4 w-full">
                                {secondaryAction && secondaryActionLabel && (
                                    <Button 
                                    outline
                                    disabled={disabled}
                                    onClick={handleSecondaryAction} 
                                    label={secondaryActionLabel}
                                />
                                )}
                                <Button 
                                    disabled={disabled}
                                    onClick={handleSubmit} 
                                    label={actionLabel}
                                />
                            </div>
                            {footer}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Modal