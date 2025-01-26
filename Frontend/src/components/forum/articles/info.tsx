export default function Info({ children } : { children : JSX.Element }){
    return <div className="bg-blue-300 my-4 border-4 py-4 rounded border-blue-600 flex justify-center">
        <span>🛈 {children}</span>
    </div>
}