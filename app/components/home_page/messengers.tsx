//"use client";

import {FaEnvelope, FaTelegramPlane, FaWhatsapp} from "react-icons/fa";

export default function Messengers() {


    return (
        <>
            <div className="flex justify-center space-x-5 pt-3 pb-5">
                {/* Telegram */}
                <a
                    href="https://t.me/@slavaveto"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full w-11 h-11 sm:w-10 sm:h-10 bg-default-200 text-default-500 xs414:hover:bg-primary-300 xs414:hover:text-white transition flex items-center justify-center align-middle
                    active:bg-primary-300 active:text-white"
                >
                    <FaTelegramPlane style={{transform: 'translateX(-2px)'}} size={26}/>
                </a>

                {/* WhatsApp */}
                <a
                    href="https://wa.me/+59896112322"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full w-11 h-11 sm:w-10 sm:h-10 bg-default-200 text-default-500 xs414:hover:bg-success-400 xs414:hover:text-white transition flex items-center justify-center
                    active:bg-success-400 active:text-white"
                >
                    <FaWhatsapp size={28}/>
                </a>

                {/* Gmail */}
                <a
                    href="mailto:slavaveto@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full w-11 h-11 sm:w-10 sm:h-10 bg-default-200 text-default-500 xs414:hover:bg-danger-300 xs414:hover:text-white transition flex items-center justify-center
                    active:bg-danger-300 active:text-white"
                >
                    <FaEnvelope size={22}/>
                </a>
            </div>
        </>

    );
}

