import { useEffect, useRef, useState } from 'react';
import { ModalHeader, ModalBody, ModalFooter, Modal } from './Modal';
import { FiEdit3 } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { createNote } from '../redux/slice/notesSlice';
import { useNavigate } from 'react-router-dom';


const ModalAddNote = ({ showModal, closeModal }) => {
    const titleInputRef = useRef(null);

    useEffect(() => {
        if (showModal && titleInputRef.current) {
            titleInputRef.current.focus();
        }
    }, [showModal]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handlerCreateNote();
        }
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const statusOptions = [
        { value: 'pending', label: 'Đang chờ' },
        { value: 'postponed', label: 'Đang làm' },
        { value: 'completed', label: 'Hoàn thành' },
    ];

    const colors = [
        '#ffffff', '#ffe53d', '#806dd5', '#51db6b', '#ee72cb', '#33C6FF', '#ffd32a', '#f43e8d', '#247ef5', '#c56cf0', '#b1d912', '#f19066',
    ];


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('pending');
    const [selectedColor, setSelectedColor] = useState(colors[0]);

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const handleColorChange = (color) => {
        setSelectedColor(color);
    };

    const handleCustomColorChange = (e) => {
        setSelectedColor(e.target.value);
    };

    const handleCloseModal = () => {
        setTitle('');
        setDescription('');
        setStatus('pending');
        setSelectedColor(colors[0]);
        closeModal()
    }

    const convertToSlug = (text) => {
        return text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    };

    const handlerCreateNote = async () => {
        // console.log('Color:', selectedColor);
        if (title == "") {
            alert('Vui lòng nhập tiêu đề');
        } else {
            const noteData = {
                title, description, status
            }
            const res = await dispatch(createNote(noteData));
            handleCloseModal();
            const slug = convertToSlug(res.payload.title);
            navigate(`/${slug}?id=${res.payload._id}`);
        }
    };

    const getTextColor = (backgroundColor) => {
        // Chuyển đổi màu từ hex sang RGB
        const r = parseInt(backgroundColor.slice(1, 3), 16);
        const g = parseInt(backgroundColor.slice(3, 5), 16);
        const b = parseInt(backgroundColor.slice(5, 7), 16);

        // Tính giá trị độ sáng
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;

        // Trả về màu chữ phù hợp dựa trên độ sáng
        return brightness > 128 ? 'black' : 'white';
    };



    return (
        <Modal show={showModal} onClose={closeModal} modalClass='modal__add'>
            <ModalHeader onClose={handleCloseModal} modalTitle="Thêm ghi chú mới" />
            <ModalBody>
                <div className="body__container">
                    <div className="form__group">
                        <label className='title' htmlFor="title">Tiêu đề</label>
                        <input
                            id='title'
                            type="text"
                            placeholder='Nhập tiêu đề'
                            className='input__title'
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            ref={titleInputRef}
                            onKeyDown={handleKeyDown}
                        />
                    </div>

                    <div className="form__group">
                        <label className='title' htmlFor="description">Mô tả ngắn</label>
                        <textarea
                            id='description'
                            placeholder='Nhập mô tả ngắn'
                            className='input__description'
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        />
                    </div>

                    <div className="form__group">
                        <label className='title' htmlFor="status">Trạng thái</label>
                        <div className="wp__status">
                            {statusOptions.map((option) => (
                                <label key={option.value} htmlFor={option.value} className="status__option">
                                    <input
                                        type="radio"
                                        name="status"
                                        value={option.value}
                                        id={option.value}
                                        onChange={handleStatusChange}
                                        checked={status === option.value}
                                    />
                                    {option.label}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="form__group">
                        <label className='title' htmlFor="title">Màu sắc</label>
                        {/* <div className="color-picker">
                            {colors.map((color, index) => (
                                <div
                                    key={index}
                                    className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                                    style={{ backgroundColor: color }}
                                    onClick={() => handleColorChange(color)}
                                />
                            ))}
                        </div> */}
                        <div className="color__container">
                            <input
                                type="color"
                                className="color-input"
                                value={selectedColor}
                                onChange={(e) => setSelectedColor(e.target.value)}
                                id='color-input'
                            />
                            <label className='label-color' htmlFor="color-input" style={{ backgroundColor: selectedColor }}>
                                <FiEdit3 className={`icon__edit-color`} style={{ backgroundColor: selectedColor, color: getTextColor(selectedColor) }} />

                            </label>
                            <input
                                type="text"
                                className="custom-color-input"
                                placeholder="Enter color (#RRGGBB)"
                                value={selectedColor}
                                onChange={handleCustomColorChange}
                            />
                        </div>
                    </div>

                </div>
            </ModalBody>
            <ModalFooter onFinish={handlerCreateNote} onClose={handleCloseModal} closeTitle='Trở lại' finishTitle='Tạo mới' />
        </Modal>
    );
}

export default ModalAddNote;
