import {type ReactNode} from "react";
import {createPortal} from "react-dom";
import Button from "./Button.tsx";

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export default function Popup({isOpen, onClose, children}: PopupProps ){
    if (!isOpen) return null;

    return createPortal(
        <div
            className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center"
        >
            {children}
            <Button onClick={onClose} children="Edit"/>
        </div>,
        document.body,
    );
}