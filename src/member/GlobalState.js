import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

//로그인 토큰 설정
export const tokenState = atom({
  key: 'login',
  default: '',
  effects: [localStorageEffect('login')],
});



function localStorageEffect(key) {
    console.log('여기오는가 ?');
	return ({ setSelf, onSet }) => {
		const savedValue = window.sessionStorage.getItem(key);
		if (savedValue != null) {
			setSelf(JSON.parse(savedValue));
		} else {
			// 세션 스토리지에 저장된 값이 없으면 로그아웃 처리
			window.sessionStorage.removeItem(key);
			if (window.location.pathname !== '/SignIn') {
			 	window.location.href = '/SignIn';
			}
		}

		onSet((newValue, _, isReset) => {
            console.log("isReset :", isReset);
			isReset
				? window.sessionStorage.removeItem(key)
				: window.sessionStorage.setItem(key, JSON.stringify(newValue));
		});
	};
}
