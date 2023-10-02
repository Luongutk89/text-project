import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import NavBarContent from '../components/NavBarContent';
import { createContext, useContext, useEffect, useState } from 'react';
import SidebarRight from '../components/SidebarRight';
import { useDispatch } from 'react-redux';
import { updateNote } from '../redux/slice/notesSlice';

const NoteContext = createContext();
export const useNote = () => useContext(NoteContext);

const UserLayout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [isEdit, setIsEdit] = useState(false);



    const handleUpdateNote = () => {
        const confirmed = window.confirm("Bạn có chắc chắn muốn cập nhật ghi chú?");

        if (confirmed) {
            dispatch(updateNote({ id: noteId, updatedNoteData: { title, description, content } }));
            navigate('/');
            setIsEdit(false)
        }
    };

    const getIdFromUrl = () => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }

    const noteId = getIdFromUrl();

    const [isSidebarActive, setIsSidebarActive] = useState(
        JSON.parse(localStorage.getItem('isSidebarActive')) || false
    );

    const toggleSidebarState = () => {
        const newSidebarActiveState = !isSidebarActive;
        setIsSidebarActive(newSidebarActiveState);
        localStorage.setItem('isSidebarActive', JSON.stringify(newSidebarActiveState));
    };


    const isAuthenticated = !!localStorage.getItem('token');

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    const PrePage = () => {
        if (isEdit) {
            const confirmed = window.confirm("Bạn có chắc chắn muốn thoát mà không lưu các thay đổi?");

            if (confirmed) {
                navigate('/');
                setIsEdit(false);
            }
        } else {
            navigate('/');
            setIsEdit(false);
        }
    };


    return (
        <NoteContext.Provider value={{ title, setTitle, description, setDescription, content, setContent, handleUpdateNote, isEdit, setIsEdit }}>
            <div className='user__container'>
                <NavBar />
                <NavBarContent />
                <main className={`wp__content ${isSidebarActive ? 'active' : ''}`}>
                    <Header toggleSidebarState={toggleSidebarState} noteId={noteId} PrePage={PrePage} />
                    <div className='content'>
                        <Outlet />
                    </div>
                </main>
                <SidebarRight isSidebarActive={isSidebarActive} noteId={noteId} />
            </div>
        </NoteContext.Provider>
    );
};

export default UserLayout;
