import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchNotes } from '../../redux/slice/notesSlice';
import CardNote from '../../components/CardNote';
import HashLoader from "react-spinners/HashLoader";
import Tabs from '../../components/Tabs';
import { ScaleLoader } from 'react-spinners';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const notes = useSelector((state) => state.notes.list);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(fetchNotes());
                setTimeout(() => {
                    setLoading(false);
                }, 100);
            } catch (error) {
                console.error('Error fetching notes:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [dispatch]);

    const convertToSlug = (text) => {
        return text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    };

    const renderNotes = (status) => {
        const filteredNotes = status ? notes.filter(item => item.status === status) : notes;
        return (
            <div className="card__container">
                {filteredNotes.length === 0 ? (
                    <div className="no-notes-message">Không có ghi chú nào.</div>
                ) : (
                    filteredNotes.map((item) => (
                        <CardNote key={item.id} item={item} handleClick={handleClick} />
                    ))
                )}
            </div>
        );
    };

    const handleClick = (item) => {
        const slug = convertToSlug(item.title);
        navigate(`/${slug}?id=${item._id}`);
    };

    const tabs = [
        {
            title: 'Tất cả',
            content: renderNotes(null)
        },
        {
            title: 'Chờ xử lý',
            content: renderNotes('pending')
        },
        {
            title: 'Đang tiến hành',
            content: renderNotes('postponed')
        },
        {
            title: 'Đã hoàn thành',
            content: renderNotes('completed')
        },
    ];

    return (
        <>
            {loading ? (
                <div className="sweet-loading">
                    <ScaleLoader size="50px" color="#3E96FF" />
                </div>
            ) : (
                <>
                    <Tabs tabs={tabs} />
                </>
            )}
        </>
    );
};

export default Home;
