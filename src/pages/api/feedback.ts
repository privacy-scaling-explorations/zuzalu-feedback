import type { NextApiRequest, NextApiResponse } from "next";
import pino from "pino";
import supabase from "@/lib/supabaseClient";
import { Feedback } from "@/types";
import { verifyProof } from "@semaphore-protocol/proof";
import { id as hash } from "@ethersproject/hash";
import { Group } from "@semaphore-protocol/group";

const logger = pino();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET": {
      try {
        const { sessionId } = req.query;

        let { data } = await supabase.from("feedback").select().eq("session_id", sessionId);

        if (!data || !Array.isArray(data)) {
          throw new Error("DB data does not exist");
        }

        res.status(200).json(data as Feedback[]);
      } catch (error) {
        res.status(500).json({ error: (error as Error).message });
      }

      break;
    }
    case "POST": {
      try {
        const { sessionId, feedback, nullifierHash, proof } = req.body;

        logger.info("New feedback submitted", { sessionId, feedback, nullifierHash, proof });

        let { data } = await supabase.from("feedback").select().eq("nullifier", nullifierHash);

        if (data && data.length > 0) {
          throw new Error("Nullifier has already been used");
        }

        logger.info("Fetching group...");

        const response = await fetch(process.env.NEXT_PUBLIC_ZUZALU_SEMAPHORE_GROUP_URL as string);
        const { id, depth, members } = await response.json();

        const group = new Group(id, depth);

        group.addMembers(members);

        const merkleTreeRoot = BigInt(group.root);
        const signal = BigInt(hash(feedback));

        logger.info("Verifying proof...");

        await verifyProof({ merkleTreeRoot, nullifierHash, externalNullifier: sessionId, signal, proof }, 20);

        logger.info("Proof verified.");

        const { status } = await supabase
          .from("feedback")
          .insert({ message: feedback, session_id: sessionId, nullifier: nullifierHash } as Feedback);

        logger.info("Feedback saved to database");

        res.status(status).end();
      } catch (error) {
        logger.error(error);

        res.status(500).json({ error: (error as Error).message });
      }
      break;
    }
    default:
      res.status(400).end();
  }
}
