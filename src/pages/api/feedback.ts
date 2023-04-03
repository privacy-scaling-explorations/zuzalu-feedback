import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "@/lib/supabaseClient";
import { Feedback } from "@/types";
import { verifyProof } from "@semaphore-protocol/proof";
import { id as hash } from "@ethersproject/hash";

export default async function handler(req: NextApiRequest, res: NextApiResponse<string[]>) {
  switch (req.method) {
    case "GET": {
      const { sessionId } = req.query;

      let { data } = await supabase.from("feedback").select().eq("session_id", sessionId);

      if (!data || data.length === 0) {
        throw new Error("DB data does not exist");
      }

      res.status(200).json(data?.map(({ message }: any) => message));

      break;
    }
    case "POST": {
      const { sessionId, feedback, nullifierHash, proof } = req.body;

      // TODO: Fetch Merkle root from PCD.
      const merkleTreeRoot = BigInt(0);
      const signal = BigInt(hash(feedback));

      await verifyProof({ merkleTreeRoot, nullifierHash, externalNullifier: sessionId, signal, proof }, 20);

      const { status } = await supabase
        .from("feedback")
        .insert({ message: feedback, session_id: sessionId, nullifier: nullifierHash.toString() } as Feedback);

      res.status(status).end();

      break;
    }
    default:
      res.status(400).end();
  }
}
