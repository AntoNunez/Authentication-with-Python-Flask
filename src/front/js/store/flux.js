
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			apiUrl: "https://3001-4geeksacade-reactflaskh-1303kxaynhn.ws-us59.gitpod.io",
			currentUser: null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getLogin: async (info = { email: ' ', password: ' ' }) => {
				try {
					const { apiUrl } = getStore();
					const response = await fetch(`${apiUrl}/api/login`, {
						method: 'POST',
						body: JSON.stringify(info),
						headers: {
							'Content-Type': 'application/json'
						}
					})

					const data = await response.json()

					if (data.access_token) {
						setStore({ currentUser: data })
						sessionStorage.setItem('currentUser', JSON.stringify(data));
					}

					return data;

				} catch (error) {
					console.log("there has been an error login in");
				}
			},

			getlogout: () => {

				if (sessionStorage.getItem('currentUser')) {
					sessionStorage.removeItem('currentUser');
					setStore({ currentUser: null });
				}
			},

			checkSession: () => {
				if (sessionStorage.getItem('currentUser')) {
					setStore({ currentUser: JSON.parse(sessionStorage.getItem('currentUser')) })
				}
			},

			getMessage: () => {
				const store = getStore()
				const opts = {
					headers: {
						"Authorization": "Bearer" + store.token
					}
				}
				// fetching data from the backend
				fetch(process.env.BACKEND_URL + "/api/hello", opts)
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
			},


			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
