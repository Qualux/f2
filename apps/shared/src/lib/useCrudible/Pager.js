import PagerLink from './PagerLink';

export default function Pager({ pageCount, page, setPage }) {

    const handleClick = (pageNum) => {
        setPage(pageNum);
    };

    // Generate dynamic page links up to the pageCount
    const pageLinks = [];
    for (let i = 1; i <= pageCount; i++) {
        
        pageLinks.push(
            <PagerLink
                key={i}
                pageNum={i}
                handleClick={handleClick}
                active={i === page}
            />
        );
    }

    return (
        <main className="m-0 p-6 flex justify-center bg-neutral-700/10">
            <ul className="flex items-center gap-1.5">
                {pageLinks}
            </ul>
        </main>
    );

}