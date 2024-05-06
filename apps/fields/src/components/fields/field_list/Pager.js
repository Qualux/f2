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
        <main className="my-8 bg-neutral-100 p-6 flex justify-center">
            <ul className="flex items-center gap-1">
                {pageLinks}
            </ul>
        </main>
    );
}