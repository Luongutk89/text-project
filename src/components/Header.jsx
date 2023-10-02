import { FiArrowLeft, FiClipboard, FiColumns, FiDownload, FiGrid, FiList, FiSearch, FiX } from "react-icons/fi";

const Header = ({ toggleSidebarState, noteId, PrePage }) => {
    return (
        <div className="header">
            {!noteId ? (
                <>
                    <div className="header__left">
                        <div className="search__bar">
                            <FiSearch className="icon__search" />
                            <input type="text" placeholder="Nhập từ khóa tìm kiếm..." className="input__search" />
                            <FiX className="icon__close" />
                        </div>
                    </div>
                    <div className="header__right">
                        <div className="icon__wp-action">
                            <FiList className="icon__action" />
                            <FiGrid className="icon__action" />
                            <FiColumns className="icon__action" onClick={toggleSidebarState} />
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="header__left">
                        <button className="btn__return" onClick={() => PrePage()}>
                            <FiArrowLeft className="icon__return" />
                        </button>
                        <h4 className='title' onClick={() => PrePage()}>Chi tiết ghi chú</h4>
                    </div>
                    <div className="header__right">
                        <div className="icon__wp-action">
                            <FiClipboard className="icon__action" />
                            <FiDownload className="icon__action" />
                            <FiColumns className="icon__action" onClick={toggleSidebarState} />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Header;
