// const formatDate = (dateString) => {
//     const months = [
//         'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//         'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
//     ];

//     const date = new Date(dateString);
//     const month = months[date.getMonth()];
//     const day = String(date.getDate()).padStart(2, '0');
//     const year = date.getFullYear();

//     return `${month} ${day}, ${year}`;
// }

// export { formatDate };

const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

export { formatDate };
