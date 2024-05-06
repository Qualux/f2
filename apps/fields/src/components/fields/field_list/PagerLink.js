export default function PagerLink({ pageNum, handleClick, active }) {

    let classes = 'px-2 py-1 rounded-sm';
    if(active) {
        classes += ' bg-sky-200';
    } else {
        classes += ' cursor-pointer bg-neutral-200';
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
