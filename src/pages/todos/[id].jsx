import { useRouter } from "next/router"

export default function car() {
    const router = useRouter()
    const { id } = router.query

    return <h1>test 2 {id}</h1>
}