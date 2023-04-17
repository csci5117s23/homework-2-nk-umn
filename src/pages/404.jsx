import Link from "next/link";

export default function New404Page() {
    return <div>
        <h1>
            404: Page not Found
        </h1>
        <Link href="/todos">Go Back</Link>
    </div>
}