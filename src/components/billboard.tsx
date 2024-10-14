export default function Billboard({ children, title, isClicked, className }: {
    children: React.ReactNode, title: string, isClicked: boolean, className?: string
}) {
    return <div className={className + " px-3 py-4 w-100 h-auto bg-white rounded-xl"} >
        <div className="flex justify-between items-center">
            <div className="text-sm">{title}</div>
            <button className="hover:bg-gray-200/50">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" role="img" aria-labelledby="a4xlj36vfa35brlzb5o9sbqre73ym9rw"><title id="a4xlj36vfa35brlzb5o9sbqre73ym9rw">Dropdown menu</title>
                    <path fillRule="evenodd" clipRule="evenodd" d="M8.25 12a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm5.25 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm3.75 1.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                </svg>
            </button>
            {(isClicked ?
                <div className="ml-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" role="img" aria-labelledby="afixedox7gl2oq020vnrltwblgxidmj9" className="crayons-icon pointer-events-none"><title id="afixedox7gl2oq020vnrltwblgxidmj9">Close</title><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636l4.95 4.95z"></path></svg>
                </div>
                : null)}
        </div>
        <div>
            {children}
        </div>
    </div>;
}