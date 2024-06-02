export default function PagerLink({ pageNum, handleClick, active }) {

    let classes = 'px-2 py-1 rounded-sm';
    if(active) {
        classes += ' text-white/30 bg-white/10';
    } else {
        classes += ' cursor-pointer bg-admin-blue text-neutral-100 transition-transform hover:scale-110';
    }
    
    const handleClickWrapper = () => {
        handleClick(pageNum);
    };

    return (
        <li 
            className={classes}
            onClick={handleClickWrapper}
        >
           {pageNum}
        </li>
    );
}
