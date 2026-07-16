import { Footer } from './_components/footer';
import { Navbar } from './_components/navbar';

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-1 flex-col bg-neutral-100">
            {/* navbar */}
            {/* <div className="bg-slate-400 p-4">Navbar</div> */}
            <Navbar />
            <main className="flex-1 bg-neutral-100 pt-40 pb-20">
                {children}
            </main>
            {/* footer */}
            {/* <div className="bg-slate-400 text-neutral-800 p-16 flex items-center justify-between">footer</div> */}
            <Footer />
        </div>
    );
};

export default MarketingLayout;
