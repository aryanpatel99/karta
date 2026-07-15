

const MarketingLayout = (
    { children }: 
    { children: React.ReactNode }
)=>{
    return (
        <div className="h-full bg-red-500">
            {/* navbar */}
            <main>
                {children}
            </main>
            {/* footer */}
        </div>
    )
}

export default MarketingLayout