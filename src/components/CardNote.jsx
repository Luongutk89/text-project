import React from 'react';
import { FiBookmark, FiEdit, FiTrash2 } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { deleteNote } from '../redux/slice/notesSlice';
import { formatDate } from '../helpers';

const CardNote = ({ item, handleClick }) => {
    const dispatch = useDispatch();

    // Ánh xạ trạng thái với màu
    const statusColors = {
        pending: '#fcd07f',   // Màu cam cho trạng thái pending
        postponed: '#ff7878',     // Màu đỏ cho trạng thái postponed
        completed: '#83ec83'   // Màu xanh lá cho trạng thái completed
    };

    const handleDeleteNote = () => {
        const shouldDelete = window.confirm('Bạn có chắc chắn muốn xóa ghi chú này không?');
        if (shouldDelete) {
            try {
                dispatch(deleteNote(item._id));
                console.log('Note deleted successfully.');
            } catch (error) {
                console.error('Error deleting note:', error);
            }
        }
    };

    return (
        <div className="card__item">
            <div className="card__head">
                {/* Áp dụng màu tương ứng với trạng thái */}
                <button className="btn__status" style={{ backgroundColor: statusColors[item.status] }}>
                    {item.status}
                </button>
                <FiBookmark className="icon__favirutes" />
            </div>
            <div className="card__body">
                <h3 className="title">{item.title}</h3>
                <p className="description">{item.description}</p>
            </div>
            <div className="card__foot">
                <span className="time">{formatDate(item.createdAt)}</span>
                <div className="wp__icon">
                    <FiEdit className="icon__action" onClick={() => handleClick(item)} />
                    <FiTrash2 className="icon__action" onClick={() => handleDeleteNote()} />
                </div>
            </div>
        </div>
    );
};

export default CardNote;
