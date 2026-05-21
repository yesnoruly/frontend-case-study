export const GridSkeleton = () => {
    return (
        <div className="flex flex-col gap-2 p-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                        <div
                            key={i}
                            className="w-8 h-8 rounded bg-gray-200 animate-pulse"
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}