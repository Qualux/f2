export default function Footer({data}) {
    return(
        <div className="flex gap-6 text-xs text-neutral-400">
            <div>
                Pages Found: {data.max_num_pages}
            </div>
            <div>
                Total Records: {data.found_posts}
            </div>
        </div>
    )
}