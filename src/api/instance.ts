import axios from 'axios';

const kakaoApi = axios.create({
  baseURL: import.meta.env.VITE_KAKAO_API_BASE_URL,
  headers: {
    Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_API_KEY}`,
  },
});

export default kakaoApi;
