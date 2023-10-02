import { useEffect, useState } from 'react';
import RichTextEditor from '../../components/RichTextEditor';
import { getNoteById } from '../../services/api';
import HashLoader from "react-spinners/HashLoader";
import { useNote } from '../../layouts/UserLayout';
import { ScaleLoader } from 'react-spinners';


const Detail = ({ }) => {
    const { content, setContent, setIsEdit } = useNote();
    const [loading, setLoading] = useState(true);

    const getIdFromUrl = () => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }

    const id = getIdFromUrl();

    useEffect(() => {
        const fetchNoteDetails = async () => {
            try {
                const res = await getNoteById(id);
                setContent(res.data.content);
                setTimeout(() => {
                    setLoading(false);
                }, 200);
            } catch (error) {
                console.error('Error fetching note details:', error);
                setLoading(false);
            }
        };

        fetchNoteDetails();
    }, [id]);


    const handleNoteChange = (note) => {
        setContent(note);
        setIsEdit(true);
    };


    return (
        <>
            {loading ? (
                <div className="sweet-loading">
                    <ScaleLoader size="50px" color="#3E96FF" />
                </div>
            ) : (
                <>
                    <RichTextEditor value={content} onChange={handleNoteChange} />
                </>
            )}
        </>
    );
};

export default Detail;
