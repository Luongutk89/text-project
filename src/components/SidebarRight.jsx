import { useEffect } from "react";
import { useNote } from "../layouts/UserLayout";
import { getNoteById } from "../services/api";
import { FiAlertOctagon } from "react-icons/fi";
import { ScaleLoader } from "react-spinners";

const SidebarRight = ({ noteId, isSidebarActive }) => {
    const { title, setTitle, description, setDescription, handleUpdateNote, setIsEdit } = useNote();

    const handleSetTitle = (event) => {
        setTitle(event.target.value);
        setIsEdit(true);
    }

    const handleSetDescription = (event) => {
        setDescription(event.target.value);
        setIsEdit(true);
    }

    useEffect(() => {
        const fetchNoteDetails = async () => {
            try {
                const res = await getNoteById(noteId);
                setTitle(res.data.title);
                setDescription(res.data.description);
            } catch (error) {
                console.error('Error fetching note details:', error);
            }
        };

        fetchNoteDetails();
    }, [noteId]);


    return (
        <div className={`sidebar__right ${isSidebarActive ? 'active' : ''}`}>
            {!noteId ? (
                <>
                    <div className="sidebar__right-head">
                        <h3 className="title"><FiAlertOctagon className="icon__info" />Thống kê ghi chú</h3>
                    </div>
                    <div className="sidebar__right-body">
                        <div className="sweet-loading2">
                            <ScaleLoader color="#3E96FF" />
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="sidebar__right-head">
                        <h3 className="title"><FiAlertOctagon className="icon__info" />Thông tin ghi chú</h3>
                    </div>

                    <div className="sidebar__right-body">
                        <div className="form__group">
                            <label htmlFor="title">Tiêu đề</label>
                            <input type="text" placeholder="Nhập tiêu đề..." id="title" value={title} onChange={(event) => handleSetTitle(event)} />
                        </div>
                        <div className="form__group">
                            <label htmlFor="description">Mô tả ngắn</label>
                            <textarea className="description" placeholder="Nhập mô tả ngắn..." id="description" value={description} onChange={(event) => handleSetDescription(event)}>
                            </textarea>
                        </div>
                        <div className="form__group">
                            <label htmlFor="description">Trạng thái</label>
                            <input type="text" placeholder="Nhập tiêu đề..." id="title" value="Pending" />
                        </div>
                        <div className="form__group">
                            <label htmlFor="description">Màu sắc</label>
                            <input type="text" placeholder="Nhập tiêu đề..." id="title" value="#ee72cb" />
                        </div>
                        <button className="btn__update" onClick={handleUpdateNote}>Lưu lại thay đổi</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default SidebarRight;
