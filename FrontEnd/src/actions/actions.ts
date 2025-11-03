import { LotValidation, ManAdd, ManAddLot } from "../types";

export const fetchUsers = async () => {
  const restURL = (process.env.NODE_ENV  === 'development') ? 'https://localhost:7112' : 'http://192.168.1.113/SRManAdd_Backend'
  const response = await fetch(
    `${restURL}/ManAddUsers/getAll`
  );
  if (response) return await response.json();
};

export const completePhase = async (manAdd: ManAdd) => {
  const restURL = (process.env.NODE_ENV  === 'development') ? 'https://localhost:7112' : 'http://192.168.1.113/SRManAdd_Backend'
  await fetch(
    `${restURL}/ManAdds/UpdateOpenManAdd?id=${manAdd.id}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(manAdd),
    }
  );
};

export const fetchData: () => Promise<ManAdd[] | null> = async () => {
  const restURL = (process.env.NODE_ENV  === 'development') ? 'https://localhost:7112' : 'http://192.168.1.113/SRManAdd_Backend'
  let result = null;
  await fetch(`${restURL}/ManAdds/getOpenManAdds`)
    .then((response) => {
      if (response) result = response.json();
    })
    .catch(() => {
      result = null;
    });
  return result;
};

export const fetchSingleManAdd = async (id: string | string[] | undefined) => {
  const restURL = (process.env.NODE_ENV  === 'development') ? 'https://localhost:7112' : 'http://192.168.1.113/SRManAdd_Backend'
  const response = await fetch(
    `${restURL}/ManAdds/getOpenManAdd?id=${id}`
  );
  if (response) return await response.json();
};

export const fetchLots = async (id: string | string[] | undefined) => {
  const restURL = (process.env.NODE_ENV  === 'development') ? 'https://localhost:7112' : 'http://192.168.1.113/SRManAdd_Backend'
  const response = await fetch(
    `${restURL}/ManAdds/getManAddLots?ManAddId=${id}`
  );
  if (response) return await response.json();
};

export const deleteLot = async (id: string) => {
  const restURL = (process.env.NODE_ENV  === 'development') ? 'https://localhost:7112' : 'http://192.168.1.113/SRManAdd_Backend'
  const response = await fetch(
    `${restURL}/ManAdds/deleteManAddLot?id=${id}`,
    {
      method: "DELETE",
    }
  );
  if (response) return await response.json();
};

export const addNewLot = async (newLot: ManAddLot) => {
  const restURL = (process.env.NODE_ENV  === 'development') ? 'https://localhost:7112' : 'http://192.168.1.113/SRManAdd_Backend'
  await fetch(`${restURL}/ManAdds/addManAddLot`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newLot),
  });
};

export const lotValidation = async (newLot: LotValidation) => {
  const restURL = (process.env.NODE_ENV  === 'development') ? 'https://localhost:7112' : 'http://192.168.1.113/SRManAdd_Backend'
  const response = await fetch(`${restURL}/ManAdds/lotValidation`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newLot),
  })
  if (response) return await response.json();
};

export const getLabelTemplates = async () => {
  const restURL = (process.env.NODE_ENV  === 'development') ? 'https://localhost:7112' : 'http://192.168.1.113/SRManAdd_Backend'
  const response = await fetch(`${restURL}/LabelManagement/getTemplates`);
  if (response) return await response.json();
};
