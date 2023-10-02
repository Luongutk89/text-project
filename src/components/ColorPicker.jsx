import { useState } from 'react';
import { TwitterPicker } from 'react-color';

const ColorPicker = ({ defaultColor, onColorChange }) => {
    const [currentColor, setCurrentColor] = useState(defaultColor);

    const handleColorChange = (color) => {
        setCurrentColor(color.hex);
        onColorChange(color.hex);
    };

    return (
        <div className="color-customizer">
            <TwitterPicker
                color={currentColor}
                onChange={handleColorChange}
                width="100%"
                colors={['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF', '#1abc9c', '#ffd32a', '#ef5777']}
                triangle="top-right"
            />
        </div>
    );
};

export default ColorPicker;



