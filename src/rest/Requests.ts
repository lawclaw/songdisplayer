export const fetchTopTracks = (setTopTracks: any): any => {
  const token: string = localStorage.getItem("accessToken") ?? "";
  const requestParams: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  return fetch(
    "https://api.spotify.com/v1/me/top/tracks?limit=50",
    requestParams
  )
    .then(async (result) => await result.json())
    .then((data) => {
      return setTopTracks(data.items);
    });
};

export const spotifyLogin = (): void => {
  const CLIENT_ID = String(import.meta.env.VITE_SPOTIFY_CLIENT_ID);
  const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
  const REDIRECT_URL_AFTER_LOGIN = "http://localhost:5173";
  const SPACE_DELIMITER = "%20";
  const SCOPES = ["user-top-read"];
  const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

  window.location.href = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
};

export const getReturnedParamsFromSpotifyAuth = (hash: string): any => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split("&");
  return paramsInUrl.reduce(
    (accumulator: Record<string, unknown>, currentValue: string) => {
      const [key, value] = currentValue.split("=");
      accumulator[key] = value;
      return accumulator;
    },
    {}
  );
};
