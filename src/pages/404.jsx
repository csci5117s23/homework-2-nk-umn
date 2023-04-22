import Link from "next/link";

export default function New404Page() {
    return <div className="position-absolute top-50 start-50 translate-middle text-center">
        <h1>
            404: Page not Found
        </h1>
        <h2 className="pt-5">
            <Link href="/todos">Go Back</Link>
        </h2>
    </div>
    
}