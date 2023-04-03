import { id } from "ethers";

// TODO: Replace this function with PCD package
const pcdType = "semaphore-group-signal";
function requestZuzaluMembershipUrl(
  urlToPassportWebsite: string,
  returnUrl: string,
  urlToSemaphoreGroup: string,
  externalNullifier?: string,
  signal?: string
) {
  const req = {
    type: "Get",
    returnUrl,
    args: {
      externalNullifier: {
        argumentType: "BigInt",
        userProvided: false,
        value: externalNullifier
      },
      group: {
        argumentType: "Object",
        userProvided: false,
        remoteUrl: urlToSemaphoreGroup
      },
      identity: {
        argumentType: "PCD",
        value: undefined,
        userProvided: true
      },
      signal: {
        argumentType: "BigInt",
        userProvided: false,
        value: "192991921"
      }
    },
    pcdType
  };

  const encReq = encodeURIComponent(JSON.stringify(req));

  const proofUrl = `${urlToPassportWebsite}#/prove?request=${encReq}`;
  return proofUrl;
}

// Wrap the popup/redirect to PCD as a Promise
export async function generateProofForFeedback(
  feedback: string,
  sessionId: string
): Promise<{
  nullifierHash: string;
  proof: string[];
}> {
  // Construct the URL to the PCD
  const passportProofUrl = requestZuzaluMembershipUrl(
    process.env.NEXT_PUBLIC_PASSPORT_URL as string,
    window.location.origin + "/popup",
    process.env.NEXT_PUBLIC_ZUZALU_SEMAPHORE_GROUP_URL as string,
    sessionId,
    id(feedback)
  );

  // Open the popup
  const popupUrl = `/popup?proofUrl=${encodeURIComponent(passportProofUrl)}`;
  window.open(popupUrl, "_blank", "width=360,height=480,top=100,popup");

  // Create a promise that resolve on the response from the popup
  return new Promise((resolve, reject) => {
    const handler = (event: any) => {
      if (event.origin !== process.env.NEXT_PUBLIC_ZUZALU_FEEDBACK_APP_ORIGIN) {
        return;
      }

      if ("encodedPcd" in event.data) {
        try {
          const pcdResponse = JSON.parse(decodeURIComponent(event.data.encodedPcd));
          if (pcdResponse.type !== pcdType) return;

          const pcdData = JSON.parse(pcdResponse.pcd);
          const proof = pcdData.proof.proof;

          resolve(proof);
        } catch (error) {
          reject(error);
        } finally {
          window.removeEventListener("message", handler);
        }
      }
    };

    window.addEventListener("message", handler);
  });
}
