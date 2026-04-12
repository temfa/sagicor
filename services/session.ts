/* eslint-disable @typescript-eslint/no-explicit-any */
// services/session.ts

import { baseUrl } from "@/utils/helper";

export interface StartSessionResponse {
  link: string;
  id: string;
}

export const startSession = async (phoneNumber: string, udid: string, addid: string): Promise<StartSessionResponse> => {
  const payload = {
    data: {
      udid,
      addid,
      phoneNumber,
    },
  };

  const response = await fetch(`${baseUrl}start-session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to start session");
  }

  const result = await response.json();
  const session = result?.BimPayAu10tixSessionResult;
  console.log(session);

  if (!session?.link || !session?.id) {
    throw new Error("Invalid session response");
  }

  return {
    link: session.link,
    id: session.id,
  };
};

export const checkSession = async (docid: string, udid: string, addid: string) => {
  const payload = {
    data: {
      udid,
      addid,
      docid,
    },
  };

  const response = await fetch(`${baseUrl}check-session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to check session");
  }

  return response.json();
};

export const endSession = async (docid: string, udid: string, addid: string) => {
  const payload = {
    data: {
      udid,
      addid,
      docid,
      type: 3,
    },
  };
  const response = await fetch(`${baseUrl}end-session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to check session");
  }

  return response.json();
};

export const getData = async (docid: string, udid: string, addid: string, email: string) => {
  const payload = {
    data: {
      udid,
      addid,
      docid,
      email,
    },
  };

  const response = await fetch(`${baseUrl}get-data`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to get data");
  }

  const result = await response.json();

  return {
    data: result?.BimPayGetAu10tixDataResult.userdata[0].contents,
    descr: result?.BimPayGetAu10tixDataResult.userdata[0].descr,
    subDescr: result?.BimPayGetAu10tixDataResult.userdata[0].subDescr,
    id: result?.BimPayGetAu10tixDataResult.userdata[0].id,
  };
};

export const saveData = async (udid: string, addid: string, data: any, page: number) => {
  const payload = {
    data: {
      udid,
      addid,
      back: false,
      page,
      data,
    },
  };

  const response = await fetch(`${baseUrl}save-data`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to get data");
  }

  const result = await response.json();

  return {
    data: result?.BimPaySaveUserDataResult?.userdata?.[0]?.contents ?? [],
    id: result?.BimPaySaveUserDataResult?.userdata?.[0]?.id ?? 0,
    descr: result?.BimPaySaveUserDataResult?.userdata?.[0]?.descr ?? "",
    subDescr: result?.BimPaySaveUserDataResult?.userdata?.[0]?.subDescr ?? "",
    success: result?.BimPaySaveUserDataResult.success,
    isCompleted: result?.BimPaySaveUserDataResult.isCompleted ? true : false,
    error: result?.BimPaySaveUserDataResult.isCompleted ? result?.BimPaySaveUserDataResult.error.errorType : "",
  };
};
