import type { NextApiRequest, NextApiResponse } from "next"
import supabase from "@/lib/supabaseClient"
import { Feedback } from "@/types"

export default async function handler(req: NextApiRequest, res: NextApiResponse<string[]>) {
    const { id } = req.query

    switch (req.method) {
        case "GET": {
            let { data } = await supabase.from("feedback").select().eq("session_id", id)

            if (!data) {
                throw new Error("DB data does not exist")
            }

            res.status(200).json(data?.map(({ message }: any) => message))

            break
        }
        case "POST": {
            const { message } = req.body

            // TODO: Verify if the proof is valid.

            const { status } = await supabase.from("feedback").insert({ message, session_id: id } as Feedback)

            res.status(status).end()

            break
        }
        default:
            res.status(400).end()
    }
}
