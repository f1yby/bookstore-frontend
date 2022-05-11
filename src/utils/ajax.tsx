import {BookData} from "@/service/BookService";

export const postRequest = (url: RequestInfo, data: { [x: string]: string | Blob }, callback: (arg0: any) => void) => {
  let formData = new FormData();

  for (let p in data) {
    if (data.hasOwnProperty(p))
      formData.append(p, data[p]);
  }

  const opts: RequestInit = {
    method: "POST",
    body: formData,
    mode: 'cors',
  };

  fetch(url, opts)

    .then((response) => {
      return response.json()
    })
    .then((data) => {
      callback(data);
    })
    .catch((error) => {
      console.log(error);
    });
};
