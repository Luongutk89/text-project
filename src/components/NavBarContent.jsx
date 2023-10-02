import { FiLock, FiTrash2, FiShare2, FiBook, FiHeart, FiLayers, FiStar, FiPlus } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import ModalAddNote from './ModalAddNote';
import { useState } from "react";
import { BiSolidFolder } from "react-icons/bi";

const menuItems = [
    { to: "/", icon: <BiSolidFolder />, label: "Tất cả ghi chú" },
    { to: "/favorites", icon: <FiBook />, label: "Ghi chú công khai" },
    { to: "/note", icon: <FiLock />, label: "Ghi chú riêng tư" },
    { to: "/tool", icon: <FiHeart />, label: "Ghi chú yêu thích" },
    { to: "/trash", icon: <FiStar />, label: "Ghi chú quan trọng" },
    { to: "/favorites", icon: <FiShare2 />, label: "Ghi chú đã chia sẻ" },
    { to: "/favorites", icon: <FiTrash2 />, label: "Ghi chú đã xóa" },
];

const NavBarContent = () => {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="sidebar__content">
            <div class="sidebar__content-head">
                <h3>Ghi chú</h3>
            </div>

            <div class="sidebar__content-body">
                <ul class="note__sub-container">
                    {menuItems.map((menuItem, index) => (
                        <li key={index}>
                            <NavLink to={menuItem.to} end>
                                <BiSolidFolder className="icon__folder" />
                                {menuItem.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                <div class="package__pro-container">
                    <button class="btn__pro" onClick={openModal}>
                        <FiPlus className="icon__pro" />
                        Tạo ghi chú mới
                    </button>
                    <ModalAddNote showModal={showModal} closeModal={closeModal} />
                </div>
            </div>
        </div>
    );
};

export default NavBarContent;
