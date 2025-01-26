export default function Danger({ children } : { children : JSX.Element }){
    return <div className="bg-red-300 my-4 border-4 py-4 rounded border-red-600 flex justify-center">
        <span>⚠ {children}</span>
    </div>
}