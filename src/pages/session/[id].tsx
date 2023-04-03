import supabase from "@/lib/supabaseClient"
import { GetServerSideProps } from "next"

export default function Session({ feedback }: any) {
    return <ul>{feedback && feedback.map((f: string, i: number) => <li key={i}>{f}</li>)}</ul>
}

export const getServerSideProps: GetServerSideProps<{ feedback: string[] }> = async ({ params }) => {
    if (!params || !params.id) {
        throw new Error("Route parameters have not been defined properly")
    }

    let { data } = await supabase.from("feedback").select().eq("session_id", params?.id)

    if (!data) {
        throw new Error("DB data does not exist")
    }

    return {
        props: {
            feedback: data?.map(({ message }: any) => message)
        }
    }
}
