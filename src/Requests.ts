export const fetchTopTracks = (setTopTracks: any): any => {
  const token: string = localStorage.getItem("accessToken") ?? "";
  const requestParams: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  return fetch("https://api.spotify.com/v1/me/top/tracks", requestParams)
    .then(async (result) => await result.json())
    .then((data) => {
      return setTopTracks(data.items);
    });
};
