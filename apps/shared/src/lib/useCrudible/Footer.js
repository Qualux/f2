export default function Footer({data}) {
    return(
        <div className="flex justify-center gap-6 text-xs text-neutral-600 px-5 py-6 bg-neutral-600/10">
            <div>
                Pages Found: {data.max_num_pages}
            </div>
            <div>
                Total Records: {data.found_posts}
            </div>
        </div>
    )
}