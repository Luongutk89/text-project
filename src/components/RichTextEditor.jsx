import React, { useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';

Quill.register('modules/imageResize', ImageResize);

const RichTextEditor = ({ value, onChange }) => {
    const modules = {
        toolbar: [
            [
                { font: [] },
                { header: [1, 2, 3, 4, 5, 6, false] },
                "bold", "italic", "underline", "strike",
                { align: [] },
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
                { color: ["#2ecc71", "#9b59b6", "#3498db", "#e74c3c", "#e67e22", "#f1c40f", "#bdc3c7", "#16a085", "#2c3e50", "#f39c12", "#000", "#0fbcf9", "#ffd32a", "#fff"] },
                { background: ["#2ecc71", "#9b59b6", "#3498db", "#e74c3c", "#e67e22", "#f1c40f", "#bdc3c7", "#16a085", "#2c3e50", "#f39c12", "#000", "#0fbcf9", "#ffd32a", "#fff"] },
                "link", "image", "code-block", "clean"
            ],
            // [{ 'size': ['small', false, 'large', 'huge'] }],
            // ["blockquote", { 'direction': 'rtl' }],"video",
        ],
        imageResize: {
            parchment: Quill.import('parchment'),
            modules: ['Resize', 'DisplaySize']
        }
    };
    const formats = ["header", "bold", "italic", "underline", "strike", "blockquote", "indent", "list", "bullet", "link", "color", "image", "background", "align", "size", "font", "video", "clean", "code-block"];

    const handleNoteChange = (content) => {
        onChange(content);
    }

    return (
        <ReactQuill
            className='note__editor'
            theme="snow"
            modules={modules}
            formats={formats}
            value={value}
            onChange={handleNoteChange}
            placeholder="Nhập nội dung ghi chú..."
        />
    );
}

export default RichTextEditor;
